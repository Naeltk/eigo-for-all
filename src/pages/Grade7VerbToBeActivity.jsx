import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verbToBe } from "../data/verbToBe";
import { createBlanks } from "../funcs/createBlanks";
import ScoreCounter from "../components/ScoreCounter";
import FeedbackOverlay from "../components/FeedbackOverlay";
import ResultModal from "../components/ResultModal";
import styled, { keyframes, css } from "styled-components";
import { useTranslation } from "react-i18next";
import ActivityHeader from "../components/ActivityHeader";



const ActivityContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 24px;
  text-align: center;
  position: relative;
`;

const SentenceBox = styled.div`
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 32px;
  font-family:'Comic Neue',cursive;

`;

const Input = styled.input(({ $isIncorrect }) => ({
  fontSize: '20px',
  padding: '8px 12px',
  border: $isIncorrect ? '2px solid #dc3545' : '2px solid #000',
  borderRadius: '8px',
  textAlign: 'center',
  marginBottom: '16px',
  color: $isIncorrect ? '#dc3545' : 'inherit',
  fontWeight: $isIncorrect ? 'bold' : 'normal',
  transition: 'border-color 0.3s, color 0.3s',
}));



const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-2px);
  }
`;

const SubmitButton = styled.button`
  display: block;
  margin: 32px auto 0;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #28a745;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;

  &:hover {
    background-color: #218838;
  }
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }

  ${({ $readyToSubmit }) =>
    $readyToSubmit &&
    css`
      animation: ${bounce} 1s ease-in-out infinite;
    `}
`;

export default function Grade7VerbToBeActivity() {
    const { t } = useTranslation();

  const totalQuestions = 5;
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef(null); 


  const navigate = useNavigate();

  // Shuffle questions on load
  useEffect(() => {
    const shuffled = [...verbToBe].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, totalQuestions);
    setShuffledQuestions(selectedQuestions);
    if (shuffled.length > 0){
    const { blankedSentence, answer } = createBlanks(
      shuffled[0].sentence,
      shuffled[0].verb
    );
    setCurrentQuestion({ ...shuffled[0], blankedSentence, answer });
}
  }, []);

  useEffect(() => {
    if (inputRef.current && !showResult) {
      inputRef.current.focus();
    }
  }, [currentIndex, showResult]);

  const handleSubmit = useCallback(() => {
    if (!userAnswer || isSubmitted) return;
    setIsSubmitted(true);

    const correct =
      userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();

    setFeedback(correct);
    if (correct) {setScore((s) => s + 1)}else {
      setUserAnswer(currentQuestion.answer);
    };

    setTimeout(() => {
      setFeedback(null);
      setIsSubmitted(false);

      if (currentIndex + 1 < totalQuestions) {
        const next = shuffledQuestions[currentIndex + 1];
        const { blankedSentence, answer } = createBlanks(next.sentence, next.verb);
        setCurrentQuestion({ ...next, blankedSentence, answer });
        setCurrentIndex((i) => i + 1);
        setUserAnswer("");

      } else {
        setShowResult(true);
      }
    }, 1800);
    }, [userAnswer, currentQuestion, currentIndex, shuffledQuestions, totalQuestions, isSubmitted]);


   const handleKeyDown = (e) => {
    if (e.key === 'Enter' && userAnswer.trim() !== "") {
      handleSubmit();
    }
  };

  const handleRetry = () => {
    setScore(0);
    setCurrentIndex(0);
    setShowResult(false);
    setIsSubmitted(false);

    const newShuffled = [...verbToBe].sort(() => Math.random() - 0.5);
    setShuffledQuestions(newShuffled);
     const firstQuestion = newShuffled[0];
  const { blankedSentence, answer } = createBlanks(
    firstQuestion.sentence,
    firstQuestion.verb
  );
    setCurrentQuestion({ ...firstQuestion, blankedSentence, answer });
    setUserAnswer("");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!currentQuestion) return null;

  return (
    <ActivityContainer>
      <ActivityHeader title={t("activities.grade7.verbToBeActivity.title")}
                                   description={t("activities.grade7.verbToBeActivity.description")}/>
      <ScoreCounter
        currentIndex={currentIndex}
        score={score}
        total={totalQuestions}
      />

      <SentenceBox>{currentQuestion.blankedSentence}</SentenceBox>

      <Input
        ref={inputRef}
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your answer..."
        disabled={isSubmitted}
        $isIncorrect={feedback === false}
      />

      <SubmitButton onClick={handleSubmit}  
      $readyToSubmit={userAnswer} 
      disabled={!userAnswer}>Submit</SubmitButton>

      {feedback !== null && <FeedbackOverlay correct={feedback} />}

      {showResult && (
        <ResultModal
          score={score}
          total={totalQuestions}
          onRetry={handleRetry}
          onGoBack={handleGoBack}
        />
      )}
    </ActivityContainer>
  );
}