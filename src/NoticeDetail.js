import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateComment from "./CreateComment";

const NoticeDetail = () => {
    const { noticeId } = useParams();
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await axios.get(`/api/notice/${noticeId}`);
                setNotice(response.data);
            } catch (error) {
                console.error('Error fetching notice', error);
            }
        };
        fetchNotice();
    }, [noticeId]);

    if (!notice) return <div>Loading...</div>;

    return (
        <div>
            <h2>제목: {notice.title}</h2>
            <p>본문 : {notice.content}</p>
            <p>작성날짜: {notice.createdTime}</p>
            <p>조회수: {notice.viewcnt}</p>
            <p>댓글:</p>
            <ul><CreateComment>
                {notice.comments && notice.comments.map(comment => (
                    <li key={comment.id}>{comment.content} - {comment.author}</li>
                ))}</CreateComment>
            </ul>
        </div>
    );
};

export default NoticeDetail;
