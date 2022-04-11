

<template>
  <div class="seting-box">
    <s-header
      :name="'跟进列表'"
    ></s-header>
    <div>
      <table>
        <tr>
          <td>时间</td>
          <td>状态</td>
          <td>查看方</td>
        </tr>
        <tr v-for="(item, index) in logList" :key="index">
          <td>{{ item.create_time }}</td>
          <td>{{
            info.status == "0" ? "未跟进" : info.status == "1" ? "已跟进" : ""
          }}</td>
          <td>{{ item.brand_name }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import sHeader from "@/components/SimpleHeader";

import { getLogInfo,getInfo } from "@/service/index";
import { useRoute, useRouter } from "vue-router";
import { getLocal } from "@/common/js/utils";

export default {
  components: {
    sHeader,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      from: route.query.from,
      brand_code: "",
      self_brand_code: "",
      logList:[],
      id: "",
      info_id:"",
      info: {
       
      },
    });

    onMounted(async () => {
      const { type, id,info_id,selfBrandCode } = route.query;
      state.type = type;
      state.id = id || "";
      state.brand_code = getLocal("brand_code");
      state.self_brand_code = selfBrandCode;
      state.info_id = info_id;

      state.brandList = JSON.parse(getLocal("brandList"));

      if (id) await handleGetInfo();
      handleGetLogList();
    });
     const handleGetInfo = async () => {
      const params = {
        info_id: state.id,
      };
      await getInfo(params).then((data) => {
        state.info = data.info;
      });
    };
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
    const handleGoRouter = async (path, query) => {
      router.push({ path: path, query: query });
    };

    return {
      ...toRefs(state),
      handleGoRouter,
      handleGetLogList,
      handleGetInfo
    };
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
table {
  border: 1px solid #ccc;
  width: 100%;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
}
table tr {
  border: 1px solid #ddd;
  padding: 5px;
}
table th,
table td {
  padding: 10px;
  text-align: center;
}
table th {
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
} /* <= 568px */

</style>
