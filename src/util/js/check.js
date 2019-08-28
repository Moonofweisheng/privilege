export function identity(id) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(id)) {
        return false
    } else {
        return true
    }
}
export function mobileCheck(mobile) {
    var reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    if (reg.test(mobile)) {
      return true;
    } else {
      return false;
    }
  
}