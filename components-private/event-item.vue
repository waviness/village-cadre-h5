<template>
	<view :class="['event-item', box ? 'event-item--box' : '']">
		<view class="event-item__header">
			<view class="event-item__header__img">
				<image :src="data.avatar" mode=""></image>
			</view>
			<view class="event-item__header__info">
				<view class="event-item__header__info__top">
					<view class="event-item__header__info__top__name">
						{{ data.villager }}
					</view>
					<view class="event-item__header__info__top__time">
						{{ data.time2 }}
					</view>
				</view>
				<view class="event-item__header__info__bottom">
					{{ data.cadreTitle }}
				</view>
			</view>
		</view>
		<view class="event-item__title">
			<view v-if="data.typeTagName" class="event-item__title__type" :style="'background-color: ' + backColor[0]">
				{{ data.typeTagName }}
			</view>
			<view v-else class="event-item__title__type" :style="'background-color: ' + backColor[data.result]">
				事件上报-{{ data.result === 0 ? '未处理' : data.result === 1 ? '延期处理' : data.result === 2 ? '已处理' : data.result === 3 ? '不予处理' : '' }}
			</view>
			<view class="event-item__title__name">
				{{ data.title }}
			</view>
		</view>
		<view class="event-item__main">
			<view class="event-item__main__content">
				{{ data.content }}
			</view>
			<view class="event-item__main__imgList">
				<image v-for="(img, index) in data.imgs" :key="index" :src="baseUrl + img" mode=""
					class="event-item__main__img" @click.stop="previewImage(index)"></image>
			</view>
		</view>
		<view class="event-item__data">
			<view :class="hasMore ? 'event-item__data__item2' : 'event-item__data__item'">
				<image v-if="!data.hasClick" src="../static/image/zan.png" mode=""></image>
				<image v-else src="../static/image/icon-like-fill.png" mode=""></image>
				{{ data.likeTotal }}
			</view>
			<view :class="hasMore ? 'event-item__data__item2' : 'event-item__data__item'">
				<image src="../static/image/comment.png" mode=""></image>
				{{ data.replyTotal }}
			</view>
			<view v-if="hasMore" class="event-item__data__more" @click="showOpts">
				<image src="../static/image/icon-more.png" mode=""></image>
			</view>
			<view v-show="optsShow" class="event-item__data__opts__bg" @click="close"></view>
			<view v-show="optsShow" class="event-item__data__opts">
				<view class="event-item__data__opts__item" @click="clickOpts(2)">
					事件已处理
				</view>
				<view class="event-item__data__opts__item" @click="clickOpts(1)">
					延期处理
				</view>
			</view>
		</view>
		<u-line color="#E6E6E6" hair-line="false" />
		<view class="event-item__zan">
			<text class="event-item__zan--name">{{ data.likeMsg }}</text>等{{data.likeTotal}}人觉得很赞
		</view>
		<view v-for="(com, index) in data.comment" :key="index" class="event-item__comment">
			{{ com.name }}：{{ com.content }}
		</view>
		<view class="event-item__more" @click="onClick(data)">
			查看更多评论（{{ data.replyTotal }}）>>>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'eventItem',
		props: {
			box: {
				type: Boolean,
				default: false
			},
			hasMore: {
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
				optsShow: false,
				backColor: ['#DA3B3B', '#F29B29', '#5FDA3B'],
				baseUrl: uni.globalData.baseUrl
			}
		},
		methods: {
			close() {
				this.optsShow = false
			},
			showOpts() {
				this.optsShow = !this.optsShow
			},
			clickOpts(result) {
				this.optsShow = false
				this.$emit('update', result)
			},
			onClick(data) {
				this.$emit('click', data)
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

<style lang="scss" scoped>
	.event-item {
		background-color: #fff;
		font-size: 28rpx;
		color: #333;
		padding: 48rpx 48rpx 0 48rpx;
		margin-bottom: 10rpx;

		&--box {
			margin: 32rpx 24rpx;
			padding: 38rpx 20rpx 32rpx 24rpx;
			border-radius: 16rpx;
		}

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

				image {
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

		&__data {
			display: flex;
			justify-content: space-between;
			margin: 24rpx 2rpx 24rpx 46rpx;
			position: relative;

			&__item {
				width: 50%;
				display: flex;
				align-items: center;
				color: #989898;
				font-size: 22rpx;

				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 14rpx;
				}
			}

			&__item2 {
				width: calc(50% - 30rpx);
				display: flex;
				align-items: center;
				color: #989898;
				font-size: 22rpx;

				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 14rpx;
				}
			}

			&__more {
				width: 60rpx;

				image {
					width: 60rpx;
					height: 36rpx;
				}
			}

			&__opts {
				position: absolute;
				z-index: 999;
				right: 76rpx;
				top: -22rpx;
				width: 260rpx;
				background-color: #4D4D4D;
				border-radius: 8rpx;

				&__bg {
					width: 100vw;
					height: 100vh;
					position: fixed;
					top: 0;
					left: 0;
					z-index: 998;
				}

				&__item {
					height: 84rpx;
					line-height: 84rpx;
					text-align: center;
					color: #fff;
					font-size: 28rpx;
					border-bottom: 2rpx solid #A4A4A4;

					&:last-child {
						border-bottom: 0;
					}
				}
			}
		}

		&__zan {
			font-size: 26rpx;
			margin: 32rpx 0;

			&--name {
				color: #5FC2FF;
			}
		}

		&__comment {
			font-size: 26rpx;
			margin: 16rpx 0;
		}

		&__more {
			color: #5FC2FF;
			font-size: 20rpx;
			text-align: center;
			padding: 32rpx 0;
		}
	}
</style>
