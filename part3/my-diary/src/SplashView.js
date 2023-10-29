import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import { GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

export const SplashView = (props) => {
  const [showLoginButton, setShowLoginButton] = useState(false)

  const signinUserIdentify = useCallback(async (idToken) => {
    const googleCredentials = auth.GoogleAuthProvider.credential(idToken)
    const result = await auth().signInWithCredential(googleCredentials)

    const userDBRefKey = `/users/${result.user.uid}`
    const userResult = await database().ref(userDBRefKey).once('value').then((snapshot) => snapshot.val())

    console.log(userResult)

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
    } else {
      await database().ref(userDBRefKey).update({
        lastLoginAt: now,
      })
    }

    const userInfo = await database().ref(userDBRefKey).once('value').then((snapshot) => snapshot.val())

    console.log('userInfo', userInfo)

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
      signinUserIdentify(idToken)
    } catch (err) {
      setShowLoginButton(true)
    }
  }, [])

  useEffect(() => {
    userSilentLogin()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {showLoginButton && <GoogleSigninButton onPress={onPressGoogleLogin} />}
    </View>
  )
}