import USER_ACTION_TYPES from "./user_action_types"
const INITIAL_STATE={
    "user":null,
    "auth_token":null,
}

export const userReducer=(state=INITIAL_STATE,action)=>{
    const { type, payload }=action
    switch (type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {...state,"user":payload};
        case USER_ACTION_TYPES.SET_AUTH_TOKEN:
            return {...state,"auth_token":payload}
        default:
            return state

    }

}
