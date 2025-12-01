import React from 'react';
import { useDraggable } from "@dnd-kit/core";
import styled, { css } from "styled-components";

const OptionBox = styled.div`
  background-color: #fff8dc;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 18px;
  cursor: grab;
  user-select: none;
  transition: opacity 0.3s;
 
  opacity: ${({ $isUsed }) => ($isUsed ? 0.4 : 1)};
  pointer-events: ${({ $isUsed }) => ($isUsed ? 'none' : 'auto')};


 ${({ $isDragging }) =>
    $isDragging &&
    css`
      z-index: 10;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      cursor: grabbing;
    `}
`;

export default function DraggableOption({ word, isUsed }) {
  const { attributes, listeners, setNodeRef, isDragging, transform} = useDraggable({
    id: word,
    data: { word: word },
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  return (
    <OptionBox
      ref={setNodeRef}
      $isUsed={isUsed}
      $isDragging={isDragging}
      style={style}
      {...listeners}
      {...attributes}
    >
      {word}
    </OptionBox>
  );
}