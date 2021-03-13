import axios from 'axios';
import { getToken } from './auth';

const amsApi = axios.create({
    baseURL : process.env.REACT_APP_BACKEND,
});

amsApi.interceptors.request.use(async config => {
    const token = getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default amsApi;