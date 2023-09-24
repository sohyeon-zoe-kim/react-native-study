import { StyleSheet, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import { useGallery } from './src/use-gallery'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import MyDropdownPicker from './src/MyDropdownPicker'
import TextInputModal from './src/TextInputModal'
import BigImageModal from './src/BigImageModal'

const width = Dimensions.get('screen').width
const columnSize = width / 3

export default function App() {
  const {
    imageWithAddButton,
    pickImage,
    deleteImage,
    selectedAlbum,
    textInputModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    albums,
    selectAlbum,
    deleteAlbum,
    bigImgModalVisible,
    openBigImgModal,
    closeBigImgModal,
    selectImage,
    selectedImage
  } = useGallery()

  const onPressOpenGallery = () => {
    pickImage()
  }
  const onLongPressImage = (imageId) => deleteImage(imageId)
  const onPressImage = (image) => {
    selectImage(image)
    openBigImgModal(image)
  }
  const onPressAddAlbum = () => {
    openTextInputModal()
  }
  const onSubmitEditing = () => {
    if (!albumTitle) return
    addAlbum()
    closeTextInputModal()
    resetAlbumTitle()
  }
  const onPressTextInputModalBackdrop = () => {
    closeTextInputModal()
  }
  const onPressHeader = () => {
    if (isDropdownOpen) {
      closeDropdown()
    } else {
      openDropdown()
    }
  }
  const onPressAlbum = (album) => {
    selectAlbum(album)
    closeDropdown()
  }
  const onLongPressAlbum = (albumId) => {
    deleteAlbum(albumId)
  }
  const onPressBigImgModalBackdrop = () => {
    closeBigImgModal()
  }

  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: 'lightgrey',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: '100', fontSize: 45 }} >+</Text>
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity
        onPress={() => onPressImage(image)}
        onLongPress={() => onLongPressImage(id)}
      >
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <MyDropdownPicker
          selectedAlbum={selectedAlbum}
          onPressAddAlbum={onPressAddAlbum}
          onPressHeader={onPressHeader}
          isDropdownOpen={isDropdownOpen}
          albums={albums}
          onPressAlbum={onPressAlbum}
          onLongPressAlbum={onLongPressAlbum}
        />
        <TextInputModal
          modalVisible={textInputModalVisible}
          albumTitle={albumTitle}
          setAlbumTitle={setAlbumTitle}
          onSubmitEditing={onSubmitEditing}
          onPressBackdrop={onPressTextInputModalBackdrop}
        />
        <BigImageModal
          modalVisible={bigImgModalVisible}
          onPressBackdrop={onPressBigImgModalBackdrop}
          selectedImage={selectedImage}
        />
        <FlatList
          data={imageWithAddButton}
          renderItem={renderItem}
          numColumns={3}
          style={{ zIndex: -1 }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
