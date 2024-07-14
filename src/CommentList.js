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
                console.log('Error fetching comment', error);
            }
        };
        fetchComments();
    }, [noticeId]);

    return (
        <div>
            <h2>Comments</h2>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.content}</p>
                    <p>작성자: {comment.author}</p>
                </div>
            ))}
            <CreateComment noticeId={noticeId} />
        </div>
    )
};

export default CommentList;