import { Comments, EventChannel, EventListData, LoginInfo, User, Users } from '../store/type'
import fecthRequest from './fecthRequest'
export const Api = {
  //登录
  login(username: string, password: string): Promise<LoginInfo> {
    return fecthRequest('/auth/token', 'POST', undefined, {
      username,
      password,
    })
  },
  //获取活动列表数据
  getEvents(
    token: string,
    channels: string,
    offset: number,
    limit: number
  ): Promise<EventListData> {
    const url = `/events?channels=${channels}&offset=${offset}&limit=${limit}`
    return fecthRequest(url, 'GET', token)
  },
  //获取频道数据
  getChannels(token: string): Promise<EventChannel[]> {
    return fecthRequest('/channels', 'GET', token)
  },
  //搜索活动
  searchEvents(token: string, channels = '', before = '', after = ''): Promise<EventListData> {
    const url = `/events?channels=${channels}&after=${after}&before=${before}`
    return fecthRequest(url, 'GET', token)
  },
  //获取单个活动详情
  getEventDetail(token: string, eventId: number): Promise<{ event: Event }> {
    return fecthRequest(`/events/${eventId}`, 'GET', token)
  },
  //获取参与数据
  getParticipants(token: string, eventId: number): Promise<Users> {
    return fecthRequest(`/events/${eventId}/participants`, 'GET', token)
  },
  //获取点赞数据
  getLikes(token: string, eventId: number): Promise<Users> {
    return fecthRequest(`/events/${eventId}/likes`, 'GET', token)
  },
  //获取评论数据
  getComments(token: string, eventId: number): Promise<Comments> {
    return fecthRequest(`/events/${eventId}/comments`, 'GET', token)
  },
  //参与活动
  postParticipants(token: string, eventId: number): Promise<any> {
    return fecthRequest(`/events/${eventId}/participants`, 'POST', token, {})
  },
  //点赞
  postLikes(token: string, eventId: number): Promise<any> {
    return fecthRequest(`/events/${eventId}/likes`, 'POST', token, {})
  },
  //评论
  postComment(token: string, eventId: number, comment: string): Promise<Users> {
    const url = `/events/${eventId}/comments`
    return fecthRequest(url, 'POST', token, { comment })
  },
  //取消参与
  deleteParticipant(token: string, eventId: number): Promise<any> {
    return fecthRequest(`/events/${eventId}/participants`, 'DELETE', token, {})
  },
  //取消点赞
  deleteLike(token: string, eventId: number): Promise<any> {
    return fecthRequest(`/events/${eventId}/likes`, 'DELETE', token, {})
  },
  //获取用户信息
  getUser(token: string): Promise<User> {
    return fecthRequest('/user', 'GET', token)
  },
}
