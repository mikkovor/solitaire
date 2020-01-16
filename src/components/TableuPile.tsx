import React, { memo } from "react";
import { CardEntity } from "App";
import Card from "./Card";
import { useDrop } from "react-dnd";
import { State } from "reducers/gameReducer";

interface TableuPile {
  cards: CardEntity[];
  index: number;
}

export const getOffSet = (index: number): number => {
  return index > 0 ? index * 35 : 0;
};

interface DraggedItem {
  type?: string;
  card?: CardEntity;
}

const getDroppable = (item: DraggedItem, cards: CardEntity[]): boolean => {
  if (cards.length === 0 && item && item.card && item.card.rank === 13) {
    return true;
  } else if (cards.length === 0) {
    return false;
  } else if (
    item &&
    item.card &&
    item.card.rank === cards[cards.length - 1].rank - 1 &&
    item.card.color !== cards[cards.length - 1].color
  ) {
    return true;
  }
  return false;
};

export const TableuPile = memo(
  ({ cards, index }: TableuPile): JSX.Element => {
    const nextState = State.TableuPile;
    const [{ canDrop, isOver }, drop] = useDrop({
      accept: "CARD",
      canDrop: (item: any) => getDroppable(item, cards),
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
          marginRight: 10,
          position: "relative"
        }}
      >
        {cards.map((card: CardEntity, i: number) => (
          <Card offset={getOffSet(i)} key={card.id} card={card} />
        ))}
      </div>
    );
  }
);
