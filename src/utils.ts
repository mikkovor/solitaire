import { PlayingCard, CardColor, CardState } from "models/game";
import { NewGamePayload } from "actions/gameActions";

export const getOffSet = (index: number): number => {
  return index > 0 ? index * 35 : 0;
};

export const shuffle = <T>(a: T[]): T[] => {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

export const suits: string[] = ["H", "D", "C", "S"];

export const createDeck = (): PlayingCard[] => {
  const deck: PlayingCard[] = [];
  for (let i = 1; i < 14; i++) {
    suits.forEach(suit => {
      deck.push({
        rank: i,
        suit,
        color: suit === "D" || suit === "H" ? CardColor.Red : CardColor.Black,
        hidden: false,
        id: i.toString() + suit,
        type: "CARD",
        index: 0,
        state: CardState.TableuPile,
        isDragging: false
      });
    });
  }
  return deck;
};

export const createNewGame = (): NewGamePayload => {
  const startDeck = shuffle(createDeck());
  const tableuPiles: PlayingCard[][] = [];
  for (let i = 1; i < 8; i++) {
    const tempPiles = startDeck.splice(0, i);
    tempPiles.map((card: PlayingCard, index: number) => {
      card.index = i - 1;
      if (index < tempPiles.length - 1) {
        card.hidden = true;
        return card;
      }
      card.hidden = false;
      return card;
    });
    tableuPiles.push(tempPiles);
  }
  const deck = startDeck.map(card => ({ ...card, state: CardState.Deck }));
  return { tableuPiles, deck };
};
