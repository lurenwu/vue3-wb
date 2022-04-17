

<template>
  <div class="seting-box">
    <s-header :name="'搜索'" ></s-header>
    <van-search
     style="padding-right: auto"
      v-model="search"
      show-action
      label="地址"
      placeholder="请输入搜索关键词"
    >
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
    </van-search>
    <div class="brand-container" v-if="search && isShow">
      <info-item :infoList="infoList" :selfBrandCode="self_brand_code" :brandCode="brand_code" @callback="handleGetInfoList"></info-item>
    </div>
  
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import sHeader from '@/components/SimpleHeader'
import { getInfoList,getSelfInfoList } from '@/service/index'
import { useRoute, useRouter } from 'vue-router'
import { getLocal } from '@/common/js/utils'
import infoItem from '@/components/infoItem'

export default {
  components: {
    sHeader,
    infoItem
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      search: "",
      brand_code:"",
      self_brand_code:"",
      infoList:[],
      isShow: false
    })

    onMounted(async () => {
      const { brand_code } = route.query;
      state.brand_code = brand_code;
      state.self_brand_code = getLocal("brand_code");
    })
    const onClickButton = () => handleGetInfoList();
    const handleGetInfoList = async () => {
      var params = {
        search: state.search,
        self_brand_code: state.self_brand_code
      }
        getInfoList(params).then((data)=>{
          state.isShow = true;
          state.infoList = data.list;
          state.brandList.forEach(item=>{
            state.infoList.forEach(info=>{
              if(item.brand_code === info.brand_code) {
                info.brand_name=item.brand_name
              }
            })
          })
        });
    };
    const handleGoRouter = async (path,query) => {
      router.push({ path: path, query: query})
    }
    
    return {
      ...toRefs(state),
      handleGoRouter,
      handleGetInfoList,
      onClickButton
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
