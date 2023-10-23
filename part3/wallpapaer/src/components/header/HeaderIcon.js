import React from "react"
import { Icon } from "../atoms/Icon"
import { Button } from "../atoms/Button"

export const HeaderIcon = (props) => {
  return (
    <Button onPress={props.onPress}>
      <Icon name={props.iconName} size={28} color='black' />
    </Button>
  ) 
}