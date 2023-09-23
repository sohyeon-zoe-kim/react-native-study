import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'
import { getCalendarColumns, getDayColor, getDayText } from './src/utils';
import { useEffect } from "react";
import { useCalendar } from "./src/hook/use-calendar";
import { useTodoList } from "./src/hook/use-todo-list";

const columnSize = 35

const Column = ({
  text,
  color,
  opacity,
  disabled,
  onPress,
  isSelected,
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
      <Text style={{ color, opacity }}>{text}</Text>
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

export default function App() {
  const now = dayjs()
  const {
    selectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
    setSelectedDate,
  } = useCalendar(now)
  const {} = useTodoList(selectedDate)
  const columns = getCalendarColumns(selectedDate)

  const onpressLeftArrow = subtract1Month
  const onpressRightArrow = add1Month

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD.')
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <ArrowButon iconName='arrow-left' onPress={onpressLeftArrow} />
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{ fontSize: 20, color: '#404040' }}>{currentDateText}</Text>
          </TouchableOpacity>
          <ArrowButon iconName='arrow-right' onPress={onpressRightArrow} />
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
    const onPress = () => {
      setSelectedDate(date)
    }
    const isSelected = dayjs(date).isSame(selectedDate, 'date')
    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
        onPress={onPress}
        isSelected={isSelected}
      /> 
    )
  }
  useEffect(() => {
  }, [selectedDate])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}> 
        <FlatList
          data={columns}
          keyExtractor={(_, index) => `column-${index}`}
          numColumns={7}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </SafeAreaView>
    </SafeAreaProvider>
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
