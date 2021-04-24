import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import md5 from 'js-md5';
Vue.prototype.$md5 = md5

import moment from 'moment' 
Vue.prototype.$moment = moment

import uView from "uview-ui"
import tagRadio from '@/components-private/tag-radio.vue'
import peaceItem from '@/components-private/peace-item.vue'
import infoItem from '@/components-private/info-item.vue'
import eventItem from '@/components-private/event-item.vue'
import nodata from '@/components-private/nodata.vue'
import commentItem from '@/components-private/comment-item.vue'
import commentInput from '@/components-private/comment-input'

Vue.use(uView)
Vue.component('tag-radio', tagRadio)
Vue.component('peace-item', peaceItem)
Vue.component('info-item', infoItem)
Vue.component('event-item', eventItem)
Vue.component('nodata', nodata)
Vue.component('comment-item', commentItem)
Vue.component('comment-input', commentInput)

// 全局挂载toast
import {
	toast
} from './common/js/util.js'
Vue.prototype.$toast = toast

// 引入api
import './api'

Vue.mixin({
	methods: {
		setTabBarIndex(index) {
			if (typeof this.$mp.page.getTabBar === 'function' && this.$mp.page.getTabBar()) {
				this.$mp.page.getTabBar().setData({
					selected: index
				})
			}
		}
	}
})

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
