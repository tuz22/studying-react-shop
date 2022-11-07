import { configureStore, createSlice } from '@reduxjs/toolkit'

/* Redux store에 state 보관하는 방법 */
let user = createSlice({ // useState 역할
  name: 'user',
  initialState : 'Kim'
}) 
let stock = createSlice({ // useState 역할
  name: 'stock',
  initialState : [10, 11, 12]
}) 

/* ! Redux store 안에 모두 넣진 말기. 컴포넌트 간 공유가 필요없으면 useState() 사용 */
export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer
  }
}) 