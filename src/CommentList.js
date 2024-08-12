import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import CreateComment from "./CreateComment";

const CommentList = () => {
    const {noticeId} = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/comment/notice/${noticeId}`);
                setComments(response.data);
            } catch (error) {
                console.log('댓글을 불러오는 데 실패했습니다.', error);
            }
        };
        fetchComments();
    }, [noticeId]);

    return (
        <div>
            <h2>댓글</h2>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <p>작성자: {comment.author}</p>
                    <p>{comment.content}</p>
                </div>
            ))}
            <CreateComment noticeId={noticeId} />
        </div>
    )
};

export default CommentList;