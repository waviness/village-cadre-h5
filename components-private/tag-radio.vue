<template>
	<view class="tag-radio">
		<view v-for="(item, index) in list" :key="index"
			:class="['tag-item', small ? index === current ? 'tag-item__small tag-item__small--active' : 'tag-item__small' : index === current ? 'tag-item__big tag-item__big--active' : 'tag-item__big']"
			@click="onClick(index)">
			{{ item.name }}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tagRadio',
		props: {
			small: {
				type: Boolean,
				default: false
			},
			list: {
				type: Array,
				default: []
			},
			current: {
				type: Number,
				default: -1
			}
		},
		methods: {
			onClick(index) {
				this.$emit('tagClick', index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tag-radio {
		display: flex;
		flex-wrap: wrap;
	}
	.tag-item {
		background-color: #ECECEC;
		text-align: center;
		&__small {
			height: 52rpx;
			line-height: 52rpx;
			border-radius: 26rpx;
			font-size: 24rpx;
			padding: 0 16rpx;
			margin-right: 36rpx;
			margin-top: 32rpx;
			&--active {
				background-color: #AFE0FF;
			}
			&:last-child {
				margin-right: 0;
			}
		}
		&__big {
			width: 144rpx;
			height: 56rpx;
			line-height: 56rpx;
			border-radius: 28rpx;
			font-size: 28rpx;
			margin-right: 48rpx;
			&--active {
				background-color: #5FC2FF;
			}
		}
	}
</style>
