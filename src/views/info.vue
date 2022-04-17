

<template>
  <div class="address-edit-box">
    <s-header
      name="查看信息"
      isComfirmBack
      @callback="handleFollow(false,false,'0')"
    ></s-header>
    <van-notice-bar
      left-icon="volume-o"
      :scrollable="false"
      v-if="logList.length > 0 && self_brand_code === 'admin'"
    >
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(item, index) in logList" :key="index"
          >{{ item.create_time }} {{item.brand_name}}查看了此信息,{{
            item.status == "0" ? "未跟进" : item.status == "1" ? "已跟进" : item.status == "2" ? "已放弃" : item.status == "3" ? "已成交" : ""
          }}&nbsp;&nbsp;<span @click="handleGoRouter('logList',{id:item.id,info_id:item.info_id,selfBrandCode:self_brand_code,brandCode:brand_code})">查看</span></van-swipe-item
        >
      </van-swipe>
    </van-notice-bar>
    <div>
      <div class="">
        <van-form>
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
            <div v-if="info.status == '1' || info.status == '3'">
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
          <div style="margin: 16px;text-align: center;" v-if="self_brand_code !== 'admin' && (info.status == '' || info.status == '0')">
            <van-button
              class="info-btn btn"
              round
              type="primary"
              @click="handleFollow(false,true,'0')"
            > 
              不跟进
            </van-button>
            <van-button
              class="info-btn btn two-btn"
              round
              type="primary"
              @click="handleFollow(true,true,'1')"
            >
              跟进
            </van-button>
          </div>
          <div style="margin: 16px;text-align: center;" v-if="self_brand_code !== 'admin' && info.status == '1'">
            <van-button
              class="info-btn btn"
              round
              type="primary"
              @click="handleDeal('2')"
            > 
              放弃
            </van-button>
            <van-button
              class="info-btn btn two-btn"
              round
              type="primary"
              @click="handleDeal('3')"
            >
              成交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { Toast, Dialog } from "vant";
import sHeader from "@/components/SimpleHeader";
import { useRoute, useRouter } from "vue-router";
import {
  updateKehuInfoRead,
  updateKehuInfoStatus,
  getInfo,
  getLogInfo,
} from "@/service/index";
import { natureList, fanganList } from "@/common/js/utils";
import { setLocal, getLocal } from "@/common/js/utils";

export default {
  components: {
    sHeader,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      natureList: natureList,
      fanganList: fanganList,
      info: {},
      logList: [],
      type: "",
      brand_code:"",
      self_brand_code:"",
      id: "",
      info_id:""
    });

    onMounted(async () => {
      const { type, id,info_id, selfBrandCode, brandCode } = route.query;
      state.type = type;
      state.id = id;
      state.self_brand_code = selfBrandCode;
      state.brand_code = brandCode;
      state.info_id = info_id;
      handleGetInfo();
      handleGetLogList();
    });
    const handleDeal = async (status) => {
      Dialog.confirm({
        title: "系统提示",
        message: `确定${status == '3' ? "成交" : "放弃"}该信息吗`,
      })
        .then(async () => {
          handleUpdateStatus(status);
        })
        .catch(() => {});
    };
   
    const handleFollow = async (result,isBtn,status) => {
      if (state.info.status !== "" && !result) {
        router.back();
        return;
      }
      if(!isBtn) {
        var tipNum = parseInt(getLocal("tipNum")) + 1;
         if (tipNum > 3 && !result ) {
          handleUpdateStatus(status);
          return;
        }
        setLocal("tipNum", tipNum);
      }
     
      Dialog.confirm({
        title: "系统提示",
        message: `确定${!result ? "不" : ""}跟进吗`,
      })
        .then(async () => {
          handleUpdateStatus(status);
        })
        .catch(() => {});
    };
    const handleUpdateStatus = async (status) => {
      const params = {
        id: state.id,
        info_id: state.info_id,
        status: status,
        brand_code: state.brand_code,
        self_brand_code: state.self_brand_code,
        curStatus: state.info.status,
      };
      await updateKehuInfoStatus(params).then(() => {
        if (['1','2','3'].indexOf(status) > -1) {
          Toast('操作成功');
          setTimeout(function(){
            window.location.reload();
          },1000)
        } else {
          setTimeout(() => {
            router.back();
          }, 1000);
        }
       
      });
    };
    const handleRead = async () => {
      const params = {
        id: state.id,
      };
      updateKehuInfoRead(params).then(() => {});
    };
    const handleGetInfo = async () => {
      const params = {
        info_id: state.info_id,
        self_brand_code: state.self_brand_code,
        brand_code: state.brand_code,
      };
      await getInfo(params).then((data) => {
        state.info = data.info;
        state.info.fanganDes = state.fanganList.filter(
          (item) => item.value === state.info.fangan
        )[0].name;
        state.info.natureDes = state.natureList.filter(
          (item) => item.value === state.info.nature
        )[0].name;
        if (state.info.isread === "0") {
          handleRead();
        }
      });
    };
    const handleGoRouter = async (path,query) => {
      router.push({ path: path, query: query})
    }
    const handleGetLogList = async () => {
      const params = {
        info_id: state.info_id,
        brand_code: state.brand_code,
        self_brand_code: state.self_brand_code,
      };
      await getLogInfo(params).then((data) => {
        state.logList = data.list;
      });
    };

    return {
      ...toRefs(state),
      handleGetInfo,
      handleFollow,
      handleDeal,
      handleRead,
      handleUpdateStatus,
      handleGetLogList,
      handleGoRouter
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
  font-size: 12px;

}
.info-btn {
  width: 100px;
  &.two-btn {
    margin-left: 10px;
  }
}
</style>
