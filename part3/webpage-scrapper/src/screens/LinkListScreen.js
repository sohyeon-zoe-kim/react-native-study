import React, { useCallback, useMemo } from "react"
import { useNavigation } from '@react-navigation/native'
import { SectionList, View } from "react-native"
import { Header } from '../components/header/Header'
import { Button } from "../components/atoms/Button"
import { Typography } from "../components/atoms/Typography"
import { Spacer } from "../components/atoms/Spacer"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon } from "../components/atoms/Icon"
import { useRecoilValue } from "recoil"
import { atomLinkList } from "../states/atomLinkList"
import { LinkItem } from "../components/LinkItem"

export const LinkListScreen = () => {
  const navigation = useNavigation()
  const safeAreaInset = useSafeAreaInsets()
  const data = useRecoilValue(atomLinkList)

  const onPressListItem = useCallback((item) => {
    navigation.navigate('LinkDetail', { item })
  }, [])

  const onPressAddButton = useCallback(() => {
    navigation.navigate('AddLink')
  })

  const sectionData = useMemo(() => {
    const dataList = {}

    const makeDataString = (createAt) => {
      const dataItem = new Date(createAt)
      return `${dataItem.getFullYear()}.${dataItem.getMonth()+1}.${dataItem.getDay()} ${dataItem.getHours()} : ${dataItem.getMinutes()} `
    }

    if (!data.list) return []

    data.list.forEach((item) => {
      const keyName = makeDataString(item.createdAt)
      if (!dataList[keyName]) {
        dataList[keyName] = [item]
      } else {
        dataList[keyName].push(item)
      }
    })

    return Object.keys(dataList).map((item) => {
      return {
        title: item,
        data: dataList[item]
      }
    })
  }, [data.list])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title='LINK LIST' />
        </Header.Group>
      </Header>
      <SectionList
        style={{ flex: 1 }}
        sections={sectionData}
        renderSectionHeader={({ section }) => {
          return (
            <View style={{ paddingHorizontal: 12, paddingVertical: 4, backgroundColor: 'white'}}>
              <Typography color='gray' fontSize={12}>{section.title}</Typography>
            </View>
          )
        }}
        renderItem={({ item }) => {
          return (
            <Button onPress={() => onPressListItem(item)} paddingHorizontal={24} paddingVertical={24}>
              <LinkItem image={item.image} title={item.title}/>
              <View>
                <Spacer space={8} />
                <Typography fontSize={16} color='gray'>
                  {item.title !== ''
                    ? item.title.length > 20
                      ? `${item.title.slice(0, 20)}... | `
                      : `${item.title.slice(0, 20)} | `
                    : ''
                  }
                  {new Date(item.createdAt).toLocaleString()}
                </Typography>
              </View>
            </Button>
          )
        }}
      />
      <View style={{ position: 'absolute', right: 24, bottom: 24 + safeAreaInset.bottom }}>
        <Button onPress={onPressAddButton}>
          <View 
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black'
            }}
          >
            <Icon name='add' color='white' size={32} />
          </View>
        </Button>
      </View>
    </View>
  )
}