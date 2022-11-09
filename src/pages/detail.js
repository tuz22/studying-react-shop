import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Context1 } from '../App.js'; // Context API 사용 1. Context를 import
import { useDispatch } from "react-redux";
import { addItem } from './../store.js';

function Detail(props){

  let {stock} = useContext(Context1) // Context API 사용 2. useContext(Context) - 사용시 보관함 해체
  let [alert, setAlert] = useState(true)
  let [tab, setTab] = useState(0)
  let dispatch = useDispatch()
  let {id} = useParams();
  let [count, setCount] = useState(0)
  let shoesId = props.shoes.find(a => a.id == id );
  

  /* 최근 본 상품 UI  */
  useEffect(() => {
    let getWatched = localStorage.getItem('watched') // 값 꺼내서
    getWatched = JSON.parse(getWatched)
    getWatched.push(shoesId.id) // 수정 후
    localStorage.setItem('watched', JSON.stringify(getWatched)) // 다시 넣기
  }, [])

  /* 2초 뒤에 사라지는 박스 */
  useEffect(() => { // useEffect 안에 있는 코드는 HTML 랜더링 후에 동작
    let timerBox = setTimeout(() => { setAlert(false) }, 2000);
    console.log('리턴문 밖')
    return () => {
      console.log('리턴문 안')
      clearTimeout(timerBox) // clean up function. - mount 될 때 실행x unmount 때 실행
    }
    
  }, []) // <- 조건부분에 [] 이렇게 쓰면 mount 될 때 1회만 실행

  /* 숫자만 입력가능한 input */
  let [num, setNum] = useState('');

  useEffect(() => {
    if (isNaN(num) == true) {
      console.log('숫자만!');
    }

  }, [num])

  return (
    <div className="container">
      {
        alert == true
        ? <div className="alert alert-warning">
            2초 이내 구매시 할인
          </div>
        : null
      }
      { count }
      { stock } {/* Context API 사용 3. 사용할 Context 변수명 쓰기 */}
      <button onClick={() => { setCount(count+1) }}>버튼</button>
      <input onChange={(e) => { setNum(e.target.value) }} />
      <div className="row">
        <div className="col-md-6">
          <img src={ shoesId.img} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{ shoesId.title }</h4>
          <p>{ shoesId.content }</p>
          <p>{ shoesId.price }</p>
          <button className="btn btn-danger" onClick={() => {
            dispatch(addItem({ id : shoesId.id, name : shoesId.title, count : 1 }))
            // dispatch(addItem({ id : 1, name : '신발', count : 1 }))
          }}>주문하기</button> 
        </div>
      </div>

      {/* 탭 UI */}
      <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => { setTab(0) }} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => { setTab(1) }} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => { setTab(2) }} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      {/* <TabContent tab={tab}/> */}
      <TabContent2 tab={tab}/>

    </div>
  )
  function TabContent(props){ // (props) 대신 props 이름 사용 가능 -> ( {tab} )

    if (props.tab == 0) { // = if (tab == 0)
      return <div>내용0</div>
    }
    if (props.tab == 1){
      return <div>내용1</div>
    }
    if (props.tab ==2){
      return <div>내용2</div>
    }
  }

  function TabContent2({tab}){

    let [fade, setFade] = useState('')
    let {stock} = useContext(Context1) // Context API 사용 4. 자식 컴포넌트에서도 props 없이 사용 가능
    useEffect(() => {
      let a = setTimeout(() => { setFade('end') }, 10)
      /* tab state가 변할 때 end를 뗏다가 부착해야 CSS 제대로 적용됨 */
      /* automatic batching 기능 : state변경함수() 사용할때마다 재렌더링이 되는게 아니라 마지막 state변경함수()에 재렌더링*/
      
      return () => {
        // setFade('')  /* automatic batching 기능 때문에 이 코드 제대로 실행 x */
        clearTimeout(a)
      }

    }, [tab])

    return (
      <div className={'start ' + fade}> {/* 변수를 HTML 중간에 넣으려면 중괄호 사용. ! 클래스명은 띄어쓰기 사용해야 여러개 가능*/} 
        { [ <div>{stock}</div>, <div>내용1</div>, <div>내용2</div> ][tab] }
      </div>
    ) /* 리턴할 코드가 길어지면 ()쳐주기 */
  }
}

export default Detail;