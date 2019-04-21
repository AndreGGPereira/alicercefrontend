import axios from 'axios'

const api = axios.create({
   // baseURL: 'https://dependencia.herokuapp.com/'
   baseURL: 'https://ancient-headland-55662.herokuapp.com/'
});

export default api;

