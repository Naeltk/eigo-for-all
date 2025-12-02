import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DndContext, useDroppable, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { futureSentences } from "../data/futureSentences";
import { orderedBlanks } from "../funcs/createOrderdBlanks";
import ScoreCounter from "../components/ScoreCounter";
import FeedbackOverlay from "../components/FeedbackOverlay";
import ResultModal from "../components/ResultModal";
import DraggableOption from "../components/DragOption";
import DroppableBlank from "../components/DroppableBlank";
import styled, { keyframes, css } from "styled-components";
import { useTranslation } from "react-i18next";
import ActivityHeader from "../components/ActivityHeader";



const ActivityContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 24px;
  position: relative;
`;

const Sentence = styled.div`
 display: flex;
  justify-content: center;
  margin-top: 24px;
  font-size: 20px;
  line-height: 1.8;
  white-space: pre-wrap;
  user-select: none;
font-family:'Comic Neue',cursive;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
font-family:'Comic Neue',cursive;
  touch-action: none;

`;

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

function OptionsDropTarget({ children }) {
  const { setNodeRef } = useDroppable({
    id: 'options-pool',
  });
  return <OptionsContainer ref={setNodeRef}>{children}</OptionsContainer>;
}

export default function Grade8FutureTenseActivity() {
    const { t } = useTranslation();


  const totalQuestions = 5;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [processedQuestion, setProcessedQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [filledBlanks, setFilledBlanks] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [questionOrder, setQuestionOrder] = useState([]);

    const pointerSensor = useSensor(PointerSensor, {
  activationConstraint: {
    distance: 5,
  },
});

const sensors = useSensors(pointerSensor);


  const navigate = useNavigate();

  useEffect(() => {
  const allIndexes = Array.from(futureSentences.keys());
  const shuffled = allIndexes.sort(() => Math.random() - 0.5);
  setQuestionOrder(shuffled.slice(0, totalQuestions));
}, []);

  useEffect(() => {
      if (questionOrder.length === 0) return;

    const rawQuestion = futureSentences[questionOrder[currentIndex]];
    const newProcessedData = orderedBlanks(rawQuestion);

    setProcessedQuestion(newProcessedData);
    setFilledBlanks(Array(newProcessedData.answers.length).fill(null));
    setIsSubmitted(false);
    setFeedback(null);
  }, [currentIndex, questionOrder]);





  const handleSubmit = useCallback(() => {
    if (!processedQuestion || !filledBlanks.every(val => val !== null) || isSubmitted) return;

    setIsSubmitted(true);
    let correctCount = 0;
    const { answers } = processedQuestion;

    const isQuestionCorrect = answers.every(
      (answer, i) => filledBlanks[i] === answer
    );

    if (isQuestionCorrect) correctCount++;

    setScore((s) => s + correctCount);
    setFeedback(isQuestionCorrect);

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < totalQuestions) {
        setCurrentIndex((i) => i + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  }, [processedQuestion, filledBlanks, isSubmitted, currentIndex, totalQuestions]);




const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (!over) return;

    const droppedWord = active.data.current?.word;
    const sourceIndex = active.data.current?.sourceIndex;
    const targetIndex = over.data.current?.blankIndex;
    const isDroppedOnPool = over?.id === 'options-pool';

    if (!droppedWord) return;

    setFilledBlanks((prev) => {
        const updated = [...prev];

        if (typeof targetIndex === 'number') {
            const targetWord = updated[targetIndex];

            if (sourceIndex === targetIndex) return prev;

            if (targetWord && typeof sourceIndex === 'number') {
                updated[targetIndex] = droppedWord;
                updated[sourceIndex] = targetWord;
            } 
            else if (targetWord && typeof sourceIndex !== 'number') {
                updated[targetIndex] = droppedWord;
            } 
            else {
                updated[targetIndex] = droppedWord;
                if (typeof sourceIndex === 'number') updated[sourceIndex] = null; // clear old
            }
        }

        else if (isDroppedOnPool && typeof sourceIndex === 'number') {
            updated[sourceIndex] = null;
        }

        return updated;
    });
}, []);



  const handleRetry = () => {
    setScore(0);
    setCurrentIndex(0);
    setShowResult(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };


  if (!processedQuestion) {
      return <ActivityContainer>Loading...</ActivityContainer>;
  }

  const { blankedText, answers, options } = processedQuestion;
  const allBlanksFilled = filledBlanks.every(val => val !== null);
  const availableOptions = options.filter((option) => !filledBlanks.includes(option));
  const totalPossiblePoints = totalQuestions;

  return (
    <DndContext
        //onDragStart={handleDragStart}
                sensors={sensors}
        onDragEnd={handleDragEnd}
    >
      <ActivityContainer>
        <ActivityHeader title={t("activities.grade8.futureTenseActivity.title")}
                                     description={t("activities.grade8.futureTenseActivity.description")}/>
        <ScoreCounter
          currentIndex={currentIndex}
          score={score}
          total={totalQuestions}
        />


        <Sentence>
          {blankedText.split("______").map((part, i) => (
            <span key={i}>
              {part}
              {i < answers.length && (
                <DroppableBlank
                  index={i}
                  filledWord={filledBlanks[i]}
                  isSubmitted={isSubmitted}
                  correctWord={answers[i]}
                />
              )}
            </span>
          ))}
        </Sentence>

          <OptionsDropTarget>
          {availableOptions.map((word) => (
            <DraggableOption
              key={word}
              word={word}
              isUsed={!availableOptions.includes(word)}
            />
          ))}
          </OptionsDropTarget>
        {!isSubmitted && (
          <SubmitButton
              onClick={handleSubmit}
              disabled={!allBlanksFilled}
              $readyToSubmit={allBlanksFilled}
          >
              Submit Answer
          </SubmitButton>
        )}

        {feedback !== null && <FeedbackOverlay correct={feedback} />}
        {showResult && (
          <ResultModal
            score={score}
            total={totalPossiblePoints}
            onRetry={handleRetry}
            onGoBack={handleGoBack}
          />
        )}
      </ActivityContainer>
    </DndContext>
  );
}