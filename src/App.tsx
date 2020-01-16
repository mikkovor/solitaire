import React, { useEffect, useCallback } from "react";
import { TableuPile } from "components/TableuPile";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import "./App.css";
import { Stock } from "components/Stock";
import { Foundation } from "components/Foundation";
import { State, selectTableuPiles, selectFoundations } from "reducers/gameReducer";
import { useDispatch, useSelector } from "react-redux";
import { startNewGame } from "actions/gameActions";
import Preview from "react-dnd-preview";
import TouchBackend from "react-dnd-touch-backend";

export enum CardColor {
  Red,
  Black
}

export interface CardEntity {
  id: string;
  rank: number;
  suit: string;
  color: CardColor;
  hidden: boolean;
  index: number;
  type: string;
  state: State;
}

const shuffle = <T,>(a: T[]): T[] => {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

const suits: string[] = ["H", "D", "C", "S"];

const createDeck = (): CardEntity[] => {
  const deck: CardEntity[] = [];
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
        state: State.TableuPile
      });
    });
  }
  return deck;
};

interface PreviewObject {
  itemType: string;
  item: {
    type: string;
    card: CardEntity;
  };
  style: any;
}

const getOffSet = (index: number): number => {
  return index > 0 ? index * 35 : 0;
};

const App: React.FC = () => {
  const dispatch = useDispatch();
  const tableuPiles = useSelector(selectTableuPiles);
  const foundations = useSelector(selectFoundations);

  const createPreview = useCallback(
    (draggedCard: CardEntity, style: any): JSX.Element | undefined => {
      if (draggedCard.state === State.TableuPile) {
        const indexOfCard = tableuPiles[draggedCard.index].findIndex(card => card.id === draggedCard.id);
        if (indexOfCard === tableuPiles[draggedCard.index].length) {
          return (
            <img
              className="card"
              src={require(`./assets/md/${draggedCard.id}.svg`)}
              style={{ top: getOffSet(0), ...style, zIndex: 50 }}
            />
          );
        }
        const draggedCards = tableuPiles[draggedCard.index].filter((card, index) => index >= indexOfCard);
        return (
          <div style={{ ...style, zIndex: 50 }}>
            {draggedCards.map((card, i) => (
              <img
                key={card.id}
                className="card"
                src={require(`./assets/md/${card.id}.svg`)}
                style={{ top: getOffSet(i) }}
              />
            ))}
          </div>
        );
      }
    },
    [tableuPiles]
  );

  const generatePreview = ({ itemType, item, style }: PreviewObject): JSX.Element | undefined => {
    if (item && item.card.state === State.TableuPile) {
      return createPreview(item.card, style);
    } else {
      return (
        <img
          className="card"
          src={require(`./assets/md/${item.card.id}.svg`)}
          style={{ ...style, top: getOffSet(0), zIndex: 50 }}
        />
      );
    }
  };

  useEffect(() => {
    const startDeck = shuffle(createDeck());
    const tableuPiles: CardEntity[][] = [];
    for (let i = 1; i < 8; i++) {
      const tempPiles = startDeck.splice(0, i);
      tempPiles.map((card: CardEntity, index: number) => {
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
    const deck = startDeck.map(card => ({ ...card, state: State.Deck }));
    dispatch(startNewGame({ tableuPiles, deck }));
  }, [dispatch]);

  return (
    <DndProvider backend={Backend}>
      <Preview generator={generatePreview} />
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Stock />
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
            {foundations.length &&
              foundations.map((foundation, i) => (
                <Foundation
                  key={i.toString()}
                  cards={foundation}
                  index={i}
                  foundationSuit={suits[i]}
                  nextCard={foundation.length + 1}
                />
              ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative", height: "100%" }}>
          {tableuPiles.map((pile, i) => (
            <TableuPile cards={pile} key={i.toString()} index={i} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
