import { combineReducers } from "redux";
import { gameReducer } from "reducers/gameReducer";
import undoable, { excludeAction } from "redux-undo";
import { GameActionTypes } from "actions/gameActions";

export const rootReducer = combineReducers({
  game: undoable(gameReducer, {
    undoType: GameActionTypes.UndoMove,
    ignoreInitialState: true,
    filter: excludeAction([GameActionTypes.CardIsDragged, GameActionTypes.NewGame])
  })
});

export type RootState = ReturnType<typeof rootReducer>;
