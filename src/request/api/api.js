import base from '../base/base' //引入接口域名列表
import instance from '../http/http' //导入http中创建的axios实例
import store from '../../store/index' //导入store
import qs from 'qs'

let url = base.he

const api = {
    /**
     * 通过code获取微信授权登陆
     * @param {String} code 
     * @param {String} type 
     */
    wxAuthLogin(code, shopCode, os) {
        return instance({
            url: url + 'wechatAuthLogin.do',
            data: qs.stringify({
                code: code,
                type: 18,
                shopCode: shopCode,
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
                type: 18,
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
                type: 18,
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
                type: 18,
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
                type: 18,
                openid: store.state.login.openid
            })
        })
    }
}

export default api
