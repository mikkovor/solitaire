import produce from "immer";
import { GameActions, GameActionTypes } from "actions/gameActions";
import { RootState } from "store";
import { CardState, PlayingCard } from "models/game";
import Card from "components/Card";

interface GameState {
  foundations: PlayingCard[][];
  tableuPiles: PlayingCard[][];
  deck: PlayingCard[];
  waste: PlayingCard[];
}

export const initialState: GameState = {
  foundations: [[], [], [], []],
  tableuPiles: [],
  deck: [],
  waste: []
};

export const gameReducer = (state = initialState, action: GameActions): GameState => {
  switch (action.type) {
    //Add dragged card(s) to foundation and remove from source
    case GameActionTypes.FoundationAddCards:
      return produce(state, draft => {
        draft.foundations[action.payload.index].push({
          ...action.payload.movedCard,
          state: CardState.Foundation,
          index: action.payload.index,
          isDragging: false
        });
        if (action.payload.movedCard.state === CardState.Deck) {
          draft.waste = draft.waste.filter(card => card.id !== action.payload.movedCard.id);
        } else {
          draft.tableuPiles[action.payload.movedCard.index] = draft.tableuPiles[action.payload.movedCard.index].filter(
            card => card.id !== action.payload.movedCard.id
          );
        }
      });
    //Add dragged card(s) to tableuPile and remove from source
    case GameActionTypes.TableuPileAddCards:
      return produce(state, draft => {
        if (action.payload.movedCard.state === CardState.TableuPile) {
          const indexOfCard = draft.tableuPiles[action.payload.movedCard.index].findIndex(
            card => card.id === action.payload.movedCard.id
          );
          const cardsToAdd = draft.tableuPiles[action.payload.movedCard.index]
            .slice(indexOfCard)
            .map(card => ({ ...card, index: action.payload.index, isDragging: false }));
          const cardsLeft = draft.tableuPiles[action.payload.movedCard.index].slice(0, indexOfCard);
          draft.tableuPiles[action.payload.index] = [...draft.tableuPiles[action.payload.index], ...cardsToAdd];
          draft.tableuPiles[action.payload.movedCard.index] = cardsLeft;
        } else {
          draft.tableuPiles[action.payload.index].push({
            ...action.payload.movedCard,
            state: CardState.TableuPile,
            index: action.payload.index,
            isDragging: false
          });
          if (action.payload.movedCard.state === CardState.Deck) {
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

    case GameActionTypes.CardIsDragged:
      return produce(state, draft => {
        switch (action.payload.movedCard.state) {
          case CardState.Deck:
            draft.waste = draft.waste.map(card =>
              card.id === action.payload.movedCard.id ? { ...card, isDragging: action.payload.isDragging } : { ...card }
            );
            break;
          case CardState.Foundation:
            draft.foundations[action.payload.movedCard.index] = draft.foundations[
              action.payload.movedCard.index
            ].map(card =>
              card.id === action.payload.movedCard.id ? { ...card, isDragging: action.payload.isDragging } : { ...card }
            );
            break;
          case CardState.TableuPile:
            const indexOfCard = draft.tableuPiles[action.payload.movedCard.index].findIndex(
              card => card.id === action.payload.movedCard.id
            );

            draft.tableuPiles[action.payload.movedCard.index] = draft.tableuPiles[
              action.payload.movedCard.index
            ].map((card, index) =>
              index >= indexOfCard ? { ...card, isDragging: action.payload.isDragging } : { ...card }
            );
            break;
        }
      });
    default:
      return state;
  }
};

export const selectWaste = (state: RootState): PlayingCard[] => state.game.waste;
export const selectDeck = (state: RootState): PlayingCard[] => state.game.deck;
export const selectFoundations = (state: RootState): PlayingCard[][] => state.game.foundations;
export const selectTableuPiles = (state: RootState): PlayingCard[][] => state.game.tableuPiles;
