import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* Lifecycle hook 다는 방법 */
// useEffect(() => {

// })

/* 예전 방법 */
// class Detail2 extends React.Component {
//   componentDidMount(){

//   }
//   componentDidUpdate(){

//   }
//   componentWillUnmount(){

//   }
// }

function Detail(props){
  /* 2초 뒤에 사라지는 박스 */
  let [alert, setAlert] = useState(true)

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

  let {id} = useParams();
  let [count, setCount] = useState(0)
  let shoesId = props.shoes.find((a) => a.id == id );

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
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div>
  )
}

export default Detail;