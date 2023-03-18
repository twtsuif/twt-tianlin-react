import React from "react";
import {Layout} from "antd";
import {Button} from "antd";
import logo from "../images/logo.png";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useAppSelector, useAppDispatch} from "../app/hooks";
import {selectUser, userLogout} from "../features/user/userSlice";


const HeaderBox = styled.div`
  background-color: #f5f8fa;
`;


const {Header} = Layout;


export default function AppHeader() {
    // hook
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    // state
    const name = user.name;
    const token = localStorage.getItem("token");

    // 退出  清除token  跳转到首页
    const logoutButton = () => {
                dispatch(userLogout())
                navigate('/')
    }

    // 未登录
    if (name === '' || token === '') {
        return (
            <>
                <HeaderBox>
                    <Header style={{backgroundColor: "#f5f8fa", height: `90px`}}>

                        {/*logo图片*/}
                        <div style={{
                            width: `60%`,
                            marginLeft: `20%`,
                            height: `90px`,
                            display: `flex`,
                            justifyContent: `space-between`
                            }}>
                                <Link to={'/'} style={{minWidth:`200px`}}><img src={logo} alt="" style={{width: "100%"}}/></Link>

                                <div style={{display: `flex`, justifyContent: `space-between`, marginTop: "3%",minWidth:`100px`}}>
                                    <Link to="/login" style={{fontSize: `120%`, fontWeight: `bold`,color:`#344B77`}}>登录</Link>
                                    <p style={{fontSize: `20px`}}>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                    <Link to="/register" style={{fontSize: `120%`, fontWeight: `bold`,color:`#344B77`}}>注册</Link>
                                </div>
                        </div>
                        

                    </Header>
                </HeaderBox>
            </>
        );

        // 已登录
    } else {
        return (
            <>
                <HeaderBox>
                    <Header style={{backgroundColor: "#f5f8fa", height: `90px`}}>

                        <div style={{
                            width: `60%`,
                            marginLeft: `20%`,
                            height: `90px`,
                            display: `flex`,
                            justifyContent: `space-between`
                        }}>
                             <Link to={'/'} style={{minWidth:`200px`}}><img src={logo} alt="" style={{width: "100%"}}/></Link>

                            <div  style={{display: `flex`, justifyContent: `space-between`, marginTop: "3%",minWidth:`100px`}}>
                                <div style={{marginTop:"0",fontSize: "120%", marginRight: "10px",color:`#344B77`}}>{name}</div>
                                <Button onClick={logoutButton} style={{fontSize: "120%",marginTop:"13%",backgroundColor:"#f5f8fa",color:`#344B77`}} type={"link"} shape={"round"}> 退出</Button>
                            </div>
                        </div>
                    </Header>
                </HeaderBox>
            </>
        );
    }
}
