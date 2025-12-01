import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled(Link)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  text-align: center;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 16px;
`;

const Desc = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

export default function GradeActivityCard({ to, title, desc }) {
  return (
    <Card to={to}>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
    </Card>
  );
}
