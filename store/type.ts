export interface User {
  id: number
  username: string
  email: string
  avatar: string
  likes_count?: number
  past_count?: number
  goings_count?: number
}
export interface LoginInfo {
  token: string
  user: User
}

export interface StoreState {
  loginInfo: LoginInfo
  eventListData: EventListData
  eventDetail?: Event
}
export interface EventChannel {
  id: number
  name: string
}

export interface EventComment {
  id: number
  create_time: string
  comment: string
  user: User
}

export interface Event {
  id: number
  name: string
  begin_time: string
  end_time: string
  description: string
  creator: User
  create_time: string
  channel: EventChannel
  images: string[]
  location: string
  location_detail: string
  goings_count: number
  likes_count: number
  me_likes: boolean
  me_going: boolean

  participantsUsers: User[]
  likesUsers: User[]

  comments: EventComment[]
}

export interface EventListData {
  events: Event[]
  channels: EventChannel[]
  selectedChannels: number[]
  selectedDateIndex: number
  hasMore: boolean
}

export interface Users {
  users: User
  hasMore: boolean
}

export interface Comments {
  comments: EventComment[]
}
