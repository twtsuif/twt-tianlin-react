import React from "react";
import {Button, message, Switch} from "antd";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {
    getStatus,
    openApplySystem,
    closeApplySystem,
    openConfirmSystem,
    closeConfirmSystem,
} from "../api/status";
import styled from "styled-components";

const AdminButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default function AdminButton() {
    // 申请系统和确认系统是否开启
    const [applySystemChecked, setApplySystemChecked] = useState<boolean>(false);
    const [confirmSystemChecked, setConfirmSystemChecked] = useState<boolean>(false);

    // 获取申请系统和确认系统的状态
    useEffect(() => {
        getStatus()
            .then((res: any) => {
                let data = res.data;
                if (data.state === 200) {
                    if (data.data.apply === 1) {
                        setApplySystemChecked(true);
                    } else {
                        setApplySystemChecked(false);
                    }
                    if (data.data.confirm === 1) {
                        setConfirmSystemChecked(true);
                    } else {
                        setConfirmSystemChecked(false);
                    }
                } else {
                    message.error(data.msg);
                }
            })
            .catch(() => {
                message.error("系统异常 请联系管理员");
            });
    }, []);

    // 改变申请系统
    const changeApplySystem = (checked: boolean) => {
        if (checked === true) {
            openApplySystem().then((res: any) => {
                let data = res.data;
                if (data.state === 200) {
                    message.success("申请系统开启成功");
                } else {
                    message.error("申请系统开启失败");
                }
            });
        } else {
            closeApplySystem().then((res: any) => {
                let data = res.data;
                if (data.state === 200) {
                    message.success("申请系统关闭成功");
                } else {
                    message.error("申请系统关闭失败");
                }
            });
        }
    };

    // 改变确认系统
    const changeConfirmSystem = (checked: boolean) => {
        if (checked === true) {
            openConfirmSystem().then((res: any) => {
                let data = res.data;
                if (data.state === 200) {
                    message.success("确认系统开启成功");
                } else {
                    message.error("确认系统开启失败");
                }
            });
        } else {
            closeConfirmSystem().then((res: any) => {
                let data = res.data;
                if (data.state === 200) {
                    message.success("确认系统关闭成功");
                } else {
                    message.error("确认系统关闭失败");
                }
            });
        }
    };

    return (
        <>
            <AdminButtonBox style={{margin: "20px"}}>
                <Button style={{margin: "0 10px 0 10px"}}>
                    <Link to={"/publishNotice"}>发布公告</Link>
                </Button>

                <Button style={{margin: "0 10px 0 10px"}}>
                    <Link to={"/checkProcess"}>查看进度</Link>
                </Button>
            </AdminButtonBox>


            {/*申请系统开关*/}
            {applySystemChecked && (
                <AdminButtonBox style={{margin: "20px"}}>
                    申请系统
                    <Switch
                        defaultChecked={true}
                        onChange={changeApplySystem}
                        style={{marginLeft: "10px"}}
                    />
                </AdminButtonBox>
            )}
            {!applySystemChecked && (
                <AdminButtonBox style={{margin: "20px"}}>
                    申请系统
                    <Switch
                        defaultChecked={false}
                        onChange={changeApplySystem}
                        style={{marginLeft: "10px"}}
                    />
                </AdminButtonBox>
            )}

            {/*确认系统开关*/}
            {confirmSystemChecked && (
                <AdminButtonBox style={{margin: "20px"}}>
                    确认系统
                    <Switch
                        defaultChecked={true}
                        onChange={changeConfirmSystem}
                        style={{marginLeft: "10px"}}
                    />
                </AdminButtonBox>
            )}
            {!confirmSystemChecked && (
                <AdminButtonBox style={{margin: "20px"}}>
                    确认系统
                    <Switch
                        defaultChecked={false}
                        onChange={changeConfirmSystem}
                        style={{marginLeft: "10px"}}
                    />
                </AdminButtonBox>
            )}

        </>
    );
}
