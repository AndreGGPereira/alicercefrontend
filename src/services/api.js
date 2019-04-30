import axios from 'axios'

const api = axios.create({
   // baseURL: 'https://dependencia.herokuapp.com/'
   baseURL: 'https://glacial-castle-37039.herokuapp.com/'
  //baseURL: 'https://192.168.0.6:8080'
});

export default api;

