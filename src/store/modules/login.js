const state = {
    ip: '',        //当前用户ip
    os: 'unKnow',  //用户系统版本
    token: '',//用户token
    openid: '',//用户openid
    islogin: false,//是否登录
    mobile: '',//用户联系方式
    msg: "",//验证码
    userCode: '',//导购code
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
    * @param {*} userCode 
    */
    updateUserCode(state, userCode) {
        state.userCode = userCode
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
        [state.os, state.token, state.openid, state.shopCode, state.islogin]
            =
            [login.os, login.token, login.openid, login.shopCode, login.islogin]
    },
    updateMobile(state, mobileObj) {
        [state.mobile, state.msg] = [mobileObj.mobile, mobileObj.msg]
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