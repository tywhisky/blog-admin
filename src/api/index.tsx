import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem("token");
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default axios.create({
    baseURL: `http://jsonplaceholder.typicode.com/`
});