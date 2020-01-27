import React from "react";
import { Talon } from "./Talon";
import { useDispatch } from "react-redux";
import { drawCard, DrawCard } from "actions/gameActions";

export const Stock = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <div style={{ display: "flex" }}>
      <picture>
        <img
          src={require(`../assets/md/1B.svg`)}
          onClick={(): DrawCard => dispatch(drawCard())}
          className="drop-target"
        />
      </picture>
      <Talon />
    </div>
  );
};
