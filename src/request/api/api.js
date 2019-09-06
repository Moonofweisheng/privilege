import base from '../base/base' //引入接口域名列表
import instance from '../http/http' //导入http中创建的axios实例
import store from '../../store/index' //导入store
import qs from 'qs'

let url = base.pe

const api = {
    /**
     * 通过code获取微信授权登陆
     * @param {String} code 
     * @param {String} type 
     */
    wxAuthLogin(code, userCode, os) {
        return instance({
            url: url + 'wechatAuthLogin.do',
            data: qs.stringify({
                code: code,
                type: 19,
                userCode: userCode,
                ip: store.state.login.ip,
                os: os
            }),
            method: 'post'
        })
    },
    /**
     * 发送验证码
     * @param {*} mobile 
     * @param {*} type 
     */
    sendMsgcode(mobile) {
        return instance({
            url: "https://interface1.luolai.tech/activity/sendMsgcode.do",
            data: qs.stringify({
                mobile: mobile,
                type: 19,
                ip: store.state.login.ip,
                os: store.state.login.os
            }),
            method: "post"
        })
    },
    /**
 * 微信支付获取签名等
 */
    doPay(mobile, msgcode) {
        return instance({
            url: url + 'doPay.do',
            method: "post",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: {
                ip: store.state.login.ip,          //用户IP
                type: 19,
                openid: store.state.login.openid,
                mobile: mobile,
                msgcode: msgcode,
                shopCode: store.state.login.shopCode
            }
        })
    },
    /**
     * 获取门店
     */
    getActivityShops() {
        return instance({
            url: url + "getActivityShops.do",
            data: qs.stringify({
                type: 19,
            }),
            method: "post"
        })
    },
    /**
     * 获取券号
     */
    orderList() {
        return instance({
            url: url + "orderList.do",
            method: "post",
            data: qs.stringify({
                type: 19,
                openid: store.state.login.openid
            })
        })
    },
    /**
    * 注册会员
    * @param {*} fullName 
    * @param {*} mobileNum 
    * @param {*} birthday 
    * @param {*} gender 
    */
    addMember(fullName, birthday, gender) {
        return instance({
            url: url + 'addMember.do',
            data: qs.stringify({
                type: 19,
                extSysId: "HD",
                fullName: fullName,
                brandId: "11",
                mobileNum: store.state.login.mobile,
                birthday: birthday,
                gender: gender,
                svUnitCode: store.state.login.shopCode, //门店编号
                ip: store.state.login.ip,
                os: store.state.login.os,
                openid: store.state.login.openid
            }),
            method: 'post'
        })
    },
}

export default api
