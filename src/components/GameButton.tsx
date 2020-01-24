import React from "react";
import { useDispatch } from "react-redux";
import { createNewGame } from "utils";

interface GameButtonProps {
  handleClick: Function;
  icon: string;
  text: string;
}

export const GameButton = ({ icon, handleClick, text }: GameButtonProps): JSX.Element => {
  const dispatch = useDispatch();
  const { tableuPiles, deck } = createNewGame();
  return (
    <button className="game-button" onClick={(): unknown => dispatch(handleClick({ tableuPiles, deck }))}>
      <div className="button-wrapper">
        <img className="svg-icon" src={require(`../assets/${icon}.svg`)} />
        <span>{text}</span>
      </div>
    </button>
  );
};
