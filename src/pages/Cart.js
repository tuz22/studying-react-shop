import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName } from './../store/userSlice';
import { increase, increase2, increase3 } from './../store';
import { useState, memo, useMemo } from 'react';

/* 재렌더링 막기 : memo */
// function Child(){
//   console.log('재렌더링됨')
//   return <div>자식 컴포넌트!</div>
// }
let Child = memo(function(){
  console.log('재렌더링됨')
  return <div>자식 컴포넌트!</div>
})

/* useMemo */
function 함수(){
  return '반복문을10억번돌린결과'
}

function Cart(){

  /* Redux store에서 state 가져옴 */
  // let state = useSelector((state) => { return state }) // return하는 것만 가져다 씀
  let state = useSelector((state) => state ) // 중괄호 return은 축약가능
  let dispatch = useDispatch() // store.js로 요청을 보내주는 함수

  let [count, setCount] = useState(0)
  
  let result = 함수();
  useMemo(() => { return 함수() }, [state]) // useMemo 사용시 [state]가 변할 때마다 컴포넌트 렌더링시 1회만 실행해줌
  return (
    <div>
      <Child count={count}></Child>
      <button onClick={() => { setCount(count+1) }}>+</button> {/* Cart() 재렌더링 시 자식 컴포넌트인 Child()도 재렌더링됨 */}

      { state.user.name }의 장바구니
      <button onClick={() => {
        dispatch(changeName()) // dispatch(state변경함수()
      }}>이름변경</button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            state.stock.map((a, i) => {
              return (
                <tr key={i}>
                  <td>{state.stock[i].id}</td>
                  <td>{state.stock[i].name}</td> {/* store에서 가져온 값 바인딩 */}
                  <td>{state.stock[i].count}</td>
                  <td>
                    <button onClick={() => {
                      const stockId = state.stock[i].id
                      console.log('품번은: '+ stockId)
                      dispatch(increase3(stockId))
                    }}>+</button>
                  </td>
                </tr>
              )
            })
          }
          <button onClick={() => {
            dispatch(increase2(10))
          }}>+10버튼</button>
        </tbody>
      </Table> 
    </div>
  )
}

export default Cart