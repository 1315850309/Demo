import {
  request
} from "@/utils/request"
export function getInfo(data) {
  return request.request({
    url: `/cetc/api/letter/finishAnalysisList`,
    method: "post",
    data
  })
}