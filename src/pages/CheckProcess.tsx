import React, { useEffect,useState } from "react";
import { Card, message } from "antd";
import { Space, Table,Button } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import {getApplyUser} from '../api/check'

interface DataType {
  key: string;
  uid: string;
  name: string;
  gender: string;
  major: string;
  identity: string;
  partyWill: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "序号",
    dataIndex: "uid",
    key: "uid",
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "录取大类",
    dataIndex: "major",
    key: "major",
  },
  {
    title: "申请身份",
    dataIndex: "identity",
    key: "identity",
  },
  {
    title: "是否有入党意愿",
    dataIndex: "partyWill",
    key: "partyWill",
  },
  {
    title: "详情信息",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/applierDetail/${record.uid}`} >查看</Link>
      </Space>
    ),
  },
];


const gridStyle: React.CSSProperties = {
  width: "33%",
  textAlign: "center",
};

export default function CheckProcess() {
    const [applyUsers,setApplyUsers] = useState<DataType[]>([])

    useEffect(()=>{
        getApplyUser().then((res:any)=>{
            const data = res.data
            if(data.state===200){
                setApplyUsers(data.data)
            }else{
                message.error(data.msg)
            }
        }).catch(()=>{
            message.error("系统异常 请联系管理员")
        })
    },[])

  return (
    <div>
      <Card title="导出" style={{textAlign:'center'}}>
        <Card.Grid style={gridStyle} onClick={()=>window.open("https://tlb.twt.edu.cn/api/download/applyInfo")}>
        <Button type="link">导出报名信息</Button></Card.Grid>
        <Card.Grid style={gridStyle} onClick={()=>window.open("https://tlb.twt.edu.cn/api/download/confirmInfo")}>
        <Button type="link">导出确认信息</Button></Card.Grid>

        <Card.Grid style={gridStyle} onClick={()=>window.open("https://tlb.twt.edu.cn/api/download/studentProofMaterial")}>
        <Button type="link">导出学生佐证材料</Button></Card.Grid>
      </Card>
      <br />

      <Table columns={columns} dataSource={applyUsers} />
    </div>
  );
}
