import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../data/colors";
import ScoreCounter from "../components/ScoreCounter";
import ActivityHeader from "../components/ActivityHeader";
import FeedbackOverlay from "../components/FeedbackOverlay";
import ResultModal from "../components/ResultModal";
import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";
import { useTranslation } from "react-i18next";




const ActivityContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 24px;
  position: relative;
`;


const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 50px;
`;

const OptionButton = styled.button`
  padding: 32px;
  border: 2px solid #000;
  border-radius: 12px;
  cursor: pointer;
  background-color: ${({ bg }) => bg || "#eee"};
    transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function Grade1ColorsActivity() {
    const { t } = useTranslation();

  const totalQuestions = 10;
 

  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);


  const navigate = useNavigate();

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const nextQuestion = () => {
    const remainingColors = shuffleArray(colors);
    const question = remainingColors[0];
    const otherOptions = remainingColors.slice(1, 4);
    setCurrentQuestion(question);
    setOptions(shuffleArray([question, ...otherOptions]));
  };

  useEffect(() => {
    nextQuestion();
  }, []);



  const handleOptionClick = (option) => {
    if (!currentQuestion || feedback !== null) return; // prevent multiple clicks

    const correct = option.name === currentQuestion.name;
    setFeedback(correct);

    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      setFeedback(null);
      setCurrentIndex((i) => {
        const nextIndex = i + 1;
        if (nextIndex < totalQuestions) {
          nextQuestion();
        } else {
          setShowResult(true);
        }
        return nextIndex < totalQuestions ? nextIndex : i;
      });
    }, 700);
  };



  const handleRetry = () => {
    setScore(0);
    setCurrentIndex(0);
    setShowResult(false);
    nextQuestion();
  };

  const handleGoBack = () => {
    navigate(-1);
  };



  return (
    <ActivityContainer>
      <ActivityHeader

        title=  {t("activities.grade1.colorActivity.title")}

         description= {t("activities.grade1.colorActivity.description")} />


      <ScoreCounter currentIndex={currentIndex} score={score} total={totalQuestions} />
         {currentQuestion && (
        <ReactAudioPlayer
          key={currentIndex}
          src={currentQuestion.audio}
          controls
          autoPlay={true}
          style={{
            width: "100%",
            marginTop: "24px",
            borderRadius: "12px",
            backgroundColor: "#f5f5f5",
          }}
        />
      )}
      <OptionsGrid>
        {options.map((o) => (
          <OptionButton
            key={o.name}
            bg={o.hex}
            onClick={() => handleOptionClick(o)}
            disabled={feedback !== null} // prevent clicking during feedback
          >
          </OptionButton>
        ))}
      </OptionsGrid>
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
