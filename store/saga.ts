import { call, put, takeEvery } from 'redux-saga/effects'
import { Api } from '../apis/Api'

import {
  LOGIN_REQUEST,
  LOGIN_FAILED,
  loginSuccess,
  LoginActionType,
  GET_CHANNELS,
  GET_CHANNELS_SUCCESS,
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  FetchEventsActionType,
  SearchEventsActionType,
  SEARCH_EVENTS,
  SEARCH_EVENTS_SUCCESS,
  updateStoreSelectedDateIndex,
  updateStoreSelectedChannels,
  GET_EVENT_DETAIL,
  GetEventDetailActionType,
  GET_EVENT_DETAIL_SUCCESS,
  GET_USER,
  GET_USER_SUCCESS,
  LOGIN_OUT,
  LOGIN_OUT_SUCCESS,
} from './action'
import { select } from 'redux-saga/effects'
import { LoginInfo, EventListData, StoreState, Event, User } from './type'
import { getTimeRange } from './utils'

function* fetchLogin(action: LoginActionType) {
  try {
    const loginInfo: LoginInfo = yield call(Api.login, action.username, action.password)
    yield put(
      loginSuccess(
        loginInfo.token,
        loginInfo.user.id,
        loginInfo.user.username,
        loginInfo.user.email,
        loginInfo.user.avatar
      )
    )
  } catch (e) {
    yield put({ type: LOGIN_FAILED, message: e.message })
  }
}
function* loginOut() {
  try {
    yield put({ type: LOGIN_OUT_SUCCESS })
  } catch (e) {
    console.error(e)
  }
}
function* fetchEvents(action: FetchEventsActionType) {
  try {
    const token: string = yield select((state: StoreState) => state.loginInfo.token)
    const eventListData: EventListData = yield call(
      Api.getEvents,
      token,
      action.channels,
      action.offset,
      action.limit
    )
    if (eventListData && eventListData.events) {
      eventListData.events.forEach((value) => {
        value.participantsUsers = []
        value.likesUsers = []
      })
      yield put({ type: GET_EVENTS_SUCCESS, eventListData: eventListData })
    }
  } catch (e) {
    console.error(e)
  }
}

function* fetchChannels() {
  try {
    const token: string = yield select((state: StoreState) => state.loginInfo.token)
    const { channels } = yield call(Api.getChannels, token)
    if (channels) {
      yield put({ type: GET_CHANNELS_SUCCESS, channels })
    }
  } catch (e) {
    console.error(e)
  }
}

function* searchEvents(action: SearchEventsActionType) {
  try {
    const token: string = yield select((state: StoreState) => state.loginInfo.token)
    yield put(updateStoreSelectedChannels(action.selectedChannels))
    yield put(updateStoreSelectedDateIndex(action.selectedDateIndex))
    const { before, after } = getTimeRange(
      action.selectedDateIndex,
      action.afterDate,
      action.beforeDate
    )
    const copySelectedChannels = action.selectedChannels.includes(0)
      ? ''
      : action.selectedChannels.join(',')
    const eventListData: EventListData = yield call(
      Api.searchEvents,
      token,
      copySelectedChannels,
      before ? before.toString() : undefined,
      after ? after.toString() : undefined
    )
    if (eventListData && eventListData.events) {
      eventListData.events.forEach((value) => {
        value.participantsUsers = []
        value.likesUsers = []
      })
      yield put({ type: SEARCH_EVENTS_SUCCESS, eventListData })
    }
  } catch (e) {
    console.error(e)
  }
}

function* fetchEventDetail(action: GetEventDetailActionType) {
  try {
    const token: string = yield select((state: StoreState) => state.loginInfo.token)
    const eventDetail: { event: Event } = yield call(Api.getEventDetail, token, action.id)
    yield put({ type: GET_EVENT_DETAIL_SUCCESS, eventDetail: eventDetail.event })
  } catch (e) {
    console.error(e)
  }
}

function* fetchUser() {
  try {
    const token: string = yield select((state: StoreState) => state.loginInfo.token)
    const userData: User = yield call(Api.getUser, token)
    yield put({ type: GET_USER_SUCCESS, userData })
  } catch (e) {
    console.error(e)
  }
}

function* mysaga() {
  yield takeEvery(LOGIN_REQUEST, fetchLogin)
  yield takeEvery(LOGIN_OUT, loginOut)
  yield takeEvery(GET_EVENTS, fetchEvents)
  yield takeEvery(GET_CHANNELS, fetchChannels)
  yield takeEvery(SEARCH_EVENTS, searchEvents)
  yield takeEvery(GET_EVENT_DETAIL, fetchEventDetail)
  yield takeEvery(GET_USER, fetchUser)
}
export default mysaga
