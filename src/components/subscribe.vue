<template>
  <div class="subscribe-date-container">
    <div
      ref="container"
      class="date-button-container"
      @touchstart="startMove"
      @touchmove="changeMove"
    >
      <div
        v-for="(it, i) in dateBtnArray"
        :key="i"
        class="date-button"
        :class="{
          selectDateBtn: activeBtn == i,
          disabledBtn: !forbiddenWeek(it),
        }"
        @click="selectDay(it, i)"
      >
        <div class="day-label">{{ getToday(it) }}</div>
        <div class="date-label">{{ it }}</div>
      </div>
    </div>
    <div class="subscribe-date-table">
      <div class="subscribe-time-line">
        <div
          v-for="(it, i) in subscribeTimeData"
          :key="i"
          class="time-line-label"
        >
          <span class="time-label">{{ it }}</span>
        </div>
      </div>
      <div class="subscribe-meeting-room-container">
        <div
          v-for="(it, i) in subscribeRoomData"
          :key="i"
          class="subscribe-meeting-room-box"
        >
          <div class="subscribe-meeting-room-name" />
          <div
            class="subscribe-btn-list"
            :class="{ slectRoom: activeRoom === i }"
          >
            <div
              v-for="(time, index) in subscribeHourData"
              :key="index"
              class="subscribe-btn-icon"
              :class="{
                selectBg: selectChangeStatus(time) && activeRoom === i,
              }"
            >
              <img
                v-if="
                  !isSubscribe(it.subscrube, time) && defaultSelectDay != -1
                "
                src="@/assets/images/我的预约.png"
                @click="subscribe(it, time, i)"
              />
              <img
                v-else
                src="@/assets/images/我的预约-已预约.png"
                @click="test"
              />
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
      // 会议室信息
      type: Array,
      default: () => {
        return [
          {
            name: 1,
            subscrube: [
              {
                startHour: "2020-11-16 17:00",
                endHour: "2020-11-16 19:00",
              },
              {
                startHour: "2020-11-16 11:00",
                endHour: "2020-11-16 14:00",
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
      // 开始整数时
      type: Number,
      default: 8,
    },
    subscribeEndHour: {
      // 结束整数时
      type: Number,
      default: 24,
    },
    subscribeTimeQuantum: {
      type: Number,
      default: 2,
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
      activeBtn: -1,
      subscribeTimeData: [], // 显示的时间段
      subscribeHourData: [], // 可预约时间段
      dateBtnArray: [],
      subscribeSelect: [], // 选中的时间段
      activeRoom: -1,
      ref: "date-main",
      defaultSelectDay: -1,
      moveLength: 0, // 移动的长度
      startX: 0,
      transformX: 0,
    };
  },
  computed: {},
  mounted() {
    this.initTime();
    // this.initSubscribeHour();
  },
  methods: {
    test() {},
    startMove(e) {
      const ev = e || e.target;
      this.startX = ev.touches[0].clientX;
    },
    changeMove(e) {
      e.preventDefault();
      const ev = e || e.target;
      const endX = ev.touches[0].pageX;
      // const { width } = getComputedStyle(this.$refs.container, null);
      // let reg = new RegExp("px", "");
      // let w = width.replace(reg, "");
      if (this.startX - endX > 0) {
        this.transformX += 3;
      }
      if (this.startX - endX < 0 && this.transformX-- >= 0) {
        this.transformX -= 3;
      }
      this.$refs.container.style.transform = `translate(-${this.transformX}px,0)`; // 点击时的位置
    },
    forbiddenWeek(date) {
      const getDay = new Date(date).getDay();
      return this.unForbiddenWeek.some((it) => {
        return it === getDay;
      });
    },
    activeRoomChange(i) {
      if (this.activeRoom === i) {
        return;
      }
      this.activeRoom = i;
      this.subscribeSelect = [];
    },
    // 预约
    subscribe(it, time, i) {
      if (this.activeRoom !== i) {
        this.activeRoom = i;
        this.subscribeSelect = [];
      }
      // 如果不是连续的时间段--就初始化
      let temporaryStorage = [];
      this.subscribeSelect.forEach((item) => {
        const date1 = new Date(item.startHour).getTime();
        const date2 = new Date(item.endHour).getTime();
        temporaryStorage.push(date1, date2);
      });
      temporaryStorage.sort((a, b) => a - b);
      temporaryStorage = [...new Set(temporaryStorage)];
      const needStorage1 = new Date(time.startHour).getTime();
      const needStorage2 = new Date(time.endHour).getTime();
      const num = (60 / this.subscribeTimeQuantum) * 60 * 1000;
      if (
        // 如果是相连的时间段就不初始化
        temporaryStorage.length &&
        !(
          temporaryStorage[0] - num === needStorage1 ||
          temporaryStorage[temporaryStorage.length - 1] + num === needStorage2
        )
      ) {
        this.subscribeSelect = [];
      }
      // 传过来的会议室信息、可预约时间段
      this.subscribeSelect.push(time);
      let temporaryStorage2 = [];
      this.subscribeSelect.forEach((item) => {
        const date3 = new Date(item.startHour).getTime();
        const date4 = new Date(item.endHour).getTime();
        temporaryStorage2.push(date3, date4);
      });
      temporaryStorage2.sort((a, b) => a - b);
      temporaryStorage2 = [...new Set(temporaryStorage2)];
      const subscribeSelectNeed = [
        this.formartDate(new Date(temporaryStorage2[0] || ""), true),
        this.formartDate(
          new Date(temporaryStorage2[temporaryStorage2.length - 1] || ""),
          true
        ),
      ];
      console.log(subscribeSelectNeed, "subscribeSelectNeed");
      this.$emit("subscribeHandle", it, subscribeSelectNeed);
    },
    // 选中改变状态
    selectChangeStatus(it) {
      return this.subscribeSelect.some((item) => {
        const timeStart1 = new Date(it.startHour).getTime();
        const timeEnd1 = new Date(it.endHour).getTime();
        const timeStart2 = new Date(item.startHour).getTime();
        const timeEnd2 = new Date(item.endHour).getTime();
        return timeStart1 === timeStart2 && timeEnd1 === timeEnd2; // 满足在返回的预约信息中的时间段不能选
      });
      // return this.subscribeSelect.some(
      //   (item) => item.startHour === it.startHour && item.endHour === it.endHour
      // );
    },
    // 判断当前时间段是否已经预约
    isSubscribe(subscribe1 = [], subscribe2 = {}) {
      // 后台返回的预约信息时间用数组接收--如果预约列表的icon在时间段里置灰不能选择
      return subscribe1.some((it) => {
        const timeStart1 = new Date(it.startHour).getTime();
        const timeEnd1 = new Date(it.endHour).getTime();
        const timeStart2 = new Date(subscribe2.startHour).getTime();
        const timeEnd2 = new Date(subscribe2.endHour).getTime();
        return timeStart1 <= timeStart2 && timeEnd1 >= timeEnd2; // 满足在返回的预约信息中的时间段不能选
      });
    },
    selectDay(it, i) {
      console.log(i);
      if (this.activeBtn === i || !this.forbiddenWeek(it)) {
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
      this.subscribeTimeData = []; // 显示的时间段
      this.subscribeHourData = []; // 可预约时间段
      const dateDefault = this.formartDate(date);
      const hourLength = this.subscribeEndHour - this.subscribeStartHour + 1; // 可预约时间段长度
      const length = new Array(hourLength - 1).fill(1); // 处于时间段的可点击图标
      const timeData = new Array(hourLength).fill(1); // 显示的时间段
      const timeQuantum = new Array(this.subscribeTimeQuantum).fill(1); // 时间段间隔
      length.forEach((it, i) => {
        let obj = {};
        timeQuantum.forEach((timeItem, index) => {
          let time = (60 / this.subscribeTimeQuantum) * index;
          let hour = 0;
          const minute = 60 / this.subscribeTimeQuantum; // 后一个时间段比前一个时间多出来的区间
          let endTime = time + minute; // 后一个时间段
          if (time === 0) {
            time = "00";
          }
          if (endTime === 60) {
            endTime = "00";
            hour = 1;
          }
          switch (this.subscribeTimeQuantum) {
            case 1:
              obj = {
                startHour: dateDefault + ` ${this.subscribeStartHour + i}:00`, // 预约起始时间
                endHour: dateDefault + ` ${this.subscribeStartHour + i + 1}:00`, // 预约结束时间
              };
              this.subscribeHourData.push(obj);
              break;
            default:
              obj = {
                startHour:
                  dateDefault + ` ${this.subscribeStartHour + i}:${time}`, // 预约起始时间
                endHour:
                  dateDefault +
                  ` ${this.subscribeStartHour + i + hour}:${endTime}`, // 预约结束时间
              };
              this.subscribeHourData.push(obj);
              break;
          }
        });
      });
      timeData.forEach((it, i) => {
        timeQuantum.forEach((time, index) => {
          let timeShow = (60 / this.subscribeTimeQuantum) * index;
          // const hourShow = 0
          // let minuteShow = 60 / this.subscribeTimeQuantum // 后一个时间段比前一个时间多出来的区间
          if (timeShow === 0) {
            timeShow = "00";
            // minuteShow = ""
          }
          switch (this.subscribeTimeQuantum) {
            case 1:
              this.subscribeTimeData.push(`${this.subscribeStartHour + i}:00`);
              break;
            default:
              this.subscribeTimeData.push(
                ` ${this.subscribeStartHour + i}:${timeShow}`
              );
              var date1 = new Date(
                this.formartDate(new Date()) +
                  ` ${this.subscribeStartHour + i}:${timeShow}`
              ).getTime();
              var date2 = new Date(
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
      const dateDefault = new Date();
      if (this.formartDate(dateDefault) === this.formartDate(date)) {
        return "今天";
      }
      const day = new Date(date).getDay(); // 获取星期几
      switch (day) {
        case 0:
          return "星期天";
        case 1:
          return "星期一";
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
      }
    },
    formartDate(dateObj, type) {
      if (!dateObj) {
        return "";
      }
      const date = new Date(dateObj);
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let h = date.getHours();
      let miu = date.getMinutes();
      let s = date.getSeconds();
      if (m < 10) {
        m = `0` + m;
      }
      if (d < 10) {
        d = `0` + d;
      }
      if (h < 10) {
        h = `0` + h;
      }
      if (miu < 10) {
        miu = `0` + miu;
      }
      if (s < 10) {
        s = `0` + s;
      }
      let formartDate = y + `-` + m + `-` + d;
      if (type) {
        formartDate = y + `-` + m + `-` + d + ` ${h}:${miu}:${s}`;
      }
      return formartDate;
    },
    initTime() {
      const date = new Date().getTime(); // 当前时间
      const length = new Array(100).fill(1);
      const dateArr = [];
      length.forEach((it, i) => {
        dateArr.push(date + i * 24 * 60 * 60 * 1000); // 添加的时间数据的长度
      });
      dateArr.sort((a, b) => a - b);
      dateArr.forEach((it) => {
        this.dateBtnArray.push(this.formartDate(it));
      });
      this.dateBtnArray.forEach((it, i) => {
        const getDay = new Date(it).getDay();
        if (
          this.unForbiddenWeek.some((day) => day === getDay) &&
          this.defaultSelectDay < 0
        ) {
          this.defaultSelectDay = i;
          // this.activeBtn = i;
        }
      });
      // this.initSubscribeHour(this.dateBtnArray[this.activeBtn]);
      this.selectDay(
        this.dateBtnArray[this.defaultSelectDay],
        this.defaultSelectDay
      );
    },
  },
};
</script>
<style lang="less" scoped>
.subscribe-date-container {
  width: 100%;
  height: 100%;
  max-width: 500px;
  // min-height: 700px;
  max-height: 500px;
  display: flex;
  flex-flow: column;
  overflow: auto;
  .date-button-container {
    width: 100%;
    display: flex;
    // justify-content: space-around;
    // padding: 5px;
    margin-bottom: 10px;
    margin-top: 10px;
    // overflow: auto;
    min-height: 40px;
    .date-button {
      flex: 1;
      min-width: 19vw;
      text-align: center;
      // padding: 5px 5px 5px 5px;
      background: #fff;
      border-radius: 5px;
      color: #609fd4;
      margin-left: 5px;
      cursor: pointer;
      line-height: 20px;
      .day-label {
        font-size: 15px;
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
          transform: translate(0, -50%);
        }
      }
    }
    .subscribe-meeting-room-container {
      flex: 1;
      overflow: auto;
      display: flex;
      border-top: thin solid #a4a4a4;
      border-left: thin solid #a4a4a4;
      .subscribe-meeting-room-box {
        flex: 1;
        // min-width: 18vw;
        min-width: 60px;
        max-width: 60px;
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
          // border-top: thin solid #a4a4a4;
          align-items: center;
          .subscribe-btn-icon {
            // flex: 1;
            height: 30px;
            text-align: center;
            width: 100%;
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
  background: #609fd4 !important;
  color: #fff !important;
}
.disabledBtn {
  background: #dddddd !important; //为带有readonly的input框添加背景颜色
  // cursor: not-allowed !important; // 表示一个红色的圈加一个斜杠
  // pointer-events: none;
  color: #fff !important;
}
.slectRoom {
  border-left: 3px solid #86b5f7;
  border-right: 3px solid #86b5f7;
  border-bottom: 3px solid #86b5f7;
}
.selectBg {
  background: #58adeb !important;
}
</style>