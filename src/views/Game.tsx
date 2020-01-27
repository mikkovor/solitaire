import React, { useEffect } from "react";
import { TableuPile } from "components/TableuPile";
import { Stock } from "components/Stock";
import { Foundation } from "components/Foundation";
import { selectTableuPiles, selectFoundations } from "reducers/gameReducer";
import { useDispatch, useSelector } from "react-redux";
import { startNewGame, GameActions, undoMove } from "actions/gameActions";
import { PlayingCard } from "models/game";
import { suits, createNewGame } from "utils";
import { RootState } from "store";
import { CardDragPreview } from "components/CardDragPreview";
import { Dispatch } from "redux";
import { Timer } from "components/Timer";
import { GameButton } from "components/GameButton";

const Game: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<Dispatch<GameActions>>();
  const tableuPiles = useSelector<RootState, PlayingCard[][]>(selectTableuPiles);
  const foundations = useSelector<RootState, PlayingCard[][]>(selectFoundations);

  useEffect(() => {
    const { tableuPiles, deck } = createNewGame();
    dispatch(startNewGame({ tableuPiles, deck }));
  }, [dispatch]);

  return (
    <>
      <CardDragPreview tableuPiles={tableuPiles} />
      <div className="container">
        <div className="top-wrapper">
          <div className="widgets">
            <Timer />
            <GameButton icon="undo" handleClick={undoMove} text="UNDO" />
            <GameButton icon="star" handleClick={startNewGame} text="NEW" />
          </div>
          <div className="top-right-wrapper">
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
        </div>
        <div className="tableu-piles">
          {tableuPiles.map((pile, i) => (
            <TableuPile cards={pile} key={i.toString()} index={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Game;
