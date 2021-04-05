const state = {
    // 定义仓库内的数据 要么时获取localstorage里的相应的项目 要么就是''
    name: '' || window.localStorage.getItem('name'),
    isAdmin: false || window.localStorage.getItem('isAdmin'),
    userHead:''
}


const actions = {
}


const mutations = {
    // 对数据直接操作 

    USER_NAME(state, paylocad){
        // paylocald为传回来的数据
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