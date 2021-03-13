import axios from 'axios';

const api = axios.create({
    //baseURL : 'http://localhost:3002'
    baseURL : 'https://amsbackend.herokuapp.com'
});

export default api;