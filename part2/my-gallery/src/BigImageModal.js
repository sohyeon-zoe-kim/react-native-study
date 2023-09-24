import { Modal, View, Image, Pressable, TouchableOpacity } from "react-native"
import { SimpleLineIcons } from '@expo/vector-icons'

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        height: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
      }}
    >
      <SimpleLineIcons
        name={iconName}
        size={12}
        color={disabled ? 'transparent' : 'black'}
      />
    </TouchableOpacity>
  )
}

export default ({
  modalVisible,
  onPressBackdrop,
  selectedImage,
  onPressLeftArrow,
  onPressRightArrow,
  showPreviousArrow,
  showNextArrow
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
    >
      <Pressable
        onPress={onPressBackdrop}
        style={{
          flex: 1,
          backgroundColor: `rgba(115, 115, 115, 0.5)`,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ArrowButton
            iconName='arrow-left'
            onPress={onPressLeftArrow}
            disabled={!showPreviousArrow}
          />
          <Pressable>
            <Image
              source={{ uri: selectedImage?.uri }}
              style={{ width: 280, height: 280, backgroundColor: 'white' }}
              resizeMode="contain"
            />
          </Pressable>
          <ArrowButton
            iconName='arrow-right'
            onPress={onPressRightArrow}
            disabled={!showNextArrow}
          />
        </View>
      </Pressable>
    </Modal>
  )
}