import React, { memo } from "react";
import { useDrag, DragSourceMonitor, DragPreviewImage } from "react-dnd";
import { CardEntity } from "App";
import { useDispatch } from "react-redux";
import { addCardsToTableuPile, addCardsToFoundation, turnCard } from "actions/gameActions";
import { State } from "reducers/gameReducer";

interface CardProps {
  offset?: number;
  card: CardEntity;
  turnCard?(index: number, id: string): void;
  setWaste?: React.Dispatch<React.SetStateAction<CardEntity[]>>;
}

export const Card = memo(
  ({ card, offset }: CardProps): JSX.Element => {
    const { hidden, id, index, type } = card;
    const dispatch = useDispatch();
    const [{ isDragging, item }, drag, preview] = useDrag({
      item: { type, card },
      end: (item: { type: string; card: CardEntity } | undefined, monitor: DragSourceMonitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          const nextState = dropResult.nextState;
          if (nextState === State.TableuPile) {
            dispatch(addCardsToTableuPile({ movedCard: item.card, index: dropResult.index, nextState }));
          } else if (nextState === State.Foundation) {
            dispatch(addCardsToFoundation({ movedCard: item.card, index: dropResult.index, nextState }));
          }
        }
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        item: monitor.getItem()
      }),
      canDrag: () => (card.hidden ? false : true)
    });

    return (
      <div style={{ height: "240px", position: "absolute" }}>
        <DragPreviewImage src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" connect={preview} />
        <img
          ref={drag}
          className="card"
          src={hidden ? require(`../assets/md/1B.svg`) : require(`../assets/md/${id}.svg`)}
          style={{ top: offset, height: "100%" }}
          onClick={hidden ? (): any => dispatch(turnCard({ index, id })) : undefined}
        />
      </div>
    );
  }
);

export default Card;
