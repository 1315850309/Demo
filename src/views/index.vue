<template>
  <div class="main">
    <!-- <div class="head">
      <c-header title="title"></c-header>
    </div> -->
    <!-- <date-select @valueChange="test"></date-select> -->
  </div>
</template>
<script>
import { getInfo } from "@/assets/common/api";
// import the styles
export default {
  mounted() {
    setTimeout(() => {
      this.fontAuto()
    }, 1000)
  },
  data() {
    return {
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
    }
  },
  methods: {
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
    listSelect: () => import("@/components/list.vue")
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