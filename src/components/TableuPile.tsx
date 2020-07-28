import React, { memo, useCallback } from "react";
import Card from "./Card";
import { useDrop } from "react-dnd";
import { PlayingCard, CardState, DraggedItem, Pile } from "interfaces/game";
import { getOffSet, useMedia } from "utils";
import { typeOfCard } from "dragTypes";

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

export const TableuPile = ({ cards, index }: Pile): JSX.Element => {
  const nextState = CardState.TableuPile;
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: typeOfCard,
    canDrop: (item: any) => getDroppable(item, cards),
    drop: () => ({ index, nextState }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const xs = useMedia("(max-width: 525px)");
  const sm = useMedia("(max-width: 710px)");
  const md = useMedia("(max-width: 940px)");

  const getOffsetByMedia = useCallback((): number => {
    if (xs) {
      return 15;
    } else if (sm) {
      return 21;
    } else if (md) {
      return 27;
    } else return 33;
  }, [xs, sm, md]);

  return (
    <div ref={drop} className="drop-target">
      <div className="card-border">
        {cards.map((card: PlayingCard, i: number) => (
          <Card
            offset={getOffSet(i, getOffsetByMedia())}
            key={card.id}
            card={card}
            isLastCard={i === cards.length - 1 ? true : false}
          />
        ))}
      </div>
    </div>
  );
};
