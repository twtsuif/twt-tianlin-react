import service from "../utils/request"

export function commitApply(data:any){
    return service({
        method: 'post',
        url: '/apply',
        data
    })
}

export function admitUserApi(uid:number){
    return service({
        method: 'post',
        url: '/apply/admit',
        params: {
            uid : uid
        }
    })
}

export function unAdmitUserApi(uid:number){
    return service({
        method: 'post',
        url: '/apply/unAdmit',
        params: {
            uid : uid
        }
    })
}

export function getUserAdmit(uid:number){
    return service({
        method: 'get',
        url: '/apply/admit',
        params:{
            uid:uid
        }
    })
}

export function getApplierDetail(uid:string){
    return service({
        method:'get',
        url:`/apply/user/${uid}`
    })
}