import {message} from "antd";
import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 10000,
});

service.interceptors.request.use(
    (config: any) => {
        if (localStorage.token) {
            config.headers["Authorization"] = localStorage.token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    function (response) {
        const res = response.data;

        if (res.state === 403) {
            message.error(res.data + "请重新登录管理员账号")
            localStorage.setItem("token", '')
        }
        return response;
    },
    function (error) {
        localStorage.setItem("token", "")
        return Promise.reject(error);
    }
);

export default service;
