import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3021/food',
});

export default api;
