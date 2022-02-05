import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:5000/api'
})

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

export default instance