import {
  LOGIN_SUCCEEDED,
  GET_EVENTS_SUCCESS,
  GET_CHANNELS_SUCCESS,
  UPDATE_STORE_SELECTED_DATE_INDEX,
  UPDATE_STORE_SELECTED_CHANNELS,
  SEARCH_EVENTS_SUCCESS,
  GET_EVENT_DETAIL_SUCCESS,
  GET_USER_SUCCESS,
  LOGIN_OUT_SUCCESS,
} from './action'
import { User, Event, EventListData, EventChannel, StoreState } from './type'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  loginInfo: {
    token: '',
    user: {
      id: NaN,
      username: '',
      email: '',
      avatar: '',
    },
  },
  eventListData: {
    events: [],
    channels: [],
    selectedChannels: [0],
    selectedDateIndex: 0,
    hasMore: true,
  },
  // eventDetail:{}
}
const STORAGE_TOKEN = 'STORAGE_TOKEN'
const STORAGE_USERID = 'STORAGE_USERID'
const STORAGE_USERNAME = 'STORAGE_USERNAME'
const STORAGE_USEREMAIL = 'STORAGE_USEREMAIL'
const STORAGE_USERAVATAR = 'STORAGE_USERAVATAR'

export default function rootReducer(state: StoreState = initialState, action: any): StoreState {
  // 这里暂不处理任何 action，
  // 仅返回传入的 state。
  switch (action.type) {
    case LOGIN_SUCCEEDED: {
      let token = ''
      const user: User = {
        id: NaN,
        username: '',
        email: '',
        avatar: '',
      }
      token = action.token
      user.id = action.id
      user.username = action.username
      user.email = action.email
      user.avatar = action.avatar

      AsyncStorage.setItem(STORAGE_TOKEN, token)
      AsyncStorage.setItem(STORAGE_USERID, user.id.toString())
      AsyncStorage.setItem(STORAGE_USERNAME, user.username)
      AsyncStorage.setItem(STORAGE_USEREMAIL, user.email)
      AsyncStorage.setItem(STORAGE_USERAVATAR, user.avatar)
      return {
        ...state,
        loginInfo: {
          token,
          user: user,
        },
      }
    }
    case LOGIN_OUT_SUCCESS: {
      const logoutToken = ''
      const logoutUser: User = {
        id: NaN,
        username: '',
        email: '',
        avatar: '',
      }
      AsyncStorage.removeItem(STORAGE_TOKEN)
      AsyncStorage.removeItem(STORAGE_USERID)
      AsyncStorage.removeItem(STORAGE_USERNAME)
      AsyncStorage.removeItem(STORAGE_USEREMAIL)
      AsyncStorage.removeItem(STORAGE_USERAVATAR)
      return {
        ...state,
        loginInfo: {
          token: logoutToken,
          user: logoutUser,
        },
      }
    }
    case GET_EVENTS_SUCCESS: {
      const events: Event[] = []
      //过滤新增的
      const newEventListData = action.eventListData.events.filter(
        (item: Event) => !state.eventListData.events.map((item: Event) => item.id).includes(item.id)
      )
      const eventListData: EventListData = {
        events: events.concat(state.eventListData.events, newEventListData),
        channels: state.eventListData.channels,
        selectedChannels: state.eventListData.selectedChannels,
        selectedDateIndex: state.eventListData.selectedDateIndex,
        hasMore: action.eventListData.hasMore,
      }
      return {
        ...state,
        eventListData,
      }
    }
    case GET_CHANNELS_SUCCESS: {
      let channels: EventChannel[] = []
      if (action.channels && action.channels.length > 0) {
        channels = action.channels
      }
      const _eventListData: EventListData = {
        events: state.eventListData.events,
        channels: channels,
        selectedChannels: state.eventListData.selectedChannels,
        selectedDateIndex: state.eventListData.selectedDateIndex,
        hasMore: state.eventListData.hasMore,
      }
      return {
        ...state,
        eventListData: _eventListData,
      }
    }
    case UPDATE_STORE_SELECTED_DATE_INDEX: {
      let updateSelectedDateIndex = 0
      updateSelectedDateIndex = action.selectedDateIndex
      const _eventListData: EventListData = {
        ...state.eventListData,
        selectedDateIndex: updateSelectedDateIndex,
      }
      return {
        ...state,
        eventListData: _eventListData,
      }
    }
    case UPDATE_STORE_SELECTED_CHANNELS: {
      let updateSelectedChannels: number[] = []
      updateSelectedChannels = action.selectedChannels.slice()
      const _eventListData: EventListData = {
        ...state.eventListData,
        selectedChannels: updateSelectedChannels,
      }
      return {
        ...state,
        eventListData: _eventListData,
      }
    }
    case SEARCH_EVENTS_SUCCESS: {
      const searchEventListData: EventListData = {
        ...state.eventListData,
        events: action.eventListData.events,
      }
      return {
        ...state,
        eventListData: searchEventListData,
      }
    }
    case GET_EVENT_DETAIL_SUCCESS: {
      return {
        ...state,
        eventDetail: { ...action.eventDetail },
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        loginInfo: {
          token: state.loginInfo.token,
          user: action.userData,
        },
      }
    }
    default:
      return state
  }
}
