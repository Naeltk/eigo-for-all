import React from 'react';
import { useDroppable } from "@dnd-kit/core";
import styled, { css } from "styled-components";
import FilledDraggable from "./FilledDraggable";

const Blank = styled.span`
  display: inline-block;
  line-height: 1.8;
  min-width: 100px;
  white-space: pre-wrap;
  border: 2px dashed ${({ $isOver }) => ($isOver ? '#28a745' : '#ccc')}; 
  background-color: ${({ $isOver }) => ($isOver ? '#e6f0ff' : 'transparent')};
  height: 40px;
  text-align: center;
  margin: 0 4px;
  padding: 2px 8px;
  vertical-align: middle;
  transition: all 0.2s ease-in-out;



  /* Styling when filled */
  ${({ $isFilled }) =>
    $isFilled &&
    css`
      border-color: #007bff;
      background-color: #e6f0ff;
      font-weight: bold;
    `}
  ${({ $isOver, $isFilled }) =>
    $isOver && $isFilled &&
    css`
      border-color: #ffc107;       /* amber for "swap" */
      background-color: #fff8e1;
      transform: scale(1.02);
    `}

  /* Styling for incorrect answer after submission */
  ${({ $isIncorrect }) =>
    $isIncorrect &&
    css`
      border-color: #dc3545;
      background-color: #f8d7da;
    `}
`;

export default function DroppableBlank({ index, filledWord, isSubmitted, correctWord}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `blank-${index}`,
    data: { blankIndex: index },
    disabled: isSubmitted ,
  });

  const isFilled = filledWord !== null;
  const isIncorrect = isSubmitted && filledWord !== correctWord;
  const displayWord = isSubmitted && isIncorrect ? correctWord : filledWord || "";

  return (
    <Blank
      ref={setNodeRef}
      $isOver={isOver}
      $isFilled={isFilled}
      $isSubmitted={isSubmitted}
      $isIncorrect={isIncorrect}
    >
          {isFilled && !isSubmitted ? (
        <FilledDraggable word={filledWord} index={index} />
      ) : (displayWord)
      }
    </Blank>
  );
}