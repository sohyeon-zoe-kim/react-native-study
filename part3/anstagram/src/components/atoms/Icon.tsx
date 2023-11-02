import React from "react"
import { Ionicons } from '@expo/vector-icons'

export type iconName = keyof typeof Ionicons.glyphMap

export const Icon: React.FC<{
  name: iconName,
  size: number,
  color: string
}> = (props) => {
  return (
    <Ionicons
      name={props.name}
      size={props.size}
      color={props.color}
    />
  )
}
