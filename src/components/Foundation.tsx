import React, { useState, memo } from "react";
import { useDrop } from "react-dnd";
import { CardEntity } from "App";
import { Card } from "./Card";
import { State } from "reducers/gameReducer";

interface DraggedItem {
  type?: string;
  card?: CardEntity;
}

interface FoundationProps {
  cards: CardEntity[];
  index: number;
  foundationSuit: string;
  nextCard: number;
}

const getDroppable = (item: DraggedItem, cards: CardEntity[], nextCard: number, foundationSuit: string): boolean => {
  const id = item.card?.id;
  if (id === `${nextCard}${foundationSuit}`) {
    return true;
  }
  return false;
};

export const Foundation = memo(
  ({ cards, index, foundationSuit, nextCard }: FoundationProps): JSX.Element => {
    const nextState = State.Foundation;
    const [{ canDrop, isOver }, drop] = useDrop({
      accept: "CARD",
      canDrop: (item: any) => getDroppable(item, cards, nextCard, foundationSuit),
      drop: () => ({ index, nextState }),
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    });

    return (
      <div
        ref={drop}
        style={{
          width: "150.65px",
          height: "238px",
          border: "1px solid black",
          borderRadius: 10,
          marginRight: 10
        }}
      >
        {cards.map((card: CardEntity) => (
          <Card offset={0} key={card.id} card={card} />
        ))}
      </div>
    );
  }
);
