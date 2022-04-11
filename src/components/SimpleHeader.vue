

<template>
  <header class="simple-header van-hairline--bottom">
    <i v-if="!isback" class="nbicon nbfanhui" @click="goBack"></i>
    <i v-else></i>
    <div class="simple-header-name">{{ name }}</div>
    <i class="iconfont" :class="iconRight ? iconRight : ''" @click="handleRight"></i>
  </header>
  <div class="block" />
</template>

<script>
import { Dialog } from "vant";

import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  props: {
    iconRight: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    back: {
      type: String,
      default: ''
    },
    noback: {
      type: Boolean,
      default: false
    },
    isComfirmBack: {
      type: Boolean,
      default: false
    }
  },
  emits: ['callback','right-callback'],
  setup(props, ctx) {
    const isback = ref(props.noback)
    const router = useRouter()
    const goBack = () => {
      if(props.isComfirmBack) {
        Dialog.confirm({
          title: '系统提示',
          message:
            '确定不跟进吗',
        }).then(() => {
          ctx.emit('callback')
          if (!props.back) {
            router.go(-1)
          } else {
            router.push({ path: props.back })
          }
          console.log(1)
        })
        .catch(() => {
          // on cancel
        });
      } else {
        if (!props.back) {
          router.go(-1)
        } else {
          router.push({ path: props.back })
        }
        console.log(1)
        ctx.emit('callback')
      }
     
    }
    const handleRight = () => {
      console.log(1)
      ctx.emit('right-callback')
    }
    return {
      handleRight,
      goBack,
      isback
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .simple-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    .simple-header-name {
      font-size: 14px;
    }
    .iconfont {
      font-size: 20px;
    }
  }
  .block {
    height: 44px;
  }
</style>
