import React from 'react'
import { Text as RNText} from 'react-native'

export const Typography = (props) => {
  return (
    <RNText
      style={{
        color: props.color,
        fontSize: props.fontSize
      }}
    >
      {props.children}
    </RNText>
  )
}