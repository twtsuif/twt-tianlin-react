import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import styled from "styled-components";
import { getUserAdmit } from "../api/apply";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";
import { getStatus } from "../api/status";

const UserButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default function UserButton() {
  // Hook
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  // 判断是否能够跳转到报名系统
  const ableToApply = () => {
    getStatus().then((res: any) => {
      if (!res.data.data.apply) {
        message.error("报名系统暂未开启");
      } else {
        navigate("/apply");
      }
    });
  };

  // 判断是否能够跳转到报道系统
  const ableToConfirm = () => {
    getStatus().then((res: any) => {
      if (!res.data.data.confirm) {
        message.error("录取报道系统暂未开启");
      } else {
        getUserAdmit(user.uid).then((res: any) => {
          if (res.data.data === "未录取") {
            message.error("您还未被录取 请等待通知");
          } else {
            navigate("/confirm");
          }
        });
      }
    });
  };

  return (
    <div>
      <UserButtonBox>
        <Button
          style={{ margin: "0 0 10px 0", backgroundColor: "#f5f8fa" }}
          shape={"round"}
          size={"large"}
          onClick={ableToApply}
        >
          <div style={{ color: "#005180" }}>学生报名系统</div>
        </Button>
      </UserButtonBox>

      <UserButtonBox>
        <Button
          style={{ margin: "10px", backgroundColor: "#f5f8fa" }}
          shape={"round"}
          size={"large"}
          onClick={ableToConfirm}
        >
          <div style={{ color: "#005180" }}>录取报道系统</div>
        </Button>
      </UserButtonBox>
    </div>
  );
}
