<template>
  <v-chart class="chart" :option="props.options" autoresize />
</template>
<script lang="ts" setup>
import "echarts";
import VChart from "vue-echarts";
const props = defineProps({
  options: { type: Object, required: true },
});

</script>
<style lang="less" scoped>
.chart {
  height: 50vh;
  padding: 10px;
}
</style>
