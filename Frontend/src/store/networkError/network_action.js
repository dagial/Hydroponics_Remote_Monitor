import { createAction } from "../utils";
import NETWORK_ACTION_TYPES from "./network_action_types";

export const setNetworkError=(error)=>{
    return createAction(NETWORK_ACTION_TYPES.SET_NETWORK_ERROR,error)
}