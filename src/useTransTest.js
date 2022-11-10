import { useState, useTransition, useDeferredValue } from 'react';

let a = new Array(10000).fill(0)

function UseTransTest() {
  let [name, setName] = useState('')
  //let [isPending, 늦게처리] // isPending : startTransition이 처리중일 때 true가 되는 변수
  let [isPending, startTransition] = useTransition() // startTransition으로 성능저하 원인(state 변경)을 감싸기
  /* useDeferredValue() 사용해도 느린 컴포넌트 성능 향상 가능 */
  // useDeferredValue(state) // 여기 넣은 state가 변동사항이 생기면 늦게 처리해줌
  // let state = useDeferredValue(name) // 여기 넣은 state가 변동사항이 생기면 늦게 처리해줌

  return (
    <div className='UseTransTest'>
      <input onChange={(e) => { /* 사용자가 값 입력시 */
        startTransition(() => {
          setName(e.target.value) /* name에 이 값을 저장함 - 타이핑시 name 변경 -> 성능저하(지연) 원인 */
          console.log(e.target.value);
        })
      }}/>
      {
        isPending ? '로딩중' : 
        a.map(() => {
          return <div>{ name }</div> // name이 변경되면 이 코드도 렌더링
          // return <div>{ state }</div> // useDeferredValue(name) 변수 사용
        })
      }
    </div>
  );
}

export default UseTransTest