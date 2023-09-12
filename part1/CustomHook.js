import { useState } from "react"
import { Button, TextInput, View } from "react-native"

const InputBox = (props) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TextInput
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        style={{width: 200, borderBottomWidth: 1}}
      />
      <Button title="초기화" onPress={props.onReset} />
    </View>
  )
}

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  const resetValue = () => {
    setValue(initialValue)
  }

  return {
    value,
    setValue,
    resetValue
  }
}

const CustomHook = () => {
  const {value: name, setValue: setName, resetValue: resetName} = useInput('')
  const {value: age, setValue: setAge, resetValue: resetAge} = useInput('')
  const {value: city, setValue: setCity, resetValue: resetCity} = useInput('')

  return (
    <View>
      <InputBox
        value={name}
        placeholder={'이름을 입력해주세요'}
        onChangeText={setName}
        onReset={resetName}
      />
      <InputBox
        value={age}
        placeholder={'나이를 입력해주세요'}
        onChangeText={setAge}
        onReset={resetAge}
      />
      <InputBox
        value={city}
        placeholder={'도시를 입력해주세요'}
        onChangeText={setCity}
        onReset={resetCity}
      />
    </View>
  )
}

export default CustomHook