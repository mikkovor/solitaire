import React from "react";
import { CardEntity } from "App";
import { Card } from "./Card";
import { useSelector } from "react-redux";
import { selectWaste } from "reducers/gameReducer";

interface TalonProps {
  waste: CardEntity[];
  setWaste: React.Dispatch<React.SetStateAction<CardEntity[]>>;
}

export const Talon = (): JSX.Element | null => {
  const waste = useSelector(selectWaste);
  return <div className="talon">{waste.length > 0 && <Card card={waste[0]} offset={25} />}</div>;
};
