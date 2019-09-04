const state = {
    clickFlag: true,
    clickMsg: '',
}
const getters = {
}

const mutations = {
    updateClick(state, click) {
        [state.clickFlag, state.clickMsg]
            =
            [click.clickFlag, click.clickMsg]
    },
}
const actions = {

}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}