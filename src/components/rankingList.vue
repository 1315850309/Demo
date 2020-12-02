<template>
  <div class="rank-main">
    <div class="rank-head">
      <span class="title">排名</span>
      <el-select
        size="mini"
        v-model="rankType"
      >
        <el-option
          v-for="(it,i) in rankTypeOptions"
          :key="i"
          :label="it.label"
          :value="it.value"
        ></el-option>
      </el-select>
    </div>
    <div class="rank-list">
      <div class="rank-box">
        <div class="rank-name">
          <span
            class="rank-number"
            :class="{rank:0==0}"
          >1</span>南湖区
        </div>
        <div
          class="rank-num-chart"
          :style="`width:${(22/44*100)}px`"
        ></div>
        <div class="num">{{num}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    rankListData: {
      type: Array,
      default: () => { return [] }
    },
    rankTypeOptions: {
      type: Array,
      default: () => {
        return [
          { label: "总信访量", value: "总信访量" }
        ]
      }
    }
  },
  data() {
    return {
      rankType: ""
    }
  }
}
</script>
<style lang="less" scoped>
.rank {
  background: #0090ff;
  border-radius: 9px;
}
.rank-main {
  width: 100%;
  height: auto;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #dbf2ff;
  .rank-head {
    padding: 0px 10px 0px 10px;
    width: 100%;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(51, 110, 197, 0.3);
    /deep/ .el-select {
      width: 100px;
      input {
        background: transparent;
        border: none;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #3c8be5;
      }
      input::-webkit-input-placeholder {
        color: #3c8be5 !important;
      }
      i {
        height: auto;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #3c8be5;
      }
    }
  }
  .rank-list {
    padding: 10px 10px 10px 10px;
    width: 100%;
    background: rgba(51, 110, 197, 0.4);
    .rank-box {
      width: 100%;
      display: flex;
      align-items: center;
      .rank-number {
        font-size: 15px;
        margin-right: 10px;
        width: 18px;
        height: 18px;
        text-align: center;
        display: inline-block;
      }
      .rank-num-chart {
        margin-left: 30px;
        width: 30px;
        height: 8px;
        border-radius: 4px;
        background-image: linear-gradient(to right, #0090ff, #2c63ff);
      }
      .num {
        margin-left: 5px;
      }
    }
  }
}
</style>