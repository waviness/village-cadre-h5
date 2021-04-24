import request from './request.js'

// 获取用户信息
export function getUserInfo(params) {
	return request.get('/user/user/getLoginUserInfo', params).then(res => res.data)
}