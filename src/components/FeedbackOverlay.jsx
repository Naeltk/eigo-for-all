import styled, { keyframes } from "styled-components";

// A smoother pulse + fade animation
const feedbackAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  40% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
  }
  70% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(80px, 10vw, 140px);
  pointer-events: none;
  color: ${({ correct }) => (correct ? "#4CAF50" : "#F44336")};
  animation: ${feedbackAnimation} 0.7s ease-in-out forwards;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

export default function FeedbackOverlay({ correct }) {
  return <Overlay correct={correct}>{correct ? "✔" : "✖"}</Overlay>;
}

