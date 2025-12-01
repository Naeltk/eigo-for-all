import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  max-width: 360px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
`;

const Title = styled.h2`
  margin-bottom: 12px;
  color: #333;
`;

const ScoreText = styled.p`
  font-size: 20px;
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ $variant }) =>
    $variant === "secondary" ? "#ccc" : "#4caf50"};
  color: ${({ $variant }) => ($variant === "secondary" ? "#333" : "#fff")};

  &:hover {
    opacity: 0.9;
  }
`;

export default function ResultModal({ score, total, onRetry, onGoBack }) {
  return (
    <Backdrop>
      <Modal>
        <Title>🎉 Quiz Finished!</Title>
        <ScoreText>
          Your Score: <strong>{score}</strong> / {total}
        </ScoreText>
        <ButtonGroup>
          <Button $variant="secondary" onClick={onGoBack}>← Go Back</Button>
          <Button onClick={onRetry}>🔄 Retry</Button>
        </ButtonGroup>
      </Modal>
    </Backdrop>
  );
}
