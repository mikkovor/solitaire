import React, { useEffect, useState } from "react";
import { TableuPile } from "components/TableuPile";
import { Stock } from "components/Stock";
import { Foundation } from "components/Foundation";
import { selectTableuPiles, selectFoundations } from "reducers/gameReducer";
import { useDispatch, useSelector } from "react-redux";
import { startNewGame, GameActions, undoMove } from "actions/gameActions";
import { PlayingCard } from "interfaces/game";
import { suits, createNewGame } from "utils";
import { RootState } from "store";
import { CardDragPreview } from "components/CardDragPreview";
import { Dispatch } from "redux";
import { Timer } from "components/Timer";
import { GameButton } from "components/GameButton";
import { getScores, ScoreActions } from "actions/scoreActions";
import { Modal } from "components/Modal";
import { selectScores, selectIsGameOver, selectGameWonTime } from "reducers/scoreReducer";
import { clearHistory, HistoryActions } from "actions/historyActions";

const Game = (): JSX.Element => {
  const [showScores, setShowScores] = useState(false);
  const dispatch = useDispatch<Dispatch<GameActions | ScoreActions | HistoryActions>>();
  const tableuPiles = useSelector<RootState, PlayingCard[][]>(selectTableuPiles);
  const foundations = useSelector<RootState, PlayingCard[][]>(selectFoundations);
  const gameWonTime = useSelector<RootState, string | undefined>(selectGameWonTime);
  const isGameOver = useSelector<RootState, boolean>(selectIsGameOver);
  const scores = useSelector<RootState, string[] | null | undefined>(selectScores);

  useEffect(() => {
    const { tableuPiles, deck } = createNewGame();
    dispatch(startNewGame({ tableuPiles, deck }));
  }, [dispatch]);

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("scores") || "{}") as number[];
    if (scores && scores.length > 0) {
      dispatch(getScores(scores));
    }
  }, [dispatch]);

  const handleUndoMove = (): void => {
    dispatch(undoMove());
  };

  const handleStartNewGame = (): void => {
    const { tableuPiles, deck } = createNewGame();
    dispatch(clearHistory());
    dispatch(startNewGame({ tableuPiles, deck }));
  };

  const handleScores = (): void => {
    setShowScores(showScores => !showScores);
  };

  return (
    <>
      <Modal showModal={isGameOver} onClose={handleStartNewGame} header="Game Won!">
        <p>Yay you won!</p>
        <h4>Your time: {gameWonTime}</h4>
      </Modal>
      <Modal showModal={showScores} onClose={handleScores} header="High Scores">
        {scores && scores.length > 0
          ? scores.map((score, i) => (
              <p key={score} className="score">
                {i + 1}. {score}
              </p>
            ))
          : "Try to finish a game first!"}
      </Modal>
      <CardDragPreview tableuPiles={tableuPiles} />
      <div className="container">
        <div className="top-wrapper">
          <div className="widgets">
            <Timer />
            <div className="button-container">
              <GameButton icon="undo" handleClick={handleUndoMove} text="UNDO" />
              <GameButton icon="star" handleClick={handleStartNewGame} text="NEW" />
              <GameButton icon="trophy" handleClick={handleScores} text="SCORES" />
            </div>
          </div>
          <div className="top-right-wrapper">
            <Stock />
            <div className="foundations">
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
