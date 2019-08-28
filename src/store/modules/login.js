const state = {
    ip: '',        //当前用户ip
    os: 'unKnow',  //用户系统版本
    token: '',//用户token
    openid: '',//用户openid
    islogin: false,//是否登录
    mobile: '',//用户联系方式
    shopCode: ''//门店编号
}
const getters = {

}
const mutations = {
    updateLogin(state, islogin) {
        state.islogin = islogin
    },
    /**
    * 更新门店编号
    * @param {*} state 
    * @param {*} shopCode 
    */
    updateShopCode(state, shopCode) {
        state.shopCode = shopCode
    },
    /**
     * 更新ip地址
     * @param {*} state 
     * @param {*} ip 
     */
    updateIp(state, ip) {
        state.ip = ip
    },
    /**
     * 更新登录信息
     * @param {*} state 
     * @param {*} login 
     */
    login(state, login) {
        [state.os, state.token, state.openid, state.islogin]
            =
            [login.os, login.token, login.openid, login.islogin]
    },
    mobile(state, mobile) {
        state.mobile = mobile
    }
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