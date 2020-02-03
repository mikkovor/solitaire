import { StartNewGame } from "./gameActions";

export enum ScoreActionTypes {
  GameIsOver = "score/gameIsOver",
  GetScores = "score/getScores"
}

export type GameIsOver = {
  readonly type: ScoreActionTypes.GameIsOver;
  readonly payload: number;
};

export type GetScores = {
  readonly type: ScoreActionTypes.GetScores;
  readonly payload: number[];
};

export const gameIsOver = (payload: number): GameIsOver => ({
  type: ScoreActionTypes.GameIsOver,
  payload
});

export const getScores = (payload: number[]): GetScores => ({ type: ScoreActionTypes.GetScores, payload });

export type ScoreActions = StartNewGame | GameIsOver | GetScores;
