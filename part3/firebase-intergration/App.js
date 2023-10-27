import { View, Text, Image, ActivityIndicator } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useState, useCallback, useEffect } from 'react';
import firebaseAuth, { firebase } from '@react-native-firebase/auth';


GoogleSignin.configure()

export default function App() {
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  const onPressGoogleSignin = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      })
      const userInfo = await GoogleSignin.signIn()
      console.log('userInfo', userInfo)

      const credential = firebaseAuth.GoogleAuthProvider.credential(userInfo.idToken)
      const result = await firebaseAuth().signInWithCredential(credential)

      console.log(result)

      setUserInfo({
        name: result.additionalUserInfo.profile.name,
        profileImage: result.additionalUserInfo.profile.picture,
      })
    } catch (err) {

    }
  }, [])

  const getCurrentUserInfo = useCallback(async () => {
    try {
      setLoading(true)
      const userInfo = await GoogleSignin.signInSilently()
      const credential = firebaseAuth.GoogleAuthProvider.credential(userInfo.idToken)
      const result = await firebaseAuth().signInWithCredential(credential)
      console.log(result)
      setUserInfo({
        name: result.additionalUserInfo.profile.name,
        profileImage: result.additionalUserInfo.profile.picture,
      })
      setLoading(false)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      } else {
      }
    }
  }, [])

  useEffect(() => {
    getCurrentUserInfo()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        userInfo !== null ? (
          <View style={{ alignItems: 'center', justifyContent: 'center'}}>
            <Image source={{uri: userInfo.profileImage}} style={{ width: 100, height: 100, borderRadius: 50}} />
            <Text style={{ fontSize: 24, marginTop: 20 }}>{userInfo.name}</Text>
          </View>
        ) : (
          <GoogleSigninButton onPress={onPressGoogleSignin} />
        )
      )}
    </View>
  );
}