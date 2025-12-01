import { useState } from "react";
import { auth } from "../firebase";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 500px;
  margin: 80px auto;
  padding: 30px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  text-align: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`;

const Warning = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-weight: 600;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryDark}
  );
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  margin-top: 16px;
  color: ${({ success, theme }) =>
    success ? theme.colors.success : theme.colors.error};
  font-weight: 500;
`;

const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setMessage("");
    setSuccess(false);

    try {
      setLoading(true);
      await deleteUser(user);
      setSuccess(true);
      setMessage("Your account has been deleted successfully.");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error(error);

      if (error.code === "auth/requires-recent-login") {
        const providerId = user.providerData[0]?.providerId;

        if (providerId === "google.com") {
          try {
            const provider = new GoogleAuthProvider();
            await reauthenticateWithPopup(user, provider);
            await deleteUser(user);
            setSuccess(true);
            setMessage("Your account has been deleted successfully.");
            setTimeout(() => navigate("/"), 2000);
          } catch (err) {
            console.error(err);
            setMessage("Reauthentication failed. Please try again.");
          }
        } else {
          setShowPasswordInput(true);
        }
      } else {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReauthenticateAndDelete = async () => {
    const user = auth.currentUser;
    if (!user || !password) return;

    setMessage("");
    setSuccess(false);

    try {
      setLoading(true);
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      setSuccess(true);
      setMessage("Your account has been deleted successfully.");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error(error);
      setMessage("Reauthentication failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Delete Account</Title>
      <Warning>
        ⚠️ This action is permanent. Your account and data will be deleted
        forever.
      </Warning>

      {!showPasswordInput ? (
        <Button onClick={handleDelete} disabled={loading}>
          {loading ? "Processing..." : "Delete My Account"}
        </Button>
      ) : (
        <>
          <p>Please re-enter your password to confirm:</p>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleReauthenticateAndDelete}
            disabled={loading || !password}
          >
            {loading ? "Deleting..." : "Confirm Deletion"}
          </Button>
        </>
      )}

      {message && <Message success={success}>{message}</Message>}
    </Wrapper>
  );
};

export default DeleteAccount;
