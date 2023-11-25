import { applyMiddleware, combineReducers, createStore } from "redux"
import { TypeUserInfoReducer, userInfoReducer } from "../reducers/UserInfo"
import { feedListReducer, TypeFeedListReducer } from "../reducers/FeedList"
import logger from "redux-logger"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  feedList: feedListReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export type TypeRootReducer = {
  userInfo: TypeUserInfoReducer,
  feedList: TypeFeedListReducer
}