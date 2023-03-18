import React, {useState, useEffect} from "react";
import {Button, Form, Input, Card, message, Radio, ConfigProvider, DatePicker} from "antd";
import styled from "styled-components";
import {confirmInfo} from "../api/confirm";
import {RadioChangeEvent, Col, Checkbox, Row, InputNumber} from "antd";
import {useNavigate} from "react-router-dom";
import {getStatus} from "../api/status";
import {useSelector} from "react-redux";
import {selectUser} from "../features/user/userSlice";
import {getUserAdmit} from "../api/apply";
import locale from "antd/lib/locale/zh_CN";
import moment from "moment";

const ConfirmInfoBox = styled.div`
  width: 70%;
  margin: 20px auto;
  text-align: center;
`;

export default function Confirm() {
    // Hook
    const [confirmTrain, setConfirmTrain] = useState<boolean>(false);
    const [needBed, setNeedBed] = useState<boolean>(false);
    const navigate = useNavigate()

    const user = useSelector(selectUser)

    // 首次渲染 判断用户是否被录取
    useEffect(() => {
        getStatus().then((res: any) => {
            if (!res.data.data.confirm) {
                message.error("录取报道系统暂未开启")
                navigate(-1)
            } else {
                getUserAdmit(user.uid).then((res: any) => {
                    if (res.data.data === "未录取") {
                        message.error("您还未被录取 请等待通知")
                        navigate(-1)
                    }
                })
            }
        })
    }, [navigate, user.uid])

    // 是否确认能参加培训
    const changeConfirm = (e: RadioChangeEvent) => {
        if (e.target.value === "1") {
            setConfirmTrain(true);
        } else {
            setConfirmTrain(false);
        }
    };

    // 是否需要卧具
    const changeNeedBed = (e: RadioChangeEvent) => {
        if (e.target.value === "1") {
            setNeedBed(true);
        } else {
            setNeedBed(false);
        }
    };

    // 提交确认信息按钮
    const onFinish = (data: any) => {
        data.uid = user.uid

        data.timeToJin=moment(data.timeToJin).format('YYYY-MM-DD HH:mm')
        confirmInfo(data)
            .then((res) => {
                let data = res.data;
                if (data.state === 200) {
                    message.success("提交成功");
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
        <ConfirmInfoBox style={{width: `90%`}}>
            <ConfigProvider locale={locale}>

            <Card
                title="确认信息"
                style={{backgroundColor: "#fcfcfc"}}
            >
                <br/>
                <Form
                    id="suda"
                    name="basic"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 15}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[{required: true, message: "请输入标题"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="身份证号码"
                        name="idcard"
                        rules={[{required: true, message: "请输入身份证号码"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item label="是否能够参加此次培训" name="isJoin" rules={[{required: true, message: "请确认是否能参加"}]}
                               style={{width: `100%`}}>
                        <Radio.Group onChange={changeConfirm} style={{float: `left`}}>
                            <Radio value="1"> 是 </Radio>
                            <Radio value="2"> 否 </Radio>
                        </Radio.Group>
                    </Form.Item>

                    {/*{confirmTrain && (*/}
                    {/*    <Form.Item label="是否需要购买卧具" name="buy" rules={[{required: true, message: "请确认是否需要购买卧具"}]}>*/}
                    {/*        <Radio.Group onChange={changeNeedBed} style={{float: `left`}}>*/}
                    {/*            <Radio value="1"> 是 </Radio>*/}
                    {/*            <Radio value="2"> 否 </Radio>*/}
                    {/*        </Radio.Group>*/}
                    {/*    </Form.Item>*/}
                    {/*)}*/}

                    {/*{needBed && confirmTrain && (*/}
                    {/*    <Form.Item name="bedNeed" label="卧具" rules={[{required: true, message: "请选择卧具"}]}>*/}

                    {/*            <Checkbox.Group style={{float:"left"}}>*/}
                    {/*                <Row>*/}
                    {/*                    <Col span={4}>*/}
                    {/*                        <Checkbox value="棕垫" style={{lineHeight: "32px"}}>*/}
                    {/*                            棕垫*/}
                    {/*                        </Checkbox>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col span={4}>*/}
                    {/*                        <Checkbox value="棉被" style={{lineHeight: "32px"}}>*/}
                    {/*                            棉被*/}
                    {/*                        </Checkbox>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col span={4}>*/}
                    {/*                        <Checkbox value="棉褥" style={{lineHeight: "32px"}}>*/}
                    {/*                            棉褥*/}
                    {/*                        </Checkbox>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col span={4}>*/}
                    {/*                        <Checkbox value="被罩" style={{lineHeight: "32px"}}>*/}
                    {/*                            被罩*/}
                    {/*                        </Checkbox>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col span={4}>*/}
                    {/*                        <Checkbox value="床单" style={{lineHeight: "32px"}}>*/}
                    {/*                            床单*/}
                    {/*                        </Checkbox>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col span={4}>*/}
                    {/*                        <Checkbox value="枕头" style={{lineHeight: "32px"}}>*/}
                    {/*                            枕头*/}
                    {/*                        </Checkbox>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col span={4}>*/}
                    {/*                        <Checkbox value="枕巾" style={{lineHeight: "32px"}}>*/}
                    {/*                            枕巾*/}
                    {/*                        </Checkbox>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col span={4}>*/}
                    {/*                        <Checkbox value="枕套" style={{lineHeight: "32px"}}>*/}
                    {/*                            枕套*/}
                    {/*                        </Checkbox>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col span={4}>*/}
                    {/*                        <Checkbox value="蚊帐" style={{lineHeight: "32px"}}>*/}
                    {/*                            蚊帐*/}
                    {/*                        </Checkbox>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col span={4}>*/}
                    {/*                        <Checkbox value="凉被" style={{lineHeight: "32px"}}>*/}
                    {/*                            凉被*/}
                    {/*                        </Checkbox>*/}
                    {/*                    </Col>*/}
                    {/*                </Row>*/}
                    {/*            </Checkbox.Group>*/}

                    {/*    </Form.Item>*/}
                    {/*)}*/}

                    {/*{confirmTrain && (*/}
                    {/*    <>*/}
                    {/*        <Form.Item*/}
                    {/*            label="到津方式"*/}
                    {/*            name="wayToJin"*/}
                    {/*            rules={[{required: true, message: "请输入到津方式"}]}*/}
                    {/*        >*/}
                    {/*            <Input/>*/}
                    {/*        </Form.Item>*/}
                    {/*        <Form.Item*/}
                    {/*            label="到津站点"*/}
                    {/*            name="station"*/}
                    {/*            rules={[{required: true, message: "请输入到津站点"}]}*/}
                    {/*        >*/}
                    {/*            <Input/>*/}
                    {/*        </Form.Item>*/}


                    {/*        <Form.Item*/}
                    {/*            label="到津时间"*/}
                    {/*            name="timeToJin"*/}
                    {/*            rules={[{required: true, message: "请选择到津时间"}]}*/}
                    {/*        >*/}

                    {/*                    <DatePicker*/}
                    {/*                        format="YYYY-MM-DD HH:mm"*/}
                    {/*                        style={{float:"left"}}*/}
                    {/*                        showTime*/}
                    {/*                    />*/}

                    {/*        </Form.Item>*/}


                    {/*        <Form.Item*/}
                    {/*            label="航班/车次"*/}
                    {/*            name="trainNumber"*/}
                    {/*            rules={[{required: true, message: "请输入航班或车次"}]}*/}
                    {/*        >*/}
                    {/*            <Input/>*/}
                    {/*        </Form.Item>*/}
                    {/*        <Form.Item label="是否需要接站" name="isNeedPickUp"*/}
                    {/*                   rules={[{required: true, message: "请选择是否需要接站"}]}>*/}
                    {/*            <Radio.Group style={{float: `left`}}>*/}
                    {/*                <Radio value="1"> 是 </Radio>*/}
                    {/*                <Radio value="2"> 否 </Radio>*/}
                    {/*            </Radio.Group>*/}
                    {/*        </Form.Item>*/}

                    {/*        <Form.Item label="陪同人数" name="accompanyNumber"*/}
                    {/*                   rules={[{required: true, message: "请输入陪同人数"}]}>*/}
                    {/*            <InputNumber style={{float: `left`}}/>*/}
                    {/*        </Form.Item>*/}
                    {/*    </>*/}
                    {/*)}*/}

                    <Form.Item wrapperCol={{offset: 4, span: 16}}>
                        <Button type="primary" htmlType="submit" className="tju">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            </ConfigProvider>
        </ConfirmInfoBox>
    );
}
