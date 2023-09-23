import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons'
import dayjs from "dayjs";

import { getDayColor, getDayText } from "./utils";

const columnSize = 35
const Column = ({
  text,
  color,
  opacity,
  disabled,
  onPress,
  isSelected,
  hasTodo,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        width: columnSize,
        height: columnSize,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: isSelected ? '#c2c2c2' : 'transparent',
        borderRadius: columnSize / 2
      }}
    >
      <Text style={{ color, opacity, fontWeight: hasTodo ? 'bold' : 'normal' }}>{text}</Text>
    </TouchableOpacity>
  )
}

const ArrowButon = ({ onPress, iconName }) => {
  return (
    <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 15 }} onPress={onPress}>
      <SimpleLineIcons name={iconName} size={15} color='#404040' />
    </TouchableOpacity>
  )
}

export default ({
  selectedDate,
  onPressLeftArrow,
  onPressRightArrow,
  onPressHeaderDate,
  onPressDate,
  columns,
  todoList
}) => {
  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD.')
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <ArrowButon iconName='arrow-left' onPress={onPressLeftArrow} />
          <TouchableOpacity onPress={onPressHeaderDate}>
            <Text style={{ fontSize: 20, color: '#404040' }}>{currentDateText}</Text>
          </TouchableOpacity>
          <ArrowButon iconName='arrow-right' onPress={onPressRightArrow} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          {[0, 1, 2, 3, 4, 5, 6].map(day => {
            const dayText = getDayText(day)
            const color = getDayColor(day)
            return (
              <Column
                key={`day-${day}`}
                text={dayText}
                color={color}
                opacity={1}
                disabled={true}
              />
            )
          })}
        </View>
      </View>
    )
  }

  const renderItem = ({ item: date }) => {
    const dateText = dayjs(date).get('date')
    const day = dayjs(date).get('day')
    const color = getDayColor(day)
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month')
    const onPress = () => onPressDate(date)
    const isSelected = dayjs(date).isSame(selectedDate, 'date')
    const hasTodo = todoList.find(todo => dayjs(todo.date).isSame(dayjs(date), 'date'))
    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
        onPress={onPress}
        isSelected={isSelected}
        hasTodo={hasTodo}
      /> 
    )
  }

  return (
    <FlatList
      data={columns}
      scrollEnabled={false}
      keyExtractor={(_, index) => `column-${index}`}
      numColumns={7}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
    />
  )
}