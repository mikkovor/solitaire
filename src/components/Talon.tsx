import React, { memo } from "react";
import { Card } from "./Card";
import { useSelector } from "react-redux";
import { selectWaste } from "reducers/gameReducer";
import { RootState } from "store";
import { PlayingCard } from "models/game";

// eslint-disable-next-line react/display-name
export const Talon = memo(
  (): JSX.Element => {
    const waste = useSelector<RootState, PlayingCard[]>(selectWaste);
    return <div className="talon">{waste.length > 0 && <Card card={waste[0]} offset={25} isLastCard={true} />}</div>;
  }
);
