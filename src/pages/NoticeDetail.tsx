import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {getNoticeDetail} from "../api/notice";
import {Typography, Card, Divider, Button} from "antd";
import {useState} from "react";
import styled from "styled-components";
import {useAppSelector} from "../app/hooks";
import {selectUser} from "../features/user/userSlice";
import {deleteNoticeApi} from "../api/notice";
import {message} from "antd";

const {Title, Paragraph, Text} = Typography;

const NoticeDetailBox = styled.div`
  text-align: center;
`

export default function NoticeDetail() {

    // Hook
    const initialTitle = {
        id: 1,
        title: '',
        content: '',
        filePath: '',
        updateAt: ''
    }
    const params = useParams();
    const [notice, setNotice] = useState<any>(initialTitle);
    const user = useAppSelector(selectUser)
    const navigate = useNavigate()

    // 根据路由参数 请求公告的详情
    useEffect(() => {
        async function fetchData(id: string) {
            const result = await getNoticeDetail(id)
            setNotice(result.data.data)
        }

        fetchData(params.id || '')
    }, [params.id]);

    // 删除公告按钮
    const deleteNotice = () => {
        deleteNoticeApi(notice.id).then((res: any) => {
            const data = res.data
            if (data.state === 200) {
                message.success("删除成功")
                navigate(-1)
            }
        })
    }


    return (
        <NoticeDetailBox>
            <Card>
                <Paragraph>
                    <Title level={3} style={{color:`#344B77`}}>公告</Title>
                    <Divider/>
                    <Title level={5} style={{}}>{notice.title}</Title>

                    <Text>{notice.updatedAt}</Text>
                    
                        <div style={{textAlign: `left`}}>
                            <p>&emsp;&emsp;{notice.content}</p>
                        </div>
                    <div style={{textAlign: `left`}}>
                    <Text>
                        附件 【 
                        <Button type="link"
                                onClick={() => window.open("https://tlb.twt.edu.cn/api/download/notice/attachment?filePath=" + notice.filePath)}> {notice.filePath.substring(notice.filePath.lastIndexOf("/") + 1)} 
                        </Button> 
                        】
                    </Text>
                    </div>
                    
                    <br/>
                    

                    {user.role === "admin" && (
                        <>  <br/>
                            <Button danger onClick={deleteNotice}>删除公告</Button>
                        </>
                        )}
                </Paragraph>
            </Card>
        </NoticeDetailBox>
    );
}
