import { PropertyDetails } from "../types/PropertyDetails";

export const SET_PROPERTIES = "SET_PROPERTIES";

export interface SetPropertiesAction {
  type: typeof SET_PROPERTIES;
  payload: PropertyDetails[];
}

export const setProperties = (
  properties: PropertyDetails[]
): SetPropertiesAction => ({
  type: SET_PROPERTIES,
  payload: properties,
});
