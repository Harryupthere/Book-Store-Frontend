import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getCart,removeCart,checkout } from '../actions/actions';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import config from '../config';
import { Link } from 'react-router-dom';
import { Container,Row,Col,Button } from 'react-bootstrap';
import Header from './Header';

const Cart = () => {
  let navigate = useNavigate();
  const token = Cookies.get('token');
  const role = Cookies.get('role');

  useEffect(() => {  
    if (!token || !role ) {
      navigate(`${config.baseUrl}`)
    }else if(role=="admin"){
      navigate(`${config.baseUrl}Admin-Dashboard`)
    }
  }, []);

  const [cartItems,setCartItems] = useState([])

  useEffect(()=>{
getCartApi()
  },[])

  const getCartApi=async()=>{
    try{
    let result = await getCart(token)
    if(result.status){
      setCartItems(result.data)
    }
    }catch(error){
      console.log(error)
    }
  }
  const handleRemoveFromCart =async (id) => {
    try {
      let result = await removeCart(token, id);
      if (result.status) {
        toast.success(result.msg);
        getCartApi(); // Refresh the book details to reflect the new cart status
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      toast.error('Error removing from cart');
    }
  };
  const handleCheckout = async(id) => {
    try {
      let result = await checkout(token,id);
      if (result.status) {
        toast.success(result.msg);
        getCartApi(); // Refresh the book details to reflect the new cart status
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      toast.error('Error during checkout');
    }
  };


  return (
    <>
    <Header/>
    <Container className='mt-4'>
    <div>
    <h2>Shopping Cart</h2>
      <Row>
      {cartItems.length>0 ?
        cartItems.map(item => (
          <Col md="3">
            <div className='book-card'>
            <div key={item.bookDetails._id}>
            <Link to={`/books/${item.bookDetails._id}`}>
              <h3>{item.bookDetails.name}</h3>
              <p>Author : {item.bookDetails.author}</p>
              <p>Category : {item.bookDetails.category}</p>
              <p>Price : {item.bookDetails.price}</p>
            </Link>
            <Button onClick={() => handleRemoveFromCart(item.bookDetails._id)}>Remove</Button>
          { !item.status ?<Button  onClick={() => handleCheckout(item.bookDetails._id)}>Checkout</Button>:
         <Button disabled>In checkout</Button> }
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

export default Cart;