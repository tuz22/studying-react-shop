import { createSlice } from '@reduxjs/toolkit'

/* Redux store에 state 보관하는 방법 */
let user = createSlice({ // useState 역할
  name : 'user',
  initialState : { name : 'Kim', age : 20 }, // Q. state가 array/object인 경우 변경방법은?
  reducers : { 
    changeName(state){  
      // return { name : 'Park', age : 20 } // A1. 이렇게 직접 값을 갈아끼우거나
      state.name = 'Park' // A2. 직접수정하거나 (immer.js 라이브러리가 알아서 해줌)
    }
  }
})
export let { changeName } = user.actions // * action = state 변경함수

export default user