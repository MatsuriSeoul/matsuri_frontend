import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentLikeButton = ({ commentId }) => {
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/comment-likes/${commentId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLike(response.data.isLiked);
                setLikeCount(response.data.likeCount);
            } catch (error) {
                console.error('좋아요 상태 불러오기 실패:', error);
            }
        };
        fetchLikeStatus();
    }, [commentId, token]);

    const handleLikeClick = async () => {
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            if (like) {
                await axios.delete(`http://localhost:8080/api/comment-likes/${commentId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLikeCount((prev) => prev - 1);
            } else {
                await axios.post(`http://localhost:8080/api/comment-likes/${commentId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLikeCount((prev) => prev + 1);
            }
            setLike(!like);
        } catch (error) {
            console.error('좋아요 처리 실패:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLikeClick}>
                {like ? '좋아요 취소' : '좋아요'}
            </button>
            <span>{likeCount}</span>
        </div>
    );
};

export default CommentLikeButton;