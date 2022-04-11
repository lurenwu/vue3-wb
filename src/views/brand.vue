

<template>
  <div class="seting-box">
    <s-header :name="'品牌列表'" noback  icon-right="icon-a-2_huaban1" @right-callback="handleGoRouter('/publish',{ type: 'add', from:1})"></s-header>
    <div class="chart-box">
      <i class="iconfont icon-a-dakai1x" @click="handleGoRouter('/echart')"></i>
    </div>
    <div class="brand-container" v-for="(item, index) in brandList" :key="index" @click="handleGoRouter('/infoList',{brand_code:item.brand_code})">
      <div class="brand-item">
        <div class="img">
          <img :src="item.url">
        </div>
        <div class="item">
          <div>{{item.brand_name}}</div>
          <div>发布100 获取200</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import sHeader from '@/components/SimpleHeader'
import {  getBrandList } from '@/service/index'
import { setLocal } from '@/common/js/utils'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    sHeader
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      from: route.query.from,
      brandList:[
      
      ]
    })

    onMounted(async () => {
      handleGetBrandList()
    })

    

    const handleGetBrandList = async () => {
      getBrandList().then((data)=>{
        state.brandList = data.list;
        setLocal("brandList",JSON.stringify(state.brandList))
      });
     
    };
    const handleGoRouter = async (path,query) => {
      router.push({ path: path, query: query})
    }
    
    return {
      ...toRefs(state),
      handleGetBrandList,
      handleGoRouter
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
  .chart-box {
    position: fixed;
    z-index: 10;
    right: 2%;
    bottom:10%;
    font-size: 20px;
    background: #1989fa;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    color: #fff;
    .iconfont {
      font-size: 20px;
    }
  }
</style>
