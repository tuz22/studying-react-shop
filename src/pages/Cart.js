import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName } from './../store/userSlice';
import { increase, increase2, increase3 } from './../store';

function Cart(){

  /* Redux store에서 state 가져옴 */
  // let state = useSelector((state) => { return state }) // return하는 것만 가져다 씀
  let state = useSelector((state) => state ) // 중괄호 return은 축약가능
  // console.log(state) // ex) return state.stock이면 state = stock 값만 나옴

  let dispatch = useDispatch() // store.js로 요청을 보내주는 함수

  return (
    <div>
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