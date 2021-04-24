<template>
	<view class="appointment-list-com">
		<scroll-view class="content" scroll-y @scrolltolower="loadMoreLow()" refresher-enabled="true"
			:refresher-triggered="triggered" :refresher-threshold="100" refresher-background="#f8f8f8"
			@refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			@refresherabort="onAbort">
			<view class="appointment" :class="index == (appointmentList.length - 1) ? '' : 'appointment-b'"
				v-for="(item, index) in appointmentList" :key="index" @click="appointmentDetail(item)">
				<view class="appointment-name">{{item.title}}</view>
				<view class="appointment-time">{{timeFormat(item.startTime)}} ~ {{timeFormat(item.endTime)}}</view>
				<view class="appointment-sender">
					预约人：{{item.person}}&emsp;&emsp;联系电话：{{item.mobile}}
				</view>
				<view class="angle angle-1" v-if="item.status == 1"></view>
				<view class="angle-text" v-if="item.status == 1">已预约</view>
				<view class="angle angle-2" v-if="item.status == 0"></view>
				<view class="angle-text" v-if="item.status == 0">待回复</view>
				<view class="angle angle-3" v-if="item.status == 3"></view>
				<view class="angle-text" v-if="item.status == 3">被拒绝</view>
				<view class="angle angle-3" v-if="item.status == 2"></view>
				<view class="angle-text" v-if="item.status == 2">已取消</view>
				<view class="no-read" v-if="item.isRead == 0"></view>
			</view>
		
			<uni-load-more :status="loadStatus" :content-text="contentText" color="#6b6c6c"
				v-if="appointmentList.length > 0" />
		
			<view class="no_data" v-if="appointmentList.length == 0">
				<image class="no_img" src="../static/image/no-viliager.png" mode="aspectFit"></image>
				<view class="no_text">暂时还没有消息哦~</view>
			</view>
		</scroll-view>
	</view>
</template>

<script type="text/ecmascript-6">
	import { uniLoadMore } from '@dcloudio/uni-ui'
	export default {
		name: 'appointmentList',
		components: {
			uniLoadMore
		},
		data() {
		    return {
		    	triggered: false,
		    	pageNum: 0,
		    	loadStatus: 'more',
		    	contentText: {
		    		contentdown: '查看更多',
		    		contentrefresh: '加载中',
		    		contentnomore: '没有更多了'
		    	},
		    	appointmentList: []
		    }
		},
		props: {
			status: {
				type: Number,
				required: true
			}
		},
		watch:{
		  	
		},
		mounted() {
		  	this._freshing = false
		  	setTimeout(() => {
		  		this.triggered = true
		  	}, 100)
		},
		methods: {
		  	loadMoreLow() {
		  		this.pageNum++
		  		if (this.loadStatus != 'noMore') {
		  			this.getappointment()
		  		}
		  	},
		  	getappointment() {
		  		let obj = '?page=' + this.pageNum + '&size=10'
				if (this.status == 0) {
					this.$api.getAppointment(obj).then(res => {
						this.appointmentList = this.appointmentList.concat(res.data)
						if (res.totalElements < 10) {
							this.loadStatus = 'noMore'
						} 
					})
				}
				if (this.status == 1) {
					this.$api.visitorAppointmentToday(obj).then(res => {
						this.appointmentList = this.appointmentList.concat(res.data)
						if (res.totalElements < 10) {
							this.loadStatus = 'noMore'
						} 
					})
				}
				if (this.status == 2) {
					this.$api.visitorAppointmentFuture(obj).then(res => {
						this.appointmentList = this.appointmentList.concat(res.data)
						if (res.totalElements < 10) {
							this.loadStatus = 'noMore'
						} 
					})
				}
				if (this.status == 3) {
					this.$api.visitorAppointmentHistory(obj).then(res => {
						this.appointmentList = this.appointmentList.concat(res.data)
						if (res.totalElements < 10) {
							this.loadStatus = 'noMore'
						} 
					})
				}
		  	},
		  	// 加载线下广告
		  	loadappointment() {
		  		this.pageNum = 0
		  		this.appointmentList = []
		  		this.loadStatus = 'more'
		  		this.loadMoreLow()
		  	},
		  	// 上拉刷新
		  	onPulling(e) {
		  		// console.log("onpulling", e);
		  	},
		  	onRefresh() {
		  		if (this._freshing = false) return
		  		this._freshing = true
		  		this.loadappointment()
		  		setTimeout(() => {
		  			this.triggered = false
		  			this._freshing = false
		  		}, 500)
		  	},
		  	onRestore() {
		  		this.triggered = 'restore'; // 需要重置
		  	},
		  	onAbort() {
		  	
		  	},
		  	appointmentAdd() {
		  		uni.navigateTo({
		  			url: './appointmentAdd/appointmentAdd'
		  		})
		  	},
		  	appointmentDetail(data) {
		  		this.$emit('detail', data)
		  	},
			// 时间戳转化
			timeFormat(str) {
				return this.$moment(str).format("YY-MM-DD hh:mm:ss")
			}
		}
	}
</script>

<style lang="less" scoped>
	.appointment-list-com {
		width: 100%;
		height: calc(100vh - 100rpx);
		background: #F2F2F6;
	}
	.content {
		width: 100%;
		height: calc(100% - 30rpx);
		padding-top: 30rpx;
	}
	
	.appointment-b {
		margin-bottom: 48rpx;
	}
	
	.appointment {
		width: 642rpx;
		height: auto;
		padding: 30rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: 0 auto 30rpx;
		position: relative;
		overflow: hidden;
	
		.appointment-name {
			height: 44rpx;
			line-height: 44rpx;
			font-size: 32rpx;
			font-weight: bold;
			width: 502rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	
		.appointment-time {
			height: 36rpx;
			line-height: 36rpx;
			font-size: 24rpx;
			margin-bottom: 16rpx;
		}
		.appointment-sender{
			height: 40rpx;
			line-height: 40rpx;
			font-size: 24rpx;
			background: url(../static/image/icon-right.png) 602rpx 0 no-repeat;
			background-size: 40rpx 40rpx;
		}
		.no-read{
			width: 16rpx;
			height: 16rpx;
			background-color: #E43838;
			border-radius: 50%;
			position: absolute;
			top: 44rpx;
			right: 42rpx;
		}
		.angle {
			width: 0;
			height: 0;
			z-index: 98;
			position: absolute;
			top: 0;
			right: 0;
		}
	
		.angle-1 {
			// background-color: #5fc2ff;
			border-top: 116rpx solid #5fc2ff;
			border-left: 116rpx solid transparent;
		}
	
		.angle-2 {
			// background-color: #8dd34a;
			border-top: 116rpx solid #8dd34a;
			border-left: 116rpx solid transparent;
		}
	
		.angle-3 {
			// background-color: #e43838;
			border-top: 116rpx solid #757575;
			border-left: 116rpx solid transparent;
		}
		.angle-text{
			width: 80rpx;
			height: 30rpx;
			line-height: 30rpx;
			font-size: 22rpx;
			color: #FFFFFF;
			transform: rotate(45deg);
			z-index: 99;
			position: absolute;
			top: 26rpx;
			right: -10rpx;
		}
	}
	
	.no_data {
		width: 100%;
		height: auto;
		position: relative;
	
		.no_img {
			width: 596rpx;
			height: 510rpx;
			position: absolute;
			top: 100rpx;
			left: 78rpx;
		}
	
		.no_text {
			width: 100%;
			line-height: 44rpx;
			font-size: 32rpx;
			color: #626262;
			text-align: center;
			position: absolute;
			top: 484rpx;
		}
	}
	
</style>
