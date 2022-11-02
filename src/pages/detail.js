import { useParams } from 'react-router-dom';

function Detail(props){

  let {id} = useParams();
  console.log(id);

  let shoesId = props.shoes.find((a) => a.id == id );

  return (
    <div className="container">
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