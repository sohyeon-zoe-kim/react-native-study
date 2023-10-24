### 목차
[1. 실무에서 자주 사용되는 Hook](#1-실무에서-자주-사용되는-hook)  
[2. Memoization](#2-memoization)

## 1. 실무에서 자주 사용되는 Hook
### useWindowDimensions
```jsx
  const { width, height } = useWindowDimensions()
```
* 현재 디바이스의 width, height를 알려줌
* 요소의 크기를 디바이스 크기에 따라 정할 때 유용하게 사용

### useBackhandler
```jsx
  ...
  useBackHandler(() => {
    return true
  })
  ...
```
* Android에서 뒤로가기 버튼을 클릭했을 때 이벤트를 핸들링하는 용도로 사용

### useAppState
```jsx
  ...
  const currentAppState = useAppState() // active, background, inactive (only iOS)
  ...
```
* iOS에서 현재 앱 상태가 foreground인지 background인지 알려줌

### useNavigation, useRoute
```jsx
  ...
  const navigation = useNavigation()
  const routes = useRoute()
  ...
```
* screen이 아닌 컴포넌트에서 navigation, route 객체를 사용할 수 있도록 해줌

### useFocused, useFocusEffect
```jsx
  ...
  const isFocused = useIsFocused()

  useFocusEffect(useCallback(() => {
    // focus 되었을때의 처리
  }, [userId]))
  ...
```
* useIsFocused()
  * focuse 되었는지 boolean 값 반환
* useFocusEffect
  * focuse 되었을 때 callback 호출

### useScrollToTop
```jsx
  ...
  const scrollViewRef = useRef()
  useScrollToTop(scrolLViewRef)
  ...
```
* ScrollView를 최상단으로 올릴 때 사용

### useMount
```jsx
  ...
  useMount(() => {
    // on mounte 처리
  })
  ...
```
* component가 mount된 시점에 callback 호출
* useEffect를 사용할 수도 있지만, useMount를 사용하면 다른 useEffect와 로직 구분을 명확히 하여 관리할 수 있음

### usePrevious
```jsx
  ...
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)
  ...
```
* state의 이전 값을 알아내고자 할 때 사용


## 2. Memoization
수행했던 연산 결과들을 어딘가 저장한뒤 동일한 입력값인 경우 **재활용** 하는것

### useMemo
```jsx
    export const ComponentA = (props) => {
      const variableA = useMemo(() => 
      {
        return props.a + props.b
      }, [props.a, props.b])
    }
```
* 첫번째 인자 : 기억할 값을 리턴 해 주는 함수
* 두번째 인자 : dependency array
* 참고
  * useEffect는 함수를 실행하는 용도로 두번째 인자의 의존성 배열을 작성
  * useMemo는 값을 변경하는 용도로 두번째 인자의 의존성 배열을 작성

### useCallback
```jsx
    export const ComponentA = (props) => {
      const variableA = useMemo(() => 
      {
        return props.a + props.b
      }, [props.a, props.b])
    }
```
* 첫번째 인자 : 기억할 함수를 리턴 해 주는 함수
* 두번째 인자 : dependency array

> Vue에서의 computed 와 유사한 느낌이라는 생각이 들었음. useMemo/useCallback 각각 어떤 상황일 때 주로 쓰면 좋은지 개발하면서 익혀보자 👩🏻‍🎓

## 3. 상태관리

### Redux
Flux에서 Reducer의 개념이 들어간 것 (**Red**ucer + Fl**ux**)
> **Redux 데이터 흐름**  
> action -> reducer -> store -> view -> action

1. Reducer
- Action과 마지막 Store의 상태를 기준으로 **새로운 상태**를 만들어 주는 것

2. Redux 사용 규칙
- Single source of truth
  - 애플리케이션의 모든 상태는 하나의 저장소 안에 저장해야 한다.
  - **디버깅과 생산성 향상의 이점**을 가지고 있음
- State is read-only
  - 상태는 읽기만 허용
  - 변화의 의도를 파악하고 **중앙에서 흐름 관리를 엄격하게 하기** 위함
- Changes are made with pure functions
  - 변화는 **순수함수**로만 해야함
  - 순수함수 : 외부 값에 의존하지 않고 매개변수만을 통해서 반환값을 만들어 내는 것

3. Redux middleware
- Middleware
  - store.dispatch 함수의 실행 뒤 어떠한 작업을 하기 위해 호출
  - action(store.dispatch) -> **middleware** -> reducer -> store -> view -> action
- redux logger
  - prev state, next state, action 등을 나열해 보여줌 (디버깅을 위하여 사용)
- redux thunk
  - thunk : 특정 작업을 나중에 하기 위해서 만들어둔 함수
  - 객체 대신 함수를 Dispatch 할 수 있게 해주는 것
- redux saga
  - action의 발생여부를 모니터링 하다가 그 뒤 작업을 진행 하도록 함

4. Redux에서 자주 사용하는 hook
> hook이 있기 전에는 connect 함수를 통하여 진행 (boilerplate 코드가 굉장히 많음)

- useSelector
  - store에 있는 값을 가져오기 위함
- useDispatch
  - redux action을 사용하기 위한 hook
- createSelector
  - reselect package에 있는 함수
  - Memoization등 캐싱을 하기 위해 사용 (store가 커질수록 유용하게 사용되는 hook)

### Context API
> props-drilling을 제거하기 위해 탄생  
> React 16.3 버전부터 지원  
> 간단한 전역변수를 선언할 때 사용 (ex. theme, intl)

1. Provider
- 값을 제공 해주기 위하여 root component로 사용
- value prop을 가짐

2. Consumer
- 제공된 값에 접근 할 수 있도록 하는 것

### Redux vs Context API
* Context API : 상태 관리 도구 X, 전역 변수 관리 O
* 상태관리 도구의 조건
  - 초기값을 저장하는가?
  - 스스로 값을 읽어올 수 있는가?
  - 스스로 값 업데이트가 가능한가?
* 언제 Context API를 사용하는가
  - 주로 static한 잘 변경되지 않는 정보에 대해서 적용
  - ex. App theme 저장, 다국적 앱에서 언어 팩 등

### Recoil
> 2020년도 발표  
> Redux, Mobx 등 기존 상태 관리 라이브러리의 아쉬운점들을 극복하고자 탄생

* Redux
  - 장점
    - 그동안 많은 검증을 거친 라이브러리
    - redux-logger 등 디버그를 위한 편의가 잘 갖춰져 있음
  - 단점
    - 높은 학습비용 (러닝커브)
    - boilerplate가 다소 있는 편

1. 구성 요소
- atom
  - 상태의 단위, 업데이트 또는 Subscribe 등이 가능
  ```jsx
    const myState = atom({
      key: 'UNIQUE_KEY',
      default: {/*상태 관리시 사용 할 value*/}
    })

    const componentA = () => {
      const [fontSize, setFontSize] = useRecoilState(myState)
      return (/* View return */)
    }
  ```
- selectors
  - atoms나 selector의 파생데이터를 계산하는데 사용
  ```jsx
    const fontSizeLabelState = selector({
      key: 'UNIQUE_KEY',
      get: ({get}) => {
        const fontSize = get(fontSizeState)
        return `fontSize is ${fontSize}`
      }
    })

    const componentA = () => {
      const fontSizeLabel = useRecoilValue(fontSizeLabelState)
    }
  ```