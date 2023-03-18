import service from "../utils/request"

export function confirmInfo(data:any){
    return service({
        method: 'post',
        url: '/confirm',
        data
    })
}