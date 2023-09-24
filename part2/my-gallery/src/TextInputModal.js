import { Modal, KeyboardAvoidingView, Platform, Pressable } from "react-native"
import styled from 'styled-components/native'

const TextInputContainer = styled.SafeAreaView`
  width: 100%;
  position: absolute;
  bottom: 0;
`
const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px;
  border: 0.5px solid lightgray;
  background-color: white;
`

export default ({
  modalVisible,
  albumTitle,
  setAlbumTitle,
  onSubmitEditing,
  onPressBackdrop
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Pressable onPress={onPressBackdrop} style={{ flex: 1 }}>
          <TextInputContainer>
            <TextInput
              placeholder="앨범명을 입력해주세요"
              value={albumTitle}
              onChangeText={setAlbumTitle}
              onSubmitEditing={onSubmitEditing}
              autoFocus={true}
            />
          </TextInputContainer>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  )
}