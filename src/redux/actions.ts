import { Action, Dispatch } from "redux";
import axios from "axios";

import {
  ActionTypes,
  FetchPropertiesFailureAction,
  FetchPropertiesSuccessAction,
  SetLastPageAction,
} from "./types";

export const fetchProperties = () => {
  // Returnăm o funcție thunk care primește dispatcherul și poate returna o promisiune
  return async (dispatch: Dispatch<Action>) => {
    try {
      const agentId =
        "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
      const agentPassword =
        "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
      const headers = {
        Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
      };

      const response = await axios.get("/api/sites/v1/properties", {
        headers,
        params: {
          status: "for_sale",
          page: 1,
          per_page: 9,
        },
      });

      // Dispecerizăm acțiunea de succes pentru preluarea proprietăților
      dispatch(fetchPropertiesSuccess(response.data.data));
      // Dispecerizăm acțiunea pentru a seta ultima pagină
      dispatch(setLastPage(response.data.last_page));
    } catch (error: any) {
      // Dispecerizăm acțiunea de eșec în cazul unei erori
      dispatch(fetchPropertiesFailure(error.message));
    }
  };
};

export const fetchPropertiesSuccess = (
  properties: any
): FetchPropertiesSuccessAction => ({
  type: ActionTypes.FETCH_PROPERTIES_SUCCESS,
  payload: properties,
});

export const fetchPropertiesFailure = (
  error: string
): FetchPropertiesFailureAction => ({
  type: ActionTypes.FETCH_PROPERTIES_FAILURE,
  payload: error,
});

export const setLastPage = (page: number): SetLastPageAction => ({
  type: ActionTypes.SET_LAST_PAGE,
  payload: page,
});
