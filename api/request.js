// const baseUrl = 'https://hxw.test.swadm.kpdv.cc' // 测试
const baseUrl = 'https://testing2.kpdv.cc/' // 测试
// const baseUrl = 'https://wx.vancodes.com'

function setHeader() {
	let header = {
		"Content-Type": "application/json"
	}
	let token = uni.getStorageSync('token')
	if (token) {
		header['Authorization'] = 'Bearer ' + token
	}
	return header
}

function setRequestOptions(method, url, params) {
	let options = {
		url: baseUrl + url,
		data: params,
		params: params,
		header: setHeader(),
		method: method,
		timeout: 30000,
	}
	console.log(options)
	// return options
}

function http(url, params, type, header) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			header: header || setHeader(),
			method: type,
			data: params,
			timeout: 30000
		}).then((res) => {
			// console.log(res)
			if (res[1].statusCode == 200 && res[1].data.code == 200) {
				resolve(res[1].data)
			} else if (res[1].statusCode == 200 && res[1].data.code == 400) {
				reject(res[1].data)
				uni.showToast({
					icon: 'none',
					title: res[1].data.errMsg || '登录已过期，请重新登录',
					duration: 2000
				})
				setTimeout(() => {
					uni.clearStorageSync()
					uni.reLaunch({
						url: '/pages/wxLogin/wxLogin'
					})
				}, 1000)
			} else if (res[1].statusCode == 200 && res[1].data.code != 200 && res[1].data.code != 400) {
				reject(res[1].data)
				uni.showToast({
					icon: 'none',
					title: res[1].data.errMsg,
					duration: 2000
				})
			} else {
				reject(res[1].data)
				uni.showToast({
					icon: 'none',
					title: '当前网络不给力哦~',
					duration: 2000
				})
			}

		}).catch((err) => {
			console.log('失败：' + url)
			console.log(err)
			reject(err)
		})
	})
}
const request = {
	get: function(url, params, header) {
		return http(url, params, 'GET', header)
	},
	get_1: function(url, params, id, header) {
		return http(url + '/' + id, params, 'GET', header)
	},
	post: function(url, params, id) {
		if (id) {
			return http(url + '/' + id, params, 'POST')
		} else {
			return http(url, params, 'POST')
		}
	},

	put: function(url, params, id) {
		if (id) {
			return http(url + '/' + id, params, 'PUT')
		} else {
			return http(url, params, 'PUT')
		}
	},
}

export default request
