import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import config from './config';
import UserCart from './components/UserCart';
import UsersList from './components/UsersList';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path={`${config.baseUrl}`} element={<Login />} />
        <Route path={`${config.baseUrl}Dashboard`} element={<BookList />} />
        <Route path={`${config.baseUrl}Book/:id`} element={<BookDetail />} />
        <Route path={`${config.baseUrl}Cart`} element={<Cart />} />
        <Route path={`${config.baseUrl}Signup`} element={<Signup />} />
        <Route path={`${config.baseUrl}Admin-Dashboard`} element={<Admin />} />
        <Route path={`${config.baseUrl}Users-List`} element={<UsersList />} />
        <Route path={`${config.baseUrl}User-Cart/:id`} element={<UserCart />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
  