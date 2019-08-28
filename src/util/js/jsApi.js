import wx from 'weixin-js-sdk'
import axios from 'axios'
import qs from 'qs'

export function getWxCallbackParams(url, os, ip, shopCode) {
    axios({
        method: 'post',
        url: 'http://2n4a616392.qicp.vip:55312/interface/scratchCard/getWxCallbackParams.do',
        data: qs.stringify({
            tokenUrl: url,
            ip: ip,
            os: os
        })
    }).then((result) => {

        if (result.data.errcode == "0") {
            // alert(result.data.errcode);
            wx.config({
                "debug": false, // 开启调试模式,
                "appId": result.data.errmsg.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
                "timestamp": result.data.errmsg.timestamp, // 必填，生成签名的时间戳
                "nonceStr": result.data.errmsg.noncestr, // 必填，生成签名的随机串
                "signature": result.data.errmsg.signature, // 必填，签名，见附录1
                "jsApiList": ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
            wx.error(function (res) {
                // alert(JSON.stringify(res))
                // console.log(res)
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
            wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                // alert('进入ready');
                wx.updateAppMessageShareData({
                    "title": '喜“狮”到  刮奖活动', // 分享标题
                    "desc": '立即参与有机会刮取零售价1998元罗莱 玻尿酸蚕丝乳胶枕1对（颜色随机）', // 分享描述
                    "link": 'http://static.luolai.cn/activity/scratch/#/jump/' + shopCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    'imgUrl': 'http://static.luolai.cn/activity/scratch/ac.jpg', // 分享图标
                    success: function () {
                        // alert('成功了');
                    }
                })
                wx.updateTimelineShareData({
                    "title": '喜“狮”到  刮奖活动', // 分享标题
                    "link": 'http://static.luolai.cn/activity/scratch/#/jump/' + shopCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    "imgUrl": 'http://static.luolai.cn/activity/scratch/ac.jpg', // 分享图标
                    success: function () {
                        // 设置成功
                    }
                })
            });
        } else {
            console.log(result.data.errmsg);
        }

    }).catch((err) => {
        console.log(err);
    });

}