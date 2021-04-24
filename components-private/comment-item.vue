<template>
  <view class="comment-item">
    <view class="comment-item__thumb-wrap">
      <image class="comment-item__thumb" :src="data.avatar" />
    </view>
    <view class="comment-item-meta">
      <view class="comment-item-meta__header">
        <view class="comment-item-meta__name">{{ data.name }}</view>
        <view class="comment-item-meta__tag">{{ data.cadreTitle }}</view>
        <view class="comment-item-meta__time">{{ data.time }}</view>
      </view>
      <view class="comment-item-meta-content">
        <view v-if="data.pidName" class="comment-item-meta-content__value-wrap">
          <view class="comment-item-meta-content__label">
            回复
            <view class="comment-item-meta-content__label-name">
              {{ data.pidName }}
            </view>
            ：
          </view>
          <view class="comment-item-meta-content__value">
            {{ data.content }}
          </view>
        </view>
        <view v-else class="comment-item-meta-content__value-wrap">
          <view class="comment-item-meta-content__value">
            {{ data.content }}
          </view>
        </view>
        <view class="comment-item-meta-content__button" @click="onClick">
          回复
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CommentItem',

  props: {
    data: {
      type: Object,
      default: () => {},
    },

    isReply: Boolean,
  },

  computed: {
    computedTimeDiff({ data }) {
      return this.$u.timeFrom(data.createTime);
    },
  },

  methods: {
    onClick() {
      this.$emit('click-comment');
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin baseFontSize() {
  font-size: 28rpx;
  line-height: 40rpx;
}

@mixin flex($align: center, $d: flex) {
  display: $d;
  align-items: $align;
}

.comment-item {
  @include flex(top);

  &__thumb-wrap {
    padding-top: 8rpx;
  }

  &__thumb {
    width: 72rpx;
    height: 72rpx;
    border-radius: 8rpx;
  }

  &-meta {
    margin-left: 24rpx;
    flex: 1;

    &__header,
    &-content {
      @include flex;
    }

    &__header {
      margin-bottom: 8rpx;
    }

    &__name {
      color: #333;
      @include baseFontSize;
    }

    &__tag,
    &__time {
      font-size: 22rpx;
      line-height: 32rpx;
      color: #696969;
    }

    &__tag {
      margin-left: 16rpx;
    }

    &__time {
      margin-left: 24rpx;
    }

    &-content {
      @include flex(flex-end);
      justify-content: space-between;

      &__value-wrap {
        flex: 1;
      }

      &__value,
      &__label,
      &__label-name,
      &__button {
        @include baseFontSize;
      }

      &__value {
        display: inline;
        color: #5fc2ff;
      }

      &__label {
        color: #333;
        @include flex(center, inline-flex);

        &-name {
          width: 84rpx;
        }
      }

      &__button {
        color: #999;
      }
    }
  }
}
</style>
