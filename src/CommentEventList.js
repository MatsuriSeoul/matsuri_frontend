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
    const [newImages, setNewImages] = useState([]); // 새로운 이미지 추가
    const [imagePreviews, setImagePreviews] = useState([]); // 이미지 미리보기
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

    // 이미지 파일 선택 핸들러
        const handleImageChange = (event) => {
            const files = Array.from(event.target.files);
            setNewImages(files);
            const imagePreviewUrls = files.map((file) => URL.createObjectURL(file));
            setImagePreviews(imagePreviewUrls);
        };

        // 이미지 삭제 핸들러
        const handleRemoveImage = async (imageId) => {
            try {
                await axios.delete(`/api/comment/image/${imageId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                fetchComments(); // 이미지 삭제 후 댓글 목록 갱신
            } catch (error) {
                console.error('이미지 삭제 실패:', error);
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
            const formData = new FormData();
            formData.append('content', editedContent);

            // 새로운 이미지가 있는 경우 추가
            newImages.forEach((image) => {
                formData.append('newImages', image);
            });

            await axios.put(`/api/comment/${commentId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            fetchComments(); // 수정 후 댓글 목록 갱신
            setEditingCommentId(null);
            setEditedContent('');
            setNewImages([]);
            setImagePreviews([]);
        } catch (error) {
            console.error('댓글 수정 실패', error);
        }
    };

    useEffect(() => {
        fetchComments();
        fetchUser();
    }, [contentid, svcid, category, token, contenttypeid]);

    return (
        <div className="comment-container">
            <div className="title">
                <h1>여행톡</h1>
                <p className="comment-count">1</p>
            </div>
            <CreateComment category={category} contentid={contentid} svcid={svcid} refreshComments={fetchComments}/>
            <div className="comment-list">
                {comments.length === 0 ? (
                    <p className='comment-x'> 아직 댓글이 없어요 </p>
                ) : (
                    <>
                        {comments.map((comment) => (
                            <div className="comment-box" key={comment.id}>
                                <div className="comment">
                                    <div className="user-profile">
                                        {comment.author.profileImage && comment.author.profileImage !== 'default-profile-image.png' ? (
                                            <img
                                                src={comment.author.profileImage}
                                                alt="프로필 이미지"
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    maxWidth: '40px',
                                                    maxHeight: '40px',
                                                    borderRadius: '50%',
                                                    marginRight: '10px'
                                                }}
                                            />
                                        ) : (
                                            <img
                                                src="/img/icon/user.svg"
                                                alt="기본 프로필 이미지"
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    maxWidth: '40px',
                                                    maxHeight: '40px',
                                                    borderRadius: '50%',
                                                    marginRight: '10px'
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="comment-article">
                                        {editingCommentId === comment.id ? (
                                            <div className='input-box'>
                                                <input
                                                    className='input-txt'
                                                    type='text'
                                                    value={editedContent}
                                                    onChange={(e) => setEditedContent(e.target.value)}
                                                />
                                                <div className="input-btn">
                                                    <button className='update-btn' onClick={() => {
                                                        if (window.confirm("댓글 수정이 완료되었습니다")) {
                                                            handleUpdateComment(comment.id);
                                                        }
                                                    }}>수정
                                                    </button>
                                                    <button className='cancle-btn'
                                                            onClick={() => setEditingCommentId(null)}>취소
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="comment-txt">{comment.content}</p>

                                        )}

                                        <div className="comment-userInfo">
                                            <p className="userName">{comment.maskedAuthor}</p>
                                            <div className="wall"></div>
                                            <p className="date">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="comment-btn">
                                            <CommentLikeButton commentId={comment.id}/>
                                            {/*수정,삭제*/}
                                            {user && comment.author.id === user.id && editingCommentId !== comment.id && (
                                                <div className='update-cancle'>
                                                    <button className='btn' onClick={() => {
                                                        if (window.confirm("댓글을 수정하시겠습니까?")) {
                                                            handleEditComment(comment);
                                                        }
                                                    }}>
                                                        수정
                                                    </button>
                                                    <button className='btn' onClick={() => {
                                                        if (window.confirm("댓글을 삭제하시겠습니까?")) {
                                                            handleDeleteComment(comment.id);
                                                        }
                                                    }}>
                                                        삭제
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    /*<div>
        <h2>여행톡</h2>
        {comments.length === 0 ? (
            <p> 아직 댓글이 없어요 </p>
        ) : (
            comments.map((comment) => (
                <div key={comment.id} style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    {/* 프로필 이미지 표시
                    {comment.author.profileImage ? (
                        <img
                            src={comment.author.profileImage}
                            alt="프로필 이미지"
                            style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px'}}
                        />
                    ) : (
                        <img
                            src="/images/default-profile-image.png"
                            alt="기본 프로필 이미지"
                            style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px'}}
                        />
                    )}

                    <div>
                        <p>
                            <strong>{comment.maskedAuthor}</strong>
                            <span style={{marginLeft: '10px', color: '#888'}}>
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                        </p>
                        {editingCommentId === comment.id ? (
                            <div>
                                    <textarea
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                    />

                                {/* 기존 이미지 및 삭제 버튼
                                {comment.images && comment.images.length > 0 && (
                                    <div>
                                        {comment.images.map((image, index) => (
                                            <div key={index} style={{display: 'flex', alignItems: 'center'}}>
                                                <img src={image.imagePath} alt="Comment Image"
                                                     style={{width: '100px', height: '100px', marginRight: '10px'}}/>
                                                <button type="button" onClick={() => handleRemoveImage(image.id)}>삭제
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 새로운 이미지 업로드
                                <input type="file" multiple onChange={handleImageChange} accept="image/*"/>

                                {/* 이미지 미리보기
                                {imagePreviews.length > 0 && (
                                    <div>
                                        {imagePreviews.map((preview, index) => (
                                            <img key={index} src={preview} alt={`Preview ${index}`}
                                                 style={{width: '100px', height: '100px', marginRight: '10px'}}/>
                                        ))}
                                    </div>
                                )}

                                <button onClick={() => {
                                    if (window.confirm("댓글 수정이 완료되었습니다")) {
                                        handleUpdateComment(comment.id);
                                    }
                                }}>수정 완료
                                </button>

                                <button onClick={() => setEditingCommentId(null)}>취소</button>
                            </div>
                        ) : (
                            <div>
                                <p>{comment.content}</p>
                                <div>
                                    {comment.images && Array.isArray(comment.images) && comment.images.length > 0 && (
                                        <div>
                                            {comment.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image.imagePath}
                                                    alt={`Comment Image ${index}`}
                                                    style={{width: '100px', height: '100px', margin: '10px'}}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <CommentLikeButton commentId={comment.id}/>
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

        <CreateComment category={category} contentid={contentid} svcid={svcid} refreshComments={fetchComments}/>
    </div>*/
)
    ;
};
export default CommentEventList;
