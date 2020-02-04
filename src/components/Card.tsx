import React, { memo, useEffect } from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  addCardsToTableuPile,
  addCardsToFoundation,
  turnCard,
  TurnCard,
  cardIsDragged,
  handleDoubleClick
} from "actions/gameActions";
import { PlayingCard, CardState } from "models/game";
import CardSound from "../assets/cardSlide5.wav";
import { selectNextFoundationCards } from "reducers/gameReducer";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Dispatch } from "redux";

interface CardProps {
  offset?: number;
  card: PlayingCard;
  isLastCard: boolean;
}

const cardSound = new Audio(CardSound);

const checkDoubleClick = (card: PlayingCard, nextFoundationCards: string[], dispatch: Dispatch): void => {
  if (nextFoundationCards.find(nextCard => nextCard === card.id)) {
    dispatch(handleDoubleClick({ doubleClickedCard: card }));
    cardSound.play();
  }
};

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

    useEffect(() => {
      preview(getEmptyImage(), { captureDraggingState: false });
    }, [preview]);

    return (
      <img
        alt={card.id}
        ref={card.hidden ? null : drag}
        className="card"
        src={hidden ? require(`../assets/md/1B.svg`) : require(`../assets/md/${id}.svg`)}
        style={{ top: offset, display: card.isDragging ? "none" : undefined }}
        onClick={hidden ? (): TurnCard => dispatch(turnCard({ index, id })) : undefined}
        onDoubleClick={isLastCard ? (): void => checkDoubleClick(card, nextFoundationCards, dispatch) : undefined}
        onDragStart={(e): void => {
          if (card.hidden) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      />
    );
  }
);

export default Card;
