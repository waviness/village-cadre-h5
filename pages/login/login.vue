<template>
  <view class="container">
    <view class="login_box">
      <view class="form_label">
        <input
          class="login_input"
          placeholder-class="place-holder"
          type="number"
          maxlength="11"
          placeholder="手机号"
          v-model="loginForm.phone"
        />
      </view>

      <view class="form_label vcode_label">
        <input
          class="login_input vcode_input"
          placeholder-class="place-holder"
          type="number"
          maxlength="6"
          placeholder="验证码"
          :focus="autoVcode"
          v-model="loginForm.vcode"
        />
        <view class="get_vcode" v-if="!showSendCode" @click="getVcode()"
          >发送验证码</view
        >
        <view
          class="get_vcode"
          :class="showSendCode ? 'get_vcode_1' : ''"
          v-if="showSendCode"
          >重新获取（{{ times }}s）</view
        >
      </view>

      <view class="login-btn" @click="login()">登录</view>
    </view>
  </view>
</template>

<script>
import { mobileReg } from '../../common/js/util.js';
export default {
  data() {
    return {
      loginForm: {
        phone: '',
        vcode: '',
      },
      autoVcode: false,
      showVcodeEn: true,
      showSendCode: false, //发送验证码
      times: 0, //倒计时
      timer: '',
    };
  },
  onLoad() {},
  onShow() {},
  watch: {
    'loginForm.phone': function () {
      if (mobileReg.test(this.loginForm.phone)) {
        this.autoVcode = true;
      } else if (this.loginForm.phone.length == 11) {
        this.$toast('请输入正确的手机号');
      }
    },
  },
  methods: {
    // 手机号校验
    mobileValidate() {
      if (this.loginForm.phone == '') {
        this.$toast('请输入手机号');
        return false;
      } else if (!mobileReg.test(this.loginForm.phone)) {
        this.$toast('手机号格式错误');
        return false;
      } else {
        return true;
      }
    },
    // 表单校验
    validate() {
      if (this.mobileValidate()) {
        if (this.loginForm.vcode == '') {
          this.$toast('请输入验证码');
          return false;
        }
        return true;
      }
    },
    //发送验证码
    getVcode() {
      if (this.mobileValidate()) {
        uni.showLoading({
          title: '请求中...',
        });
        let obj = {
          mobile: this.loginForm.phone,
          typeCode: 'LOGIN',
        };
        this.$api
          .sendSmsCode(obj)
          .then(res => {
            uni.hideLoading();
            if (res.code == 200) {
              this.autoVcode = true;
              this.$toast(res.msg);
              const TIME_COUNT = 60;
              if (!this.timer) {
                this.times = TIME_COUNT;
                this.showSendCode = true;
                this.timer = setInterval(() => {
                  if (this.times > 0 && this.times <= TIME_COUNT) {
                    this.times--;
                  } else {
                    this.showSendCode = false;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              }
            } else {
              this.$toast(res.msg);
            }
          })
          .catch(error => {
            uni.hideLoading();
            this.$toast(error);
          });
      }
    },
    // 登录
    login() {
      uni.showLoading({ title: '登录中...' });
      this.$api
        .login({
          mobile: this.loginForm.phone,
          code: this.loginForm.vcode,
        })
        .then(res => {
          uni.hideLoading();
          this.$toast('登录成功');
          uni.setStorageSync('token', res.token);
          uni.setStorageSync('mobile', res.mobile);
          // 0：游客，1：村民
          uni.setStorageSync('role', res.role);
          // 是否已绑定微信号, 0：否，1：是
          uni.setStorageSync('needBindingWx', res.needBindingWx);
          if (res.role == 2 && res.needBindingWx) {
            uni.navigateTo({
              url: '../wxUserInfo/wxUserInfo',
            });
          } else {
            uni.redirectTo({
              url: '../index/index',
            });
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #ffffff;
}
.login_box {
  width: 636rpx;
  height: auto;
  position: absolute;
  top: 300rpx;
  left: 57rpx;

  .form_label {
    width: 600rpx;
    height: 108rpx;
    padding: 16rpx 0 0;
    margin: auto;
    border-bottom: 1px rgba(198, 198, 198, 0.5) solid;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .login_input {
      width: 600rpx;
      height: 108rpx;
      line-height: 108rpx;
      font-size: 32rpx;
      color: #333333;
    }

    .vcode_input {
      width: 480rpx;
    }
  }

  .vcode_label {
    position: relative;

    .get_vcode {
      height: 108rpx;
      line-height: 108rpx;
      font-size: 26rpx;
      color: #5fc2ff;
      z-index: 99;
      position: absolute;
      top: 16rpx;
      right: 18rpx;
    }
    .get_vcode_1 {
      color: #757575 !important;
    }
  }
}

.login-btn {
  width: 636rpx;
  height: 96rpx;
  line-height: 96rpx;
  font-size: 36rpx;
  text-align: center;
  color: #ffffff;
  background: #5fc2ff;
  border-radius: 48rpx;
  margin: 46rpx auto 0;
}
</style>
