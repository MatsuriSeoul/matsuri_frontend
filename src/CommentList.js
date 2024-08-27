import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import CreateComment from "./CreateComment";

const CommentList = () => {
    const { noticeId } = useParams();
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글의 ID 저장
    const [editedContent, setEditedContent] = useState(""); // 수정할 댓글 내용
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');  // 로그인한 사용자의 토큰

    // fetchComments 함수는 useEffect 외부에 정의
    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/comment/notice/${noticeId}`);
            setComments(response.data);
        } catch (error) {
            console.log('댓글을 불러오는 데 실패했습니다.', error);
        }
    };

    useEffect(() => {
        fetchComments();  // 컴포넌트가 처음 렌더링될 때 fetchComments 호출

        const fetchUser = async () => {
            if (!token) return;
            try {
                const response = await axios.get('/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);  // 사용자 정보 저장
            } catch (error) {
                console.log('사용자 정보를 가져오는 데 실패했습니다.', error);
            }
        };

        fetchUser();
    }, [noticeId, token]);

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`/api/comment/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.log('댓글 삭제 실패', error);
        }
    };

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id);  // 수정 모드 활성화
        setEditedContent(comment.content);  // 기존 댓글 내용 로드
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
            setEditingCommentId(null);  // 수정 모드 해제
            setEditedContent("");
        } catch (error) {
            console.log('댓글 수정 실패', error);
        }
    };

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
            <CreateComment noticeId={noticeId} refreshComments={fetchComments} />
        </div>
    );
};

export default CommentList;
