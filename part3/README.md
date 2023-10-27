### 목차
[1. 실무에서 자주 사용되는 Hook](#1-실무에서-자주-사용되는-hook)  
[2. Memoization](#2-memoization)  
[3. 상태관리](#3-상태관리)  
[4. Animated](#4-animated)  
[5. AsyncStorage](#5-asyncstorage)
[6. Firebase](#6-firebase)

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

## 4. Animated
```jsx
0| const [animValue] = useState(new Animated.Value(0))
1|
2| const scale = animValue.interpolate({
3|		inputRange: [0, 1],
4|		outputRange: [1.0, 0.95]
5| })
```
- 0: animValue의 최초값은 0
- 3: animValue의 값이 0 에서 1로 변환되면
- 4: scale 값을 1.0 에서 0.95로 이동한다

```jsx
0| Animated.timing(animValue, {
1|   duration: 200,
2|   toValue: 1,
3|   useNativeDriver: true
4| }).start()
```
- timing을 사용하여 애니메이션을 실행할 수 있음
- 1: 몇초동안 애니메이션을 실행할지
    - css animation의 duration 이랑 유사
- 2: 변경할 값
    - ex. 1로 변경
- 3: useNativeDriver
    - 브릿지를 거쳐 실행되는 애니메이션에 관련된 JS코드를 네이티브에 모두 넘겨버림
    - 매번 브릿지를 거치지 않고 네이티브에서 애니메이션을 수행하므로 부드러운 움직임을 나타낼 수 있음
    - timing 메소드 뿐만 아니라 다른 모든 메소드에서 사용가능
    - 적용 시 움직임이 눈에 띄게 부드러워짐(특히 transform에 유용)
    <details>
      <summary> 주의 </summary>
      <div markdown="1">
        <ul>
          <li> non-layout 프로퍼티에만 적용가능합니다.(transform, opacity 등)
          <li> layout 프로퍼티(width, top, flex 등)에는 적용할 수 없습니다.
          <li> layout 프로퍼티에 관한 애니메이션은 LayoutAnimation을 사용합니다.
        <ul>
      </div>
    </details>

```jsx
 0| <Animated.View
 1|   style={{
 2|     transform: [
 3|       { 
 4|         scale: scale 
 5|       }
 6|     ]
 7|   }
 8| }>
 9| // children
10| </Animated.View>
```
- animation을 적용할 위치에 Animated.View 사용
- 계산된 scale값을 transform에 사용

## 5. AsyncStorage
> key 값으로 String을 저장

- 유저에 대한 정보(accessToken, refreshToken) 저장
- 기능을 보여줄지 말지 여부, 마지막 접속 시간 등 임시정보 저장
- Android : SQLite 에 저장
- iOS : 네이티브 코드로 저장로직이 작성되어 있음

### Redux-persist
> 저장소에 마지막 Redux 상태를 저장하였다 이어서 사용 할 수 있도록 하는 것  
> React-Native에서는 AsyncStorage에 저장

1. PersistGate
- Component 형태로 작성되어 있음.
- Storage로부터 데이터를 로드해 Redux를 업데이트
- 로딩 하는 동안에 Loading 컴포넌트 추가 가능
2. BlackList : 유지 하지 않아도 되는 Redux key 값들
3. WhiteList : 유지를 해야 하는 key값

### Recoil-custom-persist
> Recoil 사용시, 직접 custom한 persist component를 작성하여 초기값을 셋팅하는 방법

1. Recoil - effects
- effects는 부수 효과를 과리하고 atom을 초기화 또는 동기화하기 위한 API
- setSelf
  - atom 초기값 지정 (초기 렌더링에 이용된다)
  - 주로 storage에 있는 데이터를 atom에 넣어줄 때 사용
- onSet
  - 값이 변경될 때마다 값을 동기화
  - 주로 storage에 데이터를 저장할 때 사용

```jsx
const asyncStorageEffect = key => async ({setSelf, onSet}) => {
  const savedValue = await getItem(key)
  
  if (savedValue !== null) {
    setSelf(JSON.parse(savedValue))
  }

  onSet((newValue, _, isReset) => {
    console.log('onSet', newValue)
    isReset
    ? removeItem(key)
    : setItem(key, JSON.stringify(newValue))
  })
}

export const atomLinkList = atom({
  key: 'MAIN/LINK_LIST',
  default: {
    list: []
  },
  effects: [asyncStorageEffect('MAIN/LINK_LIST')]
})
```

2. Recoil Custom Persist 컴포넌트

```jsx
...
const [isLoaded, setIsLoaded] = useState(false)
const setList = useSetRecoilState(atomLinkList)

const loadData = useCallback(async () => {
  const data = await getItem('MAIN/LINK_LIST')

  if (data !== null) {
    setList(data)
  }

  setIsLoaded(true)
}, [])

useEffect(() => {
  if (isLoaded) return 

  loadData()
}, [])

return (
  <>
    {isLoaded && props.children}
  </>
)
...
```

## 6. Firebase

### RealTime DataBase
- 실시간으로 접근 할 수 있는 database (NoSQL)  
- 실질적으로 저장되는 값은 key와 value 값으로 구성된 JSON Object
- 동시 연결수에 대한 제한이 있음

### Storage
- 파일 저장을 위해서 사용
- 프로필사진, 임시 저장하는 파일 저장 기능

### Cloud Firestore
- 데이터를 저장 하기 위한 제품
- 실시간성, NoSQL을 지원한다는 점은 Realtime Database와 비슷
- 저장하는 값 : JSON 형태가 아닌 Collections를 저장
- Document: Data가 집합해있는 단위
- Collections : Document가 집합해있는 단위

|RealTime Databse | Cloud Firestore|
|---|---|
|JSON Object 저장|Document 단위로 저장|
|정렬 및 필터링 + 조건문 불가|정렬 및 필터링 + 조건문 가능|
|용량 또는 데이터 크기에 과금|document CRUD에 따라 과금|
|데이터가 작고 CRUD가 자주 발생하면 RealTime Databse|큰 단위 데이터 요청시에는 Cloud Firestore  |

### Crashlytics
- 앱이 강제종료 되었음을 알려주는 Tool
- 로직을 잘 작성하더라도 라이브러리 등에서 크래시가 날 수도 있음
- 보통 네이티브단에서 에러가 발생하면 앱이 강제종료되는 현상이 발생하고, javascript 단에서 에러가 발생하면 앱이 종료되진 않지만 흰 화면이 뜨는 현상이 발생함

### Remote Config
- 원격에 있는 상수값을 업데이트 해줄 수 있는 Tool
- 특정 기능에 대한 ON/OFF 또는 특정화면의 텍스트를 바꾸는 것으로 활용
- 주의점
  - Remote Config 값을 조회 실패했을 때 대비하여 기본값을 설정
  - 실패 등 여러가지 이유로 인하여 최신값을 항상 보여주지는 않음

### AB Test
- A 그룹과 B 그룹을 두고 어떤 그룹이 더 많은 전환율을 보이는지 체크
- 기존 버전과 신규로 변경된 버전에서의 분기
- 개선된 버전에서의 유저 피드백을 받는다는 이점
- 사전 작업
  - Remote Config (config 설정된 값들에 대하여 가능)
  - Analytics (분석을 위해 필요)

### Authentication
- Social Login
  - 소셜 계정을 활용하여 로그인 혹은 회원가입을 할 수 있는 기능 (ex. Google, Github)
- OAuth 2.0
  - 인증을 위한 개방형 표준 프로토콜
  - Third party 프로그램에게 리소스 소유자를 대신하여 서버에서 데이터 제공
  - Authentication : 인증하는 단계
  - Authorization : 인증이 끝난 뒤 Access Token이 부여되는 것
  - Access Token : 유저에게 권한 받았음을 인증하는 Token (언젠가 만료되는 Token)
  - Refresh Token : Access Token을 Refresh 하기 위한 Token