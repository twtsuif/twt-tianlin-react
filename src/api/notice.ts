import service from "../utils/request"

export function getHomeNotices(){
    return service({
        method: 'get',
        url: '/notice'
    })
}

export function getAllNotices(){
    return service({
        method: 'get',
        url: '/notice/all'
    })
}

export function getNoticeDetail(id:string){
    return service({
        method: 'get',
        url: `/notice/detail/${id}`
    })
}

export function publishNotice(data:any){
    return service({
        method: 'post',
        url: `/notice`,
        data
    })
}

export function deleteNoticeApi(id:number){
    return service({
        method: 'delete',
        url: `/notice/${id}`
    })
}