import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
// import mainBanner from './banner.png';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">SinShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* 
        src에 이미지 파일이 있으면 이렇게 사용 가능
      <div className='main-banner' style={{ backgroundImage : 'url('+mainBanner+')'}}></div>
      */}
      <div className='main-banner-bg'>
        <div className='main-banner'></div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src="https://gcsevmfhfcsn4841109.gcdn.ntruss.com/data/jdsports_data/images/addimg/00/00/22/99/73/b_00218036_add.gif" width="80%"/>
            <h4>나이키 포스 1 LE</h4>
            <p>나이키 포스 1 LE는 82년의 하드우드 아이콘을 올 화이트 또는 올 블랙의 데일리 스타일로 재현합니다.</p>
          </div>
          <div className="col-md-4">
            <img src="https://image.msscdn.net/images/goods_img/20190723/1101356/1101356_5_500.jpg?t=20211224163140" width="80%"/>
            <h4>에어 모나치 어글리 화이트</h4>
            <p>내구성과 쿠셔닝, 착화감으로 아이들의 발을 클래식으로 안내하세요.</p>
          </div>
          <div className="col-md-4">
            <img src="https://cdn.shoemarker.co.kr/Upload/ProductImage/020102/30050_1_0500_0500.jpg" width="80%"/>
            <h4>디파이 올 데이</h4>
            <p>나이키 맨즈 디파이는 지지력이 높고 쿠션이 안정감있으며 내구성이 뛰어난 가죽 소재의 상판이 발을 고정합니다.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
