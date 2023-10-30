import React, { useCallback, useMemo, useState } from "react"
import { ScrollView, View, useWindowDimensions } from "react-native"
import { Header } from '../components/header/Header'
import { useNavigation } from "@react-navigation/native"
import { useImagePickAndUpload } from "../hooks/useImagePickAndUpload"
import { Button } from "../components/atoms/Button"
import { RemoteImage } from "../components/atoms/RemoteImage"
import { Spacer } from "../components/atoms/Spacer"
import { Typography } from "../components/atoms/Typography"
import { SingleLineInput } from "../components/atoms/SingleLineInput"
import { MultiLineInput } from "../components/atoms/MultiLineInput"
import DateTimePicker from 'react-native-modal-datetime-picker'

export const AddDiaryScreen = () => {
  const { width } = useWindowDimensions()
  const photoSize= useMemo(() => {
    return {
      photoWidth: width,
      photoHeight: width * 0.5
    }
  }, [width])

  const [selectedDate, setSelectedDate] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  
  const navigation = useNavigation()
  const onPressBack = useCallback(() => {
    navigation.goBack()
  }, [])
  
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(null)
  const runImagePickAndUpload = useImagePickAndUpload()
  const onPressPhotoItem = useCallback(async () => {
    const result = await runImagePickAndUpload()
    
    if (result.length >= 1) {
      setSelectedPhotoUrl(result[0])
    }
  }, [])
  
  const [visibleDatePicker, setVisibleDatePicker] = useState(false)
  const onPressCalendar = useCallback(() => {
    setVisibleDatePicker(true)
  }, [])

  const canSave = useMemo(() => {
    if (selectedDate === null) return false
    if (title === '') return false
    if (content === '') return false
    return true
  }, [selectedDate, title, content])
  const onPressSave = useCallback(() => {

  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title='ADD DIARY' />
        </Header.Group>
        <Header.Icon iconName='close' onPress={onPressBack} />
      </Header>
      <ScrollView style={{ flex: 1 }}>
        <Button onPress={onPressPhotoItem}>
          {selectedPhotoUrl !== null ? (
            <RemoteImage
              url={selectedPhotoUrl}
              width={photoSize.photoWidth}
              height={photoSize.photoHeight}
            />
          ) : (
            <View style={{ backgroundColor: 'lightgray', width: photoSize.photoWidth, height: photoSize.photoHeight }} />
          )}
        </Button>
        <Spacer space={20} />
        <Button onPress={onPressCalendar}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography fontSize={20}>날짜</Typography>
            <Typography fontSize={16}>
              {selectedDate === null
                ? '날짜를 선택해주세요.'
                : `${selectedDate.getFullYear()} - ${selectedDate.getMonth()+1} - ${selectedDate.getDate()}`
              }
            </Typography>
          </View>
        </Button>
        <Spacer space={40} />
        <View style={{ paddingHorizontal: 24 }}>
          <SingleLineInput
            value={title}
            onChangeText={setTitle}
            placeholder='제목을 입력해주세요'
          />
          <Spacer space={20} />
          <MultiLineInput
            value={content}
            onChangeText={setContent}
            placeholder='있었던 일을 알려주세요.'
          />
        </View>
        <Spacer space={40} />
        <View style={{ paddingHorizontal: 24 }}>
          <Button onPress={onPressSave}>
            <View style={{
              paddingVertical: 16,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: canSave ? 'black' : 'lightgray',
              borderRadius: 4,
            }}>
              <Typography fontSize={20} color={canSave ? 'white' : 'gray'}>등록하기</Typography>
            </View>
          </Button>
        </View>
      </ScrollView>
      <DateTimePicker
        isVisible={visibleDatePicker}
        mode='date'
        onConfirm={(date) => {
          setSelectedDate(new Date(date))
          setVisibleDatePicker(false)
        }}
        onCancel={() => {
          setVisibleDatePicker(false)
        }}
      />
    </View>
  )
}