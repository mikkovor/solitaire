import { CardEntity } from "App";
import produce from "immer";
import { GameActions, GameActionTypes } from "actions/gameActions";
import { RootState } from "store";

interface GameState {
  foundations: CardEntity[][];
  tableuPiles: CardEntity[][];
  deck: CardEntity[];
  waste: CardEntity[];
}

export enum State {
  TableuPile,
  Deck,
  Foundation
}

export const initialState: GameState = {
  foundations: [[], [], [], []],
  tableuPiles: [],
  deck: [],
  waste: []
};

export const gameReducer = (state = initialState, action: GameActions): GameState => {
  switch (action.type) {
    case GameActionTypes.FoundationAddCards:
      return produce(state, draft => {
        draft.foundations[action.payload.index].push({
          ...action.payload.movedCard,
          state: State.Foundation,
          index: action.payload.index
        });
        if (action.payload.movedCard.state === State.Deck) {
          draft.waste = draft.waste.filter(card => card.id !== action.payload.movedCard.id);
        } else {
          draft.tableuPiles[action.payload.movedCard.index] = draft.tableuPiles[action.payload.movedCard.index].filter(
            card => card.id !== action.payload.movedCard.id
          );
        }
      });
    case GameActionTypes.TableuPileAddCards:
      return produce(state, draft => {
        if (action.payload.movedCard.state === State.TableuPile) {
          const indexOfCard = draft.tableuPiles[action.payload.movedCard.index].findIndex(
            card => card.id === action.payload.movedCard.id
          );
          const cardsToAdd = draft.tableuPiles[action.payload.movedCard.index]
            .slice(indexOfCard)
            .map(card => ({ ...card, index: action.payload.index }));
          const cardsLeft = draft.tableuPiles[action.payload.movedCard.index].slice(0, indexOfCard);
          draft.tableuPiles[action.payload.index] = [...draft.tableuPiles[action.payload.index], ...cardsToAdd];
          draft.tableuPiles[action.payload.movedCard.index] = cardsLeft;
        } else {
          draft.tableuPiles[action.payload.index].push({
            ...action.payload.movedCard,
            state: State.TableuPile,
            index: action.payload.index
          });
          if (action.payload.movedCard.state === State.Deck) {
            draft.waste = draft.waste.filter(card => card.id !== action.payload.movedCard.id);
          } else {
            draft.foundations[action.payload.movedCard.index] = draft.foundations[
              action.payload.movedCard.index
            ].filter(card => card.id !== action.payload.movedCard.id);
          }
        }
      });
    case GameActionTypes.TurnCard:
      return produce(state, draft => {
        draft.tableuPiles[action.payload.index].map((card, i) => {
          if (card.id === action.payload.id && i === draft.tableuPiles[action.payload.index].length - 1) {
            card.hidden = false;
            return card;
          }
          return card;
        });
      });
    case GameActionTypes.DrawCard:
      return produce(state, draft => {
        if (draft.deck.length) {
          draft.waste = [{ ...draft.deck[0] }, ...draft.waste];
          draft.deck = draft.deck.filter((card, index) => index !== 0);
        } else {
          draft.deck = [...draft.waste.reverse()];
          draft.waste = [];
        }
      });
    case GameActionTypes.NewGame:
      return produce(state, draft => {
        draft.tableuPiles = action.payload.tableuPiles;
        draft.deck = action.payload.deck;
      });
    default:
      return state;
  }
};

export const selectWaste = (state: RootState): CardEntity[] => state.game.waste;
export const selectDeck = (state: RootState): CardEntity[] => state.game.deck;
export const selectFoundations = (state: RootState): CardEntity[][] => state.game.foundations;
export const selectTableuPiles = (state: RootState): CardEntity[][] => state.game.tableuPiles;
