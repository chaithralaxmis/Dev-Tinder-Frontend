import axios from "axios";

export const serviceAuth = axios.create({
    baseURL:"http://localhost:7777/",
    withCredentials: true
})


serviceAuth.interceptors.request.use(
    (config)=>{
        
        return config
    },(error)=>{
        return Promise.reject(error)
    }
)