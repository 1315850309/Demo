import { from } from "core-js/fn/array"
import { resolve } from "core-js/fn/promise"
import echarts from "echarts"
export function initEcharts(dom) {
  return new Promise(resolve => {
    let instance = echarts.init(dom);
    resolve(instance)
  })
}