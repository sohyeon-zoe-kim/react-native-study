import { applyMiddleware, combineReducers, createStore } from "redux"
import { UserInfoReducer } from "../reducers/UserInfo"
import { FeedListReducer } from "../reducers/FeedList"
import logger from "redux-logger"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
  userInfo: UserInfoReducer,
  feedList: FeedListReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))