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
        <div class="answer-title bottom-border">答复方式</div>
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
    <div class="table-body">
      <div class="table-body-box" v-for="(it, i) in tableData" :key="i">
        <div class="box-region bottom-border need-border">
          {{ it[`region`] }}
        </div>
        <div class="box-main">
          <div class="box-info" v-for="(item, index) in it.info" :key="index">
            <div class="event-source-info bottom-border">
              <div class="td-row need-border">
                {{ item[`call_type_proporte`] }}
              </div>
              <div class="td-row need-border">
                {{ item[`call_type_proporte`] }}
              </div>
            </div>
            <div class="bltype-info bottom-border">
              <div class="td-row need-border">
                {{ item[`call_type_proporte`] }}
              </div>
              <div class="td-row need-border">
                {{ item[`call_type_proporte`] }}
              </div>
              <div class="td-row need-border">
                {{ item[`call_type_proporte`] }}
              </div>
              <div class="td-row need-border">
                {{ item[`call_type_proporte`] }}
              </div>
            </div>
            <div class="dftype-info bottom-border">
              <div class="two-row need-border">
                <div class="td-row need-border">
                  {{ item[`call_type_proporte`] }}
                </div>
                <div class="td-row">{{ item[`call_type_proporte`] }}</div>
              </div>
              <div class="two-row">
                <div class="td-row need-border">
                  {{ item[`call_type_proporte`] }}
                </div>
                <div class="td-row">{{ item[`call_type_proporte`] }}</div>
              </div>
              <div class="two-row need-border">
                <div class="td-row need-border">
                  {{ item[`call_type_proporte`] }}
                </div>
                <div class="td-row">{{ item[`call_type_proporte`] }}</div>
              </div>
              <div class="two-row">
                <div class="td-row need-border">
                  {{ item[`call_type_proporte`] }}
                </div>
                <div class="td-row">{{ item[`call_type_proporte`] }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => { return [] }
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.bottom-border {
  border-bottom: thin solid #0090ff;
}
.need-border {
  border-right: thin solid #0090ff;
}
.table-main {
  width: 100%;
  display: flex;
  flex-flow: column;
  border: thin solid #0090ff;
  .table-head {
    height: 75px;
    width: 100%;
    display: flex;
    border-bottom: thin solid #0090ff;
    .area {
      // flex: 1;
      width: 80px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: thin solid #0090ff;
    }
    .event-source {
      // flex: 1.5;
      width: 140px;
      height: 100%;
      display: flex;
      flex-flow: column;
      border-right: thin solid #0090ff;
      .event-title {
        flex: 1;
        // width: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        // border-right: thin solid #0090ff;
        border-bottom: thin solid #0090ff;
      }
      .title-content {
        flex: 1;
        width: 100%;
        // width: 50%;
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
      // flex: 3;
      width: 260px;
      height: 100%;
      display: flex;
      flex-flow: column;
      .type-title {
        flex: 1;
        width: 100%;
        // width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .title-content {
        flex: 1;
        width: 100%;
        // width: 50px;
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
      // flex: 6;
      width: 420px;
      height: 100%;
      display: flex;
      flex-flow: column;
      .answer-title {
        flex: 1;
        width: 100%;
        // width: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .title-content {
        flex: 1;
        // width: 110px;
        width: 100%;
        display: flex;
        .content-box {
          flex: 1;
          // width: 100px;
          display: flex;
          flex-flow: column;
          .little-title {
            flex: 1;
            // width: 100%;
            // width: 50px;
            text-align: center;
          }
          .little-box {
            width: 100%;
            // width: 50px;
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
  .table-body {
    width: 100%;
    max-height: 200px;
    overflow: hidden;
    .table-body-box {
      width: 100%;
      height: 140px;
      display: flex;
      .box-region {
        width: 80px;
        height: 100%;
      }
      .box-main {
        flex: 1;
        display: flex;
        flex-flow: column;
        .box-info {
          // height: 100%;
          flex: 1;
          display: flex;
          .td-row {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .event-source-info {
            width: 140px;
            display: flex;
          }
          .bltype-info {
            width: 260px;
            display: flex;
          }
          .dftype-info {
            width: 420px;
            display: flex;
            .two-row {
              flex: 1;
              display: flex;
            }
          }
        }
      }
    }
  }
}
</style>