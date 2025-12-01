import React from 'react';
import { useDraggable } from "@dnd-kit/core";
import styled, { css } from "styled-components";

const FilledItem = styled.div`
    padding: 2px 0;
    cursor: grab;
    font-weight: bold;
    color: #007bff;


    ${({ $isDragging }) =>
        $isDragging &&
        css`
            z-index: 10;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        `}
`;

export default function FilledDraggable({ word, index}) {
  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id: `filled-item-${index}`,
    data: {
        word: word,
        sourceIndex: index
    },

  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

 

  return (
    <FilledItem
      ref={setNodeRef}
      $isDragging={isDragging}
      style={style}
      {...listeners} 
      {...attributes}
    >
      {word}
    </FilledItem>
  );
}