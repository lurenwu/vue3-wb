

<template>
  <div class="seting-box">
    <s-header :name="'品牌列表'" noback  icon-right="icon-a-2_huaban1" @right-callback="handleGoPublish"></s-header>
    <div class="brand-container" v-for="(item, index) in brandList" :key="index">
      <div class="brand-item">
        <div class="img">
          <img :src="item.url">
        </div>
        <div class="item">
          <div>品牌品牌</div>
          <div>发布100 获取200</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import md5 from 'js-md5'
import sHeader from '@/components/SimpleHeader'
import {  EditUserInfo, logout } from '@/service/user'
import { setLocal } from '@/common/js/utils'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    sHeader
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      nickName: '',
      introduceSign: '',
      password: '',
      from: route.query.from,
      brandList:[
        {
          url: require('../../static/img/gdqz.png'),
        },
        {
          url: require('../../static/img/htydb.png'),
        },{
          url: require('../../static/img/hyjc.png'),
        },{
          url: require('../../static/img/mjjc.png'),
        },{
          url: require('../../static/img/qjs.png'),
        },{
          url: require('../../static/img/rjzm.png'),
        },{
          url: require('../../static/img/xhmc.png'),
        },{
          url: require('../../static/img/xnwj.png'),
        },{
          url: require('../../static/img/yncz.png'),
        },{
          url: require('../../static/img/zcssj.png'),
        }
      ]

    })

    onMounted(async () => {
    
    })

    const save = async () => {
      const params = {
        introduceSign: state.introduceSign,
        nickName: state.nickName
      }
      if (state.password) {
        params.passwordMd5 = md5(state.password)
      } 
      await EditUserInfo(params)
      Toast.success('保存成功')
    }

    const handleLogout = async () => {
      const { resultCode } = await logout()
      if (resultCode == 200) {
        setLocal('token', '')
        window.location.href = '/home'
      }
    }
    const handleGoPublish = async () => {
      router.push({ path: '/publish', query: { type: 'add', from:1 }})
    }
    
    return {
      ...toRefs(state),
      save,
      handleLogout,
      handleGoPublish
    }
  }
}
</script>

<style lang="less" scoped>
  .brand-container {
    padding: 10px 20px;
    .brand-item {
      padding-bottom: 5px;
      .img {
        width: 335px;
        height: 128px;
        overflow: hidden;
        background: #ff5722;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 35%;
        }
      }
      .item {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        padding-top: 5px;
      }
    }
  }
</style>
