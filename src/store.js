import { configureStore, createSlice } from '@reduxjs/toolkit'

/* Redux store에 state 보관하는 방법 */
let user = createSlice({ // useState 역할
  name : 'user',
  initialState : 'Kim',
  reducers : { // state 변경 1. 변경함수 만들기
    changeName(state){  // 여기에 export를 붙일 수는 없음 -> 밖으로 빼기
      return 'John' + state
    }
  }
})
export let { changeName } = user.actions // 2. export 해주기. 위에서 만든 변경함수가 object 자료형식으로 남음

let stock = createSlice({ // useState 역할
  name : 'stock',
  initialState :[
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ] 
})

/* ! Redux store 안에 모두 넣진 말기. 컴포넌트 간 공유가 필요없으면 useState() 사용 */
export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer
  }
}) 