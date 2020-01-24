import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectStartTime } from "reducers/gameReducer";

const createTimerString = (gameTime: number): string => {
  const seconds = ("0" + (Math.floor(gameTime / 1000) % 60)).slice(-2);
  const minutes = ("0" + (Math.floor(gameTime / 60000) % 60)).slice(-2);
  const hours = Math.floor(gameTime / 3600000)
    .toString()
    .slice(-2);
  return `${hours}:${minutes}:${seconds}`;
};

export const Timer = (): JSX.Element => {
  const startTime = useSelector(selectStartTime);
  const [gameTime, setGameTime] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => setGameTime(Date.now() - startTime), 1000);
    return (): void => {
      clearInterval(interval);
    };
  }, [startTime]);

  return (
    <div className="timer-container">
      <p className="timer">{createTimerString(gameTime)}</p>
    </div>
  );
};
