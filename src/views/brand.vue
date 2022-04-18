

<template>
  <div class="seting-box">
    <s-header :name="'品牌列表'" noback center icon-center="icon-weidu2x" icon-right="icon-a-2_huaban1" @center-callback="handleGoRouter('/readList')" @right-callback="handleGoRouter('/publish',{ type: 'add', from:1})"></s-header>
   
    <div class="brand-container" v-for="(item, index) in brandList" :key="index"  @click="handleGoRouter('/infoList',{brand_code:item.brand_code})" >
      <div class="brand-item">
        <div class="img">
          <img :src="item.url">
        </div>
        <div class="item">
          <div>{{item.brand_name}}</div>
          <div>发布{{item.fabuSum}}个</div>
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
import { getLocal } from "@/common/js/utils";
import { getEchartInfo } from "@/service/index";

export default {
  components: {
    sHeader
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      from: route.query.from,
      self_brand_code:"",
      brandList:[],
      echartInfo:{}
    })

    onMounted(async () => {
      state.self_brand_code = getLocal("brand_code");
      await handleGetBrandList()
    })
    const handleGetEchartInfo = async () => {
      await getEchartInfo().then((data) => {
        state.brandList.forEach((brand) => {
          data.list.forEach((element) => {
            if (element.brand_code === brand.brand_code) {
              brand["fabuSum"] = element.brandfabuSum
            }
          });
        });
      });
    };
    

    const handleGetBrandList = async () => {
      getBrandList().then((data)=>{
        state.brandList = data.list;
        setLocal("brandList",JSON.stringify(state.brandList))
        handleGetEchartInfo();

      });
     
    };
    const handleGoRouter = async (path,query) => {
      router.push({ path: path, query: query})
    }
    
    return {
      ...toRefs(state),
      handleGetBrandList,
      handleGoRouter,
      handleGetEchartInfo
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
        background: #b0e1ff;
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
