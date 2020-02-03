import { PlayingCard, CardColor, CardState } from "models/game";
import { NewGamePayload } from "actions/gameActions";
import { typeOfCard } from "dragTypes";
import { useState, useEffect } from "react";

export const createTimeString = (gameTime: number): string => {
  const seconds = ("0" + (Math.floor(gameTime / 1000) % 60)).slice(-2);
  const minutes = ("0" + (Math.floor(gameTime / 60000) % 60)).slice(-2);
  const hours = Math.floor(gameTime / 3600000)
    .toString()
    .slice(-2);
  return `${hours}:${minutes}:${seconds}`;
};

export const useMedia = (query: string): boolean => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = (): void => setMatches(media.matches);
    media.addListener(listener);

    return (): void => media.removeListener(listener);
  }, [query, matches]);

  return matches;
};

export const getOffSet = (index: number, offset: number): number => {
  return index > 0 ? index * offset : 0;
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
        type: typeOfCard,
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
