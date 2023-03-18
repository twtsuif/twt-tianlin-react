import { Button, Form, Input, Card } from "antd";
import React from "react";
import { changeUserInfo } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";

const LoginBox = styled.div`
  width: 45%;
  margin: 20px auto;
  text-align: center;
`;

export const Login: React.FC = () => {
  // Hook
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser)

  // 若已经登录 则跳转到首页
  if(user.uid!==0){
    navigate('/')
  }

  // 登录
  const onFinish = (data: any) => {
    dispatch(changeUserInfo(data))
  };



  return (
    <LoginBox>
      {/*将登录框视为卡片*/}
      <Card
        title="登录"
        style={{ backgroundColor: "#fcfcfc" }}
      >
        <br />
        {/*Form表单*/}
        <Form
          name="login"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          onFinish={onFinish}
        >

          {/*需要填写邮箱和密码*/}
          <div>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: "请输入您的邮箱" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入您的密码" }]}
            >
              <Input.Password />
            </Form.Item>
          </div>

          {/*登录按钮*/}
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit" className="tju">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </LoginBox>
  );
};
