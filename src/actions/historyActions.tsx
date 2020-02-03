export enum HistoryActionTypes {
  ClearHistory = "history/ClearHistory"
}

export type ClearHistory = {
  readonly type: HistoryActionTypes.ClearHistory;
};

export const clearHistory = (): ClearHistory => ({
  type: HistoryActionTypes.ClearHistory
});

export type HistoryActions = ClearHistory;
