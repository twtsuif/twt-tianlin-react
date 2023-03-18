import React from "react";
import { Descriptions, Button, message, Image, Popconfirm } from "antd";
import { admitUserApi, unAdmitUserApi } from "../api/apply";
import { useState, useEffect } from "react";
import { getApplierDetail } from "../api/apply";
import { useNavigate, useParams } from "react-router-dom";

export default function ApplierDetail() {
  const params = useParams();
  const initialState = {
    uid: 0,
    name: "",
    gender: "",
    nation: "",
    birthDate: "",
    nativePlace: "",
    identity: "",
    partyWill: "",
    major: "",
    phone: "",
    qq: "",
    idcard: "",
    email: "",
    identityDetail: "",
    fromPlace: "",
    highSchool: "",
    household: "",
    score: "",
    highSchoolExp: "",
    highSchoolHonour: "",
    clothesSize: "",
    hobby: "",
    introduction: "",
    createdAt: "",
    photoPath: "",
    filePath: "",
    admit: "",
  };

  const [applier, setApplier] = useState(initialState);
  const navigate = useNavigate()

  useEffect(() => {
    getApplierDetail(params.id || "")
      .then((res: any) => {
        const data = res.data;
        if (data.state === 200) {
          setApplier(data.data);
        } else {
          message.error(data.msg);
        }
      })
      .catch(() => {
        message.error("系统异常 请联系管理员");
      });
  }, [params.id]);

  const admitUser = () => {
    admitUserApi(applier.uid)
      .then((res: any) => {
        let data = res.data;
        if (data.state === 200) {
          message.success("录取成功");
          navigate(-1)
        } else {
          message.error(data.msg);
        }
      })
      .catch(() => {
        message.error("系统异常 请联系管理员");
      });
  };

  const unAdmitUser = () => {
    unAdmitUserApi(applier.uid)
      .then((res: any) => {
        let data = res.data;
        if (data.state === 200) {
          message.success("取消成功");
          navigate(-1)
        } else {
          message.error(data.msg);
        }
      })
      .catch(() => {
        message.error("系统异常 请联系管理员");
      });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Image
        width={200}
        src={
          "https://tlb.twt.edu.cn/api/download/applier/photo?filePath=" +
          applier.photoPath
        }
      />

      <Descriptions
        title="详细信息"
        bordered
        column={{ xxl: 4, xl: 4, lg: 4, md: 4, sm: 3, xs: 2 }}
      >
        <Descriptions.Item label="姓名">{applier.name}</Descriptions.Item>
        <Descriptions.Item label="性别">{applier.gender}</Descriptions.Item>
        <Descriptions.Item label="民族">{applier.nation}</Descriptions.Item>
        <Descriptions.Item label="出生日期">
          {applier.birthDate}
        </Descriptions.Item>
        <Descriptions.Item label="籍贯">
          {applier.nativePlace}
        </Descriptions.Item>
        <Descriptions.Item label="申请身份">
          {applier.identity}
        </Descriptions.Item>
        <Descriptions.Item label="备注">
          {applier.identityDetail}
        </Descriptions.Item>
        <Descriptions.Item label="是否有入党意愿">
          {applier.partyWill}
        </Descriptions.Item>
        <Descriptions.Item label="学院">{applier.major}</Descriptions.Item>
        <Descriptions.Item label="手机号码">{applier.phone}</Descriptions.Item>
        <Descriptions.Item label="QQ">{applier.qq}</Descriptions.Item>
        <Descriptions.Item label="身份证号码">
          {applier.idcard}
        </Descriptions.Item>
        <Descriptions.Item label="邮箱">{applier.email}</Descriptions.Item>

        <Descriptions.Item label="生源地">
          {applier.fromPlace}
        </Descriptions.Item>
        <Descriptions.Item label="毕业高中">
          {applier.highSchool}
        </Descriptions.Item>
        <Descriptions.Item label="户口所在地">
          {applier.household}
        </Descriptions.Item>
        <Descriptions.Item label="高考成绩">{applier.score}</Descriptions.Item>
        <Descriptions.Item label="T恤尺寸">
          {applier.clothesSize}
        </Descriptions.Item>
        <Descriptions.Item label="申请时间">
          {applier.createdAt}
        </Descriptions.Item>
        <Descriptions.Item label=""> </Descriptions.Item>

        <Descriptions.Item label="高中阶段任职/工作经历" span={2}>
          {applier.highSchoolExp}
        </Descriptions.Item>
        <Descriptions.Item label="高中阶段所获荣誉" span={2}>
          {applier.highSchoolHonour}
        </Descriptions.Item>
        <Descriptions.Item label="兴趣爱好" span={2}>
          {applier.hobby}
        </Descriptions.Item>
        <Descriptions.Item label="个人评价" span={2}>
          {applier.introduction}
        </Descriptions.Item>
      </Descriptions>

      <Button
        onClick={() =>
          window.open(
            "https://tlb.twt.edu.cn/api/download/applier/file?filePath=" +
              applier.filePath
          )
        }
        style={{ marginTop: "20px" }}
      >
        下载学生附件
      </Button>

      <br />

      {applier.admit === "已录取" && (
        <Popconfirm
          style={{ marginBottom: "20px" }}
          title="确定要取消录取吗？"
          onConfirm={unAdmitUser}
          okText="确定"
          cancelText="不确定"
        >
          <Button>{applier.admit}</Button>
        </Popconfirm>
      )}

      {applier.admit === "未录取" && (
        <Popconfirm
          style={{ marginBottom: "20px" }}
          title="确定要录取吗？"
          onConfirm={admitUser}
          okText="确定"
          cancelText="不确定"
        >
          <Button>{applier.admit}</Button>
        </Popconfirm>
      )}
      <br />
    </div>
  );
}
