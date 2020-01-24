import React, { memo } from "react";
import Card from "./Card";
import { useDrop } from "react-dnd";
import { PlayingCard, CardState, DraggedItem, Pile } from "models/game";
import { getOffSet } from "utils";

const getDroppable = (item: DraggedItem, cards: PlayingCard[]): boolean => {
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
  ({ cards, index }: Pile): JSX.Element => {
    const nextState = CardState.TableuPile;
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
      <div ref={drop} className="drop-target">
        <div className="card-border">
          {cards.map((card: PlayingCard, i: number) => (
            <Card offset={getOffSet(i)} key={card.id} card={card} isLastCard={i === cards.length - 1 ? true : false} />
          ))}
        </div>
      </div>
    );
  }
);
