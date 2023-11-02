import { applyMiddleware, combineReducers, createStore } from "redux"
import { TypeUserInfoReducer, UserInfoReducer } from "../reducers/UserInfo"
import { FeedListReducer, TypeFeedListReducer } from "../reducers/FeedList"
import logger from "redux-logger"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
  userInfo: UserInfoReducer,
  feedList: FeedListReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export type TypeRootReducer = {
  userInfo: TypeUserInfoReducer,
  feedList: TypeFeedListReducer
}