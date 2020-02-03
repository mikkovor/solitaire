import React from "react";
import { Talon } from "./Talon";
import { useDispatch, useSelector } from "react-redux";
import { drawCard, DrawCard } from "actions/gameActions";
import { selectDeck } from "reducers/gameReducer";

export const Stock = (): JSX.Element => {
  const deck = useSelector(selectDeck);
  const dispatch = useDispatch();
  return (
    <div style={{ display: "flex" }}>
      {deck.length > 0 ? (
        <picture>
          <img
            alt="deck"
            src={deck.length > 1 ? require(`../assets/deck.svg`) : require(`../assets/md/1B.svg`)}
            onClick={(): DrawCard => dispatch(drawCard())}
            className="drop-target"
            onDragStart={(e): void => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        </picture>
      ) : (
        <div className="drop-target" onClick={(): DrawCard => dispatch(drawCard())}>
          <div className="card-border">
            <img
              alt="deck"
              src={require(`../assets/reload.svg`)}
              style={{ alignSelf: "center" }}
              width="60px"
              height="60px"
              onDragStart={(e): void => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
          </div>
        </div>
      )}
      <Talon />
    </div>
  );
};
