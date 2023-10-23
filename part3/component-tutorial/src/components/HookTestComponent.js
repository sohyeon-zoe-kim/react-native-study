import React, { useMemo } from "react"
import { View } from "react-native"
import { Typography } from "./atoms/Typography"

export const HookTestComponent = (props) => {
  const text = useMemo(() => {
    return props.a + props.b
  }, [props.a, props.b])

  return (
    <View>
      <Typography fontSize={18}>
        결과값 : {text}
      </Typography>
    </View>
  )
}