import React from "react";

interface GameButtonProps {
  handleClick: Function;
  icon: string;
  text: string;
}

export const GameButton = ({ icon, handleClick, text }: GameButtonProps): JSX.Element => {
  return (
    <button className="game-button" onClick={(): void => handleClick()}>
      <div className="button-wrapper">
        <img className="svg-icon" src={require(`../assets/${icon}.svg`)} alt={icon} />
        <span className="button-text">{text}</span>
      </div>
    </button>
  );
};
