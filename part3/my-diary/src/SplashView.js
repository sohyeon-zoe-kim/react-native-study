import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"
import { GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { useRecoilState, useSetRecoilState } from "recoil"
import { stateUserInfo } from "./states/stateUserInfo"
import { useGetDiaryList } from "./hooks/useGetDiaryList"
import { PasswordInputBox } from "./components/PasswordInputBox"

export const SplashView = (props) => {
  const [loading, setLoading] = useState(false)
  const [showLoginButton, setShowLoginButton] = useState(false)
  const [inputPassword, setInputPassword] = useState('')
  const [userInfo, setUserInfo] = useRecoilState(stateUserInfo)
  const runGetDiaryList = useGetDiaryList()
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [passwordError, setPasswordError] = useState(null)

  const signinUserIdentify = useCallback(async (idToken) => {
    setLoading(true)
    const googleCredentials = auth.GoogleAuthProvider.credential(idToken)
    const result = await auth().signInWithCredential(googleCredentials)

    const userDBRefKey = `/users/${result.user.uid}`
    const userResult = await database().ref(userDBRefKey).once('value').then((snapshot) => snapshot.val())

    const now = new Date().toISOString()

    if (userResult === null) {
      await database().ref(userDBRefKey).set({
        name: result.additionalUserInfo.profile.name,
        profileImage: result.additionalUserInfo.profile.picture,
        uid: result.user.uid,
        password: '',
        createdAt: now,
        lastLoginAt: now
      })
    }

    const userInfo = await database().ref(userDBRefKey).once('value').then((snapshot) => snapshot.val())
    setUserInfo(userInfo)
    await runGetDiaryList(userInfo)

    if (userInfo.password !== '') {
      setShowPasswordInput(true)
      setLoading(false)
      return
    }

    await database().ref(userDBRefKey).update({
      lastLoginAt: now,
    })

    props.onFinishLoad()
  }, [])

  const onPressGoogleLogin = useCallback(async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    const { idToken } = await GoogleSignin.signIn()
    signinUserIdentify(idToken)
  }, [])

  const userSilentLogin = useCallback(async () => {
    try {
      const { idToken} = await GoogleSignin.signInSilently()
      setLoading(true)
      signinUserIdentify(idToken)
    } catch (err) {
      setLoading(false)
      setShowLoginButton(true)
    }
  }, [])

  useEffect(() => {
    userSilentLogin()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {showLoginButton && <GoogleSigninButton onPress={onPressGoogleLogin} />}
      {showPasswordInput &&
        <PasswordInputBox
          value={inputPassword}
          errorMessage={passwordError}
          onChangeText={async(text) => {
            setInputPassword(text)
            if (text.length === 4) {
              if (userInfo.password === text) {
                const now = new Date().toISOString()
                const userDB = `/users/${userInfo.uid}/`
                await database().ref (userDB).update({
                  lastLoginAt: now,
                })
                props.onFinishLoad()
              } else {
                setInputPassword('')
                setPasswordError('비밀번호가 다릅니다.')
              }
            }
          }}
        />
      }
      {loading && (
        <ActivityIndicator />
      )}
    </View>
  )
}