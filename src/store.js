import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

let stock = createSlice({ // useState 역할
  name : 'stock',
  initialState :[
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    increase(state){
      state[0].count += 1
    },
    increase2(state, a){
      state[1].count += a.payload // payload를 붙여야 해당 함수의 파라미터값이 제대로 들어감
    } // dispatch(increase2(10)) dispatch가 increase2란 메세지에 10이란 화물도 같이 보냄. 
  }
})

export let { increase, increase2 } = stock.actions

/* ! Redux store 안에 모두 넣진 말기. 컴포넌트 간 공유가 필요없으면 useState() 사용 */
export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer
  }
}) 