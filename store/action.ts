export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_OUT = 'LOGIN_OUT'
export const LOGIN_OUT_SUCCESS = 'LOGIN_OUT_SUCCESS'

export const GET_EVENTS = 'GET_EVENTS'
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS'

export const GET_CHANNELS = 'GET_CHANNELS'
export const GET_CHANNELS_SUCCESS = 'GET_CHANNELS_SUCCES'

export const SEARCH_EVENTS = 'SERACH_EVENTS'
export const SEARCH_EVENTS_SUCCESS = 'SEARCH_EVENTS_SUCCESS'
export const UPDATE_STORE_SELECTED_DATE_INDEX = 'UPDATE_STORE_SELECTED_DATE_INDEX'
export const UPDATE_STORE_SELECTED_CHANNELS = 'UPDATE_STORE_SELECTED_CHANNELS'

export const GET_EVENT_DETAIL = 'GET_EVENT_DETAIL'
export const GET_EVENT_DETAIL_SUCCESS = 'GET_EVENT_DETAIL_SUCCESS'

export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'

export function loginRequest(username: string, password: string): LoginActionType {
  return {
    type: LOGIN_REQUEST,
    username,
    password,
  }
}
export function loginOut(): ActionType {
  return {
    type: LOGIN_OUT,
  }
}

export function loginSuccess(
  token = '',
  id = NaN,
  username = '',
  email = '',
  avatar = ''
): LoginSuccessActionType {
  return {
    type: LOGIN_SUCCEEDED,
    token,
    id,
    username,
    email,
    avatar,
  }
}
export function getEvents(channels: string, offset: number, limit: number): FetchEventsActionType {
  return {
    type: GET_CHANNELS,
    channels,
    offset,
    limit,
  }
}
export function getChannels(): ActionType {
  return {
    type: GET_CHANNELS,
  }
}

export function searchEvents(
  selectedDateIndex: number,
  selectedChannels: number[]
): SearchEventsActionType {
  return {
    type: SEARCH_EVENTS,
    selectedDateIndex,
    selectedChannels,
  }
}
export function updateStoreSelectedDateIndex(
  selectedDateIndex: number
): UpdateSelectedDateActionType {
  return {
    type: UPDATE_STORE_SELECTED_DATE_INDEX,
    selectedDateIndex,
  }
}
export function updateStoreSelectedChannels(
  selectedChannels: number[]
): UpdateSelectedChannelsActionType {
  return {
    type: UPDATE_STORE_SELECTED_CHANNELS,
    selectedChannels,
  }
}

export function getEventDetail(id: number): GetEventDetailActionType {
  return {
    type: GET_EVENT_DETAIL,
    id,
  }
}

export function getUser(): ActionType {
  return {
    type: GET_USER,
  }
}

export interface LoginActionType {
  type: string
  username: string
  password: string
}

export interface LoginSuccessActionType {
  type: string
  token: string
  id: number
  username: string
  email: string
  avatar: string
}
export interface ActionType {
  type: string
}
export interface FetchEventsActionType {
  type: string
  channels: string
  offset: number
  limit: number
}

export interface SearchEventsActionType {
  type: string
  selectedDateIndex: number
  selectedChannels: number[]
  afterDate?: Date
  beforeDate?: Date
}

export interface GetEventDetailActionType {
  type: string
  id: number
}

export interface UpdateSelectedDateActionType {
  type: string
  selectedDateIndex: number
}

export interface UpdateSelectedChannelsActionType {
  type: string
  selectedChannels: number[]
}
