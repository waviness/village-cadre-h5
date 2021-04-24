<template>
	<view class="nodata">
		<image src="../static/image/icon-404.png" mode=""></image>
		<view class="nodata-text fs-16 bold">{{ text }}</view>
	</view>
</template>

<script>
	export default {
		name: 'nodata',
		props: {
			text: {
				type: String,
				default: '暂无数据'
			},
		},
	}
</script>

<style lang="scss" scoped>
	.nodata {
		margin: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		image {
			width: 100%;
		}
		&-text {
			position: absolute;
			bottom: 24rpx;
		}
	}
</style>
