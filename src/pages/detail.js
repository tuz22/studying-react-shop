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

  let [alert, setAlert] = useState(true)
  useEffect(() => { // useEffect 안에 있는 코드는 HTML 랜더링 후에 동작
    // for ( var i = 0; i < 10000; i++ ){
    //   console.log(i);
    // }
    console.log('안녕');
    setTimeout(() => { setAlert(false) }, 2000);
    
  }, [])


  let [count, setCount] = useState(0)
  let {id} = useParams();
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