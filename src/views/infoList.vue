

<template>
  <div class="seting-box">
    <s-header
      :name="'信息列表'"
      noback
      center
      icon-center="icon-sousuo_o"
      icon-right="icon-a-2_huaban1"
      @center-callback="handleGoRouter('search')"
      @right-callback="handleGoRouter('/publish', { type: 'add', from: 1 })"
    ></s-header>
    <div class="chart-box">
      <i class="iconfont icon-a-dakai1x" @click="handleGoRouter('/echart')"></i>
    </div>
    <van-pull-refresh v-model="loading" @refresh="handleGetInfoList">
      <div class="brand-container">
        <div class="tab">
          <div
            class="tab-item"
            :class="{ active: curTab === item.value }"
            v-for="(item, index) in tabList"
            :key="index"
            @click="toggleTab(item.value)"
          >
            {{ item.title }}
          </div>
        </div>
        <div class="tab-child" v-if="curTab == '3'">
          <div
            class="tab-child-item"
            :class="{ active: curDone === item.value }"
            v-for="(item, index) in doneList"
            :key="index"
            @click="toggleTabChild(item.value)"
          >
            {{ item.title }}
          </div>
        </div>
        <info-item
          :infoList="infoList"
          :selfBrandCode="self_brand_code"
          @callback="handleGetInfoList"
        ></info-item>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
// status '': 未读 '0': '已读未跟进'， '1': '已读跟进中' ，'2':'已放弃' ，'3':'已成交'
import { reactive, onMounted, toRefs, ref } from "vue";
import sHeader from "@/components/SimpleHeader";
import infoItem from "@/components/infoItem";

import { getInfoList } from "@/service/index";
import { useRoute, useRouter } from "vue-router";
import { getLocal } from "@/common/js/utils";

export default {
  components: {
    sHeader,
    infoItem,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);
    const state = reactive({
      from: route.query.from,
      brand_code: "",
      self_brand_code: "",
      curTab: "",
      curDone: "1",
      infoList: [],
      brandList: [],
      doneList: [
        {
          title: "我发布的成交",
          value: "1",
        },
        {
          title: "我收到的信息成交",
          value: "2",
        },
      ],
      tabList: [
        {
          title: "我发布",
          value: "",
        },
        {
          title: "跟进中",
          value: "1",
        },
        {
          title: "已成交",
          value: "3",
        },
        {
          title: "已放弃",
          value: "2",
        },
        {
          title: "未读",
          value: "4",
        },
        {
          title: "已读",
          value: "5",
        },
      ],
    });

    onMounted(async () => {
      // const { brand_code } = route.query;
      state.self_brand_code = getLocal("brand_code");
      state.brandList = JSON.parse(getLocal("brandList"));

      handleGetInfoList();
    });
    const toggleTab = (tab) => {
      state.curTab = tab;
      handleGetInfoList();
    };
    const toggleTabChild = (tab) => {
      state.curDone = tab;
      handleGetInfoList();
    };

    const handleGetInfoList = async () => {
      var isRead = ["4", "5"].indexOf(state.curTab) > -1;
      var params = {
        status: !isRead ? state.curTab : "",
        isread: state.curTab === "4" ? 0 : state.curTab === "5" ? 1 : "",
        isSelfDone: state.curTab === "3" ? state.curDone : "",
        self_brand_code: state.self_brand_code,
      };
      getInfoList(params).then((data) => {
        state.infoList = data.list;
        state.brandList.forEach((item) => {
          state.infoList.forEach((info) => {
            if (item.brand_code === info.brand_code) {
              info.brand_name = item.brand_name;
            }
          });
        });
        loading.value = false;
      });
      // if(state.self_brand_code !== state.brand_code) {

      // } else {
      //   getSelfInfoList(params).then((data)=>{
      //     state.infoList = data.list;
      //   });
      // }
    };
    const handleGoRouter = async (path, query) => {
      router.push({ path: path, query: query });
    };

    return {
      ...toRefs(state),
      loading,
      toggleTab,
      handleGoRouter,
      handleGetInfoList,
      toggleTabChild,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.chart-box {
  position: fixed;
  z-index: 10;
  right: 2%;
  bottom: 10%;
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
.brand-container {
  padding: 10px 20px;
  height: calc(100vh - 1.57333rem);
  .tab {
    .fj();
    margin-bottom: 15px;
    .tab-item {
      text-align: center;
      border: 1px solid #b8b8b8;
      width: 50px;
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
  .tab-child {
    display: flex;
    margin-bottom: 15px;
    .tab-child-item {
      text-align: center;
      height: 30px;
      line-height: 30px;
      align-items: center;
      color: #b8b8b8;
      font-size: 12px;
      flex: 1;
      &.active {
        border: 0;
        border-bottom: 1px solid #cc322c;
      }
    }
  }
}
</style>
