import React from "react"
import { View } from "react-native"
import { Badge } from "../atoms/Badge"
import { Icon, iconName } from "../atoms/Icon"

export const TabIcon: React.FC<{
  visibleBadge: boolean,
  iconName: iconName,
  iconColor: string
}> = (props) => {
  if (props.visibleBadge) {
    return (
      <View>
        <Badge>
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