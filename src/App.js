import { createContext, useState, useEffect, lazy, Suspense } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import UseTransTest, { useTransTest } from './useTransTest.js';
// import Detail from './pages/Detail';
// import Cart from './pages/Cart.js'
const Detail = lazy(() => import('./pages/Detail.js'));
const Cart = lazy(() => import('./pages/Cart.js'));

export let Context1 = createContext() // Context API 사용 세팅 1. context란 state 보관함을 하나 만들어줌

function App() {

  let [shoes, setShoes] = useState(data);
  let [stock] = useState([10, 11, 12]) // 재고
  let navigate = useNavigate(); // 페이지 이동을 도와줌  *훅(= 유용한 함수들이 들어있음)

  /* localStorage */
  let obj = { name : 'Kim' }
  localStorage.setItem('data', JSON.stringify(obj))
  let getData = localStorage.getItem('data')
  console.log((getData)) // {"name":"Kim"}
  console.log(JSON.parse(getData)) // {name: 'Kim'}

  /* 최근 본 상품 UI */
  useEffect(() => {
    if (localStorage.getItem('watched') == null) {
      localStorage.setItem('watched', JSON.stringify( [] ))
    }
  }, [])

  /* 반가워요 user */
  // axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
  //   a.data
  // })
  
  // react-query 사용
  let result = useQuery('greet', () => 
    axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      console.log('요청!')
      return a.data
    }),
    /* refetch 간격 설정 */
    { staleTime : 2000 } // 2초 안에는 refetch 안됨
  )
  /*
  result.data // 요청 성공시 data 가져옴
  result.isLoading // 요청중일 때 true
  result.error // 요청 실패시 true
  */
  return (
    <div className="App">


      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">SinShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
            <Nav.Link onClick={() => { navigate('/test') }}>Test</Nav.Link>
            <Nav.Link onClick={() => { navigate(1) }}>앞으로가기</Nav.Link>
            <Nav.Link onClick={() => { navigate(-1) }}>뒤로가기</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {/* { result.isLoading ? '로딩중' : result.data.name } */}
            { result.isLoading && '로딩중' }
            { result.error && '에러남' }
            { result.data && result.data.name }
          </Nav>
        </Container>
      </Navbar>
      
      <Suspense fallback={<div>Loading...</div>}>
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
            <button onClick={() => {
              console.log('로딩중...');

              /* AJAX로 데이터 받을 때 */
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result) => {
                console.log(result.data)
                let copy = [...shoes, ...result.data];
                setShoes(copy);
                console.log('로딩 완료');
              })
              .catch(() => {
                console.log('실패!')
              })

            }}>버튼</button>
          </>
        } />
      
        {/* <Route path="/Detail/:id" element={ <Detail shoes={shoes}/> }/> URL 파라미터: /:파라미터값 */}
        <Route path="/Detail/:id" element={ 
          <Suspense fallback={<div>Loading...</div>}>
            <Context1.Provider value={ {stock, shoes} }> {/* Context API 사용 세팅 2. <Context>로 원하는 컴포넌트 감싸기 */}
              <Detail shoes={shoes}/> {/* Context API 사용 세팅 3. value={ {넘길 값1 넣기, 넘길 값2 넣기} } */}
            </Context1.Provider>
          </Suspense>
        }/>
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>404 Pages</div>} /> // * : Route에 정해두지 않은 모든 주소
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버</div>} /> {/* <Route>태그안에 태그 사용:  Nested Routes */}
          <Route path="location" element={<div>위치정보</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 배달비 무료!</div>} />
          <Route path="two" element={<div>생일 기념 쿠본받기</div>} />
        </Route>
        <Route path="/test" element={<UseTransTest />}/>
      </Routes>
      </Suspense>
      

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
  let detail = '/Detail/'+ props.shoes.id;

  return (
    <div className="col-md-4">
      <a href={ detail }><img src={ img } width="80%" /></a>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }원</p>
    </div>
  )
}

export default App;
