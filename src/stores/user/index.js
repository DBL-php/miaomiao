const state = {
    name: '' || window.localStorage.getItem('name'),
    isAdmin: false || window.localStorage.getItem('isAdmin'),
    userHead:''
}


const actions = {

}


const mutations = {
    USER_NAME(state, paylocad){
        state.name = paylocad.name
        state.isAdmin = paylocad.isAdmin,
        state.userHead = paylocad.userHead
    }
}

export default  {
    namespaced: true,
    state,
    actions,
    mutations
}