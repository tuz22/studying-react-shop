import { useParams } from 'react-router-dom';
import styled from 'styled-components';

/* styled-components로 스타일링 */
let Box = styled.div`
  background : grey;
  padding : 20px;
`

let BlueBtn = styled.button`
  background : ${ props => props.bg};
  color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`

// 기존 스타일 복사가능
let NewBtn = styled.button(BlueBtn);

function Detail(props){

  let {id} = useParams();
  console.log(id);

  let shoesId = props.shoes.find((a) => a.id == id );

  return (
    <div className="container">
      <Box>
        <BlueBtn bg="blue">버튼</BlueBtn>
        <BlueBtn bg="orange">버튼</BlueBtn>
      </Box>
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