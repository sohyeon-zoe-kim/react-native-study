import { ThunkAction } from "redux-thunk"
import { FeedInfo } from "../types/FeedInfo"
import { sleep } from "../utils/sleep"
import { TypeRootReducer } from "../store"

export const GET_FEED_LIST_REQUEST = 'GET_FEED_LIST_REQUEST' as const
export const GET_FEED_LIST_SUCCESS = 'GET_FEED_LIST_SUCCESS' as const
export const GET_FEED_LIST_FAILURE = 'GET_FEED_LIST_FAILURE' as const

export const getFeedListRequest = () => {
  return {
    type: GET_FEED_LIST_REQUEST
  }
}

export const getFeedListSuccess = (list: FeedInfo[]) => {
  return {
    type: GET_FEED_LIST_SUCCESS,
    list
  }
}
export const getFeedListFailure = () => {
  return {
    type: GET_FEED_LIST_FAILURE
  }
}

export const getFeedList = (): TypeFeedListThunkAction => async (dispatch) => {
  dispatch(getFeedListRequest())

  await sleep(500)

  dispatch(getFeedListSuccess([
    {
      id: 'ID_01',
      content: 'CONTENT_01',
      writer: {
        name: 'WRITER_NAME_01',
        uid: 'WRITER_UID_01',
      },
      imageUrl: 'IMAGE_URL_01',
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
      imageUrl: 'IMAGE_URL_02',
      likeHistory: ['UID_03'],
      createdAt: new Date().getTime()
    },
    {
      id: 'ID_03',
      content: 'CONTENT_03',
      writer: {
        name: 'WRITER_NAME_03',
        uid: 'WRITER_UID_03',
      },
      imageUrl: 'IMAGE_URL_03',
      likeHistory: ['UID_01', 'UID_02'],
      createdAt: new Date().getTime()
    },
  ]))
}

export type TypeFeedListThunkAction = ThunkAction<void, TypeRootReducer, undefined, TypeFeedListActions>
export type TypeFeedListActions =
  | ReturnType<typeof getFeedListRequest>
  | ReturnType<typeof getFeedListSuccess>
  | ReturnType<typeof getFeedListFailure>