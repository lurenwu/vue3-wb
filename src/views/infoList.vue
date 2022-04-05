

<template>
  <div class="seting-box">
    <s-header :name="'信息列表'"   icon-right="icon-sousuo_o" @right-callback="handleGoSearch"></s-header>
    <div class="brand-container">
      <div class="tab">
        <div class="tab-item" :class="{'active':curTab === item.value}" v-for="(item, index) in tabList" :key="index" @click="toggleTab(item.value)">{{item.title}}</div>
      </div>
      <div class="info-box">
        <div class="info-item">
          <div class="item">
            <div class="title">品牌品牌</div>
            <div>跟进中</div>
          </div>
          <div class="item">
            <div></div>
            <div>已读</div>
          </div>
          <div class="item">
            <div>二手房</div>
            <div>2020/03/03</div>
          </div>
        </div>
      </div>
      <div class="info-box">
        <div class="info-item">
          <div class="item">
            <div class="title">品牌品牌</div>
            <div>跟进中</div>
          </div>
          <div class="item">
            <div></div>
            <div>已读</div>
          </div>
          <div class="item">
            <div>二手房</div>
            <div>2020/03/03</div>
          </div>
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
      curTab: '',
      tabList:[
        {
          title: '全部',
          value: ''
        },
        {
          title: '跟进中',
          value: 0
        },
        {
          title: '未跟进',
          value: 1
        },
        {
          title: '未读',
          value: 2
        },
        {
          title: '已读',
          value: 3
        }
      ]
    })

    onMounted(async () => {
    
    })
    const toggleTab = (tab)=>{
      state.curTab = tab;
    }
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
    const handleGoSearch = async () => {
      router.push({ path: '/publish', query: { type: 'add', from:1 }})
    }
    
    return {
      ...toRefs(state),
      toggleTab,
      save,
      handleLogout,
      handleGoSearch
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .brand-container {
    padding: 10px 20px;
    .info-box {
      margin-bottom: 20px;
      width: 100%;
      height: 100px;
      box-shadow: 1px 3px 10px 5px #eeeaea;
      border-radius: 5px;

      .info-item {
        padding: 10px 15px;
      }
      .item {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #cfcfcf;
        align-items: center;
        padding-bottom: 10px;
        .title {
          font-weight: 500;
          color: #000;
          font-size: 16px
        }
      }
    }
    .tab {
      .fj();
      margin-bottom: 15px;
      .tab-item {
        text-align: center;
        border: 1px solid #b8b8b8;
        width: 60px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        color: #b8b8b8;
        &.active {
          color: #fff;
          border: 0;
          background: #cc322c;
        }
      }
    }
  }
</style>
