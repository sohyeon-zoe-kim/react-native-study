import React from "react"
import { View } from "react-native"
import { Badge } from "../atoms/Badge"
import { Icon } from "../atoms/Icon"

export const TabIcon = (props) => {
  if (props.visibleBadge) {
    return (
      <View>
        <Badge fontSize={10}>
          <Icon
            name={props.iconName}
            size={20}
            color={props.iconColor}
          />
        </Badge>
      </View>
    )
  }

  return (
    <View>
      <Icon
        name={props.iconName}
        size={20}
        color={props.iconColor}
      />
    </View>
  )
}