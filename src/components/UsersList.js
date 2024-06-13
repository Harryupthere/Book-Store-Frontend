import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from '../actions/actions';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import config from '../config';
import { Link } from 'react-router-dom';
import { Container,Row,Col,Button } from 'react-bootstrap';
import Header from './Header';

const UsersList = () => {
  let navigate = useNavigate();
  const token = Cookies.get('token');
  const role = Cookies.get('role');

  useEffect(() => {  
    if (!token || !role || role!="admin" ) {
      navigate(`${config.baseUrl}`)
    }
  }, []);

  const [users,setUsers] = useState([])

  useEffect(()=>{
getUserApi()
  },[])

  const getUserApi=async()=>{
    try{
    let result = await getUsers(token)
    console.log(result)
    if(result.status){
      setUsers(result.data)
    }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
    <Header/>
    <Container className='mt-4'>
    <div>
    <h2>User list</h2>
      <Row>
      {users.length>0 ?
        users.map(item => (
          <Col md="3">
            <div className='book-card'>
            <div key={item._id}>
            <Link to={`${config.baseUrl}User-Cart/${item._id}`}>
              <h3>{item.name}</h3>
              <p>Email : {item.email}</p>
            </Link>

          </div>
          </div>
         

          </Col>
        )):
        <p>No User found</p>}
     
      </Row>
        
    </div>
    </Container>
    </>
  );
};

export default UsersList;