// @ts-nocheck
import React from "react";
import {Card, Col, Row} from "antd";
import {Link} from "react-router-dom";
import {getHomeNotices} from "../api/notice";
import {useEffect, useState} from "react";
import {useAppSelector} from "../app/hooks";
import {selectUser} from "../features/user/userSlice";
import AdminButton from "../components/AdminButton";
import UserButton from "../components/UserButton";
import styled from "styled-components";
import NoLoginButton from "../components/NoLoginButton";
import "../App.css"

const FunctionAndNoticeBox = styled.div`
`;

const NoticesBox = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-between;
`

export default function Main() {
    // Hook
    const user = useAppSelector(selectUser);
    const [homeNotices, setHomeNotices] = useState<[any]>();

    // 首页获取三条最新公告
    useEffect(() => {
        getHomeNotices().then((res: any) => {
            setHomeNotices(res.data.data);
        });
    }, []);

    return (
        <>
            {/* <div className="site-card-wrapper" style={{backgroundColor:"#f5f8fa",marginTop:"30px",marginLeft:`10%`,minHeight:`00%`}}> */}
            <div className="site-card-wrapper" style={{backgroundColor:"#f5f8fa",marginBottom:"30px",marginLeft:`10%`,minHeight:`450px`}}>
                <Row justify="center" style={{width:"100%"}}>

                    <Col span={7}>
                        <FunctionAndNoticeBox >
                            <Card title="功能" bordered={false} style={{backgroundColor:"#f5f8fa"}}>
                                {/* 普通用户的按钮 */}
                                {user.role === "user" && <UserButton/>}
                                {/* 管理员的按钮 */}
                                {user.role === "admin" && <AdminButton/>}
                                {/* 未登录按钮 */}
                                {user.role === "" && <NoLoginButton/>}
                            </Card>
                        </FunctionAndNoticeBox>
                    </Col>

                    <Col span={2}></Col>

                    <Col span={13}>
                        <FunctionAndNoticeBox>
                            <Card
                                title="公告"
                                bordered={false}
                                extra={<Link to="/notices" style={{color:`#344B77`}}>更多+</Link>}
                                style={{backgroundColor:"#f5f8fa"}}
                            >
                                <div>
                                    {homeNotices?.map((notice) => {

                                        let res=notice.title;
                                        let len=30;
                                        if( notice.title.length>len)
                                        {
                                            res=notice.title.slice(0,len);
                                            res+="..."
                                        }

                                        return (
                                            <div key={notice.id} style={{}}>

                                                <NoticesBox key={notice.id} style={{width:`100%`,display:`flex`,justifyContent:`space-between`}}>
                                                    <div style={{width:`80%`}}>
                                                        <Link to={`/notice/${notice.id}`} style={{color:`#344B77`}} className="link">
                                                            {res}
                                                        </Link>
                                                    </div>
                                                    <div style={{width:`20%`,color:`#344B77`,marginLeft:`10%`}}>
                                                        {notice.createdAt}
                                                    </div>
                                                    
                                                    <br/>
                                                </NoticesBox>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </FunctionAndNoticeBox>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        </>
    );
}
