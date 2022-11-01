import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import data from './data.js';

function App() {

  let [shoes] = useState(data);

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
      <div className='main-banner-bg'>
        <div className='main-banner'></div>
      </div>

      <div className="container">
        <div className="row">
          {
            shoes.map((a, i) => {
              return (
                <Card shoes={shoes[i]} />
              )
            })
          }
        </div>
      </div>

    </div>
  );
}

function Card(props){
  let [img] = useState(props.shoes.img );

  return(
    <div className="col-md-4">
      <img src={ img } width="80%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }</p>
    </div>
  )
}

export default App;
