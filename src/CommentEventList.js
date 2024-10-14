import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateComment from './CreateComment';
import CommentLikeButton from './CommentLikeButton';
import { useParams } from 'react-router-dom';

const CommentEventList = ({ category, contentid, contenttypeid, svcid }) => {
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');

    const fetchComments = async () => {
            try {
                let response;
                if (category === 'seoul-events') {
                    response = await axios.get(`/api/comment/seoul-events/${svcid}/detail`);

                } else if (category === 'gyeonggi-events') {
                      response = await axios.get(`/api/comment/gyeonggi-events/${contentid}/detail`);

                } else {
                    response = await axios.get(`/api/comment/${category}/${contentid}/${contenttypeid}/detail`);
                }
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
    }, [contentid, svcid, category, token, contenttypeid]);

    return (
        <div>
            <h2>여행톡</h2>
            {comments.length === 0 ? (
                <p> 아직 댓글이 없어요 </p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        {/* 프로필 이미지 표시 */}
                        {comment.author.profileImage ? (
                            <img
                                src={comment.author.profileImage}
                                alt="프로필 이미지"
                                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                            />
                        ) : (
                            <img
                                src="/images/default-profile-image.png"
                                alt="기본 프로필 이미지"
                                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                            />
                        )}

                        <div>
                            <p>
                                <strong>{comment.maskedAuthor}</strong>
                                <span style={{ marginLeft: '10px', color: '#888' }}>
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                            </p>
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
                                <div>
                                    <p>{comment.content}</p>
                                    <CommentLikeButton commentId={comment.id} />
                                </div>
                            )}

                            {/* 댓글에 이미지가 있을 경우 표시 */}
                            {comment.images && Array.isArray(comment.images) && comment.images.length > 0 && (
                                <div>
                                    {comment.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image.imagePath}
                                            alt={`Comment Image ${index}`}
                                            style={{ width: '100px', height: '100px', margin: '10px' }}
                                        />
                                    ))}
                                </div>
                            )}

                            {user && comment.author.id === user.id && editingCommentId !== comment.id && (
                                <div>
                                    <button
                                        onClick={() => {
                                            if (window.confirm("댓글을 수정하시겠습니까?")) {
                                                handleEditComment(comment);
                                            }
                                        }}
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm("댓글을 삭제하시겠습니까?")) {
                                                handleDeleteComment(comment.id);
                                            }
                                        }}
                                    >
                                        삭제
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}

            <CreateComment category={category} contentid={contentid} svcid={svcid} refreshComments={fetchComments} />
        </div>
    );

};

export default CommentEventList;
