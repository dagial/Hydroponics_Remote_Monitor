
export const selectUser=(state)=>{
    return state.user.user
}
export const selectAuthToken=(state)=>{
    return state.user.auth_token
}
export const selectUserObj=(state)=>{
    return state.user
}