import React from "react"
import { Icon, iconName } from "../atoms/Icon"
import { Button } from "../atoms/Button"

export const HeaderIcon: React.FC<{
  onPress: () => void,
  iconName: iconName
}> = (props) => {
  return (
    <Button onPress={props.onPress}>
      <Icon name={props.iconName} size={28} color='black' />
    </Button>
  ) 
}