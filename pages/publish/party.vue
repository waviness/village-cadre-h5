<template>
	<view class="feedback">
		<view class="feedback__title">问题和意见</view>
		<view class="feedback__text">
			<u-input v-model="feedbackContent" :type="type" :maxlength="1000" :border="border" :height="height" :auto-height="autoHeight" />
		</view>
		<view class="feedback__title">图片（上传问题截图）</view>
		<view class="feedback__imgs">
			<u-upload ref="uUpload" :action="action" :auto-upload="false"></u-upload>
		</view>
		<button type="primary" @click="submit">提交反馈</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedbackContent: '',
				type: 'textarea',
				border: false,
				height: 160,
				autoHeight: true,
				action: '',
				fileList: [],
				flag: true // 用于提交反馈节流
			}
		},
		methods: {
			submit() {
				if (this.flag) {
					this.flag = false;
					uni.showLoading();
					let files = [];
					// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
					files = this.$refs.uUpload.lists.filter(val => {
						return val.progress == 100;
					})
					// 如果您不需要进行太多的处理，直接如下即可
					// files = this.$refs.uUpload.lists;
					console.log(files)
					console.log(this.feedbackContent)
					setTimeout(() => {
						uni.hideLoading()
						uni.showToast({
							title: '提交成功',
							icon: 'success'
						});
						this.flag = true;
					}, 1000);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.feedback {
		&__title {
			line-height: 90rpx;
			padding-left: 24rpx;
		}

		&__text {
			background-color: #fff;
			padding: 16rpx 24rpx;
			font-size: 30rpx;
		}

		&__imgs {
			background-color: #fff;
			padding: 16rpx;
		}
	}
</style>
