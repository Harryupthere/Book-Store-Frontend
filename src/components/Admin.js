import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getBooksAdmin, updateBook, addBook, deleteBook } from '../actions/actions';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import config from '../config';
import Header from './Header';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';


const Admin = () => {
  let navigate = useNavigate();
  const token = Cookies.get('token');
  const role = Cookies.get('role');

  useEffect(() => {
    if (!token || !role || role !== "admin") {
      navigate(`${config.baseUrl}`)
    }
  }, []);

  const [callApi, setCallApi] = useState(false)
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState({
    name: '',
    author: '',
    category: '',
    price: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getBooksApi();
  }, [callApi]);

  const getBooksApi = async () => {
    let result = await getBooksAdmin(token);
    if (result.status) {
      setBooks(result.data);
    }
  }

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!bookData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!bookData.author.trim()) {
      errors.author = 'Author is required';
    }
    if (!bookData.category.trim()) {
      errors.category = 'Category is required';
    }
    if (!bookData.price) {
      errors.price = 'Price is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors({});

    let result;

    if (bookData._id) {

      result = await updateBook(token, bookData);
    } else {

      result = await addBook(token, bookData);
    }
    if (result.status) {
      toast.success(result.msg)
      setBookData({
        name: '',
        author: '',
        category: '',
        price: '',
      });
      setCallApi(!callApi)
    } else {
      toast.error(result.msg)
    }
  }

  const handleEdit = (book) => {
    setBookData(book);
  };

  const handleDelete = async (id) => {
    let result = await deleteBook(token, id);

    if (result.status) {
      toast.success(result.msg)


    } else {
      toast.error(result.msg)

    }
    setCallApi(!callApi)
  }
  return (

    <>
      <Toaster />
      <Header />
      <Container>
        <div className='pt-4'>
          <h2>Admin Dashboard</h2>

          <div className='mt-4 add-box'>
            <h3>Add Books</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Control className='w-50 mb-2' type="text" name="name" value={bookData.name} onChange={handleChange} placeholder="Name" required />
              {errors.name && <p className="error">{errors.name}</p>}
              <Form.Control className='w-50 mb-2' type="text" name="author" value={bookData.author} onChange={handleChange} placeholder="Author" required />
              {errors.author && <p className="error">{errors.author}</p>}
              <Form.Control className='w-50 mb-2' type="text" name="category" value={bookData.category} onChange={handleChange} placeholder="Category" required />
              {errors.category && <p className="error">{errors.category}</p>}
              <Form.Control className='w-50 mb-2' type="number" name="price" value={bookData.price} onChange={handleChange} placeholder="Price" required />
              {errors.price && <p className="error">{errors.price}</p>}

              <Button type="submit" className='w-50' >Submit</Button>
            </Form>
          </div>
          <h3 className='mt-5'>Books</h3>
          <Row className='mt-3'>
            {books.length>0 ?
            books.map(book => (
              <Col md={3}>
                <div className='book-card'>
                  <div key={book._id}>
                    <h3>{book.name}</h3>
                    <p>Author : {book.author}</p>
                    <Button onClick={() => handleEdit(book)}>Edit</Button>
                    <Button onClick={() => handleDelete(book._id)}>Delete</Button>
                  </div>
                </div>
              </Col>
            ))
          :
          <p>No Books In Store</p>}
          </Row>


        </div>
      </Container>

    </>

  );
};

export default Admin;
