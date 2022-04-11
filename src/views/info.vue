

<template>
  <div class="address-edit-box">
    <s-header name="查看信息" isComfirmBack @callback="handleFollow(false)"></s-header>
    <van-notice-bar left-icon="volume-o" :scrollable="false" v-if="logList.length > 0">
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(item, index) in logList" :key="index">{{item.create_time}} 品牌方查看了此信息，{{info.status == '0' ? '未跟进' : info.status == '1' ? '已跟进': ''}}</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <div >
      <div class="">
        <van-form >
          <van-cell-group inset>
              <van-field
                v-model="info.address"
                rows="2"
                autosize
                readonly
                label="地址"
                type="textarea"
                maxlength="100"

              />
              <van-field
                v-model="info.natureDes"
                name="性质"
                readonly
                label="性质"
              />
              <div   v-if="info.status == '1'">
            <van-field
              
              v-model="info.name"
              name="客户姓名"
              label="客户姓名"
              readonly
            />
            <van-field
              v-model="info.phone"
              name="客户手机号"
              readonly
              label="客户手机号"
            />
            <van-field
              v-model="info.phone2"
              name="客户手机号2"
              readonly
              label="客户手机号2"
            />
          
            <van-field
              v-model="info.mianji"
              name="房屋面积"
              label="房屋面积"
              readonly
            />
            <van-field
              v-model="info.style"
              name="装修风格"
              label="装修风格"
              readonly
            />
            <van-field
              v-model="info.jieduan"
              name="装修阶段"
              label="装修阶段"
              readonly
            />
            <van-field
              v-model="info.yusuan"
              name="装修预算"
              label="装修预算"
              readonly
            />
            <van-field
              v-model="info.design_name"
              name="设计师姓名"
              label="设计师姓名"
              readonly
            />
            <van-field
              v-model="info.design_phone"
              name="设计师电话"
              label="设计师电话"
              readonly
            />
            <van-field
              v-model="info.fanganDes"
              name="装修方案"
              label="装修方案"
              readonly
            />
           
            
              <van-field
                v-model="info.remark"
                rows="2"
                autosize
                label="备注"
                type="textarea"
                maxlength="100"
                readonly
              />
              </div>
          </van-cell-group>
          <div style="margin: 16px">
            <van-button class="btn" round block type="primary" v-if="info.status == '' || info.status == '0'" @click="handleFollow(true)">
              跟进
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { Toast,Dialog } from "vant";
import sHeader from "@/components/SimpleHeader";
import { useRoute,useRouter } from "vue-router";
import { updateKehuInfoRead, updateKehuInfoStatus, getInfo,getLogInfo } from '@/service/index'
import { natureList,fanganList } from '@/common/js/utils'
import { setLocal,getLocal } from '@/common/js/utils'

export default {
  components: {
    sHeader,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      natureList:natureList,
      fanganList:fanganList,
      info: {},
      logList:[],
      type:"",
      id:"",

    });

    onMounted(async () => {
      const { type,id,selfBrandCode,brandCode } = route.query
      state.type = type
      state.id = id
      state.selfBrandCode = selfBrandCode
      state.brandCode = brandCode
    
    
      handleGetInfo();
      handleGetLogList();
    });
    
    const handleFollow = async (result) => {
      if(state.info.status !== '' && !result) {
        router.back()
        return;
      }
      var tipNum = parseInt(getLocal('tipNum')) + 1
      if(tipNum > 3 && !result) {
        handleUpdateStatus(result)
        return
      }
      setLocal('tipNum', tipNum)
      Dialog.confirm({
        title: '系统提示',
        message:
          `确定${!result ? '不': ''}跟进吗`,
      }).then(async () => {
        handleUpdateStatus(result)
      })
      .catch(() => {
      });
     
    };
     const handleUpdateStatus = async (result) => {
       const params = {
        id: state.id,
        status: result ? 1 : 0,
        brand_code : state.brandCode,
        curStatus: state.info.status
      };
        await updateKehuInfoStatus(params).then(()=>{
          if(result) {
            Toast("跟进成功");
          } 
          setTimeout(() => {
            router.back()
          }, 1000)
        }); 
    };
    const handleRead = async () => {
      const params = {
        id: state.id,
      
      };
      updateKehuInfoRead(params).then(()=>{
        
      });
    };
     const handleGetInfo = async () => {
    
      const params = {
        info_id: state.id,
        self_brand_code: state.selfBrandCode,
        brand_code:state.brandCode,
      };
      await getInfo(params).then((data)=>{
        state.info = data.info;
        state.info.fanganDes = state.fanganList.filter(item=> item.value === state.info.fangan)[0].name;
        state.info.natureDes = state.natureList.filter(item=> item.value === state.info.nature)[0].name;
        if(state.info.isread === '0') {
          handleRead()
        }
      })
    };
    const handleGetLogList = async () => {
    
      const params = {
        info_id: state.id,
      };
      await getLogInfo(params).then((data)=>{

        state.logList = data.list;
      })
    };
   
    
    return {
      ...toRefs(state),
      handleGetInfo,
      handleFollow,
      handleRead,
      handleUpdateStatus,
      handleGetLogList
    };
  },
};
</script>

<style lang="less">
@import "../common/style/mixin";
.edit {
  .van-field__body {
    textarea {
      height: 26px !important;
    }
  }
}
.address-edit-box {
  .van-address-edit {
    .van-cell {
      font-size: 12px;

    }
    .van-button--danger {
      background: @primary;
      border-color: @primary;
    }
    .van-switch--on {
      background: @primary;
    }
  }
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
} 
</style>
