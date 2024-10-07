import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateComment from './CreateComment';
import { useParams } from 'react-router-dom';

const CommentEventList = () => {
    const { contentid } = useParams();  // 행사 페이지에서 사용되는 contentid
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/comment/events/${contentid}`);
            setComments(response.data);
        } catch (error) {
            console.error('댓글을 불러오는 데 실패했습니다.', error);
        }
    };

    const fetchUser = async () => {
        if (!token) return;
        try {
            const response = await axios.get('/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('사용자 정보를 가져오는 데 실패했습니다.', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`/api/comment/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('댓글 삭제 실패', error);
        }
    };

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id);
        setEditedContent(comment.content);
    };

    const handleUpdateComment = async (commentId) => {
        try {
            await axios.put(`/api/comment/${commentId}`, { content: editedContent }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setComments(comments.map(comment =>
                comment.id === commentId ? { ...comment, content: editedContent } : comment
            ));
            setEditingCommentId(null);
            setEditedContent("");
        } catch (error) {
            console.error('댓글 수정 실패', error);
        }
    };

    useEffect(() => {
        fetchComments();
        fetchUser();
    }, [contentid, token]);

    return (
        <div>
            <h2>댓글</h2>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <p>작성자: {comment.maskedAuthor}</p>
                    {editingCommentId === comment.id ? (
                        <div>
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                            <button onClick={() => handleUpdateComment(comment.id)}>수정 완료</button>
                            <button onClick={() => setEditingCommentId(null)}>취소</button>
                        </div>
                    ) : (
                        <p>{comment.content}</p>
                    )}
                    {user && comment.author.id === user.id && editingCommentId !== comment.id && (
                        <div>
                            <button onClick={() => handleEditComment(comment)}>수정</button>
                            <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                        </div>
                    )}
                </div>
            ))}
            <CreateComment contentid={contentid} refreshComments={fetchComments} />
        </div>
    );
};

export default CommentEventList;
