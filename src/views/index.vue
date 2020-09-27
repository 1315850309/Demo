<template>
  <div class="main">
    <img src="../static/images/流星.png" />
    <h1 style="color: pink">{{ msg }}</h1>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      msg: "welcome to index.vue",
    };
  },
  mounted() {
    console.log(this.$store);
    console.log(this.user, "user");
  },
  computed: {
    ...mapState("pages", ["user"]),
  },
};
</script>
<style lang="less" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  h1 {
    color: red;
  }
}
</style>