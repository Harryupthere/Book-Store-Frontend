import axios from 'axios';
import config from "../config"

  export const signup = async (formData) => {
    try {
      const response = await axios.post(`${config.apiUrl}user/signup`, formData);
     if(response.data.success){
        return {status:true,msg:response.data.msg,token:response.data.token,role:response.data.role}
     }
     return {status:false,msg:response.data.msg}
    } catch (error) {
      console.log(error)
      return {status:false,msg:error}
    }
  };


  export const login = async (formData) => {
    try {
      const response = await axios.post(`${config.apiUrl}user/login`, formData);
     if(response.data.success){
        return {status:true,msg:response.data.msg,token:response.data.token,role:response.data.role}
     }
     return {status:false,msg:response.data.msg}
    } catch (error) {
      console.log(error)
      return {status:false,msg:error}
    }
  };

  export const getBooks = async (token, { author, category, search }) => {
    try {
      // Construct query parameters based on provided filters
      const params = {};
      if (author) {
        params.author = author;
      }
      if (category) {
        params.category = category;
      }
      if (search) {
        params.search = search;
      }
  
      const response = await axios.get(`${config.apiUrl}books/get-books`, {
        headers: {
          'x-auth-token': token
        },
        params: params  // Pass params as query parameters
      });
      if (response.data.success) {
        return { status: true, data: response.data.data,authors:response.data.authors,categories:response.data.categories };
      }
      return { status: false, msg: response.data.msg };
    } catch (error) {
      console.error(error);
      return { status: false, msg: error };
    }
  };
  
  export const getBooksAdmin = async (token) => {
    try {
      // Construct query parameters based on provided filters
      
  
      const response = await axios.get(`${config.apiUrl}books/get-books`, {
        headers: {
          'x-auth-token': token
        }
      });
      if (response.data.success) {
        return { status: true, data: response.data.data };
      }
      return { status: false, msg: response.data.msg };
    } catch (error) {
      console.error(error);
      return { status: false, msg: error };
    }
  };
  export const getBook = async (token,id) => {
    try {
      const response = await axios.get(`${config.apiUrl}books/get-book/${id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      console.log(response.data)
      if (response.data.success) {
        return { status: true, data: response.data.data };
      }
      return { status: false, msg: response.data.msg };
    } catch (error) {
      console.error(error);
      return { status: false, msg: error };
    }
  };
  export const addBook = async (token, data) => {
    try {
      const response = await axios.post(`${config.apiUrl}books/create-book`, data, {
        headers: {
          'x-auth-token': token
        }
      });

      if (response.data.success) {
        return { status: true, msg: response.data.msg };
      }
      return { status: false, msg: response.data.msg };
    } catch (error) {
      console.error(error);
      return { status: false, msg: error };
    }
  };
  
  export const updateBook = async (token, data) => {
    try {

      const response = await axios.put(`${config.apiUrl}books/update-book/${data._id}`, data, {
        headers: {
          'x-auth-token': token
        }
      });
      if (response.data.success) {
        return { status: true, msg: response.data.msg };
      }
      return { status: false, msg: response.data.msg };
    } catch (error) {
      console.error(error);
      return { status: false, msg: error };
    }
  };
  

  export const deleteBook = async (token, id) => {
    try {

      const response = await axios.delete(`${config.apiUrl}books/delete-book/${id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      if (response.data.success) {
        return { status: true, msg: response.data.msg };
      }
      return { status: false, msg: response.data.msg };
    } catch (error) {
      console.error(error);
      return { status: false, msg: error };
    }
  };


  export const addCart = async (token, id,quantity) => {
    try {

      const response = await axios.post(`${config.apiUrl}cart/addto-cart/${id}`,quantity, {
        headers: {
          'x-auth-token': token
        }
      });
      if (response.data.success) {
        return { status: true, msg: response.data.msg };
      }
      return { status: false, msg: response.data.msg };
    } catch (error) {
      console.error(error);
      return { status: false, msg: error };
    }
  };


  export const removeCart = async (token, id) => {
    try {

      const response = await axios.delete(`${config.apiUrl}cart/removefrom-cart/${id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      if (response.data.success) {
        return { status: true, msg: response.data.msg };
      }
      return { status: false, msg: response.data.msg };
    } catch (error) {
      console.error(error);
      return { status: false, msg: error };
    }
  };

  export const checkout = async (token, id) => {
    try {
console.log(token)
console.log(`${config.apiUrl}cart/checkout/${id}`)
      const response = await axios.get(`${config.apiUrl}cart/checkout/${id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      console.log(response.data)
      if (response.data.success) {
        return { status: true, msg: response.data.msg };
      }
      return { status: false, msg: response.data.msg };
    } catch (error) {
      console.error(error);
      return { status: false, msg: error };
    }
  };


  

  export const getCart = async (token) => {
    try {

      const response = await axios.get(`${config.apiUrl}cart/get-cart`, {
        headers: {
          'x-auth-token': token
        }
      });
      if (response.data.success) {
        return { status: true, msg: response.data.msg,data:response.data.data };
      }
      return { status: false, msg: response.data.msg };
    } catch (error) {
      console.error(error);
      return { status: false, msg: error };
    }
  };

  export const getUsers = async (token) => {
    try {

      const response = await axios.get(`${config.apiUrl}user/get-users`, {
        headers: {
          'x-auth-token': token
        }
      });
      if (response.data.success) {
        return { status: true, msg: response.data.msg,data:response.data.data };
      }
      return { status: false, msg: response.data.msg };
    } catch (error) {
      console.error(error);
      return { status: false, msg: error };
    }
  };


  

  export const getUserCart = async (token,id) => {
    try {
      const response = await axios.get(`${config.apiUrl}cart/get-cart-admin/${id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      if (response.data.success) {
        return { status: true, msg: response.data.msg,data:response.data.data };
      }
      return { status: false, msg: response.data.msg };
    } catch (error) {
      console.error(error);
      return { status: false, msg: error };
    }
  };
