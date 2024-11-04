import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AIPlanerCommentList = ({ category, contentid, contenttypeid }) => {
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem('token');

    const fetchComments = async () => {
        try {
            if (category && contentid && contenttypeid) {
                const encodedCategory = encodeURIComponent(category);
                const response = await axios.get(`/api/comment/aiplaner/${encodedCategory}/${contentid}/${contenttypeid}/detail`);
                if (response.data && Array.isArray(response.data)) {
                    setComments(response.data);
                } else {
                    console.warn("Unexpected response format or empty data:", response.data);
                }
            }
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    };

// 상태가 업데이트된 후 실제 데이터가 들어갔는지 확인합니다.
    useEffect(() => {
        fetchComments();
    }, [category, contentid, contenttypeid]);
    return (
        <div className="comment-list-container">
            <h2>댓글 목록</h2>
            {comments.length === 0 ? (
                <p>아직 댓글이 없어요</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className="comment-box">
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                        <div className="comment-info">
                            <span>{comment.maskedAuthor}</span> |
                            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );

};

export default AIPlanerCommentList;
