import React from "react";
import { Talon } from "./Talon";
import { useDispatch } from "react-redux";
import { drawCard, DrawCard } from "actions/gameActions";
import { Dispatch } from "redux";

export const Stock = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <div style={{ display: "flex" }}>
      <picture>
        <source srcSet={require(`../assets/sm/1B.svg`)} media="(max-width: 500px)" />
        <img src={require(`../assets/md/1B.svg`)} onClick={(): any => dispatch(drawCard())} />
      </picture>
      <Talon />
    </div>
  );
};
