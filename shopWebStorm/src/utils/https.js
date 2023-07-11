import axios from 'axios';

let https =axios.create({
    baseURL:"http://127.0.0.1:8888/",
    timeout:3000,
});

https.interceptors.request.use(config=>{
    return config
});

https.interceptors.response.use(config=>{
    return config.data
});

export default https;