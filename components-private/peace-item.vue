<template>
	<view class="peace-item" @click="onClick">
		<view class="peace-item__header">
			<view class="peace-item__header__img">
				<image :src="data.avatar" mode=""></image>
			</view>
			<view class="peace-item__header__info">
				<view class="peace-item__header__info__top">
					<view class="peace-item__header__info__top__name">
						{{ data.villager || data.villagerName }}
					</view>
					<view class="peace-item__header__info__top__time">
						{{ data.time2 || data.time }}
					</view>
				</view>
				<view class="peace-item__header__info__bottom">
					{{ data.cadreTitle }}
				</view>
			</view>
		</view>
		<view class="peace-item__title">
			<view v-if="!noTag && data.typeTagName" class="peace-item__title__type" :style="'background-color: ' + backColor[data.result]">
				{{ data.typeTagName }}
			</view>
			<view v-if="!noTag && !data.typeTagName" class="peace-item__title__type" :style="'background-color: ' + backColor[data.result]">
				事件上报-{{ data.result === 0 ? '未处理' : data.result === 1 ? '延期处理' : data.result === 2 ? '已处理' : data.result === 3 ? '不予处理' : '' }}
			</view>
			<view class="peace-item__title__name">
				{{ data.title }}
			</view>
		</view>
		<view class="peace-item__main">
			<view class="peace-item__main__content">
				{{ data.content }}
			</view>
			<view class="peace-item__main__imgList" v-if="data.imgs.length">
				<image v-for="(img, index) in data.imgs" :key="index" :src="baseUrl + img" mode="" class="peace-item__main__img" @click.stop="previewImage(index)"></image>
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'peaceItem',
		props: {
			noTag: {
				type: Boolean,
				default: false
			},
			data: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				backColor: ['#DA3B3B', '#F29B29', '#5FDA3B'],
				baseUrl: uni.globalData.baseUrl
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			},
			previewImage(index) {
				const imgList = this.data.imgs.map(item => {
					return this.baseUrl + item
				})
				uni.previewImage({
					current: index,
					urls: imgList
				})
			}
		}
	}
</script>

<style lang="scss">
	.peace-item {
		background-color: #fff;
		border-radius: 16rpx;
		font-size: 28rpx;
		color: #333;
		padding: 38rpx 24rpx 26rpx 24rpx;
		margin: 24rpx;
		&__header {
			display: flex;
			&__img {
				width: 76rpx;
				height: 76rpx;
				margin-right: 24rpx;
				image {
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
				}
			}
			&__info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				&__top {
					display: flex;
					justify-content: space-between;
					font-size: 30rpx;
					&__time {
						font-size: 22rpx;
						color: #A7A7A7;
						margin-left: 24rpx;
					}
				}
				&__bottom {
					font-size: 24rpx;
					color: #666;
				}
			}
		}
		&__title {
			display: flex;
			font-size: 32rpx;
			line-height: 48rpx;
			margin: 24rpx 0;
			font-weight: 600;
			&__type {
				padding: 0 5px;
				height: 48rpx;
				border-radius: 4rpx;
				background-color: #DA3B3B;
				color: #fff;
				font-size: 22rpx;
				text-align: center;
				margin-right: 20rpx;
				font-weight: 100;
			}
			&__name {
				flex: 1;
			}
		}
		&__main {
			&__content {
				margin-top: 32rpx;
				font-size: 28rpx;
				line-height: 40rpx;
			}
			&__imgList {
				display: flex;
				flex-wrap: wrap;
				margin-top: 32rpx;
			}
			&__img {
				width: 210rpx;
				height: 210rpx;
				margin-bottom: 12rpx;
				margin-right: 12rpx;
				image{
					width: 100%;
					height: 100%;
				}
				&:nth-child(3n+1) {
					border-radius: 8rpx 0 0 8rpx;
				}
				&:nth-child(3n) {
					border-radius: 0 8rpx 8rpx 0;
					margin-right: 0;
				}
			}
		}
	}
</style>
