import React, { useMemo, useState, memo, useCallback } from "react";
import Preview from "react-dnd-preview";
import { PreviewObject, CardState, PlayingCard } from "interfaces/game";
import { getOffSet, useMedia } from "utils";

const createPreviewCards = (draggedCard: PlayingCard | null, tableuPiles: PlayingCard[][]): PlayingCard[] => {
  if (draggedCard) {
    const indexOfCard = tableuPiles[draggedCard.index].findIndex(card => card.id === draggedCard.id);
    return tableuPiles[draggedCard.index].filter((card, index) => index >= indexOfCard);
  }
  return [];
};

interface CardDragPreviewProps {
  tableuPiles: PlayingCard[][];
}

// eslint-disable-next-line react/display-name
export const CardDragPreview = memo(
  ({ tableuPiles }: CardDragPreviewProps): JSX.Element => {
    const [draggedCard, setDraggedCard] = useState<PlayingCard | null>(null);
    const memoizedPreview = useMemo(() => createPreviewCards(draggedCard, tableuPiles), [draggedCard, tableuPiles]);

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

    const generatePreview = ({ itemType, item, style }: PreviewObject): JSX.Element => {
      if (item && item.card) {
        setDraggedCard(item.card);
      }
      if (item && item.card.state === CardState.TableuPile) {
        return (
          <div style={{ ...style, zIndex: 50 }}>
            {memoizedPreview.map((card, i) => (
              <img
                alt={item.card.id}
                key={card.id}
                className="card"
                src={require(`../assets/md/${card.id}.svg`)}
                style={{ top: getOffSet(i, getOffsetByMedia()) }}
              />
            ))}
          </div>
        );
      }
      return (
        <img
          alt={item.card.id}
          className="card"
          src={require(`../assets/md/${item.card.id}.svg`)}
          style={{ ...style, top: getOffSet(0, getOffsetByMedia()), zIndex: 50 }}
        />
      );
    };

    return <Preview generator={generatePreview} />;
  }
);
