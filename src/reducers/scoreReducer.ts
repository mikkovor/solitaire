import { ScoreActions, ScoreActionTypes } from "actions/scoreActions";
import { GameActionTypes } from "actions/gameActions";
import produce from "immer";
import { RootState } from "store";
import { createTimeString } from "utils";

interface ScoreState {
  startTime: number;
  isGameOver: boolean;
  scores: number[];
  gameWonTime: number | null;
}

export const initialState: ScoreState = {
  startTime: 0,
  isGameOver: false,
  scores: [],
  gameWonTime: null
};

export const scoreReducer = (state = initialState, action: ScoreActions): ScoreState => {
  switch (action.type) {
    case GameActionTypes.NewGame:
      return produce(state, draft => {
        draft.startTime = Date.now();
        draft.isGameOver = false;
      });
    case ScoreActionTypes.GetScores:
      return produce(state, draft => {
        draft.scores = [...action.payload];
      });
    case ScoreActionTypes.GameIsOver:
      return produce(state, draft => {
        draft.isGameOver = true;
        draft.scores?.push(action.payload);
        draft.gameWonTime = action.payload;
      });
    default:
      return state;
  }
};

export const selectIsGameOver = (state: RootState): boolean => state.score.isGameOver;
export const selectGameWonTime = (state: RootState): string | undefined => {
  const gameWonTime = state.score.gameWonTime;
  if (gameWonTime) {
    return createTimeString(gameWonTime);
  }
};
export const selectStartTime = (state: RootState): number => state.score.startTime;
export const selectScores = (state: RootState): string[] | undefined | null => {
  const scores = state.score.scores;
  if (scores?.length) {
    const newScores = [...scores];
    return newScores
      ?.slice(0, 10)
      .sort((a: number, b: number) => a - b)
      .map(score => createTimeString(score));
  }
  return null;
};
