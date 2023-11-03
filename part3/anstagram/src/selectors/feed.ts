import { useSelector } from "react-redux"
import { TypeRootReducer } from "../store"
import { FeedInfo } from "../@types/FeedInfo"

export const useTotalFeedList = () =>
  useSelector<TypeRootReducer, FeedInfo[]>(state => state.feedList.list)