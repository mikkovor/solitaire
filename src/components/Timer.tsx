import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectNextFoundationCards } from "reducers/gameReducer";
import { suits, createTimeString } from "utils";
import { selectStartTime, selectIsGameOver } from "reducers/scoreReducer";
import { gameIsOver } from "actions/scoreActions";

export const Timer = (): JSX.Element => {
  const dispatch = useDispatch();
  const startTime = useSelector(selectStartTime);
  const isGameOver = useSelector(selectIsGameOver);
  const [gameTime, setGameTime] = useState<number>(0);
  const nextFoundationCards = useSelector(selectNextFoundationCards);

  useEffect(() => {
    if (!isGameOver) {
      setGameTime(0);
      const interval = setInterval(() => setGameTime(Date.now() - startTime), 1000);
      return (): void => {
        clearInterval(interval);
      };
    }
  }, [startTime, isGameOver]);

  useEffect(() => {
    if (!isGameOver && nextFoundationCards.every((nextCard, i) => nextCard === `14${suits[i]}`)) {
      const scores = JSON.parse(localStorage.getItem("scores") || "{}") as number[];
      if (scores && scores.length > 0) {
        scores.push(gameTime);
        localStorage.setItem("scores", JSON.stringify(scores));
      } else {
        const scores: number[] = [gameTime];
        localStorage.setItem("scores", JSON.stringify(scores));
      }
      dispatch(gameIsOver(gameTime));
    }
  }, [nextFoundationCards, dispatch, gameTime, isGameOver]);

  return (
    <div className="timer-container">
      <p className="timer">{createTimeString(gameTime)}</p>
    </div>
  );
};
