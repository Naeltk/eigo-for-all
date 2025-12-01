import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

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

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  font-size: 16px;
`;

const Button = styled.button`
  display: inline-block;
  border: none;
  min-width: 220px;
  margin-top: 30px;
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover || "#0056b3"};
  }
`;

const Message = styled.p`
  color: ${({ success }) => (success ? "green" : "red")};
`;

const Text = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary || "#555"};
  text-align: center;
`;

const SigninButton = styled.button`
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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState("Student");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();


  const getCustomErrorMessage = (errorCode) => {
      return t(`err.${errorCode}`) || t("err.default");
    };

  const handleEmailSignUp = async () => {
    setMessage("");
    setSuccess(false);
    console.log("Creating account...");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nickname,
        role,
        email: user.email,
        createdAt: new Date(),
      });

      console.log("Account created successfully!");
      setSuccess(true);
      setMessage(t("signup.success"));

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err);
      setSuccess(false);
      setMessage(getCustomErrorMessage(err.code));
    }
  };

  const handleGoogleSignUp = async () => {
    setMessage("");
    setSuccess(false);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          nickname: nickname || user.displayName || "User",
          role,
          email: user.email,
          createdAt: new Date(),
        },
        { merge: true }
      );

      setSuccess(true);
      setMessage(t("signup.googlesuccess"));
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setSuccess(false);
      setMessage(getCustomErrorMessage(err.code));
    }
  };

  return (
    <Container>
      <h2>{t("signup.title")}</h2>
      {message && <Message success={success}>{message}</Message>}

      <Input
        type="email"
        placeholder={t("signup.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder={t("signup.password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="text"
        placeholder={t("signup.nick")}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Student">{t("signup.student")}</option>
        <option value="Teacher">{t("signup.teacher")}</option>
      </Select>

      <Button type="button" onClick={handleEmailSignUp}>{t("signup.emailsu")}</Button>
      <Button type="button" onClick={handleGoogleSignUp}>{t("signup.googlesi")}</Button>
       <Text>
      {t("signup.already")}{" "}
      <SigninButton onClick={() => navigate("/signin")}>{t("signup.signin")}</SigninButton>
    </Text>
    </Container>
  );
}
