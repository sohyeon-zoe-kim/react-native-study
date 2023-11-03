import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { sleep } from "../utils/sleep"
import { TypeRootReducer } from "../store"
import { FeedInfo } from "../types/FeedInfo"
import { UserInfo } from "../types/UserInfo"

export const SET_USER_INFO = 'SET_USER_INFO' as const
export const GET_MY_FEED_REQUEST = 'GET_MY_FEED_REQUEST' as const
export const GET_MY_FEED_SUCCESS = 'GET_MY_FEED_SUCCESS' as const
export const GET_MY_FEED_FAILURE = 'GET_MY_FEED_FAILURE' as const

export const setUserInfo = (user: UserInfo) => {
  return {
    type: SET_USER_INFO,
    user
  }
}

export const getMyFeedRequest = () => {
  return {
    type: GET_MY_FEED_REQUEST,
  }
}

export const getMyFeedSuccess = (list: FeedInfo[]) => {
  return {
    type: GET_MY_FEED_SUCCESS,
    list
  }
}

export const getMyFeedFailure = () => {
  return {
    type: GET_MY_FEED_FAILURE,
  }
}

export const signIn = (): TypeUserInfoThunkAction => async (dispatch) => {
  await sleep(500)
  dispatch(setUserInfo({
    id: 'TEST_ID',
    uid: 'TEST_UID',
    name: 'TEST_NAME',
    profileImage: 'TEST_PROFILE_IMAGE'
  }))
}

export const getMyFeedList = (): TypeUserInfoThunkAction => async (dispatch) => {
  dispatch(getMyFeedRequest())
  await sleep(500)
  dispatch(getMyFeedSuccess([
    {
      id: 'ID_01',
      content: 'CONTENT_01',
      writer: {
        name: 'WRITER_NAME_01',
        uid: 'WRITER_UID_01',
      },
      imageUrl: 'https://cdn.imweb.me/upload/S20200106a105fd03f4b57/4ff941d818967.jpg',
      likeHistory: ['UID_01', 'UID_02', 'UID_03'],
      createdAt: new Date().getTime()
    },
    {
      id: 'ID_02',
      content: 'CONTENT_02',
      writer: {
        name: 'WRITER_NAME_02',
        uid: 'WRITER_UID_02',
      },
      imageUrl: 'https://www.sputnik.kr/article_img/202105/article_1621416137.png',
      likeHistory: ['UID_03'],
      createdAt: new Date().getTime()
    },
  ]))
}

export type TypeUserInfoDispatch = ThunkDispatch<TypeRootReducer, undefined, TypeUserInfoActions>
export type TypeUserInfoThunkAction = ThunkAction<void, TypeRootReducer, undefined, TypeUserInfoActions>
export type TypeUserInfoActions =
  | ReturnType<typeof setUserInfo>
  | ReturnType<typeof getMyFeedRequest>
  | ReturnType<typeof getMyFeedSuccess>
  | ReturnType<typeof getMyFeedFailure>