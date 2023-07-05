import axios from 'axios'

const api = axios.create({
    baseURL : 'https://thoughtful-underclothes-fawn.cyclic.app'
});

export default api;