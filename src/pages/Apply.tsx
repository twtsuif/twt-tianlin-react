import React, {useEffect} from "react";
import styled from "styled-components";
import {UploadOutlined} from "@ant-design/icons";
import type {UploadProps} from "antd";
import {commitApply} from "../api/apply";
import {useState} from "react";
import locale from "antd/lib/locale/zh_CN";
import moment from "moment";
import {getStatus} from "../api/status";
import {
    Form,
    Input,
    Radio,
    Select,
    DatePicker,
    Card,
    Button,
    Upload,
    message,
    ConfigProvider,
} from "antd";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../app/hooks";
import {selectUser} from "../features/user/userSlice";

const ApplyBox = styled.div`
  margin: 20px auto;
  text-align: center;
`;

const {TextArea} = Input;

export default function Apply() {
    // Hook
    const [isShowIdentityDetail, setIsShowIdentityDetail] = useState(false);
    const [initBirthDate, setInitBirthDate] = useState<string>("2000-01-01");
    const [autoSelectPartyWill, setAutoSelectPartyWill] = useState(false);

    const navigate = useNavigate();

    // 变量
    const user = useAppSelector(selectUser);
    let photoPath = "";
    let filePath = "";

    // 首次渲染 判断申请和确认系统是否开放
    useEffect(() => {
        getStatus().then((res: any) => {
            if (!res.data.data.apply) {
                message.error("申请系统暂未开启");
                navigate(-1);
            }
        });
    }, [navigate]);

    // 控制 选择申请身份时 是否有身份备注
    const controllDetail = (value: string) => {
        if (value === "高中阶段获得省级以上荣誉" || value === "其他") {
            setIsShowIdentityDetail(true);
        } else {
            setIsShowIdentityDetail(false);
            setAutoSelectPartyWill(true);
        }
    };

    // 填写身份证号后 显示出生日期
    const changeBirthDate = (value: any) => {
        if (value.target.value.length === 18) {
            setInitBirthDate(
                "" +
                value.target.value[6] +
                value.target.value[7] +
                value.target.value[8] +
                value.target.value[9] +
                "-" +
                value.target.value[10] +
                value.target.value[11] +
                "-" +
                value.target.value[12] +
                value.target.value[13]
            );
        }
    };

    // 上传一寸照片
    const uploadPhoto: UploadProps = {
        name: "file",
        action: "https://tlb.twt.edu.cn/api/upload/photo",
        beforeUpload: (file) => {
            let fileType = file.name.split(".");
            const fileDate = fileType.slice(-1);
            if (["jpg", "jpeg", "png"].indexOf(fileDate[0]) < 0) {
                message.error("请上传jpg或png或jpeg格式");
                return Upload.LIST_IGNORE;
            }

            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
                message.error("文件必须小于10M");
            }
            return isLt10M || Upload.LIST_IGNORE;
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                photoPath = info.file.response;
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} 上传成功`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} 上传失败`);
            }
        },
    };

    // 上传档案
    const uploadFile: UploadProps = {
        name: "file",
        action: "https://tlb.twt.edu.cn/api/upload/file",
        beforeUpload: (file) => {
            let fileType = file.name.split(".");
            const fileDate = fileType.slice(-1);
            if (["zip", "rar"].indexOf(fileDate[0]) < 0) {
                message.error("请上传zip或rar文件");
                return Upload.LIST_IGNORE;
            }

            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
                message.error("文件必须小于10M");
            }
            return isLt10M || Upload.LIST_IGNORE;
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                filePath = info.file.response;
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} 上传成功`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} 上传失败`);
            }
        },
    };

    // 表单完成
    const onFinish = (data: any) => {
        console.log(data)
        let applyData: any = {...data};

        applyData.uid = user.uid;
        applyData.birthDate = initBirthDate;
        applyData.photoPath = photoPath;
        applyData.filePath = filePath;

        commitApply(applyData)
            .then((res: any) => {
                const data = res.data;
                if (data.state === 200) {
                    message.success("提交成功");
                    navigate("/");
                } else {
                    message.error(data.msg);
                }
            })
            .catch(() => {
                message.error("系统异常 请联系管理员");
            });
    };

    return (
        <ApplyBox>
            <ConfigProvider locale={locale}>
                {/*将填写框视为Card*/}
                <Card title="天麟班申请" style={{backgroundColor: "white"}}>
                    <Form
                        labelCol={{span: 5}}
                        wrapperCol={{span: 15}}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="姓名"
                            name="name"
                            rules={[{required: true, message: "请输入您的姓名"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="性别"
                            name="gender"
                            rules={[{required: true, message: "请选择您的性别"}]}
                        >
                            <Radio.Group style={{float: `left`}}>
                                <Radio value="1"> 男 </Radio>
                                <Radio value="2"> 女 </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="民族"
                            name="nation"
                            rules={[{required: true, message: "请输入您的民族"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="籍贯"
                            name="nativePlace"
                            rules={[{required: true, message: "请输入您的籍贯"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="身份证号码"
                            name="idcard"
                            rules={[{required: true, message: "请输入您的身份证号码"}]}
                        >
                            <Input onChange={changeBirthDate}/>
                        </Form.Item>

                        <Form.Item label="出生日期" name="birthDate">
                            <div style={{float: `left`}}>
                                <DatePicker
                                    defaultValue={moment(initBirthDate)}
                                    format="YYYY-MM-DD"
                                    value={moment(initBirthDate)}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="手机号码"
                            name="phone"
                            rules={[
                                {required: true, message: "请输入您的手机号"},
                                {
                                    pattern:
                                        /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/,
                                    message: "请输入正确格式的手机号码",
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="QQ号码"
                            name="qq"
                            rules={[{required: true, message: "请输入您的QQ"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="电子邮箱"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    pattern:
                                        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                                    message: "请输入正确的邮箱格式",
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="生源地"
                            name="fromPlace"
                            rules={[{required: true, message: "请输入您的生源地"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="毕业高中"
                            name="highSchool"
                            rules={[{required: true, message: "请输入您的毕业高中"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="户口所在地"
                            name="household"
                            rules={[{required: true, message: "请输入您的户口所在地"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="高考成绩"
                            name="score"
                            rules={[{required: true, message: "请输入您的高考成绩"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="申报身份"
                            name="identity"
                            rules={[{required: true, message: "请选择您的身份"}]}
                        >
                            <Select onChange={controllDetail}>
                                <Select.Option value="中共党员">中共党员</Select.Option>
                                <Select.Option value="中共预备党员">中共预备党员</Select.Option>
                                <Select.Option value="入党发展对象">入党发展对象</Select.Option>
                                <Select.Option value="入党积极分子">入党积极分子</Select.Option>
                                <Select.Option value="其他">其他</Select.Option>
                                <Select.Option value="高中阶段获得省级以上荣誉">
                                    高中阶段获得省级以上荣誉
                                </Select.Option>
                            </Select>
                        </Form.Item>

                        {isShowIdentityDetail && (
                            <Form.Item
                                label="备注"
                                name="identityDetail"
                                rules={[{required: true, message: "请选择您的身份"}]}
                            >
                                <Input/>
                            </Form.Item>
                        )}

                        <Form.Item
                            label="是否有入党意愿"
                            name="partyWill"
                            rules={[{required: true, message: "请选择是否有入党意愿"}]}
                        >
                            <Radio.Group style={{float: `left`}}>
                                <Radio value="1"> 是 </Radio>
                                <Radio value="2"> 否 </Radio>
                            </Radio.Group>
                        </Form.Item>

                        {/*/!*如果身份与党员有关*!/*/}
                        {/*{autoSelectPartyWill && (*/}
                        {/*    <Form.Item*/}
                        {/*        label="是否有入党意愿"*/}
                        {/*        name="partyWill"*/}
                        {/*        rules={[{required: true, message: "请选择是否有入党意愿"}]}*/}
                        {/*    >*/}
                        {/*        <Radio.Group style={{float: `left`}} defaultValue={"1"}>*/}
                        {/*            <Radio value="1"> 是 </Radio>*/}
                        {/*            <Radio value="2"> 否 </Radio>*/}
                        {/*        </Radio.Group>*/}
                        {/*    </Form.Item>*/}
                        {/*)}*/}

                        {/*/!*如果身份与党员无关*!/*/}
                        {/*{!autoSelectPartyWill && (*/}
                        {/*    <Form.Item*/}
                        {/*        label="是否有入党意愿"*/}
                        {/*        name="partyWill"*/}
                        {/*        rules={[{required: true, message: "请选择是否有入党意愿"}]}*/}
                        {/*    >*/}
                        {/*        <Radio.Group style={{float: `left`}}>*/}
                        {/*            <Radio value="1"> 是 </Radio>*/}
                        {/*            <Radio value="2"> 否 </Radio>*/}
                        {/*        </Radio.Group>*/}
                        {/*    </Form.Item>*/}
                        {/*)}*/}

                        <Form.Item
                            label="录取大类"
                            name="major"
                            rules={[{required: true, message: "请输入您的录取大类"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="T恤尺寸"
                            name="clothesSize"
                            rules={[{required: true, message: "请输入您的T恤尺寸"}]}
                        >
                            <Radio.Group style={{display: `flex`, flexWrap: `wrap`}}>
                                <Radio value="M(165)"> M(165) </Radio>
                                <Radio value="L(170)"> L(170) </Radio>
                                <Radio value="XL(175)"> XL(175) </Radio>
                                <Radio value="2XL(180)"> 2XL(180) </Radio>
                                <Radio value="3XL(185)"> 3XL(185) </Radio>
                                <Radio value="4XL(190)"> 4XL(190) </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            className="lab"
                            label="高中阶段任职/竞赛/活动经历&#10;(限80字)"
                            name="highSchoolExp"
                            rules={[{required: true, message: "请输入您的高中经历"},{max: 80, message: "限80字"}]}
                        >
                            <TextArea rows={4}/>
                        </Form.Item>

                        <Form.Item
                            className="lab"
                            label="高中阶段所获荣誉&#10;(限80字)"
                            name="highSchoolHonour"
                            rules={[{required: true, message: "请输入您高中所获荣誉"},{max: 80, message: "限80字"}
                                    ]}
                        >
                            <TextArea rows={4}/>
                        </Form.Item>

                        <Form.Item
                            label="兴趣爱好(限80字)"
                            name="hobby"
                            rules={[{required: true, message: "请输入您的兴趣爱好"},{max: 80, message: "限80字"}]}
                        >
                            <TextArea rows={4}/>
                        </Form.Item>

                        <Form.Item
                            label="个人评价(限80字)"
                            name="introduction"
                            rules={[{required: true, message: "请输入您的个人评价"},{max: 80, message: "限80字"}]}
                        >
                            <TextArea rows={4}/>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{offset: 0, span: 16}}
                            label="上传一寸免冠照片&#10;(大小限10M)"
                            name="photo"
                            className="lab"
                            rules={[{required: true, message: "请上传您的一寸免冠照片"}]}
                        >
                            <div style={{float: `left`}}>
                                <Upload {...uploadPhoto}>
                                    <Button icon={<UploadOutlined/>}> 上传照片 </Button>
                                </Upload>
                            </div>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{offset: 0, span: 16}}
                            className="lab"
                            label="请上传您的压缩文件&#10;(大小限10M)"
                            name="zip"
                            rules={[{required: true, message: "请上传您的压缩文件"}]}
                        >
                            <div style={{float: `left`}}>
                                <Upload {...uploadFile}>
                                    <Button icon={<UploadOutlined/>}>上传文件(rar/zip)</Button>
                                </Upload>
                            </div>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 4, span: 16}}>
                            <Button type="primary" htmlType="submit" className="tju">
                                提交申请
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </ConfigProvider>
        </ApplyBox>
    );
}
