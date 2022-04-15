

<template>
  <div class="seting-box">
    <s-header :name="'未读列表'" ></s-header>
   
    <div class="brand-container" >
      <info-item :infoList="infoList" :selfBrandCode="self_brand_code" :brandCode="brand_code" @callback="handleGetInfoList"></info-item>
    </div>
  
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import sHeader from '@/components/SimpleHeader'
import { getInfoList } from '@/service/index'
import {  useRouter } from 'vue-router'
import { getLocal } from '@/common/js/utils'
import infoItem from '@/components/infoItem'

export default {
  components: {
    sHeader,
    infoItem
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      search: "",
      brand_code:"",
      self_brand_code:"",
      infoList:[],
      isShow: false
    })

    onMounted(async () => {
      state.self_brand_code = getLocal("brand_code");
      handleGetInfoList();
    })
    const handleGetInfoList = async () => {
      var params = {
        status:  '',
        isread: 0,
        self_brand_code: state.self_brand_code
      }
      getInfoList(params).then((data)=>{
        state.infoList = data.list;
      });
    };
    const handleGoRouter = async (path,query) => {
      router.push({ path: path, query: query})
    }
    
    return {
      ...toRefs(state),
      handleGoRouter,
      handleGetInfoList
    }
  }
}
</script>
<style>
.van-search--show-action {
  padding: var(--van-search-padding) !important;
}
</style>
<style lang="less" scoped>
  @import '../common/style/mixin';
  .brand-container {
    padding: 10px 20px;
  
   
  }
</style>
