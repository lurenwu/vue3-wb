

<template>
  <div>
    <div class="info-box" v-for="(item, index) in infoList" :key="index" @click="handleGoRouter((selfBrandCode !== brandCode ? 'info':'publish'),{id:item.id,info_id:item.info_id,selfBrandCode:selfBrandCode,brandCode:brandCode})">
        <div class="info-item">
           <div class="item">
            <div class="title">{{item.address}}</div>
            <div v-if="selfBrandCode !== brandCode">{{item.status == '0' ? '未跟进' : item.status == '1' ? '跟进中' : ''}}</div>
          </div>
          <div class="item"  v-if="selfBrandCode !== brandCode">
            <div></div>
            <div>{{item.isread == '0' ? '未读' : '已读'}}</div>
          </div>
          <div class="item">
            <div>{{item.nature === '0' ? '毛坯' : '二改房'}}</div>
            <div>{{item.create_time}}</div>
          </div>
        </div>
      </div>
      <van-empty description="暂无数据" v-if="infoList.length === 0"></van-empty>
  </div>
</template>

<script>
import {  useRouter } from 'vue-router'

import { ref } from 'vue'
export default {
  props: {
    infoList: {
      type: Array
    },
    selfBrandCode: {
      type: String,
      default: ''
    },
    brandCode: {
      type: String,
      default: ''
    },
  },
  emits: ['callback'],
  setup(props) {
    const isback = ref(props.noback)
    const router = useRouter()

    const handleGoRouter = async (path,query) => {
      router.push({ path: path, query: query})
    }
   
    return {
      isback,
      handleGoRouter
    }
  }
 
}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .info-box {
      margin-bottom: 20px;
      width: 100%;
    
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
</style>
