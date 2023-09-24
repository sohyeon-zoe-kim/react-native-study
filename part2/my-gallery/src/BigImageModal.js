import { Modal, View, Pressable, TouchableOpacity } from "react-native"
import { SimpleLineIcons } from '@expo/vector-icons'
import styled from 'styled-components/native'

const ModalContainer = styled.Pressable`
  flex: 1;
  background-color: rgba(115, 115, 115, 0.5);
  justify-content: center;
  align-items: center;
`
const Image = styled.Image`
  width: 280px;
  height: 280px;
  background-color: white;
`
const ImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
`
const Arrow = styled.TouchableOpacity`
  height: 100%;
  padding: 0 20px;
  justify-content: center;
`

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <Arrow onPress={onPress} disabled={disabled}>
      <SimpleLineIcons name={iconName} size={12} color={disabled ? 'transparent' : 'black'} />
    </Arrow>
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
      <ModalContainer onPress={onPressBackdrop}>
        <ImageContainer>
          <ArrowButton
            iconName='arrow-left'
            onPress={onPressLeftArrow}
            disabled={!showPreviousArrow}
          />
          <Pressable>
            <Image source={{ uri: selectedImage?.uri }} resizeMode="contain" />
          </Pressable>
          <ArrowButton
            iconName='arrow-right'
            onPress={onPressRightArrow}
            disabled={!showNextArrow}
          />
        </ImageContainer>
      </ModalContainer>
    </Modal>
  )
}