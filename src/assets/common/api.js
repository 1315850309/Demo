import {
  request
} from "@/utils/request"
export function getInfo() {
  return request.request({
    url: ` https://api.imjad.cn/cloudmusic/?type=song&id=1311345316&search_type=1`
  })
}