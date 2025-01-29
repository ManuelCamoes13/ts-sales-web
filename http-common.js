import axios from 'axios';

const http = axios.create({
  // baseURL:'http://localhost:3000/api'

   baseURL:'http://192.168.0.125:3000/api'
  
});




export default http;
  