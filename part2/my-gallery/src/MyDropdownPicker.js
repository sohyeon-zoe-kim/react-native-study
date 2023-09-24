import { View, Text, TouchableOpacity } from "react-native"
import { SimpleLineIcons } from '@expo/vector-icons'

const headerHeight = 50

export default ({
  selectedAlbum,
  onPressAddAlbum,
  onPressHeader,
  isDropdownOpen,
  albums,
  onPressAlbum
}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressHeader}
        style={{
          height: headerHeight,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>{selectedAlbum.title}</Text>
        <SimpleLineIcons
          name={isDropdownOpen ? 'arrow-down' : 'arrow-up'}
          size={12}
          color='black'
          style={{ marginLeft: 8 }}
        />
        <TouchableOpacity
          onPress={onPressAddAlbum}
          style={{
            position: 'absolute',
            height: headerHeight,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 12 }}>앨범 추가</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View
          style={{
            position: 'absolute',
            top: headerHeight,
            width: '100%',
            borderTopColor: 'lightgrey',
            borderTopWidth: 1,
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 1,
          }}
        >
          {albums.map((album, index) =>{
            const isSelectedAlbum = selectedAlbum.id === album.id
            return (
              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ffffff'
                }}
                onPress={() => onPressAlbum(album)} key={`album-${index}`}
              >
                <Text style={{ fontWeight: isSelectedAlbum ? 'bold' : undefined }}>{album.title}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      )}
    </View>
  )
}