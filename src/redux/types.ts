// types.ts

export interface Property {
  idnum: number;
  idstr: string;
  agent: number;
  dataadaugare: number;
  adresa: string;
  // alte proprietăți
}

export interface AppState {
  properties: Property[];
  currentPage: number;
  lastPage: number;
  loading: boolean;
  waiting: boolean;
}

export enum ActionTypes {
  FETCH_DATA = "FETCH_DATA",
  SET_DATA = "SET_DATA",
  SET_PAGE = "SET_PAGE",
  SET_WAITING = "SET_WAITING",
}

export interface FetchDataAction {
  type: ActionTypes.FETCH_DATA;
}

export interface SetDataAction {
  type: ActionTypes.SET_DATA;
  payload: {
    properties: Property[];
    lastPage: number;
  };
}

export interface SetPageAction {
  type: ActionTypes.SET_PAGE;
  payload: number;
}

export interface SetWaitingAction {
  type: ActionTypes.SET_WAITING;
  payload: boolean;
}

export type Action =
  | FetchDataAction
  | SetDataAction
  | SetPageAction
  | SetWaitingAction;
