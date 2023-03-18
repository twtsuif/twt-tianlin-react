import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { login,register,logout } from "../../api/user";
import { RootState } from "../../app/store";

export interface UserState {
  uid: number;
  name: string;
  role: string;
  email: string;
}

const initialState: UserState = {
  uid: 0,
  name: "",
  role: "",
  email: "",
};

// 登录 改变全局状态的Action
export const changeUserInfo = createAsyncThunk(
  "user/login",
  async (data: any) => {
    const res = await login(data);
    return res.data;
  }
);

// 注册后 自动改变全局状态的Action
export const autoChangeUserInfo = createAsyncThunk(
  "user/register",
  async (data: any) => {
    if(data.password !==data.confirmPassword){
      message.error("两次填写的密码不相同")
    }else{
      const res = await register(data);
      return res.data;
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/logout",
  async () => {
      const res = await logout();
      return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 登录后 改变全局状态
    builder.addCase(changeUserInfo.fulfilled, (state, action) => {
      const data = action.payload;
      if (data.state === 200) {
        state.uid = data.data.id;
        state.name = data.data.name;
        state.email=data.data.email;
        state.role=data.data.role;
        localStorage.setItem("token", data.data.token);
        message.success("登录成功")
      } else {
        message.error(data.msg);
      }
    });
    // 注册后 改变全局状态
    builder.addCase(autoChangeUserInfo.fulfilled,(state,action)=>{
      const data = action.payload;
      if(data.state===200){
        state.uid=data.data.id;
        state.name=data.data.name;
        state.email=data.data.email;
        state.role=data.data.role;
        localStorage.setItem("token",data.data.token);
        message.success("注册成功")
      }else{
        message.error(data.msg)
      }
    });
    builder.addCase(userLogout.fulfilled,(state,action)=>{
      const data = action.payload;
      if(data.state===200){
        state.uid=0
        state.name=""
        state.email=""
        state.role=""
        localStorage.setItem("token","")
        message.success("退出成功")
      }else{
        message.error(data.msg)
      }
    })
  },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
