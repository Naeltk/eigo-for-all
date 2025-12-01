import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";


const Page = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1000px;
  margin: 60px auto;
  background: ${({ theme }) => theme.colors.surface || "#fff"};
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  background: ${({ theme }) => theme.colors.bg || "#f7f8fc"};
  width: 280px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.colors.border || "#eee"};

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
  }
`;

const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary || "#007bff"};
  color: white;
  font-size: 32px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const SidebarButton = styled.button`
  width: 100%;
  padding: 12px 0;
  margin-top: 10px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${({ danger, theme }) =>
    danger
      ? theme.colors.error || "#e74c3c"
      : theme.colors.primary || "#007bff"};
  color: white;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Main = styled.div`
  flex: 1;
  padding: 40px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text || "#333"};
`;

const InfoBox = styled.div`
  background: ${({ theme }) => theme.colors.bg || "#f8f8f8"};
  border: 1px solid ${({ theme }) => theme.colors.border || "#ddd"};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
`;

const Label = styled.p`
  font-weight: 600;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.textSecondary || "#555"};
`;

const Value = styled.p`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text || "#333"};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border || "#ccc"};
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border || "#ccc"};
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 16px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  color: white;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary || "#007bff"},
    ${({ theme }) => theme.colors.primaryDark || "#0056b3"}
  );
  cursor: pointer;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.9;
  }
`;

const Message = styled.p`
  margin-top: 12px;
  color: ${({ success, theme }) =>
    success ? theme.colors.success || "#27ae60" : theme.colors.error || "#e74c3c"};
  font-weight: 500;
`;

export default function Account() {
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setEmail(currentUser.email);

        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNickname(data.nickname || "");
          setRole(data.role || "Student");
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), { nickname, role }, { merge: true });
      setSuccess(true);
      setMessage(t("account.success"));
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setSuccess(false);
      setMessage(t("account.err"));
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  if (!user) return <p style={{ textAlign: "center", marginTop: "50px" }}>{t("account.login")}</p>;

  return (
    <Page>
      {/* Sidebar */}
      <Sidebar>
        <Avatar>{user.email?.[0].toUpperCase()}</Avatar>
        <SidebarButton onClick={() => navigate("/delete-account")} danger>
          {t("account.delete")}
        </SidebarButton>
        <SidebarButton onClick={handleSignOut}>{t("account.logout")}</SidebarButton>
      </Sidebar>

      {/* Main Section */}
      <Main>
        <Title>{t("account.info")}</Title>
        <InfoBox>
          <Label>{t("account.email")}</Label>
          <Value>{email}</Value>

          <Label>{t("account.nick")}</Label>
          <Input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={t("account.enter")}
          />

          <Label>{t("account.role")}</Label>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Student">{t("account.student")}</option>
            <option value="Teacher">{t("account.teacher")}</option>
          </Select>

          <SaveButton onClick={handleSave}>{t("account.save")}</SaveButton>
          {message && <Message success={success}>{message}</Message>}
        </InfoBox>

        <InfoBox>
          <Label>{t("account.favorite")}</Label>
          <Value>Coming soon...</Value>

          <Label>{t("account.correct")}</Label>
          <Value>0</Value>
        </InfoBox>
      </Main>
    </Page>
  );
}
