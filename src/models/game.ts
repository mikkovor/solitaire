import CSS from "csstype";

export enum CardColor {
  Red,
  Black
}

export interface PlayingCard {
  id: string;
  rank: number;
  suit: string;
  color: CardColor;
  hidden: boolean;
  index: number;
  type: string;
  state: CardState;
  isDragging: boolean;
}

export enum CardState {
  TableuPile,
  Deck,
  Foundation
}

export interface PreviewObject {
  itemType: string;
  item: {
    type: string;
    card: PlayingCard;
  };
  style: CSS.Properties;
}

export interface Pile {
  cards: PlayingCard[];
  index: number;
}

export interface DraggedItem {
  type?: string;
  card?: PlayingCard;
}
