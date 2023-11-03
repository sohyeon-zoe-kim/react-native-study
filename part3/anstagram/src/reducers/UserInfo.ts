import { GET_MY_FEED_SUCCESS, SET_USER_INFO, TypeUserActions } from "../actions/user"
import { FeedInfo } from "../@types/FeedInfo"
import { UserInfo } from "../@types/UserInfo"

export type TypeUserInfoReducer = {
  userInfo: UserInfo | null,
  myFeedList: FeedInfo[]
}

const defaultUserInfoState: TypeUserInfoReducer = {
  userInfo: null,
  myFeedList: []
}

export const userInfoReducer = (state: TypeUserInfoReducer = defaultUserInfoState, action: TypeUserActions) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.user
      }
    case GET_MY_FEED_SUCCESS:
      return {
        ...state,
        myFeedList: action.list
      }
  }

  return {
    ...state
  }
}