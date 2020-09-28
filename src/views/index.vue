<template>
  <div class="main">
    <audio
      controls="controls"
      v-for="(it, i) in musicArray"
      :key="i"
      :src="it.url"
    ></audio>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getInfo } from "@/assets/common/api";
export default {
  data() {
    return {
      musicArray: [],
    };
  },
  mounted() {
    getInfo().then((res) => {
      this.musicArray = res.data;
      console.log(this.musicArray);
    });
    console.log(this.$store);
    console.log(this.user, "user");
  },
  computed: {
    ...mapState("pages", ["user"]),
  },
};
</script>
<style lang="less" scoped>
</style>