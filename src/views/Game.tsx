import React, { useEffect, useState, useMemo } from "react";
import { TableuPile } from "components/TableuPile";
import { Stock } from "components/Stock";
import { Foundation } from "components/Foundation";
import { selectTableuPiles, selectFoundations } from "reducers/gameReducer";
import { useDispatch, useSelector } from "react-redux";
import { startNewGame } from "actions/gameActions";
import { CardState, PlayingCard, PreviewObject } from "models/game";
import { getOffSet, suits, createNewGame } from "utils";
import Preview from "react-dnd-preview";

const createPreviewCards = (draggedCard: PlayingCard | null, tableuPiles: PlayingCard[][]): PlayingCard[] => {
  if (draggedCard) {
    const indexOfCard = tableuPiles[draggedCard.index].findIndex(card => card.id === draggedCard.id);
    return tableuPiles[draggedCard.index].filter((card, index) => index >= indexOfCard);
  }
  return [];
};

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const tableuPiles = useSelector(selectTableuPiles);
  const foundations = useSelector(selectFoundations);
  const [draggedCard, setDraggedCard] = useState<PlayingCard | null>(null);
  const memoizedPreview = useMemo(() => createPreviewCards(draggedCard, tableuPiles), [draggedCard, tableuPiles]);

  const generatePreview = ({ itemType, item, style }: PreviewObject): JSX.Element | undefined => {
    if (item) {
      setDraggedCard(item.card);
    }
    if (item && item.card.state === CardState.TableuPile) {
      return (
        <div style={{ ...style, zIndex: 50 }}>
          {memoizedPreview.map((card, i) => (
            <img
              key={card.id}
              className="card"
              src={require(`../assets/md/${card.id}.svg`)}
              style={{ top: getOffSet(i) }}
            />
          ))}
        </div>
      );
    } else {
      return (
        <img
          className="card"
          src={require(`../assets/md/${item.card.id}.svg`)}
          style={{ ...style, top: getOffSet(0), zIndex: 50 }}
        />
      );
    }
  };

  useEffect(() => {
    const { tableuPiles, deck } = createNewGame();
    dispatch(startNewGame({ tableuPiles, deck }));
  }, [dispatch]);

  return (
    <>
      <Preview generator={generatePreview} />
      <div className="container">
        <div className="top-wrapper">
          <Stock />
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
            {foundations.length &&
              foundations.map((foundation, i) => (
                <Foundation
                  key={i.toString()}
                  cards={foundation}
                  index={i}
                  foundationSuit={suits[i]}
                  nextCard={foundation.length + 1}
                />
              ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative", height: "100%" }}>
          {tableuPiles.map((pile, i) => (
            <TableuPile cards={pile} key={i.toString()} index={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Game;
