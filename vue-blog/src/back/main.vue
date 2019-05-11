<template>
  <div class="main-charts">
    <el-row>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="col">
        <DoughuntChart></DoughuntChart>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="col">
        <BarSimple></BarSimple>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="col">
        <BasicLineChart></BasicLineChart>
      </el-col>
    </el-row>

    <el-row class="row-2">
      <el-col :span="24">
        <StackedAreaChart></StackedAreaChart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DoughuntChart from "./charts/doughnutChart";
import BarSimple from "./charts/barSimple";
import BasicLineChart from "./charts/basicLineChart";
import StackedAreaChart from "./charts/stackedAreaChart";

export default {
  data() {
    return {};
  },
  components: {
    DoughuntChart,
    BarSimple,
    BasicLineChart,
    StackedAreaChart
  }
};
</script>

<style lang="less" scoped>
.main-charts {
  padding: 20px;
}
.row-2 {
  margin: 50px 0;
}
</style>

