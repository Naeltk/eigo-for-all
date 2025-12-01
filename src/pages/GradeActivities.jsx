import styled from "styled-components";
import { useParams } from "react-router-dom";
import { grades } from "../data/grades";
import GradeActivityCard from "../components/GradeActivityCard";

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

export default function GradeActivitiesPage() {
  const { gradeId } = useParams();
  const grade = grades.find(g => g.id === parseInt(gradeId));
  if (!grade) return <p>Grade not found</p>;

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "24px" }}>{grade.title} Activities</h1>
      <Grid>
        {grade.activities.map((act, idx) => (
          <GradeActivityCard key={idx} to={`/activities/grade/${grade.id}/${act.path}`} title={act.title} desc={act.desc}  />
        ))}
      </Grid>
    </>
  );
}
