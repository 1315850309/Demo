<template>
  <div class="main">
    <!-- <div class="head">
      <c-header title="title"></c-header>
    </div> -->
    <!-- <date-select @valueChange="test"></date-select> -->
    <!-- <subscribe></subscribe> -->
    <div style="width: 800px; height: 500px">
      <table-custom :table-data="tableData"></table-custom>
    </div>
  </div>
</template>
<script>
import { getInfo } from "@/assets/common/api";
// import the styles
export default {
  mounted() {
    let a = this.calcData(this.testData)
    console.log(a)
    this.elementAppend()
    getInfo({}).then(res => {
      this.tableData = res.data
    })
    setTimeout(() => {
      this.fontAuto()
    }, 1000)
  },
  data() {
    return {
      tableData: [],
      testData: {
        "交通运输": {
          "村务管理": ["不动产登记事务", "不动产纠纷", "其它"]
        }
      },
      transformLength: 0,
      value: "",
      option: [
        {
          id: 'a',
          label: 'a',
          children: [
            {
              id: 'aa',
              label: 'aa',
            }, {
              id: 'ab',
              label: 'ab',
            }
          ],
        }, {
          id: 'b',
          label: 'b',
        }, {
          id: 'c',
          label: 'c',
        }],
      content: "",
      ipt: ""
    }
  },
  methods: {
    calcData(obj) {
      let data = []
      console.log(Object.keys(obj))
      if (Array.isArray(obj)) {
        obj.forEach(key => {
          data.push({ name: key })
        })
      } else {
        Object.keys(obj).forEach(key => {
          let objs = {
            name: key,
            children: this.calcData(obj[key])
          }
          data.push(objs)
        })
      }

      return data
    },
    elementAppend() {
      this.content = `<input v-model='ipt'></input>`
    },
    flatArray(data) {
      let array = []
      if (Array.isArray(data)) {
        array = data.reduce((pre, cur) => {
          pre = [...pre, ...this.flatArray(cur.children)]
          return pre
        }, [])
      } else {
        array.push(data)
      }
    },
    formaterData(array) {

    },
    test(value) {
      console.log(value)
    },
    fontAuto() {
      const { width } = getComputedStyle(document.querySelector(".container"), null)
      let reg = new RegExp("px", "g")
      let w = width.replace(reg, "")
      let speed = 10
      if (this.transformLength >= w) {
        this.transformLength = 0
        speed = 1000
      }
      this.transformLength++
      this.$refs.font.style.transform = `translate(-${(this.transformLength)
        }px,0)`; //点击时的位置
      setTimeout(() => {
        this.fontAuto()
      }, speed)
    }
  },
  components: {
    subscribe: () => import("@/components/subscribe.vue"),
    cHeader: () => import("@/components/head.vue"),
    rankList: () => import("@/components/rankingList.vue"),
    dateSelect: () => import("@/components/dateSelect.vue"),
    listSelect: () => import("@/components/list.vue"),
    tableCustom: () => import("@/components/table.vue")
  },
};
</script>
<style lang="less" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
