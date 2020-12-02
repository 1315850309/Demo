<template>
  <div class="list-main">
    <div
      class="search-main"
      @click.stop="showList"
      v-if="!noSelect"
    >
      <el-input
        placeholder="请输入内容"
        readonly
        suffix-icon="el-icon-caret-bottom"
        v-model="selectName"
      >
      </el-input>
    </div>
    <div
      v-if="isShow"
      style="position: absolute;width:100%"
    >
      <div
        class="list-box"
        v-for="(it,i) in listData"
        :key="i"
      >
        <div
          class="box-main"
          @click.stop="selectChange(it.name,i)"
        >
          <div
            class="label"
            :class="{active:selectActive==i}"
          >
            <span>{{it.name}}</span>
            <i
              class="el-icon-caret-right"
              v-if="it.children&&selectActive==i"
            ></i>
          </div>
          <div
            class="list-children"
            v-if="it.children&&selectActive==i"
          >
            <list-main
              :props-show="true"
              v-model="selectName"
              :list-data="it.children"
              :no-select="true"
            ></list-main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "listMain",
  props: {
    noSelect: {
      type: Boolean,
      default: false
    },
    propsShow: {
      type: Boolean,
      default: false
    },
    listData: {
      type: Array,
      default: () => {
        return [
          {
            name: "浙江省",
            children: [
              {
                name: "嘉兴市",
                children: [
                  { name: "南湖区" },
                  { name: "秀洲区" },
                  { name: "桐乡市" },
                  { name: "海盐县" },
                  { name: "经开区" }
                ]
              }
            ]
          },
          {
            name: "湖南省",
            children: [
              {
                name: "长沙市",
                children: [
                  { name: "岳麓区" },
                  { name: "天心区" },
                  { name: "长沙县" },
                  { name: "望城区" },
                  { name: "芙蓉区" },
                  { name: "雨花区" }
                ]
              },
              {
                name: "株洲市",
                children: [
                  { name: "荷塘区" },
                  { name: "天元区" },
                  { name: "醴陵市" },
                  { name: "攸县" },
                  { name: "炎陵" },
                  { name: "石峰区" },
                  { name: "云龙示范区" }
                ]
              },
            ]
          },
          {
            name: "广东省",
            children: [
              { name: "广州市" },
              { name: "深圳市" },
              { name: "珠海市" },
              { name: "东莞市" },
              { name: "韶关市" },
              { name: "中山市" },
              { name: "揭阳市" }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.isShow = this.propsShow
    window.addEventListener("click", this.showNone)
  },
  beforeDestroy() {
    window.removeEventListener("click", this.showNone)
  },
  watch: {
    selectName() {
      this.$emit("input", this.selectName)
      console.log(this.selectName)
    }
  },
  data() {
    return {
      selectName: "",
      selectActive: -1,
      isShow: false
    }
  },
  methods: {
    showNone() {
      this.selectActive = -1
      this.isShow = false
    },
    showList() {
      this.isShow = !this.isShow
    },
    selectChange(name, i) {
      this.selectName = name
      this.selectActive = i
    }
  }
}
</script>
<style lang="less" scoped>
.active {
  background: rgba(29, 74, 142, 0.4);
  color: #11e8e4 !important;
}
.list-main {
  width: 100%;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #50ace8;
  position: relative;
  .search-main {
    width: 100%;
    margin-bottom: 1px;
    padding: 1px;
    background: rgba(6, 35, 76, 0.9);
    cursor: pointer;
    /deep/ .el-input {
      input {
        cursor: pointer;
        color: #c9e4f6;
        background: transparent;
        border: 1px solid #12b9ff;
        opacity: 0.6;
        border-radius: 4px;
      }
    }
  }
  .list-box {
    background: rgba(6, 35, 76, 0.9);
    width: 100%;
    line-height: 25px;
    .box-main {
      width: 100%;
      position: relative;
      cursor: pointer;
      .label {
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .list-children {
        width: 100%;
        position: absolute;
        left: 101%;
        top: 0;
      }
    }
  }
}
</style>