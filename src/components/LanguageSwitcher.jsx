import styled from "styled-components";
import i18n from "../i18n";


const Switcher = styled.div`
display: flex; gap: 8px; align-items: center;
`;
const Btn = styled.button`
padding: 6px 10px; border-radius: 10px; border: 1px solid ${({ theme }) => theme.colors.border};
background: ${({ active, theme }) => (active ? theme.colors.surface : "transparent")};
cursor: pointer;  min-height: 32px; line-height: 1;
`;


export default function LanguageSwitcher() {
const current = i18n.language || "en";
return (
<Switcher>
<Btn active={current.startsWith("en")} onClick={() => i18n.changeLanguage("en")}>EN</Btn>
<Btn active={current.startsWith("ja")} onClick={() => i18n.changeLanguage("ja")}>日本語</Btn>
</Switcher>
);
}