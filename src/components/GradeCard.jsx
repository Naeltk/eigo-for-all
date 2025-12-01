import styled from "styled-components";
import { Link } from "react-router-dom";
const Card = styled(Link)`
  min-width: 180px;
  flex: 0 0 auto;
  text-align: left;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;
const Tag = styled.span`
  display: inline-block;
  font-size: 12px;
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: ${({ gradeId, theme }) =>
    gradeId <= 4
      ? theme.colors.primaryLight
      : gradeId <= 6
      ? theme.colors.primary
      : theme.colors.primaryDark};
`;
const Title = styled.h4`
margin: 0 0 6px; font-size: 18px;
`;
const Desc = styled.p`
margin: 0; font-size: 14px; color: ${({ theme }) => theme.colors.muted};
`;
export default function GradeCard({ to, tag, title, desc, gradeId }) {
return (
<Card to={to}>
<Tag gradeId={gradeId}>{tag}</Tag>
<Title>{title}</Title>
<Desc>{desc}</Desc>
</Card>
);
}