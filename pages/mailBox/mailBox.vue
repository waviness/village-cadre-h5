<template>
	<view class="container">
		<view class="tab-card">
			<view class="tab-card-li" @click="tabChange(0)">
				<view class="tab-card-li-t" :class="tabIndex == 0 ? 'tab-card-li-t-active' : ''">未读</view>
				<view class="tab-card-li-i" :class="tabIndex == 0 ? 'tab-card-li-i-active' : ''"></view>
			</view>
			<view class="tab-card-li" @click="tabChange(1)">
				<view class="tab-card-li-t" :class="tabIndex == 1 ? 'tab-card-li-t-active' : ''">全部</view>
				<view class="tab-card-li-i" :class="tabIndex == 1 ? 'tab-card-li-i-active' : ''"></view>
			</view>
		</view>
		
		<mailList :status="0" @reply="reply" v-show="tabIndex == 0"></mailList>
		<mailList :status="1" @reply="reply" v-show="tabIndex == 1"></mailList>
	</view>
</template>

<script>
	import mailList from '../../components/mail-list.vue'
	export default {
		components: {
			mailList
		},
		data() {
			return {
				tabIndex: 0,
				
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods: {
			tabChange(index) {
				this.tabIndex = index
			},
			reply(data) {
				data.isRead = true
				uni.navigateTo({
					url: './mailReply/mailReply?id=' + data.id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		height: 100vh;
		background: #FFFFFF;
	}
	.tab-card{
		width: 750rpx;
		height: 80rpx;
		padding-top: 20rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.tab-card-li{
			width: 250rpx;
			height: auto;
			text-align: center;
			.tab-card-li-t{
				height: 40rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				color: #666666;
				margin-bottom: 4rpx;
			}
			.tab-card-li-i{
				width: 112rpx;
				height: 8rpx;
				background-color: #FFFFFF;
				margin: auto;
			}
			.tab-card-li-t-active{
				color: #5FC2FF;
			}
			.tab-card-li-i-active{
				background-color: #5FC2FF;
			}
		}
	}
	
</style>
