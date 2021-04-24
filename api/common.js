import request from './request.js';

export function checkVersion() {
  return request.get('/wx-api/check-version').then(res => res.data);
}

// 小程序获取手机号登陆(干部端)
export function wxAuthLogin(params) {
	return request.post('/wx-api/auth/cadre', params).then(res => res.data);
}

// 获取短信验证码
export function sendSmsCode(params) {
	return request.post('/wx-api/auth/cadre/code', params);
}

// 手机号与验证码登录
export function login(params) {
	return request.post('/wx-api/auth/cadre/login', params).then(res => res.data);
}

// 绑定用户微信信息
export function wxGetUserInfo(params) {
	return request
		.post('/wx-api/auth/cadre/userinfo', params)
		.then(res => res.data);
}

// 小程序首页信息
export function getIndex(params) {
	return request.get('/cad-api/idx', params).then(res => res.data);
}

// 个人信息
export function getUserInfo(params) {
	return request.get('/cad-api/idx/userinfo', params).then(res => res.data);
}

// 消息
export function getMsg(params) {
	return request.get('/cad-api/msg' + params).then(res => res.data);
}

// 消息
export function getMsgNum(params) {
	return request.get('/cad-api/msg/unread-total', params).then(res => res.data);
}

// 消息设为已读
export function msgRead(params, id) {
	return request.put('/cad-api/msg', params, id).then(res => res.data);
}

// 书记信箱列表
export function getMailbox(params) {
	return request.get('/cad-api/mailbox' + params).then(res => res.data);
}

// 新建书记信箱
export function mailboxDetail(params, id) {
	return request.get_1('/cad-api/mailbox', params, id).then(res => res.data);
}

// 书记信箱记录详情
export function mailboxReply(params, id) {
	return request.post('/cad-api/mailbox', params).then(res => res.data);
}

// 预约申请
export function getAppointment(params) {
	return request.get('/cad-api/sec-appt' + params).then(res => res.data);
}

// 书记确认预约
export function visitorGAppointmentConfirm(params) {
	return request.put('/cad-api/sec-appt/confirm', params).then(res => res.data);
}

// 未来预约
export function visitorAppointmentFuture(params) {
	return request.get('/cad-api/sec-appt/future' + params).then(res => res.data);
}

// 历史预约
export function visitorAppointmentHistory(params) {
	return request
		.get('/cad-api/sec-appt/history' + params)
		.then(res => res.data);
}

// 今日预约
export function visitorAppointmentToday(params) {
	return request.get('/cad-api/sec-appt/today' + params).then(res => res.data);
}

// 拒绝书记预约
export function visitorGAppointmentReject(params) {
	return request.put('/cad-api/sec-appt/reject', params).then(res => res.data);
}

// 预约添加备注
export function visitorAppointmentRemark(params) {
	return request.put('/cad-api/sec-appt/remark', params).then(res => res.data);
}

// 书记预约记录详情
export function visitorAppointmentDetail(params, id) {
	return request.get_1('/cad-api/sec-appt', params, id).then(res => res.data);
}

// 组织架构
export function getStructure(params, id) {
	return request.get_1('/cad-api/idx/cadre-structure', params, id, {
		"Content-Type": "application/x-www-form-urlencoded",
		Authorization: 'Bearer ' + uni.getStorageSync('token')
	}).then(res => res.data)
}

// 事件上报列表获取
export function getEventReportList(params) {
	return request.post('/cad-api/eventReport/page', params).then(res => res.data)
}

// 事件上报-单个获取
export function getEventReport(params, id) {
	return request.get_1('/cad-api/eventReport', params, id).then(res => res.data)
}

// 事件上报-修改
export function updateEventReport(params) {
	return request.put('/cad-api/eventReport', params).then(res => res.data)
}

// 事件上报评论列表获取
export function getEventReportCommentsList(params) {
	return request.post('/cad-api/eventReport/comments/page', params).then(res => res.data)
}

// 事件上报评论-添加
export function addEventReportComments(params) {
	return request.post('/cad-api/eventReport/comments', params).then(res => res.data)
}

// 事件上报评论列表点赞
export function updateEventReportLike(id) {
	return request.post('cad-api/eventReport/click', {}, id).then(res => res.data)
}

// 事件上报评论列表取消点赞
export function updateEventReportUnlike(id) {
	return request.post('cad-api/eventReport/unclick', {}, id).then(res => res.data)
}

// 动态列表获取
export function getMomentsList(params) {
	return request.post('/cad-api/moments/page', params).then(res => res.data)
}

// 新增动态
export function addMoments(params) {
	return request.post('/cad-api/moments', params).then(res => res.data)
}

// 动态--单个获取
export function getMoments(id) {
	return request.get_1('/cad-api/moments', {}, id).then(res => res.data)
}

// 动态评论列表获取
export function getMomentsCommentsList(params) {
	return request.post('/cad-api/moments/comments/page', params).then(res => res.data)
}

// 动态评论-添加
export function addMomentsComments(params) {
	return request.post('/cad-api/moments/comments', params).then(res => res.data)
}

// 动态-点赞
export function updateMomentsLike(id) {
	return request.put('/cad-api/moments/click', {}, id).then(res => res.data);
}

// 动态-取消点赞
export function updateMomentsUnLike(id) {
	return request.put('/cad-api/moments/unclick', {}, id).then(res => res.data);
}

// 动态-修改-同步置顶
export function modifyMoments(params) {
	return request.put('/cad-api/moments/modify', params).then(res => res.data);
}

// 标签
export function getTag(params) {
	return request.post('/cad-api/tags/list', params).then(res => res.data)
}

// 党员学习-获取分页
export function getCommunistStudy(params) {
	return request.post('/cad-api/communistStudy/list', params).then(res => res.data)
}

// 党员学习-提醒学习
export function notifyCommunistStudy(params) {
	return request.post('/cad-api/communistStudy/notify/study', params).then(res => res.data)
}

// 纠纷事件-获取-分页
export function getArgMediateList(params) {
	return request.post('/cad-api/argMediate/page', params).then(res => res.data)
}

// 纠纷事件--单个获取
export function getArgMediate(id) {
	return request.get_1('/cad-api/argMediate', {}, id).then(res => res.data)
}

// 老娘舅-获取-分页
export function getUncelList(params) {
	return request.post('/cad-api/uncel/page', params).then(res => res.data)
}

// 老娘舅--单个获取
export function getUncel(id) {
	return request.get_1('/cad-api/uncel', {}, id).then(res => res.data)
}

// 村民列表(含搜索)
export function getVillagerList(params) {
	return request.get('/cad-api/villager', params).then(res => res.data)
}

// 村民详情
export function getVillager(id) {
	return request.get_1('/cad-api/villager', {}, id).then(res => res.data)
}

