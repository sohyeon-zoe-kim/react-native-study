import { StyleSheet, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import { useGallery } from './src/use-gallery'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import MyDropdownPicker from './src/MyDropdownPicker'
import TextInputModal from './src/TextInputModal'

const width = Dimensions.get('screen').width
const columnSize = width / 3

export default function App() {
  const {
    imageWithAddButton,
    pickImage,
    deleteImage,
    selectedAlbum,
    modalVisible,
    openModal,
    closeModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    albums,
    selectAlbum
  } = useGallery()

  const onPressOpenGallery = () => {
    pickImage()
  }
  const onLongPressImage = (imageId) => deleteImage(imageId)
  const onPressAddAlbum = () => {
    openModal()
  }
  const onSubmitEditing = () => {
    if (!albumTitle) return
    addAlbum()
    closeModal()
    resetAlbumTitle()
  }
  const onPressBackdrop = () => {
    closeModal()
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

  const renderItem = ({ item: { id, uri }, index }) => {
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
      <TouchableOpacity onLongPress={() => onLongPressImage(id)}>
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
        />
        <TextInputModal
          modalVisible={modalVisible}
          albumTitle={albumTitle}
          setAlbumTitle={setAlbumTitle}
          onSubmitEditing={onSubmitEditing}
          onPressBackdrop={onPressBackdrop}
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
