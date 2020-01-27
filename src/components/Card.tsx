import React, { memo, useEffect, useCallback } from "react";
import { useDrag, DragSourceMonitor, DragPreviewImage } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  addCardsToTableuPile,
  addCardsToFoundation,
  turnCard,
  TurnCard,
  cardIsDragged,
  handleDoubleClick,
  CardDoubleClicked
} from "actions/gameActions";
import { PlayingCard, CardState } from "models/game";
import CardSound from "../assets/cardSlide5.wav";
import { selectNextFoundationCards } from "reducers/gameReducer";

interface CardProps {
  offset?: number;
  card: PlayingCard;
  isLastCard: boolean;
}

const cardSound = new Audio(CardSound);

export const Card = memo(
  ({ card, offset, isLastCard }: CardProps): JSX.Element => {
    const { hidden, id, index, type } = card;
    const dispatch = useDispatch();
    const nextFoundationCards = useSelector(selectNextFoundationCards);
    const [{ isDragging, item }, drag, preview] = useDrag({
      item: { type, card },
      end: (item: { type: string; card: PlayingCard } | undefined, monitor: DragSourceMonitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          cardSound.play();
          const nextState = dropResult.nextState;
          if (nextState === CardState.TableuPile) {
            dispatch(addCardsToTableuPile({ movedCard: item.card, index: dropResult.index, nextState }));
          } else if (nextState === CardState.Foundation) {
            dispatch(addCardsToFoundation({ movedCard: item.card, index: dropResult.index, nextState }));
          }
        }
        if (item && !dropResult) {
          dispatch(cardIsDragged({ movedCard: item.card, isDragging: false }));
        }
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        item: monitor.getItem()
      }),
      canDrag: () => (card.hidden ? false : true)
    });

    useEffect(() => {
      if (item && item.card && isDragging) {
        dispatch(cardIsDragged({ movedCard: item.card, isDragging }));
      }
    }, [isDragging, item, dispatch]);

    const checkDoubleClick = useCallback(
      (card: PlayingCard) => {
        if (nextFoundationCards.find(nextCard => nextCard == card.id)) {
          dispatch(handleDoubleClick({ doubleClickedCard: card }));
          cardSound.play();
        }
      },
      [nextFoundationCards]
    );

    return (
      <>
        <DragPreviewImage src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" connect={preview} />
        <img
          ref={card.hidden ? null : drag}
          className="card"
          src={hidden ? require(`../assets/md/1B.svg`) : require(`../assets/md/${id}.svg`)}
          style={{ top: offset, display: card.isDragging ? "none" : undefined }}
          onClick={hidden ? (): TurnCard => dispatch(turnCard({ index, id })) : undefined}
          onDoubleClick={isLastCard ? (): void => checkDoubleClick(card) : undefined}
          onDragStart={(e): void => {
            if (card.hidden) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        />
      </>
    );
  }
);

export default Card;
