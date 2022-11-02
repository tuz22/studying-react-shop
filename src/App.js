import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/detail';

function App() {

  let [shoes] = useState(data);
  let navigate = useNavigate(); // 페이지 이동을 도와줌  *훅(= 유용한 함수들이 들어있음)

  return (
    <div className="App">


      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">SinShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate(1) }}>앞으로가기</Nav.Link>
            <Nav.Link onClick={() => { navigate(-1) }}>뒤로가기</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      <Routes>
        <Route path="/" element={
          <>
            <div className='main-banner-bg'>
              <div className='main-banner'></div>
            </div>

            <div className="container">
              <div className="row">
                { shoes.map((a, i) => {
                    return ( <Card shoes={shoes[i]} /> )
                  })
                }
              </div>
            </div>
          </>
        }/>
      
        <Route path="/detail/:id" element={ <Detail shoes={shoes}/> }/>{/* URL 파라미터: /:파라미터값 */}
        <Route path="*" element={<div>404 Pages</div>} /> // * : Route에 정해두지 않은 모든 주소
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버</div>} /> {/* <Route>태그안에 태그 사용:  Nested Routes */}
          <Route path="location" element={<div>위치정보</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 배달비 무료!</div>} />
          <Route path="two" element={<div>생일 기념 쿠본받기</div>} />
        </Route>
      </Routes>

      

    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props){
  let [img] = useState(props.shoes.img );

  return (
    <div className="col-md-4">
      <img src={ img } width="80%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }원</p>
    </div>
  )
}

export default App;
