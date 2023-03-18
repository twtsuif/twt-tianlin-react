import React from 'react'
import {Button, Form, Input, Card, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import type {UploadProps} from "antd";
import styled from "styled-components";
import {publishNotice} from '../api/notice';
import {useNavigate} from 'react-router-dom';


const {TextArea} = Input;

const PublishNoticeBox = styled.div`
  width: 55%;
  margin: 20px auto;
  text-align: center;
`;

export default function PublishNotice() {
    let filePath = "";

    // Hook
    const navigate = useNavigate()

    // 上传附件前校验格式
    function beforeUploadAttachment(file:any) {
        // let fileType = file.name.split('.');
        // const fileDate = fileType.slice(-1);
        // if (['zip', 'rar'].indexOf(fileDate[0]) < 0) {
        //     message.error('请上传zip或rar文件');
        //     return false
        // }

        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('文件必须小于10M');
        }
        return  isLt10M;
    }
    // 上传附件
    const uploadFile: UploadProps = {
        name: "file",
        action: "https://tlb.twt.edu.cn/api/upload/notice",
        onChange(info) {
            if (info.file.status !== "uploading") {
                filePath = info.file.response;
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} 文件上传成功`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} 文件上传失败.`);
            }
        },
    };

    // 完成时
    const onFinish = (data: any) => {
        let noticeData: any = {...data}
        noticeData.filePath = filePath;

        publishNotice(noticeData)
            .then((res) => {
                let data = res.data;
                if (data.state === 200) {
                    message.success("发布成功");
                    navigate('/')
                } else {
                    message.error(data.msg);
                }
            })
            .catch(() => {
                message.error("系统异常 请联系管理员");
            });
    };


    return (
        <PublishNoticeBox>
            {/*将这个发布框视为Card*/}
            <Card
                title="发布公告"
                style={{backgroundColor: "#fcfcfc"}}
            >
                <br/>
                {/*表单*/}
                <Form
                    name="basic"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 15}}
                    onFinish={onFinish}
                >
                    {/*输入标题和内容*/}
                    <div>
                        <Form.Item
                            label="标题"
                            name="title"
                            rules={[{required: true, message: "请输入标题"}]}
                        >
                            <Input size={"middle"}/>
                        </Form.Item>

                        <Form.Item
                            label="内容"
                            name="content"
                            rules={[{required: true, message: "请输入内容"},{max: 80, message: "限80字"}]}
                        >
                            <TextArea rows={5}/>
                        </Form.Item>
                    </div>

                    {/*上传附件*/}
                    <Form.Item wrapperCol={{offset: 4, span: 16}}>
                        <Upload {...uploadFile} beforeUpload={beforeUploadAttachment}>
                            <Button icon={<UploadOutlined/>}>
                                上传附件
                            </Button>
                        </Upload>
                    </Form.Item>

                    {/*发布按钮*/}
                    <Form.Item wrapperCol={{offset: 4, span: 16}}>
                        <Button type="primary" htmlType="submit" className="tju">
                            发布公告
                        </Button>
                    </Form.Item>

                </Form>

            </Card>
        </PublishNoticeBox>
    )
}
