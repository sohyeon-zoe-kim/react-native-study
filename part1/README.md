## 1. 생명주기
### 클래스형 컴포넌트

1. componentDidMount

    ⇒ constructor → render → componentDidMount
3. componentDidUpdate

    ⇒ render → componentDidMount
    ```jsx
    componentDidUpdate(prevProps, prevState) {
      console.log(prevProps)
      console.log(prevState)
    }
    ```
    ⇒ didUpdate 에는 업데이트 되기 이전 상태값이 들어옴
4. componentWillUnmount

    ⇒ componentWillUnmount

### 함수형 컴포넌트
useEffect로 클래스형 컴포넌트의 3가지 생명주기를 표현할 수 있음

1. componentDidMount
    
    ⇒ 의존성 배열에 아무것도 작성하지 않으면, 컴포넌트가 첫 렌더링 될 때 한 번만 실행되므로 didMount와 동일한 주기를 표현할 수 있음
    
    ```jsx
    useEffect(() => {
      console.log('componentDidMount')
    }, [])
    ```
    
2. componentDidUpdate
    
    ⇒ count 값이 바뀔 때 마다 componentDidUpdate가 콘솔에 찍힘
    
    ⇒ 최초에 0으로 셋팅할 때도 값이 바뀌었다고 인식하기 때문에 최초 렌더링시에도 콘솔이 찍힘
    
    ⇒ 클래스형과 달리 콘솔에 찍히는 count값은 바뀐 값으로 찍힘
    
    ```jsx
    const [count, setCount] = useState(0)
    
    useEffect(() => {
      console.log('componentDidUpdate - count', count)
    }, [count])
    ```

## 2. CustomHook
customHook은 보통 “use” 로 시작하는 이름으로 작성함
