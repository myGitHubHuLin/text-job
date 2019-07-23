import request from '@/axios'

export function textData() {
  console.log(11);
  return request({
    url: '/main/index',
    method: 'post',
    data
  })
}
