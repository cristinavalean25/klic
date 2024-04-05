import { PropertyDetails } from "../types/PropertyDetails";
import { SET_PROPERTIES, SetPropertiesAction } from "./propertyActions";

const initialState: PropertyDetails[] = [];

const propertyReducer = (
  state = initialState,
  action: SetPropertiesAction
): PropertyDetails[] => {
  switch (action.type) {
    case SET_PROPERTIES:
      return action.payload;
    default:
      return state;
  }
};

export default propertyReducer;
