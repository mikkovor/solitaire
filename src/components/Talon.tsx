import React from "react";
import { Card } from "./Card";
import { useSelector } from "react-redux";
import { selectWaste } from "reducers/gameReducer";
import { RootState } from "store";
import { PlayingCard } from "interfaces/game";

export const Talon = (): JSX.Element => {
  const waste = useSelector<RootState, PlayingCard[]>(selectWaste);
  return (
    <div className="talon-foundation drop-target talon">
      {waste.length > 0 &&
        waste.map((card, i) => <Card key={card.id} card={card} isLastCard={i === waste.length - 1} />)}
    </div>
  );
};
