Component({
	data: {
		color: "#999999",
		selectedColor: "#69C0FF",
		backgroundColor: "#ffffff",
		list: [{
				pagePath: "/pages/index/index",
				text: "首页",
				iconPath: "/static/icon/icon_tab_1.png",
				selectedIconPath: "/static/icon/icon_tab_1_s.png"
			},
			{
				pagePath: "/pages/serve/serve",
				text: "服务",
				iconPath: "/static/icon/icon_tab_2.png",
				selectedIconPath: "/static/icon/icon_tab_2_s.png"
			},
			{
				pagePath: "/pages/release/release",
				bulge: true,
				iconPath: "/static/icon/icon_tab_3.png",
				selectedIconPath: "/static/icon/icon_tab_3.png"
			},
			{
				pagePath: "/pages/message/message",
				text: "消息",
				iconPath: "/static/icon/icon_tab_4.png",
				selectedIconPath: "/static/icon/icon_tab_4_s.png"
			},
			{
				pagePath: "/pages/my/my",
				text: " 我的",
				iconPath: "/static/icon/icon_tab_5.png",
				selectedIconPath: "/static/icon/icon_tab_5_s.png"
			}
		]
	},
	attached() {},
	methods: {
		switchTab(e) {
			const data = e.currentTarget.dataset
			const url = data.path
			wx.switchTab({
				url
			})
		}
	}
})
