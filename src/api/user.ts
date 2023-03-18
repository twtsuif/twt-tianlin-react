import service from "../utils/request"

export function login(data:any){
    return service({
        method: 'post',
        url: '/user/login',
        data
    })
}

export function register(data:any){
    return service({
        method: 'post',
        url: '/user/register',
        data
    })
}

export function logout(){
    return service({
        method: 'get',
        url: '/user/logout'
    })
}

