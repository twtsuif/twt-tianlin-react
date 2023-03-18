import service from "../utils/request"

export function getStatus(){
    return service({
        method: 'get',
        url: '/status'
    })
}

export function openApplySystem(){
    return service({
        method: 'put',
        url: '/status/openApplySystem'
    })
}

export function closeApplySystem(){
    return service({
        method: 'put',
        url: '/status/closeApplySystem'
    })
}

export function openConfirmSystem(){
    return service({
        method: 'put',
        url: '/status/openConfirmSystem'
    })
}

export function closeConfirmSystem(){
    return service({
        method: 'put',
        url: '/status/closeConfirmSystem'
    })
}