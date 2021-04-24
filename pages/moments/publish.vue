<template>
	<view class="container">
		<view class="publish">
			<view class="publish-textarea">
				<u-input v-model="value" type="textarea" placeholder="在此输入描述…" :border="border" height="184"
					auto-height="true" border-color="#DBDBDB" :clearable="clearable" maxlength="300" />
			</view>
			<view class="publish__title">上传图片</view>
			<u-upload ref="uUpload" :action="action" :auto-upload="true" :custom-btn="true" width="160" height="160">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					+
				</view>
			</u-upload>
		</view>
		<view class="publish-btn">
			<u-button type="primary" shape="circle" @click="submit">发布</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				border: false,
				clearable: false,
				action: uni.globalData.baseUrl + '/vil-api/file/upload',
				filesArr: []
			}
		},
		methods: {
			init() {
			  this.value = ''
			  this.$refs.uUpload.clear()
			},
			async submit() {
				let files = []
				files = this.$refs.uUpload.lists.filter(val => {
					return val.progress == 100
				})
				const imgs = files.map(item => {
					return item.response.data.link
				})
				const params = {
					content: this.value,
					imgs,
					type: 0,
					tagId: 0
				}
				const res = await this.$api.createNewMoments(params)
				if (res) {
					uni.showToast({
						icon: 'none',
						title: '发布成功',
						duration: 2000,
					});
					this.init()
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #F2F2F6;
		padding: 24rpx;
		box-sizing: border-box;
	}

	.publish {
		border-radius: 16rpx;
		background-color: #fff;
		padding: 32rpx 24rpx;

		&-textarea {
			@include input-border;
		}

		&__title {
			margin: 32rpx 0;
			font-size: 32rpx;
		}

		&-btn {
			padding: 112rpx 72rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
		}
	}

	.u-input {
		padding: 26rpx;
	}

	.slot-btn {
		width: 160rpx;
		height: 160rpx;
		color: #888;
		font-size: 100rpx;
		line-height: 140rpx;
		text-align: center;
		background: #E3E3E3;
		border-radius: 16rpx;
	}
</style>
