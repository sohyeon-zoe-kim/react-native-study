import React from "react"
import { View, Dimensions } from "react-native"
import { SafeAreaInsetsContext } from "react-native-safe-area-context"
import { Spacer } from "../atoms/Spacer"
import { Button } from "../atoms/Button"
import { Icon } from "../atoms/Icon"
import { Typography } from "../atoms/Typography"

const { width } = Dimensions.get('window')

export class HeaderWithoutCompound extends React.Component {
  render() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={{ paddingTop: insets.top }}>
            <View
              style={{
                width: width,
                height: 56,
                flexDirection: 'row',
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
              }}
            >
              <Spacer horizontal space={12} />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {this.props.leftIcon && (
                  <Button onPress={this.props.leftIcon.onPress}>
                    <Icon name={this.props.leftIcon.iconName} size={28} />
                  </Button>
                )}
                <Typography fontSize={18}>{this.props.title}</Typography>
                {this.props.rightIcon && (
                  <Button onPress={this.props.rightIcon.onPress}>
                    <Icon name={this.props.rightIcon.iconName} size={28} />
                  </Button>
                )}
              </View>
              <Spacer horizontal space={12} />
            </View>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    )
  }
}