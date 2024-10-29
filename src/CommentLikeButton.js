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
        <div className="like-btn btn">
            <div className="icon" onClick={handleLikeClick}>
                {like ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="#ff5353">
                        <path
                            d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#5f6368"
                    >
                        <path
                            d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
                    </svg>
                )}

            </div>
            <p>{likeCount}</p>
        </div>
    );
};

export default CommentLikeButton;