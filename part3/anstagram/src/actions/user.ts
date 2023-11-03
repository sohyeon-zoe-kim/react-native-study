import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { sleep } from "../utils/sleep"
import { TypeRootReducer } from "../store"
import { FeedInfo } from "../types/FeedInfo"
import { UserInfo } from "../types/UserInfo"
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

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

export const signIn = (idToken: string): TypeUserThunkAction => async (dispatch) => {
  const googleSigninCredential = auth.GoogleAuthProvider.credential(idToken)
  const signinResult = await auth().signInWithCredential(googleSigninCredential)

  const userDB = await database().ref(`/users/${signinResult.user.uid}`)
  const user = await userDB.once('value').then((snapshot) => snapshot.val())
  const now = new Date().getTime()

  if (user === null) {
    await userDB.set({
      name: signinResult.user.displayName,
      profileImage: signinResult.user.photoURL,
      uid: signinResult.user.uid,
      createdAt: now,
      lastLoginAt: now,
    })
  } else {
    await userDB.update({
      lastLoginAt: now,
    })
  }

  dispatch(
    setUserInfo({
      uid: signinResult.user.uid,
      name: signinResult.user.displayName ?? 'unnknown name',
      profileImage: signinResult.user.photoURL ?? '',
    })
  )
}

export const getMyFeedList = (): TypeUserThunkAction => async (dispatch) => {
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

export type TypeUserDispatch = ThunkDispatch<TypeRootReducer, undefined, TypeUserActions>
export type TypeUserThunkAction = ThunkAction<void, TypeRootReducer, undefined, TypeUserActions>
export type TypeUserActions =
  | ReturnType<typeof setUserInfo>
  | ReturnType<typeof getMyFeedRequest>
  | ReturnType<typeof getMyFeedSuccess>
  | ReturnType<typeof getMyFeedFailure>