import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { getBooks } from '../actions/actions';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import config from '../config';
import { Container, Row, Col, Form, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import Header from './Header';

const BookList = () => {
  let navigate = useNavigate();
  const token = Cookies.get('token');
  const role = Cookies.get('role');

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!token || !role) {
      navigate(`${config.baseUrl}`);
    } else if (role === "admin") {
      navigate(`${config.baseUrl}Admin-Dashboard`);
    } else {
      navigate(`${config.baseUrl}Dashboard`);
    }
  }, []);


  useEffect(() => {
    getBooksApi();
  }, [searchQuery, authorFilter, categoryFilter]); // Trigger getBooksApi whenever searchQuery, authorFilter, or categoryFilter changes

  const getBooksApi = async () => {
    try {
      let result = await getBooks(token, { search: searchQuery, author: authorFilter, category: categoryFilter });
    
      if (result.status) {
        setBooks(result.data);
        setAuthors(result.authors)
        setCategories(result.categories)

      } else {
        toast.error(result.msg);
        setBooks([]); // Clear books state on error
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch books.');
      setBooks([]); // Clear books state on error
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleAuthorFilter = (author) => {
    setAuthorFilter(author);
  }

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  }

  return (
    <>
      <Header />
      <Container className='mt-4'>
        <div>
          <h2>Book List</h2>
          <Form className="d-flex ms-2">
            <FormControl
              type="search"
              placeholder="Search"
              className="mb-4 w-50"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form>
          <div className="filters">
            <DropdownButton id="author-dropdown" title={`Author: ${authorFilter || 'All'}`}>
              <Dropdown.Item onClick={() => handleAuthorFilter('')}>All</Dropdown.Item>
              {authors.map(author => (
                <Dropdown.Item key={author} onClick={() => handleAuthorFilter(author)}>{author}</Dropdown.Item>
              ))}
            </DropdownButton>

            <DropdownButton id="category-dropdown" title={`Category: ${categoryFilter || 'All'}`}>
              <Dropdown.Item onClick={() => handleCategoryFilter('')}>All</Dropdown.Item>
              {categories.map(category => (
                <Dropdown.Item key={category} onClick={() => handleCategoryFilter(category)}>{category}</Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
          <div>
            <Row>
              {books.length > 0 ?
                books.map(book => (
                  <Col md="3" key={book._id}>
                    <div className='book-card'>
                      <Link to={`${config.baseUrl}Book/${book._id}`}>
                        <h3>{book.name}</h3>
                        <p>Author: {book.author}</p>
                      </Link>
                    </div>
                  </Col>
                )) :
                <p>No books found</p>
              }
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BookList;
