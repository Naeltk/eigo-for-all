import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { greetingQuestions } from "../data/greetingQuestion";
import ScoreCounter from "../components/ScoreCounter";
import FeedbackOverlay from "../components/FeedbackOverlay";
import ResultModal from "../components/ResultModal";
import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ActivityHeader from "../components/ActivityHeader";


const ActivityContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 24px;
  position: relative;
  text-align: center;
`;
const QuestionText = styled.h2`
  margin-top: 20px;
  font-size: 22px;
  min-height: 28px; // optional, keeps space reserved even when hidden
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  font-family:'Comic Neue',cursive;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  font-family:'Comic Neue',cursive;
`;

const OptionBox = styled.div`
  background-color: #fff8dc;
  border: 2px solid #000;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  width: 60%;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #f5deb3;
  }
`;

export default function Grade6GreetingQuestionsActivity() {
    const { t } = useTranslation();

  const totalQuestions = 5;
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const shuffled = [...greetingQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, totalQuestions));
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const q = questions[currentIndex];
      setCurrentQuestion(q);


      const allOptions = [...q.answer, ...q.options].sort(() => Math.random() - 0.5);
      setOptions(allOptions);
    }
  }, [currentIndex, questions]);

  const handleOptionClick = (option) => {
    if (!currentQuestion || feedback !== null) return;

    const correct = option === currentQuestion.answer[0];
    setFeedback(correct);

    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < totalQuestions) {
        setCurrentIndex((i) => i + 1);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  const handleRetry = () => {
    const shuffled = [...greetingQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, totalQuestions));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!currentQuestion) return null;

  return (
    <ActivityContainer>
      <ActivityHeader title={t("activities.grade6.greetingActivity.title")}
                                   description={t("activities.grade6.greetingActivity.description")}/>
      <ScoreCounter currentIndex={currentIndex} score={score} total={totalQuestions} />
       <QuestionText show={feedback !== null}>
    {currentQuestion.question}
    </QuestionText>
   

      <ReactAudioPlayer
        key={currentIndex}
        src={currentQuestion.audio}
        controls
        autoPlay
        style={{
          width: "100%",
          marginTop: "16px",
          borderRadius: "12px",
          backgroundColor: "#f5f5f5",
        }}
      />

      <OptionsContainer>
       
        {options.map((option, idx) => (
          <OptionBox key={idx} onClick={() => handleOptionClick(option)}>
            {option}
          </OptionBox>
        ))}
      </OptionsContainer>

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
