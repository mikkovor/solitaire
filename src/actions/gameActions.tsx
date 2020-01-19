import { PlayingCard, CardState } from "models/game";

export enum GameActionTypes {
  FoundationAddCards = "foundation/AddCards",
  TableuPileAddCards = "tableuPile/AddCards",
  TurnCard = "tableuPile/TurnCard",
  DrawCard = "deck/DrawCard",
  NewGame = "game/NewGame",
  CardIsDragged = "cards/CardIsDragged"
}

type CardsPayload = {
  movedCard: PlayingCard;
  index: number;
  nextState: CardState;
};

type CardDragPayload = {
  movedCard: PlayingCard;
  isDragging: boolean;
};

type TurnCardPayload = {
  index: number;
  id: string;
};

export type NewGamePayload = {
  tableuPiles: PlayingCard[][];
  deck: PlayingCard[];
};

type AddCardsToFoundation = {
  readonly type: GameActionTypes.FoundationAddCards;
  readonly payload: CardsPayload;
};

type AddCardsToTableuPile = {
  readonly type: GameActionTypes.TableuPileAddCards;
  readonly payload: CardsPayload;
};

export type TurnCard = {
  readonly type: GameActionTypes.TurnCard;
  readonly payload: TurnCardPayload;
};

export type DrawCard = {
  readonly type: GameActionTypes.DrawCard;
};

type StartNewGame = {
  readonly type: GameActionTypes.NewGame;
  readonly payload: NewGamePayload;
};

type CardIsDragged = {
  readonly type: GameActionTypes.CardIsDragged;
  readonly payload: CardDragPayload;
};

export const addCardsToFoundation = (payload: CardsPayload): AddCardsToFoundation => ({
  type: GameActionTypes.FoundationAddCards,
  payload
});

export const addCardsToTableuPile = (payload: CardsPayload): AddCardsToTableuPile => ({
  type: GameActionTypes.TableuPileAddCards,
  payload
});

export const turnCard = (payload: TurnCardPayload): TurnCard => ({
  type: GameActionTypes.TurnCard,
  payload
});

export const drawCard = (): DrawCard => ({ type: GameActionTypes.DrawCard });

export const startNewGame = (payload: NewGamePayload): StartNewGame => ({
  type: GameActionTypes.NewGame,
  payload
});

export const cardIsDragged = (payload: CardDragPayload): CardIsDragged => ({
  type: GameActionTypes.CardIsDragged,
  payload
});

export type GameActions =
  | AddCardsToFoundation
  | AddCardsToTableuPile
  | TurnCard
  | DrawCard
  | StartNewGame
  | CardIsDragged;
