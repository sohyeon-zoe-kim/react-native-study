import React from "react"
import { View, useWindowDimensions } from "react-native"
import { RemoteImage } from "./atoms/RemoteImage"
import { Spacer } from "./atoms/Spacer"
import { Typography } from "./atoms/Typography"

export const LinkItem = (props) => {
  const { width } = useWindowDimensions()

  return (
    <View style={{ borderWidth: 1, borderRadius: 4, borderColor: 'gray'}}>
      <RemoteImage url={props.image} width={width - 50} height={(width - 48) * 0.5} />
      <View style={{ paddingHorizontal: 12, paddingVertical: 8}}>
        <Spacer space={8} />
        <Typography fontSize={20} color='black'>{props.title}</Typography>
        <Spacer space={4} />
        {props.description && (
          <Typography fontSize={16} color='gray'>{props.description}</Typography>
        )}
      </View>
    </View>
  )
}