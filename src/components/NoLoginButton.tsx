import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import styled from "styled-components";

const UserButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default function NoLoginButton() {
    return (
        <div >
            <UserButtonBox>
                <Button  style={{ marginTop:"20px",backgroundColor:"#f5f8fa" }} shape={"round"} size={"large"}>
                    <Link to={"/login"} style={{color:"#005180"}}>请先登录</Link>
                </Button>
            </UserButtonBox>
        </div>
    );
}