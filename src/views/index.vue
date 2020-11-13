<template>
  <div class="subscribe-date-container">
    <div class="date-button-container">
      <div
        class="date-button"
        v-for="(it, i) in dateBtnArray"
        :key="i"
        @click="selectDay(it, i)"
        :class="{
          selectDateBtn: activeBtn == i,
          disabledBtn: !forbiddenWeek(it),
        }"
      >
        <div class="day-label">{{ getToday(it) }}</div>
        <div class="date-label">{{ it }}</div>
      </div>
    </div>
    <div class="subscribe-date-table">
      <div class="subscribe-time-line">
        <div
          class="time-line-label"
          v-for="(it, i) in subscribeTimeData"
          :key="i"
        >
          <span class="time-label">{{ it }}</span>
        </div>
      </div>
      <div class="subscribe-meeting-room-container">
        <div
          class="subscribe-meeting-room-box"
          v-for="(it, i) in subscribeRoomData"
          :key="i"
        >
          <div class="subscribe-meeting-room-name">{{ it.name }}</div>
          <div
            class="subscribe-btn-list"
            :class="{ slectRoom: activeRoom == i }"
          >
            <div
              class="subscribe-btn-icon"
              v-for="(time, index) in subscribeHourData"
              :key="index"
              :class="{
                selectBg: selectChangeStatus(time) && activeRoom == i,
              }"
            >
              <img
                src="@/assets/images/我的预约.png"
                @click="subscribe(it, time, i)"
                v-if="
                  !isSubscribe(it.subscrube, time) && defaultSelectDay != -1
                "
              />
              <img src="@/assets/images/我的预约-已预约.png" v-else />
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
    subscribeRoomData: {
      //会议室信息
      type: Array,
      default: () => {
        return [
          {
            name: 1,
            subscrube: [
              {
                startHour: "2020-11-13 17:00",
                endHour: "2020-11-13 19:00",
              },
              {
                startHour: "2020-11-13 11:00",
                endHour: "2020-11-13 14:00",
              },
            ],
          },
          {
            name: 1,
            subscrube: [
              {
                startHour: "",
                endHour: "",
              },
            ],
          },
          {
            name: 1,
            subscrube: [
              {
                startHour: "",
                endHour: "",
              },
            ],
          },
          {
            name: 1,
            subscrube: [
              {
                startHour: "",
                endHour: "",
              },
            ],
          },
          {
            name: 1,
            subscrube: [
              {
                startHour: "",
                endHour: "",
              },
            ],
          },
          {
            name: 1,
            subscrube: [
              {
                startHour: "",
                endHour: "",
              },
            ],
          },
          {
            name: 1,
            subscrube: [
              {
                startHour: "",
                endHour: "",
              },
            ],
          },
        ];
      },
    },
    subscribeStartHour: {
      //开始整数时
      type: Number,
      default: 8,
    },
    subscribeEndHour: {
      //结束整数时
      type: Number,
      default: 16,
    },
    subscribeTimeQuantum: {
      type: Number,
      default: 5,
    },
    unForbiddenWeek: {
      type: Array,
      default: () => {
        return [0, 1, 2, 3, 4, 5, 6];
      },
    },
  },
  data() {
    return {
      activeBtn: 0,
      subscribeTimeData: [], //显示的时间段
      subscribeHourData: [], //可预约时间段
      dateBtnArray: [],
      subscribeSelect: [], //选中的时间段
      activeRoom: -1,
      ref: "date-main",
      defaultSelectDay: -1,
    };
  },
  mounted() {
    console.log(this.subscribeRoomData, "subscribeRoomData");
    this.initTime();
    // this.initSubscribeHour();
  },
  methods: {
    forbiddenWeek(date) {
      let getDay = new Date(date).getDay();
      return this.unForbiddenWeek.some((it) => {
        return it == getDay;
      });
    },
    activeRoomChange(i) {
      if (this.activeRoom == i) {
        return;
      }
      this.activeRoom = i;
      this.subscribeSelect = [];
    },
    // 预约
    subscribe(it, time, i) {
      if (this.activeRoom != i) {
        this.activeRoom = i;
        this.subscribeSelect = [];
      }
      //传过来的会议室信息、可预约时间段
      this.subscribeSelect.push(time);
      console.log(this.subscribeSelect, time, "time");
      this.$emit("subscribeHandle", it, this.subscribeSelect);
    },
    // 选中改变状态
    selectChangeStatus(it) {
      console.log("xxxxxxxxxxxxx");
      return this.subscribeSelect.some((item) => {
        let timeStart1 = new Date(it.startHour).getTime();
        let timeEnd1 = new Date(it.endHour).getTime();
        let timeStart2 = new Date(item.startHour).getTime();
        let timeEnd2 = new Date(item.endHour).getTime();
        return timeStart1 == timeStart2 && timeEnd1 == timeEnd2; //满足在返回的预约信息中的时间段不能选
      });
      // return this.subscribeSelect.some(
      //   (item) => item.startHour == it.startHour && item.endHour == it.endHour
      // );
    },
    // 判断当前时间段是否已经预约
    isSubscribe(subscribe1 = [], subscribe2 = {}) {
      //后台返回的预约信息时间用数组接收--如果预约列表的icon在时间段里置灰不能选择
      return subscribe1.some((it) => {
        let timeStart1 = new Date(it.startHour).getTime();
        let timeEnd1 = new Date(it.endHour).getTime();
        let timeStart2 = new Date(subscribe2.startHour).getTime();
        let timeEnd2 = new Date(subscribe2.endHour).getTime();
        return timeStart1 <= timeStart2 && timeEnd1 >= timeEnd2; //满足在返回的预约信息中的时间段不能选
      });
    },
    selectDay(it, i) {
      console.log(i);
      if (this.activeBtn == i) {
        return;
      }
      this.activeBtn = i;
      this.activeRoom = -1;
      this.subscribeSelect = [];
      this.initSubscribeHour(it);
      this.$emit("changeDay", it);
    },
    // 初始化会议可预约时间段
    initSubscribeHour(date = new Date()) {
      this.subscribeTimeData = []; //显示的时间段
      this.subscribeHourData = []; //可预约时间段
      let dateDefault = this.formartDate(date);
      let hourLength = this.subscribeEndHour - this.subscribeStartHour + 1; //可预约时间段长度
      let length = new Array(hourLength - 1).fill(1); //处于时间段的可点击图标
      let timeData = new Array(hourLength).fill(1); //显示的时间段
      let timeQuantum = new Array(this.subscribeTimeQuantum).fill(1); //时间段间隔
      length.forEach((it, i) => {
        let obj = {};
        timeQuantum.forEach((timeItem, index) => {
          let time = (60 / this.subscribeTimeQuantum) * index;
          let hour = 0;
          let minute = 60 / this.subscribeTimeQuantum; //后一个时间段比前一个时间多出来的区间
          let endTime = time + minute; //后一个时间段
          if (time == 0) {
            time = "00";
          }
          if (endTime == 60) {
            endTime = "00";
            hour = 1;
          }
          switch (this.subscribeTimeQuantum) {
            case 1:
              obj = {
                startHour: dateDefault + ` ${this.subscribeStartHour + i}:00`, //预约起始时间
                endHour: dateDefault + ` ${this.subscribeStartHour + i + 1}:00`, //预约结束时间
              };
              this.subscribeHourData.push(obj);
              break;
            default:
              obj = {
                startHour:
                  dateDefault + ` ${this.subscribeStartHour + i}:${time}`, //预约起始时间
                endHour:
                  dateDefault +
                  ` ${this.subscribeStartHour + i + hour}:${endTime}`, //预约结束时间
              };
              this.subscribeHourData.push(obj);
              break;
          }
        });
      });
      timeData.forEach((it, i) => {
        timeQuantum.forEach((time, index) => {
          let timeShow = (60 / this.subscribeTimeQuantum) * index;
          let hourShow = 0;
          let minuteShow = 60 / this.subscribeTimeQuantum; //后一个时间段比前一个时间多出来的区间
          if (timeShow == 0) {
            timeShow = "00";
            minuteShow = "";
          }
          switch (this.subscribeTimeQuantum) {
            case 1:
              this.subscribeTimeData.push(`${this.subscribeStartHour + i}:00`);
              break;
            default:
              this.subscribeTimeData.push(
                ` ${this.subscribeStartHour + i}:${timeShow}`
              );
              let date1 = new Date(
                this.formartDate(new Date()) +
                  ` ${this.subscribeStartHour + i}:${timeShow}`
              ).getTime();
              let date2 = new Date(
                this.formartDate(new Date()) + ` ${this.subscribeEndHour}:00`
              ).getTime();
              if (isNaN(date1) || date1 > date2) {
                this.subscribeTimeData.splice(
                  this.subscribeTimeData.length - 1,
                  1
                );
              }
              break;
          }
        });
      });
      console.log(this.subscribeTimeData, this.subscribeHourData, "xxxxxxxxx");
      // this.subscribeTimeData = timeData.map((it, i) => {
      //   return `${this.subscribeStartHour + i}:00`;
      // });
    },
    getToday(date) {
      let dateDefault = new Date();
      if (this.formartDate(dateDefault) == this.formartDate(date)) {
        return "今天";
      }
      let day = new Date(date).getDay(); //获取星期几
      switch (day) {
        case 0:
          return "星期天";
          break;
        case 1:
          return "星期一";
          break;
        case 2:
          return "星期二";
          break;
        case 3:
          return "星期三";
          break;
        case 4:
          return "星期四";
          break;
        case 5:
          return "星期五";
          break;
        case 6:
          return "星期六";
          break;
      }
    },
    formartDate(dateObj) {
      if (!dateObj) {
        return "";
      }
      let date = new Date(dateObj);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      if (m < 10) {
        m = `0` + m;
      }
      if (d < 10) {
        d = `0` + d;
      }
      let formartDate = y + `-` + m + `-` + d;
      return formartDate;
    },
    initTime() {
      let date = new Date().getTime(); //当前时间
      let length = new Array(100).fill(1);
      let dateArr = [];
      length.forEach((it, i) => {
        dateArr.push(date + i * 24 * 60 * 60 * 1000); //添加的时间数据的长度
      });
      dateArr.sort((a, b) => a - b);
      dateArr.forEach((it) => {
        this.dateBtnArray.push(this.formartDate(it));
      });
      this.dateBtnArray.forEach((it, i) => {
        let getDay = new Date(it).getDay();
        if (
          this.unForbiddenWeek.some((day) => day == getDay) &&
          this.defaultSelectDay < 0
        ) {
          this.defaultSelectDay = i;
          this.activeBtn = i;
        }
      });
      this.initSubscribeHour(this.dateBtnArray[this.activeBtn]);
    },
  },
  computed: {},
};
</script>
<style lang="less" scoped>
.subscribe-date-container {
  width: 100%;
  height: 100%;
  max-width: 500px;
  // min-height: 700px;
  max-height: 700px;
  display: flex;
  flex-flow: column;
  overflow: auto;
  .date-button-container {
    width: 100%;
    display: flex;
    // justify-content: space-around;
    padding: 5px;
    overflow: auto;
    min-height: 40px;
    .date-button {
      flex: 1;
      min-width: 19vw;
      text-align: center;
      // padding: 5px 5px 5px 5px;
      background: #fff;
      border-radius: 5px;
      color: #609FD4;
      margin-left: 5px;
      cursor: pointer;
      line-height: 20px;
      .day-label {
        font-size: 17px;
      }
    }
  }
  .subscribe-date-table {
    flex: 1;
    width: 100%;
    display: flex;
    .subscribe-time-line {
      display: flex;
      flex-flow: column;
      width: 40px;
      .time-line-label {
        width: 100%;
        // flex: 1;
        height: 30px;
        text-align: right;
        position: relative;
        .time-label {
          display: inline-block;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          transform: translate(0, 50%);
        }
      }
    }
    .subscribe-meeting-room-container {
      flex: 1;
      overflow: auto;
      display: flex;
      .subscribe-meeting-room-box {
        flex: 1;
        min-width: 18vw;
        display: flex;
        flex-flow: column;
        .subscribe-meeting-room-name {
          // flex: 1;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .subscribe-btn-list {
          flex: 1;
          display: flex;
          flex-flow: column;
          width: 100%;
          border-top: thin solid #a4a4a4;
          .subscribe-btn-icon {
            // flex: 1;
            height: 30px;
            text-align: center;
            img {
              width: 30px;
              height: 30px;
            }
          }
        }
        .subscribe-btn-list:first-child {
          border-left: thin solid #a4a4a4;
        }
      }
    }
  }
}
.selectDateBtn {
  background: #609FD4 !important;
  color: #fff !important;
}
.disabledBtn {
  background: #dddddd !important; //为带有readonly的input框添加背景颜色
  cursor: not-allowed !important; // 表示一个红色的圈加一个斜杠
  pointer-events: none;
  color: #fff !important;
}
.slectRoom {
  border-left: 3px solid #86B5F7;
  border-right: 3px solid #86B5F7;
  border-bottom: 3px solid #86B5F7;
}
.selectBg {
  background: #58ADEB !important;
}
</style>