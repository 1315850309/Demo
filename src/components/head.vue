<template>
  <div class="head-main">
    <div class="icon-back">
      <i class="el-icon-back"></i>
    </div>
    <div class="title">{{ title }}</div>
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="less" scoped>
.head-main {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #fff;
  background: #409eff;
  padding: 0px 10px 0px 10px;
  .icon-back {
    cursor: pointer;
    flex: 1;
  }
  .title {
    flex: 1;
  }
  .slot {
    flex: 1;
  }
}
</style>