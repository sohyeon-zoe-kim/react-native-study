import React from "react"
import { View } from "react-native"
import { Badge } from "../atoms/Badge"
import { Icon } from "../atoms/Icon"

export class TapIcon extends React.Component {
  render() {
    if (this.props.visibleBadge) {
      return (
        <View>
          <Badge fontSize={10}>
            <Icon
              name={this.props.iconName}
              size={20}
              color='black'
            />
          </Badge>
        </View>
      )
    }

    return (
      <View>
        <Icon
          name={this.props.iconName}
          size={20}
          color='black'
        />
      </View>
    )
  }
}