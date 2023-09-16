import NETWORK_ACTION_TYPES from "./network_action_types";
const INITIAL_STATE={
    network_error:null
}
const errorReducer=(state=INITIAL_STATE,action)=>{

    const {type,payload}=action

    switch(type){
        case NETWORK_ACTION_TYPES.SET_NETWORK_ERROR:
            return {...state,network_error:payload}
        default:
            return state

    }

}
export default errorReducer