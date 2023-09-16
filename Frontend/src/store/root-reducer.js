import { combineReducers } from "redux";
import { userReducer } from "./user/user-reducer"
import errorReducer from "./networkError/network_reducer";
export const rootReducer=combineReducers({
    user:userReducer,
    error:errorReducer
})