import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Wrap = styled.footer`
  margin-top: 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 24px 16px;
  display: grid;
  gap: 12px;

   @media (max-width: 600px) {
    padding: 20px 12px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;

    @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 18px;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

    @media (max-width: 600px) {
    justify-content: center;
    gap: 12px;
  }
`;

export default function Footer() {
  const { t } = useTranslation();
  return (
    <Wrap>
      <Container>
        <Row>
          <Links>
            <Link to="/about">{t("nav.about")}</Link>
            <Link to="/materials">{t("nav.materials")}</Link>
            <Link to="/activities">{t("nav.activities")}</Link>
            <Link to="/contact-us">{t("nav.contact")}</Link>
          </Links>
          <small>© {new Date().getFullYear()} Eigo for All</small>
        </Row>
      </Container>
    </Wrap>
  );
}