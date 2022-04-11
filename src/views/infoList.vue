

<template>
  <div class="seting-box">
    <s-header :name="'信息列表'"   icon-right="icon-sousuo_o" @right-callback="handleGoRouter('search',{brand_code:brand_code})"></s-header>
    <div class="brand-container">
      <div class="tab" v-if="self_brand_code !== brand_code || self_brand_code === ''">
        <div class="tab-item" :class="{'active':curTab === item.value}" v-for="(item, index) in tabList" :key="index"  @click="toggleTab(item.value)">{{item.title}}</div>
      </div>
      <info-item :infoList="infoList" :selfBrandCode="self_brand_code" :brandCode="brand_code" @callback="handleGetInfoList"></info-item>
   
    </div>
  
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import sHeader from '@/components/SimpleHeader'
import infoItem from '@/components/infoItem'

import { getInfoList } from '@/service/index'
import { useRoute, useRouter } from 'vue-router'
import { getLocal } from '@/common/js/utils'

export default {
  components: {
    sHeader,
    infoItem
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      from: route.query.from,
      brand_code:"",
      self_brand_code:"",
      curTab: '',
      infoList:[],
      tabList:[
        {
          title: '全部',
          value: ''
        },
        {
          title: '跟进中',
          value: 1
        },
        {
          title: '未跟进',
          value: 0
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
      const { brand_code } = route.query;
      state.brand_code = brand_code;
      state.self_brand_code = getLocal("brand_code");
      handleGetInfoList();
    })
    const toggleTab = (tab)=>{
      state.curTab = tab;
      handleGetInfoList()
    }
    const handleGetInfoList = async () => {
      var params = {
        status:  state.curTab === 1 ? 1 : state.curTab === 0 ? 0 : '',
        isread: state.curTab === 2 ? 0 : state.curTab === 3 ? 1 : '',
        brand_code: state.brand_code,
        self_brand_code: state.self_brand_code
      }
      getInfoList(params).then((data)=>{
        state.infoList = data.list;
      });
      // if(state.self_brand_code !== state.brand_code) {
      
      // } else {
      //   getSelfInfoList(params).then((data)=>{
      //     state.infoList = data.list;
      //   });
      // }
    };
    const handleGoRouter = async (path,query) => {
      router.push({ path: path, query: query})
    }
    
    return {
      ...toRefs(state),
      toggleTab,
      handleGoRouter,
      handleGetInfoList
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .brand-container {
    padding: 10px 20px;
   
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
