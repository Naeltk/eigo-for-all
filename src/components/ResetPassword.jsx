import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  width: 50%;
  height: 40%;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
  }
`;

const Title = styled.h2`
  margin-bottom: 12px;
  color: #333;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Button = styled.button`
  flex: 1;
  max-width: 200px;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ $variant }) =>
    $variant === "secondary" ? "#ccc" : "#605f5fff"};
  color: ${({ $variant }) => ($variant === "secondary" ? "#333" : "#fff")};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ResetButton = styled(Button)`
  background-color: ${({ $variant }) =>
    $variant === "secondary" ? "#ccc" : "#d74949ff"};
`;

const Message = styled.p`
  color: ${({ success }) => (success ? "green" : "red")};
`;

export default function ResetPassword({ handleClose }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setMessage(t("reset.success") + " " + t("reset.checkSpam"));
      setTimeout(handleClose, 3500);
    } catch (err) {
      const errorCode = err.code;
      const translatedError = t(`err.${errorCode}`);
      setMessage(
        translatedError === `err.${errorCode}`
          ? t("err.default")
          : translatedError
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Backdrop>
      <Modal>
        <Title>{t("reset.title") || "Password Reset"}</Title>

        {message && <Message success={success}>{message}</Message>}

        <Input
          type="email"
          placeholder={t("signin.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <ButtonGroup>
          <Button type="button" $variant="secondary" onClick={handleClose}>
            ← {t("reset.back") || "Go Back"}
          </Button>
          <ResetButton
            type="button"
            onClick={handleReset}
            disabled={loading}
          >
            {loading
              ? t("reset.sending") || "Sending..."
              : t("reset.send") || "Send Reset Email"}
          </ResetButton>
        </ButtonGroup>
      </Modal>
    </Backdrop>
  );
}
