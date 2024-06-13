import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import config from '../config';
import { useNavigate, useParams } from "react-router-dom";
import { useLocation, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
function Header() {
    let navigate = useNavigate();
    const token = Cookies.get('token');
    const role = Cookies.get('role');
  
    useEffect(() => {
      if (!token || !role ) {
        navigate(`${config.baseUrl}`)
      }
    }, []);
    const location = useLocation();
    const currentPage = location.pathname;

    const logout=async(e)=>{
        e.preventDefault()
        Cookies.remove('token');
        Cookies.remove('role');
       // window.location.reload();
       navigate(`${config.baseUrl}`)
        }
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Book Management</Navbar.Brand>

                <Nav className="ms-auto">

                {role=="admin"&& 
                    (currentPage==`${config.baseUrl}Admin-Dashboard`?
                    (<><Nav.Link as={Link} to="/Users-List">Users List</Nav.Link></>)
                :
                currentPage==`${config.baseUrl}Users-List`?
                (<><Nav.Link as={Link} to="/Admin-Dashboard">Admin-Dashboard</Nav.Link></>)
                :
                (<>
                  <Nav.Link as={Link} to="/Admin-Dashboard">Admin-Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/Users-List">Users List</Nav.Link>
              
                </>)
                )}

                    {role=="user"&& 
                    (currentPage==`${config.baseUrl}Cart`?
                    (<><Nav.Link as={Link} to={`${config.baseUrl}Dashboard`}>Dashboard</Nav.Link></>)
                :
                currentPage==`${config.baseUrl}Dashboard`?
                (<><Nav.Link as={Link} to={`${config.baseUrl}Cart`}>Cart</Nav.Link></>)
                :
                (<><Nav.Link as={Link} to={`${config.baseUrl}Dashboard`}>Dashboard</Nav.Link> 
                <Nav.Link as={Link} to={`${config.baseUrl}Cart`}>Cart</Nav.Link></>)
                )}

                    
                    <Button onClick={(e)=>{logout(e)}}>Logout</Button>
                </Nav>

            </Container>
        </Navbar>
    );
}

export default Header;
