import React, {useEffect, useState} from 'react';
import '../../css/noticePage/noticeView.css';
import {useHistory, useLocation, useParams} from "react-router-dom";
import axios from "axios";
import CommentWrite from "./commentWrite";

const InQuiryView = () => {
    const [inquiry,setInquiry] = useState({});
    const token = localStorage.getItem('token');
    const { id } = useParams();

    const fetchInquiry = async () => {
        try {
            const response = await axios.get(`/api/inquiries/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setInquiry(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
            console.log('response.data: ' + response.data);
        } catch (error) {
            console.error('문의 조회 오류:', error);
        }
    };
    const handleCommentSubmit = () => {
        // 댓글 제출 후 다시 문의 정보를 가져옴
        fetchInquiry();
    };

    useEffect(() => {
        fetchInquiry();
    }, []);

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(inquiry.title);
    const [content, setContent] = useState(inquiry.content);

    const userRole = localStorage.getItem('userRole'); // 'ADMIN' 또는 'USER'
    const userId = localStorage.getItem('userId'); // 현재 사용자 ID

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/inquiries/${inquiry.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('문의가 삭제되었습니다.');
        } catch (error) {
            console.error('문의 삭제 오류:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/inquiries/${inquiry.id}`, { title, content }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setIsEditing(false);
            fetchInquiry();
            alert('문의가 수정되었습니다.');

        } catch (error) {
            console.error('문의 수정 오류:', error);
        }
    };
    if (!inquiry) {
        return <div>로딩 중...</div>; // inquiry가 아직 로드되지 않았을 때의 대체 UI
    }

    return (
        <div className="noticeView-container">
            <div className='headText'>문의사항</div>
            {isEditing ? (
                <div className="titleText">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
            ) : (
                <div className="titleText">
                <p>{inquiry.title}</p>
                    {userId == inquiry.userId && !inquiry.response && (
                        <div className='edit-btn'>
                            <button className='titleText-btn' onClick={() => setIsEditing(true)}>수정</button>
                            <button className='titleText-btn' onClick={handleDelete}>삭제</button>
                        </div>
                    )}
                </div>
            )}

            <div className="post-info">
                <div className='profile-picture'></div>
                <div className='detail-wrap'>
                    <p className='author-info'><b>작성자</b></p>
                    <p className='datetext'><b>작성일자</b></p>
                </div>
                <div className='detail-info'>
                    <p className='author-name'>{<inquiry className="userId"></inquiry>}</p>
                    <div className='dateView'>
                        <p className='date'>{new Date(inquiry.createdTime).toLocaleString()}</p>
                        <p className='views'>답변상태 : {inquiry.status}</p>
                    </div>
                </div>
            </div>
            {isEditing ? (
                <textarea className='edit-textarea' value={content} onChange={(e) => setContent(e.target.value)} />
            ) : (
                <div className="content">
                    {inquiry.content}
                </div>
            )}
            <div className="file-wrap">
                {isEditing && (
                    <div className='isEditing-btn'>
                        <button onClick={handleUpdate}>완료</button>
                        <button onClick={() => setIsEditing(false)}>취소</button>
                    </div>
                )}
            </div>
            <div className='comment-container'>
                <h2 className='title'>답글</h2>
                <div className='comment-list'>
                    <div className='comment'>
                        {inquiry.response  ? (
                            <div className='comment-box'>
                                <p className='user-name'>관리자</p>
                                <div className='wall'></div>
                                <p className='content'>{inquiry.response.content}</p>

                            </div>
                        ) : (
                            <>
                                <div className='comment-x'>답글이 없습니다.</div>
                                {userRole === 'ADMIN' && <CommentWrite inquiryId={inquiry.id} onCommentSubmit={handleCommentSubmit}/>}
                            </>
                        )}
                    </div>
                </div>
                {/*{inquiry.response || (*/}
                {/*    userRole === 'ADMIN' && <CommentWrite inquiryId={inquiry.id} onCommentSubmit={handleCommentSubmit}/>*/}
                {/*)}*/}

            </div>
        </div>
    );
}

export default InQuiryView;