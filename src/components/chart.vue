<template>
  <div class="chart-main" :ref="ref"></div>
</template>
<script>
import { initEcharts } from "@/utils/initEchart";
export default {
  props: {
    chartOption: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      ref: Date.now(),
      instance: null,
    };
  },
  mounted() {
    window.addEventListener("resize", this.resize);
  },
  methods: {
    resize() {
      if (this.instance) {
        this.instance.resize();
      }
    },
    init() {
      if (this.instance) {
        this.instance.dispose();
      }
      initEcharts(this.$refs[this.$ref]).then((echartInstanc) => {
        this.instance = echartInstanc;
        this.instance.setOptopn(this.chartOption);
      });
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
};
</script>
<style lang="less" scoped>
.chart-main {
  width: 100%;
  height: 100%;
}
</style>