import { StyleSheet, View } from 'react-native';
import { Typography } from './src/components/atoms/Typography';
import { LocalImage } from './src/components/atoms/LocalImage';
import { RemoteImage } from './src/components/atoms/RemoteImage';
import { Icon } from './src/components/atoms/Icon';
import { Button } from './src/components/atoms/Button';
import { Divider } from './src/components/atoms/Divider';
import { Spacer } from './src/components/atoms/Spacer';
import { Badge } from './src/components/atoms/Badge';

export default function App() {
  return (
    <View style={styles.container}>
      <Typography color='red' fontSize={20}>
        이것은 텍스트 입니다.
      </Typography>
      <Spacer space={10} />
      <Divider />
      <Spacer space={10} />
      <LocalImage
        localAsset={require('./assets/favicon.png')}
        width={50} height={50}
      />
      <Spacer space={10} />
      <Divider />
      <Spacer space={10} />
      <RemoteImage
        url='https://cdn.imweb.me/upload/S20200106a105fd03f4b57/79f6e2d33aa65.jpg'
        width={200}
        height={200}
      />
      <Spacer space={10} />
      <Divider />
      <Icon name='home' size={40} color='red' />
      <Spacer space={10} />
      <Divider />
      <Spacer space={10} />
      <View style={{ flexDirection: 'row' }}>
        <Badge fontSize={10}>
          <Typography fontSize={15}>BADGE</Typography>
        </Badge>
        <Spacer space={10} horizontal={true} />
        <Badge fontSize={7}>
          <Icon name='home' size={50} color='black' />
        </Badge>
      </View>
      <Spacer space={10} />
      <Divider />
      <Spacer space={10} />
      <View style={{ flexDirection: 'row' }}>
        <Button onPress={() => {
          console.log('버튼 클릭')
        }}>
          <Typography fontSize={15}>깅조사랑</Typography>
        </Button>
        <Spacer space={10} horizontal={true} />
        <Button onPress={() => {
          console.log('아이콘 클릭')
        }}>
          <Icon name='home' size={50} color='green' />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
