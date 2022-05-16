import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8090'
})

api.defaults.headers.common['UAuthorization'] = localStorage.getItem('UAuthorization');
api.defaults.headers.common['SAuthorization'] = localStorage.getItem('SAuthorization');

export default api;