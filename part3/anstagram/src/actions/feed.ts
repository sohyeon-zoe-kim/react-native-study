import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { FeedInfo } from "../types/FeedInfo"
import { sleep } from "../utils/sleep"
import { TypeRootReducer } from "../store"

export const GET_FEED_LIST_REQUEST = 'GET_FEED_LIST_REQUEST' as const
export const GET_FEED_LIST_SUCCESS = 'GET_FEED_LIST_SUCCESS' as const
export const GET_FEED_LIST_FAILURE = 'GET_FEED_LIST_FAILURE' as const

export const CREATED_FEED_REQUEST = 'CREATED_FEED_REQUEST' as const
export const CREATED_FEED_SUCCESS = 'CREATED_FEED_SUCCESS' as const
export const CREATED_FEED_FAILURE = 'CREATED_FEED_FAILURE' as const

export const FAVORITE_FEED_REQUEST = 'FAVORITE_FEED_REQUEST' as const
export const FAVORITE_FEED_SUCCESS = 'FAVORITE_FEED_SUCCESS' as const
export const FAVORITE_FEED_FAILURE = 'FAVORITE_FEED_FAILURE' as const

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

export const createFeedRequest = () => {
  return {
    type: CREATED_FEED_REQUEST
  }
}

export const createFeedSuccess = (item: FeedInfo) => {
  return {
    type: CREATED_FEED_SUCCESS,
    item
  }
}

export const createFeedFailure = () => {
  return {
    type: CREATED_FEED_FAILURE
  }
}

export const favoriteFeedRequest = () => {
  return {
    type: FAVORITE_FEED_REQUEST
  }
}

export const favoriteFeedSuccess = (feedId: FeedInfo['id'], myId: string, action: 'add' | 'del') => {
  return {
    type: FAVORITE_FEED_SUCCESS,
    feedId,
    myId,
    action
  }
}
export const favoriteFeedFailure = () => {
  return {
    type: FAVORITE_FEED_FAILURE
  }
}

export const getFeedList = (): TypeFeedThunkAction => async (dispatch) => {
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
      imageUrl: 'https://www.rollingstone.co.uk/wp-content/uploads/sites/2/2023/02/The_pyramid_stage_during_Glastonbury_Festival_2019_01.jpg',
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
      imageUrl: 'https://www.sputnik.kr/article_img/202105/article_1621416137.png',
      likeHistory: ['UID_01', 'UID_02'],
      createdAt: new Date().getTime()
    },
  ]))
}

export const createFeed = (item: Omit<FeedInfo, 'id' | 'writer' | 'likeHistory' | 'createdAt'>): TypeFeedThunkAction => async (dispatch, getState) => {
  dispatch(createFeedRequest())

  const createdAt = new Date().getTime()
  const userInfo = getState().userInfo.userInfo

  sleep(500)

  dispatch(createFeedSuccess({
    id: 'ID_010',
    content: item.content,
    writer: {
      name: userInfo?.name ?? 'unknown',
      uid: userInfo?.uid ?? 'unknown',
    },
    imageUrl: item.imageUrl,
    likeHistory: [],
    createdAt: createdAt
  }))
}

export const favoriteFeed = (item: FeedInfo): TypeFeedThunkAction => async (dispatch, getState) => {
  dispatch(favoriteFeedRequest())

  const myId = getState().userInfo.userInfo?.uid || null

  if (myId === null) {
    dispatch(favoriteFeedFailure())
    return
  }

  sleep(1000)
  const hasMyId = item.likeHistory.filter((likeUserId) => likeUserId === myId).length > 0

  if (hasMyId) {
    dispatch(favoriteFeedSuccess(item.id, myId, 'del'))
  } else {
    dispatch(favoriteFeedSuccess(item.id, myId, 'add'))
  }
}

export type TypeFeedDispatch = ThunkDispatch<TypeRootReducer, undefined, TypeFeedActions>
export type TypeFeedThunkAction = ThunkAction<void, TypeRootReducer, undefined, TypeFeedActions>
export type TypeFeedActions =
  | ReturnType<typeof getFeedListRequest>
  | ReturnType<typeof getFeedListSuccess>
  | ReturnType<typeof getFeedListFailure>
  | ReturnType<typeof createFeedRequest>
  | ReturnType<typeof createFeedSuccess>
  | ReturnType<typeof createFeedFailure>
  | ReturnType<typeof favoriteFeedRequest>
  | ReturnType<typeof favoriteFeedSuccess>
  | ReturnType<typeof favoriteFeedFailure>