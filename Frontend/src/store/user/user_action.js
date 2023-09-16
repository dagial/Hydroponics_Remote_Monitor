import { createAction } from "../utils";
import USER_ACTION_TYPES from "./user_action_types";
export const setUser=(user)=>{
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user)
}
export const setAuthToken=(token)=>{
    return createAction(USER_ACTION_TYPES.SET_AUTH_TOKEN,token)
}