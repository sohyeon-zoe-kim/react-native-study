import { View, Text, TouchableOpacity } from "react-native"
import { SimpleLineIcons } from '@expo/vector-icons'
import styled from 'styled-components/native'

const headerHeight = 50

const Header = styled.TouchableOpacity`
  height: ${headerHeight}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const SelectedAlbumTitle = styled.Text`
font-weight: bold;
`
const AddAlbumButton = styled.TouchableOpacity`
  position: absolute;
  height: ${headerHeight}px;
  right: 0;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`
const DropdownContainer = styled.View`
  position: absolute;
  top: ${headerHeight}px;
  width: 100%;
  border: 1px solid lightgrey;
`
const AlbumItem = styled.TouchableOpacity`
  padding: 12px 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`

export default ({
  selectedAlbum,
  onPressAddAlbum,
  onPressHeader,
  isDropdownOpen,
  albums,
  onPressAlbum,
  onLongPressAlbum
}) => {
  return (
    <View>
      <Header activeOpacity={1} onPress={onPressHeader} >
        <SelectedAlbumTitle>{selectedAlbum.title}</SelectedAlbumTitle>
        <SimpleLineIcons
          name={isDropdownOpen ? 'arrow-up' : 'arrow-down'}
          size={12}
          color='black'
          style={{ marginLeft: 8 }}
        />
        <AddAlbumButton onPress={onPressAddAlbum}>
          <Text style={{ fontSize: 12 }}>앨범 추가</Text>
        </AddAlbumButton>
      </Header>
      {isDropdownOpen && (
        <DropdownContainer>
          {albums.map((album, index) =>{
            const isSelectedAlbum = selectedAlbum.id === album.id
            return (
              <AlbumItem
                key={`album-${index}`}
                activeOpacity={1}
                onPress={() => onPressAlbum(album)}
                onLongPress={() => onLongPressAlbum(album.id)}
              >
                <Text style={{ fontWeight: isSelectedAlbum ? 'bold' : undefined }}>{album.title}</Text>
              </AlbumItem>
            )
          })}
        </DropdownContainer>
      )}
    </View>
  )
}