import service from "../utils/request"

export function getApplyUser(){
    return service({
        method: 'get',
        url: '/apply'
    })
}