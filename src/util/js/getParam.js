/**
 * 获取微信授权链接内参数
 * @param {string} url 
 */
export function getCode(url) {
    let parm = { code: '', shopCode: '' }
    if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
            if (strs[i].split("=")[0] == "code") {
                parm.code = strs[i].split("=")[1];
            } else if (strs[i].split("=")[0] == "state") {
                parm.shopCode = strs[i].split("=")[1];
            }
        }
    }
    return parm

}