import styled from "styled-components";
import { grades } from "../data/grades";
import GradeCard from "../components/GradeCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 24px;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export default function Activities() {
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "24px" }}>All Grades</h1>
<Grid>
  {grades.map((g) => (
    <GradeCard
      key={g.id}
      to={`/activities/grade/${g.id}`}
      tag={g.tag}
      title={g.title}
      desc={g.desc}
      gradeId={g.id}
    />
  ))}
</Grid>
    </>
  );
}
