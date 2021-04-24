<template>
	<view class="container">
		<view class="publish">
			<tag-radio :list="publishOptions" :current="publishCurrent" @tagClick="onPublishChange" />
			<view class="publish-title">
				<view class="publish-title__name">标题：</view>
				<view class="publish-title__input">
					<u-input v-model="title" class="" placeholder="输入标题名称" type="text" :border="border" maxlength="30"
						:clearable="clearable" />
				</view>
			</view>
			<view class="publish-textarea">
				<u-input v-model="content" type="textarea" placeholder="在此输入详细内容…" :border="border" height="184"
					auto-height="true" :clearable="clearable" maxlength="300" />
			</view>
			<view class="publish__desc" style="margin-bottom: 0;">选择标签</view>
			<tag-radio :list="tagOptions" :current="tagCurrent" small="true" @tagClick="onTagChange" />
			<view class="publish__desc">上传图片</view>
			<u-upload ref="uUpload" :action="action" :auto-upload="true" :custom-btn="true" width="160" height="160">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					+
				</view>
			</u-upload>
			<u-line color="#BEBEBE" margin="40rpx 0 0 0" />
			<view class="publish__desc">消息推送</view>
			<u-checkbox-group active-color="#5FC2FF" width="50%">
				<u-checkbox
					shape="circle"
					v-model="item.checked"
					v-for="(item, index) in messageOptions" :key="index" 
					:name="item.name"
				>
					{{item.name}}
				</u-checkbox>
			</u-checkbox-group>
			<view class="publish-switch">
				<view class="publish-switch__name">同步至首页</view>
				<view class="">
					<u-switch v-model="syncToIndex" active-color="#5FC2FF"></u-switch>
				</view>
			</view>
			<view class="publish-switch">
				<view class="publish-switch__name">置顶</view>
				<view class="">
					<u-switch v-model="isTop" active-color="#5FC2FF"></u-switch>
				</view>
			</view>
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
				publishOptions: [{
					name: '村务公开'
				}, {
					name: '村内活动'
				}],
				tagOptions: [],
				tagOptions1: [],
				tagOptions2: [],
				publishCurrent: 0,
				tagCurrent: 0,
				title: '',
				content: '',
				border: false,
				clearable: false,
				action: uni.globalData.baseUrl + 'cad-api/file/upload',
				filesArr: [],
				messageOptions: [
					{
						name: '微信服务号提醒',
						checked: false,
						disabled: false
					},
					{
						name: '短信提醒',
						checked: false,
						disabled: false
					}
				],
				syncToIndex: false,
				isTop: false,
			}
		},
		onLoad() {
			uni.setNavigationBarColor({
				backgroundColor: '#F2F2F6',
				frontColor: '#000000'
			})
			this.getTag()
		},
		methods: {
			async getTag() {
				const [data1, data2] = await Promise.all([
					this.$api.getTag({
						type: 21
					}),
					this.$api.getTag({
						type: 22
					}),
				]);
				this.tagOptions = [...data1]
				this.tagOptions1 = data1
				this.tagOptions2 = data2
			},
			init() {
				this.title = ''
				this.content = ''
				this.tagCurrent = 0
				this.syncToIndex = false
				this.isTop = false
				this.$refs.uUpload.clear()
				this.messageOptions.forEach(item => item.checked = false)
			},
			onPublishChange(index) {
				this.publishCurrent = index
				if (index === 0) {
					this.tagOptions = [...this.tagOptions1]
				} else {
					this.tagOptions = [...this.tagOptions2]
				}
			},
			onTagChange(index) {
				this.tagCurrent = index
			},
			async submit() {
				let files = []
				// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				files = this.$refs.uUpload.lists.filter(val => {
					return val.progress == 100
				})
				console.log(files)
				const imgs = files.map(item => {
					return item.response.data.link
				})
				const params = {
					title: this.title,
					content: this.content,
					imgs,
					notifySms: this.messageOptions[1].checked,
					notifyWx: this.messageOptions[0].checked,
					onTop: this.isTop ? 1 : 0,
					syncIdx: this.syncToIndex ? 1 : 0,
					type: this.publishCurrent === 1 ? 22 : 21,
					tagId: this.tagOptions[this.tagCurrent].id
				}
				console.log(params)
				const res = await this.$api.addMoments(params)
				if(res) {
					uni.showToast({
						icon: 'none',
						title: '发布成功',
						duration: 2000
					})
					this.init()
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 24rpx;
		padding-bottom: 200rpx;
		box-sizing: border-box;
	}

	.publish {
		border-radius: 16rpx;
		background-color: #fff;
		padding: 32rpx 24rpx;

		&-title {
			display: flex;
			align-items: center;
			margin-top: 48rpx;

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
			margin-top: 32rpx;
		}

		&__desc {
			margin: 48rpx 0 32rpx 0;
			font-size: 32rpx;
		}

		&-select {
			width: 100%;
			height: 80rpx;
			border: 2rpx solid #DBDBDB;
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
		
		&-switch {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 72rpx;
		}

		&-btn {
			padding: 64rpx 72rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			z-index: 999;
		}
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
