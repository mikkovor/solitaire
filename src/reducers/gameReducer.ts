import produce from "immer";
import { GameActions, GameActionTypes } from "actions/gameActions";
import { RootState } from "store";
import { CardState, PlayingCard } from "models/game";
import { suits } from "utils";

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
          draft.waste.push(draft.deck.splice(0, 1)[0]);
        } else {
          draft.deck = [...draft.waste];
          draft.waste = [];
        }
      });
    case GameActionTypes.NewGame:
      return produce(state, draft => {
        draft.tableuPiles = action.payload.tableuPiles;
        draft.deck = action.payload.deck;
        draft.waste = [];
        draft.foundations = [[], [], [], []];
      });

    // Set isDragging to true if card is being dragged to hide it from view
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
    case GameActionTypes.CardDoubleClicked:
      return produce(state, draft => {
        const suitIndex = suits.indexOf(action.payload.doubleClickedCard.suit);
        if (draft.foundations[suitIndex].length + 1 === action.payload.doubleClickedCard.rank) {
          draft.foundations[suitIndex].push({
            ...action.payload.doubleClickedCard,
            index: suitIndex,
            state: CardState.Foundation
          });
          if (action.payload.doubleClickedCard.state === CardState.TableuPile) {
            draft.tableuPiles[action.payload.doubleClickedCard.index] = draft.tableuPiles[
              action.payload.doubleClickedCard.index
            ].slice(0, -1);
          } else if (action.payload.doubleClickedCard.state === CardState.Deck) {
            draft.waste = draft.waste.slice(1);
          }
        }
      });
    default:
      return state;
  }
};

export const selectWaste = (state: RootState): PlayingCard[] => state.game.present.waste;
export const selectDeck = (state: RootState): PlayingCard[] => state.game.present.deck;
export const selectFoundations = (state: RootState): PlayingCard[][] => state.game.present.foundations;
export const selectTableuPiles = (state: RootState): PlayingCard[][] => state.game.present.tableuPiles;
export const selectNextFoundationCards = (state: RootState): string[] => {
  return state.game.present.foundations.map((foundation, index) => `${foundation.length + 1}${suits[index]}`);
};
