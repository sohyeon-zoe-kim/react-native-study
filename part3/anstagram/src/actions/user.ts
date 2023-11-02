import { ThunkAction } from "redux-thunk"
import { sleep } from "../utils/sleep"
import { TypeRootReducer } from "../store"

export const SET_USER_INFO = 'SET_USER_INFO' as const

export const setUserInfo = (userId: string) => {
  return {
    type: SET_USER_INFO,
    userId
  }
}

export const signing = (): TypeUserInfoThunkAction => async (dispatch) => {
  await sleep(1000)
  dispatch(setUserInfo('TEST'))
}

export type TypeUserInfoThunkAction = ThunkAction<void, TypeRootReducer, undefined, TypeUserInfoActions>
export type TypeUserInfoActions =
  | ReturnType<typeof setUserInfo>