<template>
  <div class="container">
    <s-header :name="'图表'"   ></s-header>
    <div >
      <div class="box-wrap">
        <LineChart style="height:300px" :xAxisData="chartData.xAxisData" :seriesData="chartData.seriesData" />
      </div>
    </div>
   <!-- 模拟接口数据更改 -->
    <!-- <button @click="changeChartData">点击更改传值</button> -->
  </div>
</template>

<script >
import { reactive } from "vue";
import LineChart from "@/components/LineChart.vue";
import sHeader from '@/components/SimpleHeader'

export default {
  name: "charts",
  components: {
    LineChart,
    sHeader
  },
  setup() {
    const chartData = reactive({
      xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      seriesData: [150, 230, 224, 218, 135, 147, 260],
    });
    function changeChartData() {
      chartData.seriesData = [218, 135, 147, 260, 150, 230, 224];
    }
    return {
      chartData,
      changeChartData,
    };
  },
};
</script>
