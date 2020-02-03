import { combineReducers } from "redux";
import { gameReducer } from "reducers/gameReducer";
import undoable, { excludeAction } from "redux-undo";
import { GameActionTypes } from "actions/gameActions";
import { scoreReducer } from "reducers/scoreReducer";
import { HistoryActionTypes } from "actions/historyActions";

export const rootReducer = combineReducers({
  game: undoable(gameReducer, {
    undoType: GameActionTypes.UndoMove,
    ignoreInitialState: true,
    clearHistoryType: HistoryActionTypes.ClearHistory,
    filter: excludeAction([GameActionTypes.CardIsDragged, GameActionTypes.NewGame])
  }),
  score: scoreReducer
});

export type RootState = ReturnType<typeof rootReducer>;
