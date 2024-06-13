import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserCart } from '../actions/actions';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import config from '../config';
import { Link } from 'react-router-dom';
import { Container,Row,Col,Button } from 'react-bootstrap';
import Header from './Header';

const UserCart = () => {
  let { id } = useParams();

  let navigate = useNavigate();
  const token = Cookies.get('token');
  const role = Cookies.get('role');

  useEffect(() => {  
    if (!token || !role || role!="admin" ) {
      navigate(`${config.baseUrl}`)
    }
  }, []);

  const [userCart,setUserCart] = useState([])

  useEffect(()=>{
getCartApi()
  },[])

  const getCartApi=async()=>{
    try{
    let result = await getUserCart(token,id)
    if(result.status){
      setUserCart(result.data)
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
    <h2>User's Cart</h2>
      <Row>
      {userCart.length>0 ?
        userCart.map(item => (
          <Col md="3">
            <div className='book-card'>
            <div key={item.bookDetails._id}>
              <h3>{item.bookDetails.name}</h3>
              <p>Author : {item.bookDetails.author}</p>
              <p>Category : {item.bookDetails.category}</p>
              <p>Price : {item.bookDetails.price}</p>
              <p>Quantity : {item.quantity}</p>
              <p>Status : {item.status?"In checkout":"Not checkout"}</p>

          </div>
          </div>
          </Col>
        )):
        <p>No books found</p>}
     
      </Row>
        
    </div>
    </Container>
    </>
  );
};

export default UserCart;