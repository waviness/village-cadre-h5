// 手机号正则
// export const mobileReg = /^(13[0-9]|14[579]|15[012356789]|16[6]|17[013456789]|18[0-9]|19[89])[0-9]{8}$/
export const mobileReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
export const passwordReg = /^[a-zA-Z0-9]{6,20}$/
export const telReg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/

// export const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/

// export const emailReg = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/
export const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

// toast
export function toast(data) {
	return uni.showToast({
		title: data,
		icon: 'none',
		duration: 1500
	})
}  

//时间处理
export function timeFormat(str,fmt){
	let moment = require("moment")
	// return index == 1 ? (moment(str).format(fmt)):(moment(str).format('YYYY-MM-DD'))
	return moment(str).format(fmt)
}

// 计算时间差-秒
export function timeDiff(str2,str1){
	let moment = require("moment")
	let t1 = moment(str1)
	let t2 = moment(str2)
	return t2.diff(t1, 'seconds')
}

export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

//时间戳转化
export function getFormatDate(val,fmt) { 
    if (!val) {
       return '';
    }
    if (val && val.length == 10) {
       val = parseInt(val+'000');
    }
    var date = new Date(val);
    var o = {   
        "M+" : date.getMonth()+1,                 //月份   
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时   
        "m+" : date.getMinutes(),                 //分   
        "s+" : date.getSeconds(),                 //秒   
        "q+" : Math.floor((date.getMonth()+3)/3), //季度   
        "S"  : date.getMilliseconds()             //毫秒   
    };   
    if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return fmt;   
}
// 获取导航栏高度
export function getNavigationHeight(label) {
	let str = ''
	const query = uni.createSelectorQuery()
	query.select(label).boundingClientRect(data => {
		console.log(data)
		str = data.height
		return str
	}).exec()
}