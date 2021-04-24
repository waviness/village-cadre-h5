<template>
	<view class="container">
		<view class="publish">
			<view class="publish-title">
				<view class="publish-title__name">标题：</view>
				<view class="publish-title__input">
					<u-input v-model="title" class="" placeholder="输入标题名称" type="text" :border="border" maxlength="30"
						:clearable="clearable" />
				</view>
			</view>
			<view class="publish__desc">矛盾描述：</view>
			<view class="publish-textarea">
				<u-input v-model="value" type="textarea" placeholder="在此输入矛盾描述…" :border="border" height="184"
					auto-height="true" :clearable="clearable" maxlength="300" />
			</view>
			<view class="publish__desc">选择调解人：</view>
			<view class="publish-select" @click="toChoose">
				<view class="publish-select__placeholder"> {{ uncleName }} </view>
				<image src="../../static/image/icon-right.png" mode=""></image>
			</view>
			<view class="publish__desc">上传图片</view>
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
				title: '',
				value: '',
				border: false,
				clearable: false,
				uncleName: '从老娘舅数据库中选择',
			};
		},

		computed: {
			action() {
				return uni.globalData.baseUrl + '/vil-api/file/upload';
			},
		},

		onShow() {
			this.uncleId = uni.getStorageSync('uncleId');
			this.uncleName = uni.getStorageSync('uncleName') || '从老娘舅数据库中选择';
		},

		methods: {
			init() {
				this.title = ''
				this.value = ''
				this.$refs.uUpload.clear()
				uni.setStorageSync('uncleId', '')
				uni.setStorageSync('uncleName', '')
			},

			toChoose() {
				uni.navigateTo({
					url: '/pages/peace/choosePeacemaker',
				});
			},

			async submit() {
				const isFinished = val => val.progress == 100;
				const filterUrl = val => val.response.data.link;
				const files = this.$refs.uUpload.lists.filter(isFinished).map(filterUrl);

				const params = {
					title: this.title,
					content: this.value,
					imgs: '',
					uncleId: this.uncleId,
				};

				const res = await this.$api.createPeaceEvent(params);

				if (res) {
					uni.showToast({
						icon: 'none',
						title: '发布成功',
						duration: 2000,
					});

					this.init();
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #f2f2f6;
		padding: 24rpx;
		box-sizing: border-box;
	}

	.publish {
		border-radius: 16rpx;
		background-color: #fff;
		padding: 32rpx 24rpx;

		&-title {
			display: flex;
			align-items: center;

			&__name {
				font-size: 32rpx;
			}

			&__input {
				flex: 1;
				@include input-border;
			}
		}

		&-textarea {
			@include input-border;
		}

		&__desc {
			margin: 48rpx 0 32rpx 0;
			font-size: 32rpx;
		}

		&-select {
			width: 100%;
			height: 80rpx;
			border: 2rpx solid #dbdbdb;
			border-radius: 16rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 24rpx;
			box-sizing: border-box;

			&__placeholder {
				color: #757575;
				font-size: 26rpx;
			}

			image {
				width: 40rpx;
				height: 40rpx;
			}
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

	.slot-btn {
		width: 160rpx;
		height: 160rpx;
		color: #888;
		font-size: 100rpx;
		line-height: 140rpx;
		text-align: center;
		background: #e3e3e3;
		border-radius: 16rpx;
	}
</style>
