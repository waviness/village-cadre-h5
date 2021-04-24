<template>
	<view class="container">
		<image class="develope" src="../../static/image/icon-404.png" mode="aspectFit"></image>
		<view class="develope-text">正在努力开发中…</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		height: 100vh;
		background: #ffffff;
	}
	.develope{
		width: 542rpx;
		height: 510rpx;
		position: absolute;
		top: 200rpx;
		left: 106rpx;
	}
	.develope-text{
		width: 750rpx;
		line-height: 44rpx;
		font-size: 32rpx;
		color: #626262;
		text-align: center;
		position: absolute;
		top: 594rpx;
	}
</style>
