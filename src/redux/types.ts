// types.ts

import { PropertyDetails } from "../types/PropertyDetails";

export enum ActionTypes {
  FETCH_PROPERTIES = "FETCH_PROPERTIES",
  FETCH_PROPERTIES_SUCCESS = "FETCH_PROPERTIES_SUCCESS",
  FETCH_PROPERTIES_FAILURE = "FETCH_PROPERTIES_FAILURE",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_LAST_PAGE = "SET_LAST_PAGE", // Add SET_LAST_PAGE action type
}

export interface FetchPropertiesAction {
  type: ActionTypes.FETCH_PROPERTIES;
}

export interface FetchPropertiesSuccessAction {
  type: ActionTypes.FETCH_PROPERTIES_SUCCESS;
  payload: PropertyDetails[];
}

export interface FetchPropertiesFailureAction {
  type: ActionTypes.FETCH_PROPERTIES_FAILURE;
  payload: string; // or Error type
}

export interface SetCurrentPageAction {
  type: ActionTypes.SET_CURRENT_PAGE;
  payload: number;
}

export interface SetLastPageAction {
  type: ActionTypes.SET_LAST_PAGE;
  payload: number;
}

export interface AppState {
  properties: PropertyDetails[];
  currentPage: number;
  lastPage: number; // Fix the property name here
  loading: boolean;
  error: string | null;
}

export type Action =
  | FetchPropertiesAction
  | FetchPropertiesSuccessAction
  | FetchPropertiesFailureAction
  | SetCurrentPageAction
  | SetLastPageAction; // Include SetLastPageAction in the union type
