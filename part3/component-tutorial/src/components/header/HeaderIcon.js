import React from "react"
import { Icon } from "../atoms/Icon"
import { Button } from "../atoms/Button"

export class HeaderIcon extends React.Component {
  render() {
    return (
      <Button onPress={this.props.onPress}>
        <Icon name={this.props.iconName} size={28} color='black' />
      </Button>
    )
  }
}
