import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import { GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

export const SplashView = (props) => {
  const [showLoginButton, setShowLoginButton] = useState(false)

  const signinUserIdentify = useCallback(async (idToken) => {
    const googleCredentials = auth.GoogleAuthProvider.credential(idToken)
    const result = await auth().signInWithCredential(googleCredentials)

    console.log(result)
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