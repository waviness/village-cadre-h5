<template>
	<view class="comment-input">
		<view class="comment-input__bg" @click="onClose"></view>
		<view class="comment-input__content">
			<view class="comment-input__top">
				<view class="comment-input__top-text">
					回复
				</view>
				<view :class="['comment-input__top-btn', comment ? '' : 'comment-input__top-btn--disable']"
					@click="onSend">
					发送
				</view>
			</view>
			<view class="comment-input__input-wrap">
				<textarea :value="comment" class="comment-input__input uni-input" cursor-spacing="80" :placeholder="placeholder"
					focus @input="onInput" @blur="onBlur" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'commentInput',
		props: {
			placeholder: {
				type: String,
				default: '评论'
			}
		},
		data() {
			return {
				comment: '',
			}
		},
		methods: {
			onClose() {
				this.$emit('close')
			},
			
			onInput(e) {
				this.comment = e.detail.value;
			},
			
			onBlur() {
				// this.showInputbar = false;
			},
			
			onSend() {
				if (!this.comment) {
					return
				}
				this.$emit('send', this.comment)
				this.comment = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-input {
		&__bg {
			width: 100vw;
			height: 100vh;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 99;
			background-color: #333;
			opacity: .6;
		}



		&__content {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			border-radius: 48rpx 48rpx 0 0;
			z-index: 999;
			padding: 40rpx 48rpx;
			padding-bottom: calc(98rpx + env(safe-area-inset-bottom, 0));
		}

		&__top {
			display: flex;
			justify-content: space-between;
			margin-bottom: 40rpx;

			&-text {
				font-size: 32rpx;
			}

			&-btn {
				font-size: 32rpx;
				color: #5FC2FF;

				&--disable {
					color: #757575;
				}
			}
		}

		&__input-wrap {
			display: flex;
			flex: 1;
			height: 168rpx;
			background-color: #fff;
			border-bottom: 2rpx solid #C3C3C3;
		}

		&__input {
			flex: 1;
			width: auto;
			height: 168rpx;
			padding: 0;
			font-size: 28rpx;
			line-height: 40rpx;
		}

		&__button {
			margin-left: 24rpx;
		}
	}
</style>
