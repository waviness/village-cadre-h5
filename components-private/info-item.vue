<template>
	<view class="info" :style="'margin-top: ' + mt + 'rpx'">
		<view class="info__title">
			{{ title }}
		</view>
		<view class="info__content">
			{{ content }}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'infoItem',
		props: {
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			mt: {
				type: Number,
				default: 0
			}
		},
	}
</script>

<style lang="scss" scoped>
	.info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 32rpx 36rpx;
		
		&__title {
			font-size: 32rpx;
		}
	
		&__content {
			font-size: 28rpx;
			color: #666666;
		}
	}
</style>
