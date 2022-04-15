<template>
  <div class="container">
    <s-header :name="'图表'"></s-header>
    <div>
      <div class="box-wrap">
        <!-- <LineChart style="height:300px" :xAxisData="chartData.xAxisData" :seriesData="chartData.seriesData" /> -->
      </div>
      <div class="echart-total-item">
        <div class="item">
          <div class="title">累积发布信息总数</div>
          <div class="value">
            {{ echartInfo && echartInfo.info && echartInfo.info.fabuSum }}
          </div>
        </div>
        <div class="item">
          <div class="title">累积跟进信息总数</div>
          <div class="value">
            {{ echartInfo && echartInfo.info && echartInfo.info.genjinSum }}
          </div>
        </div>
      </div>
      <div class="brand-tongji">
        <span>各品牌信息统计</span>
        <div class="echart-box" v-for="(item, index) in echartInfo.newList" :key="index">
          <div>{{item.brand_name}}</div>
          <div class="echart-total-item">
            <div class="item">
              <div class="title">各品牌发布总数</div>
              <div class="value">{{item.fabuSum}}</div>
            </div>
            <div class="item">
              <div class="title">各品牌获取总数</div>
              <div class="value">{{item.brandgenjinSum}}</div>
            </div>
             <div class="item">
              <div class="title">各品牌被获取有效数</div>
              <div class="value">{{item.brandbeigenjinSum}}</div>
            </div>
          </div>
        </div>
     
      </div>
    </div>
    <!-- 模拟接口数据更改 -->
    <!-- <button @click="changeChartData">点击更改传值</button> -->
  </div>
</template>

<script >
import { reactive, onMounted, toRefs } from "vue";
// import LineChart from "@/components/LineChart.vue";
import sHeader from "@/components/SimpleHeader";
import { getEchartInfo } from "@/service/index";
import { getLocal } from "@/common/js/utils";

export default {
  name: "charts",
  components: {
    // LineChart,
    sHeader,
  },
  setup() {
    const state = reactive({
      echartInfo: {},
      brandList: [],
    });
    const chartData = reactive({
      xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      seriesData: [150, 230, 224, 218, 135, 147, 260],
    });
    function changeChartData() {
      chartData.seriesData = [218, 135, 147, 260, 150, 230, 224];
    }
    onMounted(async () => {
      state.brandList = JSON.parse(getLocal("brandList"));
      handleGetEchartInfo();
    });

    const handleGetEchartInfo = async () => {
      await getEchartInfo().then((data) => {
        state.echartInfo = data;
        state.echartInfo.newList = []
        state.brandList.forEach((brand) => {
          var item = {}
        
          state.echartInfo.list.forEach((element) => {
           
            if (element.brand_code === brand.brand_code) {
              
              item["fabuSum"] = element.brandfabuSum
            }
          });
          state.echartInfo.list1.forEach((element) => {
           if (element.brand_code === brand.brand_code) {
             item["brandbeigenjinSum"] = element.brandbeigenjinSum
            }
          });
          state.echartInfo.list2.forEach((element) => {
            if (element.brand_code === brand.brand_code) {
              item["brandgenjinSum"] = element.brandgenjinSum
            }
          });
          item["brand_code"] = brand.brand_code;
          item["brand_name"] = brand.brand_name;
          state.echartInfo.newList.push(item)
        });
        console.log(state.echartInfo.newList);
      });
    };
    return {
      ...toRefs(state),
      chartData,
      changeChartData,
      handleGetEchartInfo,
    };
  },
};
</script>
<style lang="less">
.echart-total-item {
  padding: 20px;
  font-size: 14px;
  border-bottom: 1px solid #babcc5;
  display: flex;
  font-weight: 500;

  .item {
    flex: 1;
    text-align: center;
  }
  .title {
    font-size: 16px;
    padding-bottom: 10px;
  }
  .value {
    color: #9e9e9e;
  }
}
&.brand-tongji {
  font-weight: 500;
  font-size: 16px;
  padding: 20px;
  font-size: 14px;
}
.echart-box {
  padding:15px 10px;
  font-size: 14px;
  .title {
    font-size: 14px;
  }
  .item {
    padding:0 8px;
  }
  .echart-total-item {
    padding: 10px 0;
  }
}
</style>
