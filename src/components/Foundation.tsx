import React, { memo } from "react";
import { useDrop } from "react-dnd";
import { Card } from "./Card";
import { PlayingCard, CardState } from "interfaces/game";
import { useSelector } from "react-redux";
import { selectTableuPiles } from "reducers/gameReducer";
import { RootState } from "store";
import { typeOfCard } from "dragTypes";

interface DraggedItem {
  type: string;
  card: PlayingCard;
}

interface FoundationProps {
  cards: PlayingCard[];
  index: number;
  foundationSuit: string;
  nextCard: number;
}

const getDroppable = (
  item: DraggedItem,
  nextCard: number,
  foundationSuit: string,
  tableuPile: PlayingCard[]
): boolean => {
  const id = item.card?.id;
  if (item && item.card && item.card.state === CardState.TableuPile) {
    if (item.card.id !== tableuPile[tableuPile.length - 1].id) {
      return false;
    }
  }
  if (id === `${nextCard}${foundationSuit}`) {
    return true;
  }
  return false;
};

export const Foundation = ({ cards, index, foundationSuit, nextCard }: FoundationProps): JSX.Element => {
  const nextState = CardState.Foundation;
  const tableuPiles = useSelector<RootState, PlayingCard[][]>(selectTableuPiles);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: typeOfCard,
    canDrop: (item: DraggedItem) => getDroppable(item, nextCard, foundationSuit, tableuPiles[item.card.index]),
    drop: () => ({ index, nextState }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <div ref={drop} className="drop-target unselectable talon-foundation">
      <div className="card-border">
        <img
          alt="foundation"
          src={require(`../assets/${foundationSuit}.svg`)}
          className="foundation-suit unselectable"
          onDragStart={(e): void => {
            e.preventDefault();
            e.stopPropagation();
          }}
          width="30px"
        />
        {cards.map((card: PlayingCard, i: number) => (
          <Card offset={0} key={card.id} card={card} isLastCard={i === cards.length - 1 ? true : false} />
        ))}
      </div>
    </div>
  );
};
