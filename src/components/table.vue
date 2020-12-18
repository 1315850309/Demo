<template>
  <div class="table-main">
    <div class="table-head">
      <div class="area">区域</div>
      <div class="event-source">
        <div class="event-title">事件来源</div>
        <div class="title-content">
          <div class="content-box need-border">信访形式</div>
          <div class="content-box">占比</div>
        </div>
      </div>
      <div class="bl-type">
        <div class="type-title need-border bottom-border">办理方式</div>
        <div class="title-content">
          <div class="content-box need-border">简单答复</div>
          <div class="content-box need-border">占比</div>
          <div class="content-box need-border">普通程序</div>
          <div class="content-box need-border">占比</div>
        </div>
      </div>
      <div class="answer-type">
        <div class="answer-title need-border bottom-border">答复方式</div>
        <div class="title-content">
          <div class="content-box">
            <div class="little-title need-border bottom-border">不予受理</div>
            <div class="little-box need-border">
              <div class="need-border">件次</div>
              <div>占比</div>
            </div>
          </div>
          <div class="content-box">
            <div class="little-title need-border bottom-border">简单答复</div>
            <div class="little-box need-border">
              <div class="need-border">件次</div>
              <div>占比</div>
            </div>
          </div>
          <div class="content-box">
            <div class="little-title need-border bottom-border">答复意见</div>
            <div class="little-box need-border">
              <div class="need-border">件次</div>
              <div>占比</div>
            </div>
          </div>
          <div class="content-box">
            <div class="little-title bottom-border">不再受理</div>
            <div class="little-box">
              <div class="need-border">件次</div>
              <div>占比</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-body"></div>
  </div>
</template>
<script>
export default {
  props: {

  },
  data() {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.bottom-border {
  border-bottom: thin solid #a4a4a4;
}
.need-border {
  border-right: thin solid #a4a4a4;
}
.table-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  border: thin solid #a4a4a4;
  .table-head {
    height: 75px;
    width: 100%;
    display: flex;
    border-bottom: thin solid #a4a4a4;
    .area {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: thin solid #a4a4a4;
    }
    .event-source {
      flex: 1.5;
      height: 100%;
      display: flex;
      flex-flow: column;
      border-right: thin solid #a4a4a4;
      .event-title {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        // border-right: thin solid #a4a4a4;
        border-bottom: thin solid #a4a4a4;
      }
      .title-content {
        flex: 1;
        width: 100%;
        display: flex;
        .content-box {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .bl-type {
      flex: 3;
      height: 100%;
      display: flex;
      flex-flow: column;
      .type-title {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .title-content {
        flex: 1;
        width: 100%;
        display: flex;
        .content-box {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .answer-type {
      flex: 6;
      height: 100%;
      display: flex;
      flex-flow: column;
      .answer-title {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .title-content {
        flex: 1;
        width: 100%;
        display: flex;
        .content-box {
          flex: 1;
          display: flex;
          flex-flow: column;
          .little-title {
            flex: 1;
            width: 100%;
            text-align: center;
          }
          .little-box {
            width: 100%;
            flex: 1;
            display: flex;
            div {
              flex: 1;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>