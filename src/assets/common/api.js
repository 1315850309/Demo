import {
  request
} from "@/utils/request"
export function getInfo() {
  return request.request({
    url: `http://lorempixel.com/1600/900`
  })
}