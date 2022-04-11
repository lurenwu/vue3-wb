<template>
  <div :id="chartId" :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import {  toRefs,  watch, onMounted, computed } from "vue";
import * as echarts from "echarts";
export default {
  name: "line-chart",
  props: {
    chartId: {
      type: String,
      default: () => {
        return "line-chart";
      },
    },
    className: {
      type: String,
      default: () => {
        return "line-chart";
      },
    },
    height: {
      type: String,
      default: "100%",
    },
    width: {
      type: String,
      default: "100%",
    },
    xAxisData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    seriesData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props) {
    const { xAxisData, seriesData } = toRefs(props);
    // 配置信息
    const setOptions = computed(() => {
      let option = {
        yAxis: {
          type: "value",
        },
        xAxis: {
          type: "category",
          data: xAxisData.value,
        },
        series: [
          {
            type: "line",
            data: seriesData.value,
          },
        ],
      };
      return option;
    });
    // 创建图表
    function initChart() {
      let myChart = echarts.init(document.getElementById(props.chartId));
      myChart.setOption(setOptions.value);
      window.onresize = function () {
        //自适应大小
        myChart.resize();
      };
    }

    onMounted(() => {
      initChart();
    });
    // 监听传值，刷新图表
    watch([seriesData, xAxisData], () => {
      initChart();
    });

    return { setOptions, initChart };
  },
};
</script>
