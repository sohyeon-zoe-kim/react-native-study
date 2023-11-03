import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin"
import { useDispatch } from "react-redux"
import { TypeUserDispatch, signIn } from "./actions/user"

export const SplashView: React.FC<{
  onFinishLoad: () => void
}> = (props) => {
  const [showLogin, setShowLogin] = useState(false)
  const dispatch = useDispatch<TypeUserDispatch>()

  const appInit = useCallback(async () => {
    try {
      const { idToken } = await GoogleSignin.signInSilently()
      if (idToken !== null) {
        await dispatch(signIn(idToken))
        props.onFinishLoad()
      }
    } catch (err) {
      setShowLogin(true)
    }
  }, [])

  const onPressSignin = useCallback(async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true
    })

    const { idToken } = await GoogleSignin.signIn()

    if (idToken !== null) {
      await dispatch(signIn(idToken))
      props.onFinishLoad()
    }
  }, [])

  useEffect(() => {
    appInit()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {showLogin && <GoogleSigninButton onPress={onPressSignin} />}
    </View>
  )
}