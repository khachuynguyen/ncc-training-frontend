import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container, Image } from 'react-bootstrap';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';
import LogoNCC from '../NCCLogo.png';
import React from 'react';
function NavBar(props) {
    const user = props.user;
    if(user != null){
        return ( 
        <Navbar bg="primary" variant="dark">
            
                <Container>
                <img src={LogoNCC}/>
                <Navbar.Brand as={Link} to={'/product'} >NCC</Navbar.Brand>
                <Nav className="me-auto">
                    
                    <Nav.Link as={Link} to={'/product'} >Product</Nav.Link>
                    <Nav.Link as={Link} to={'/management'} >Management</Nav.Link>
                </Nav>
                <Nav> <Nav.Link as={Link} to={'/management'} >Logout</Nav.Link>
                    <Nav.Link  >UserName</Nav.Link>
                </Nav>
                </Container>
        </Navbar>
     );
    }
    else{
        return ( 
            <Navbar bg="primary" variant="dark">
                    <Container>
                    <img src={LogoNCC}/>
                    <Navbar.Brand as={Link} to={'/product'} >NCC</Navbar.Brand>
                    <Nav className="me-auto">
                        
                        <Nav.Link href='/product' >Product</Nav.Link>
                        {/* <Nav.Link as={Link} to={'/management'} >Management</Nav.Link> */}
                        <Nav.Link href='/management' >Management</Nav.Link>
                    </Nav>
                    <Nav> <Nav.Link as={Link} to={'/login'} >Login</Nav.Link>
                        
                    </Nav>
                    </Container>
            </Navbar>
         );
    }
    
}

export default NavBar;