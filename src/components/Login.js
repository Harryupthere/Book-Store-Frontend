import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { login } from '../actions/actions';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import config from '../config';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const Login = () => {


  let navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    if (token || role) {
      if(role=="admin")
      navigate(`${config.baseUrl}Admin-Dashboard`)
    else
    navigate(`${config.baseUrl}Dashboard`)

    }
  }, [])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors({});

    try {
      const result = await login(formData);

      if (result.status) {
        // Set cookies for token and role
        Cookies.set('token', result.token);
        Cookies.set('role', result.role);
        
        toast.success(result.msg);
        if (result.role == "admin")
          navigate(`${config.baseUrl}Admin-Dashboard`)
        else
          navigate(`${config.baseUrl}Dashboard`)
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Toaster />
      <div className='container'>
        <div className='box'>
          <h2>Welcome!</h2>
          <Form onSubmit={handleSubmit} className="register-form">
       
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
              {errors.email && <p className="error">{errors.email}</p>}
            
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
              {errors.password && <p className="error">{errors.password}</p>}
    
            <Link to={`${config.baseUrl}signup`} className='link'>Signup</Link>
            <Button type="submit" className='theme-btn'>Login</Button>
          </Form>
        </div>
      </div>
    </>

  );
};

export default Login;
