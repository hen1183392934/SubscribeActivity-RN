import MyToast from '../components/common/MyToast'
import store from '../store'
import { LOGIN_OUT } from '../store/action'

/**
 * 让fetch也可以timeout
 * timeout不是请求连接超时的含义，它表示请求的response时间，包括请求的连接、服务器处理及服务器响应回来的时间
 * fetch的timeout即使超时发生了，本次请求也不会被abort丢弃掉，它在后台仍然会发送到服务器端，只是本次请求的响应内容被丢弃而已
 * @param {Promise} fetchPromise    fetch请求返回的Promise
 * @param {number} [timeout=10000]   单位：毫秒，这里设置默认超时时间为10秒
 * @return 返回Promise
 */
function timeoutFetch(fetchPromise: any, timeout = 10000) {
  let timeoutFn: any = null
  //这是一个可以被reject的promise
  const timeoutPromise = new Promise(function (resolve, reject) {
    timeoutFn = function () {
      reject('timeout promise')
    }
  })
  //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  const abortablePromise = Promise.race([fetchPromise, timeoutPromise])

  setTimeout(function () {
    timeoutFn()
  }, timeout)

  return abortablePromise
}

// const commonUrl = 'http://10.12.112.93:3000/api/v1' //服务器地址
const commonUrl = 'http://127.0.0.1:3000/api/v1' //服务器地址

/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {string} token 用户token
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */
export default function fetchRequest(
  url: string,
  method: string,
  token = '',
  params: any = ''
): Promise<any> {
  //todo ：返回值 泛型
  const header = {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-BLACKCAT-TOKEN': token,
  }
  const fecthConfig: { method: string; headers: any; body?: string } = {
    method: method,
    headers: header,
    body: undefined,
  }
  if (params !== '') {
    fecthConfig.body = JSON.stringify(params)
  }
  return new Promise(function (resolve, reject) {
    timeoutFetch(fetch(commonUrl + url, fecthConfig))
      .then((res) => {
        if (res && res.status === 200) {
          const returnData: Promise<any> = res.json()
          return new Promise((resolve, reject) => {
            //todo：不要嵌套
            returnData
              .then((value: any) => {
                resolve(value)
              })
              .catch((e) => {
                // 由于服务端某些请求成功后返回空值导致json解析错误，导致整个请求失败
                // 根据状态判断实际状态码判断是否成功并处理
                resolve(e)
              })
          })
        } else if (res && res.status === 403) {
          new Promise((resolve, reject) => {
            res
              .json()
              .then((value: any) => {
                MyToast.error(`error: ${JSON.stringify(res.status)}  ${value.error}`, 80)
              })
              .catch((e: Error) => {
                reject(e)
              })
          })
          store.dispatch({ type: LOGIN_OUT })
        } else {
          MyToast.error('request error code :' + JSON.stringify(res.status), 80)
        }
      })
      .then((responseData) => {
        resolve(responseData)
      })
      .catch((err) => {
        console.log('err:', url, err) //网络请求失败返回的数据
        reject(err)
      })
  })
}
