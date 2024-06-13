import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBook, addCart, removeCart, checkout } from '../actions/actions';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import config from '../config';
import { Container,Row ,Col, Button, Form} from 'react-bootstrap';
import Header from './Header';

const BookDetail = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const token = Cookies.get('token');
  const role = Cookies.get('role');

  useEffect(() => {
    if (!token || !role ) {
      navigate(`${config.baseUrl}`)
    }else if(role=="admin"){
      navigate(`${config.baseUrl}Admin-Dashboard`)
    }
  }, [token, role, navigate]);

  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    getBookApi();
  }, []);

  const getBookApi = async () => {
    try {
      let result = await getBook(token, id);
      if (result.status) {
        setBook(result.data);
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      toast.error('Error fetching book details');
    }
  };

  const addToCart = async (bookId) => {
    try {
      let result = await addCart(token, bookId, quantity );
      if (result.status) {
        toast.success(result.msg);
        getBookApi(); // Refresh the book details to reflect the new cart status
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      toast.error('Error adding to cart');
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      let result = await removeCart(token,  bookId );
      if (result.status) {
        toast.success(result.msg);
        getBookApi(); // Refresh the book details to reflect the new cart status
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      toast.error('Error removing from cart');
    }
  };

  const checkOut = async (bookId) => {
    try {
      let result = await checkout(token,  bookId );
      if (result.status) {
        toast.success(result.msg);
        getBookApi(); // Refresh the book details to reflect the new cart status
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      toast.error('Error during checkout');
    }
  };

  return (
    <div>
      <Header/>
      <Toaster />
      <Container className='mt-3'>
        <Row>
        {book ? (
      <Col md="4">
          <div className='book-card'>
          <h2>{book.book.name}</h2>
          <p> Author :  {book.book.author}</p>
          <p>Category : {book.book.category}</p>
          <p>Price :{book.book.price}</p>

          {!book.inCart && (
            <>
              <label htmlFor="quantity">Quantity:</label>
              <Form.Control
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                required
              />
              <Button onClick={() => addToCart(book.book._id)} className='d-block mt-3'>Add to cart</Button>
            </>
          )}

          {book.inCart && (
            <><Button onClick={() => removeFromCart(book.book._id)}>Remove from cart</Button>
           { !book.checkoutStatus ?(<Button onClick={() => checkOut(book.book._id)}>Checkout</Button>)
           :
           (<Button disabled>In Checkout</Button>)}</>
          )}
       
        </div>
      </Col>
      ) : (
        <p>Loading...</p>
      )}
        </Row>
    
      </Container>
    </div>
  );
};

export default BookDetail;
