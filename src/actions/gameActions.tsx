import { CardEntity } from "App";
import { State } from "reducers/gameReducer";

export enum GameActionTypes {
  FoundationAddCards = "foundation/AddCards",
  TableuPileAddCards = "tableuPile/AddCards",
  TurnCard = "tableuPile/TurnCard",
  DrawCard = "deck/DrawCard",
  NewGame = "game/NewGame"
}

export type GameActions = AddCardsToFoundation | AddCardsToTableuPile | TurnCard | DrawCard | StartNewGame;

type CardsPayload = {
  movedCard: CardEntity;
  index: number;
  nextState: State;
};

type TurnCardPayload = {
  index: number;
  id: string;
};

type NewGamePayload = {
  tableuPiles: CardEntity[][];
  deck: CardEntity[];
};

type AddCardsToFoundation = {
  readonly type: GameActionTypes.FoundationAddCards;
  readonly payload: CardsPayload;
};

type AddCardsToTableuPile = {
  readonly type: GameActionTypes.TableuPileAddCards;
  readonly payload: CardsPayload;
};

type TurnCard = {
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
