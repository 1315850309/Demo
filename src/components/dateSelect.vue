<template>
  <div class="main">
    <div class="tab">
      <span
        :class="{active:type=='昨日'}"
        @click="datePick('昨日')"
      >昨日</span>
      <span
        :class="{active:type=='近七日'}"
        @click="datePick('近七日')"
      >近七日</span>
      <span
        :class="{active:type=='近一月'}"
        @click="datePick('近一月')"
      >近一月</span>
    </div>
    <div class="date">
      <el-date-picker
        v-model="dateValue"
        type="daterange"
        format="yyyy/MM/dd"
        @change="dateChange"
        value-format="yyyy/MM/dd"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: "",
      dateValue: undefined
    }
  },
  methods: {
    dateChange() {
      this.type = ""
      this.$emit("valueChange", this.dateValue)
    },
    datePick(checkType) {
      if (this.type == checkType) {
        return
      }
      this.dateValue = undefined
      this.type = checkType
      console.log(this.type, "checkType")
      let date = new Date();
      let startTime = date.getTime(); //开始的时间戳
      let startDate = date.toLocaleDateString();
      let endTime = 0;
      let endDate = "";
      switch (this.type) {
        case "昨日":
          startTime = startTime - 1 * 24 * 60 * 60 * 1000
          startDate = new Date(startTime).toLocaleDateString();
          endDate = startDate;
          break;
        case "近七日":
          endTime = startTime - 7 * 24 * 60 * 60 * 1000;
          endDate = new Date(endTime).toLocaleDateString();
          break;
        case "近一月":
          endTime = startTime - 30 * 24 * 60 * 60 * 1000;
          endDate = new Date(endTime).toLocaleDateString();
          break;
      }
      console.log([startDate, endDate])
      this.$emit("valueChange", [startDate, endDate])
    }
  }
}
</script>
<style lang="less" scoped>
.active {
  background: #1c64cf;
}
.main {
  width: 256px;
  .tab {
    width: 100%;
    background: rgba(51, 110, 197, 0.5);
    display: flex;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #58baf9;
    span {
      flex: 1;
      text-align: center;
      display: inline-block;
      line-height: 35px;
      cursor: pointer;
    }
  }
  .date {
    width: 100%;
    margin-top: 5px;
    background: rgba(51, 110, 197, 0.5);
    /deep/ .el-input__inner {
      background: transparent;
      border: none;
      color: #7dfbfd;
      input {
        background: transparent;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #7dfbfd;
      }
      span {
        color: #7dfbfd;
      }
      input::-webkit-input-placeholder {
        color: #7dfbfd !important;
      }
      i {
        color: #54b3f1;
      }
    }
  }
}
</style>