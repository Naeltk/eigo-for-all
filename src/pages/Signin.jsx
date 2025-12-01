import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ResetPassword from "../components/ResetPassword";




const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 24px;
  border: 2px solid #ccc;
  border-radius: 12px;
  text-align: center;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  font-size: 16px;
`;



const Button = styled.button`
 display: inline-block;
  margin-top: 30px;
  padding: 12px 24px;
  border: none;
  min-width: 220px;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover || "#0056b3"};
  }
`;

const Text = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary || "#555"};
  text-align: center;
`;

const SignupButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary || "#007bff"};
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  font-size: 14px;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover || "#0056b3"};
  }
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary || "#007bff"};
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  padding: 10px;
  font-size: 14px;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover || "#0056b3"};
  }
`;


const Message = styled.p`
  color: ${({ success }) => (success ? "green" : "red")};
`;


export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [resetPasswordWindow, setResetPasswordWindow] = useState(false);

  const { t } = useTranslation();


  const navigate = useNavigate();


  const handleSignIn = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);
    try {
      await signInWithEmailAndPassword(auth, email, password);
       setSuccess(true);
      setMessage(t("signin.success"));
     setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
        setSuccess(false);
      const errorCode = err.code;
        const customMessage = t(`err.${errorCode}`) || t("err.default");
        setMessage(customMessage);
      }
    };

  return (
    <Container>
      <h2>{t("signin.title")}</h2>
        {message && <Message success={success}>{message}</Message>}

       <Input
        type="email"
        placeholder={t("signin.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder={t("signin.password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleSignIn}> {t("signin.signin")} </Button>

      <ResetButton onClick={() => setResetPasswordWindow(true)}>{t("signin.forgot")}</ResetButton>

    <Text>
        {t("signin.noaccount")}{" "}
        <SignupButton onClick={() => navigate("/signup")}>{t("signin.signup")}</SignupButton>
         </Text>
          {resetPasswordWindow && (
                   <ResetPassword
                     handleClose={() => setResetPasswordWindow(false)}
                   />
                 )}
      
    </Container>

  );
}
