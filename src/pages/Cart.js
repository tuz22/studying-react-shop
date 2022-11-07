import {Table} from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Cart(){

  /* Redux store에서 state 가져옴 */
  // let a = useSelector((state) => { return state }) // return하는 것만 가져다 씀
  let a = useSelector((state) => state ) // 중괄호 return은 축약가능
  console.log(a) // ex) return state.stock이면 a = stock 값만 나옴

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>{a.stock}</th> {/* store에서 가져온 값 바인딩 */}
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>안녕</td>
            <td>안녕</td>
            <td>안녕</td>
          </tr>
        </tbody>
      </Table> 
    </div>
  )
}

export default Cart