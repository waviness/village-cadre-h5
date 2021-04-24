import * as common from './common'
import * as user from './user'
import Vue from 'vue'

const api = {
	...user,
	...common
}

Vue.prototype.$api = api
export default api
