import { StyleSheet } from 'react-native'
import { useGallery } from './src/use-gallery'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import MyDropdownPicker from './src/MyDropdownPicker'
import TextInputModal from './src/TextInputModal'
import BigImageModal from './src/BigImageModal'
import ImageList from './src/ImageList'

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
    selectedImage,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow
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
  
  const onPressLeftArrow = () => {
    moveToPreviousImage()
  }
  const onPressRightArrow = () => {
    moveToNextImage()
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
          onPressLeftArrow={onPressLeftArrow}
          onPressRightArrow={onPressRightArrow}
          showPreviousArrow={showPreviousArrow}
          showNextArrow={showNextArrow}
        />
        <ImageList
          imageWithAddButton={imageWithAddButton}
          onPressOpenGallery={onPressOpenGallery}
          onPressImage={onPressImage}
          onLongPressImage={onLongPressImage}
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
