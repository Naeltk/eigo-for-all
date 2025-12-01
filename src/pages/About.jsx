import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 24px;
  text-align: center;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  margin-bottom: 16px;
`;

const StartButton = styled(Link)`
  display: inline-block;
  margin-top: 30px;
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 18px;
`;

export default function AboutPage() {
        const { t } = useTranslation();

  return (
    <Container>
      <Title>{t("about.title")}</Title>
      <Paragraph>
        {t("about.purpose")}
      </Paragraph>
      <Paragraph>
        {t("about.howToUse")}
      </Paragraph>
      <Paragraph>
        {t("about.credits")}
      </Paragraph>
      <StartButton to="/">{t("about.button")}</StartButton>
    </Container>
  );
}
