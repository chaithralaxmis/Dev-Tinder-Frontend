import { serviceAuth } from "./request";


export const login = (data) =>{
    return serviceAuth({
        url:"login",
        method:"POST",
        data
    })
}


export const logout = () =>{
    return serviceAuth({
        url:"logout",
        method:"POST"
    })
}

export const register = (data) =>{
    return serviceAuth({
        url:"signup",
        method:"POST",
        data
    })
}

export const forgotPassword = (data) =>{
    return serviceAuth({
        url:"forgot",
        method:"POST",
        data
    })
}


export const getProfile =()=>{
    return serviceAuth({
        url:"profile/view",
        method:"get"
    })
}


export const editProfile =(data)=>{
    return serviceAuth({
        url:"profile/edit",
        method:"patch",
        data
    })
}


export const getFeed =(data)=>{
    return serviceAuth({
        url:"user/feed",
        method:"get",
        params:data
    })
}


export const respondToFeed = (data) =>{
    return serviceAuth({
        url:`request/send/${data.status}/${data.toUserID}`,
        method:"post"
    })
}


export const repondToRequest = (data) =>{
    return serviceAuth({
        url:`request/review/${data.status}/${data.requestID}`,
        method:"post"
    })
}

export const getRequests =(data)=>{
    return serviceAuth({
        url:`user/requests/${data}`,
        method:"get",
    })
}

export const getConnections =(data)=>{
    return serviceAuth({
        url:"user/connections",
        method:"get",
        params:data
    })
}