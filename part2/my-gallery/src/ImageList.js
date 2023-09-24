import { Dimensions, FlatList, TouchableOpacity } from "react-native"
import styled from 'styled-components/native'

const width = Dimensions.get('screen').width
const minColumSize = width >= 500 ? 200 : 130
const divisor = width / minColumSize
const numColumns = Math.floor(divisor)
const columnSize = width / numColumns

const AddImageButton = styled.TouchableOpacity`
  width: ${columnSize}px;
  height: ${columnSize}px;
  background-color: lightgrey;
  justify-content: center;
  align-items: center;
`
const Image = styled.Image`
  width: ${columnSize}px;
  height: ${columnSize}px;
`
const AddImageButtonText = styled.Text`
  font-weight: 100;
  font-size: 45px;
`

export default ({
  imageWithAddButton,
  onPressOpenGallery,
  onPressImage,
  onLongPressImage
}) => {  
  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image
    if (id === -1) {
      return (
        <AddImageButton onPress={onPressOpenGallery}>
          <AddImageButtonText>+</AddImageButtonText>
        </AddImageButton>
      )
    }

    return (
      <TouchableOpacity
        onPress={() => onPressImage(image)}
        onLongPress={() => onLongPressImage(id)}
      >
        <Image source={{ uri }}/>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={imageWithAddButton}
      renderItem={renderItem}
      numColumns={numColumns}
      style={{ zIndex: -1 }}
    />
  )
}