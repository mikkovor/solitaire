import React from "react";
import { Card } from "./Card";
import { useSelector } from "react-redux";
import { selectWaste } from "reducers/gameReducer";
import { RootState } from "store";
import { PlayingCard } from "models/game";

export const Talon = (): JSX.Element => {
  const waste = useSelector<RootState, PlayingCard[]>(selectWaste);
  return <div className="talon">{waste.length > 0 && <Card card={waste[0]} offset={25} />}</div>;
};
