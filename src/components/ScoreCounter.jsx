import styled from "styled-components";


const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  background: #f3f3f3;
  border-radius: 12px;
  padding: 12px 20px;
  margin-bottom: 16px;
`;

export default function ScoreCounter({ currentIndex, total, score }) {

  return (
    <ScoreContainer>
      <div>Question: {currentIndex + 1} / {total}</div>
      <div>Score: {score}</div>
    </ScoreContainer>
  );
}
