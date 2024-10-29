import React, {useEffect, useState} from 'react';
import '../../css/noticePage/noticeView.css';
import {useHistory, useLocation, useParams} from "react-router-dom";
import axios from "axios";
import CommentWrite from "./commentWrite";

const InQuiryView = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const inquiryData = query.get('data');

    let inquiry = null;
    if (inquiryData) {
        // JSON 문자열을 다시 객체로 변환
        inquiry = JSON.parse(decodeURIComponent(inquiryData));
    }

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
            alert('문의가 수정되었습니다.');
        } catch (error) {
            console.error('문의 수정 오류:', error);
        }
    };

    return (
        <div className="noticeView-container">
            <div className='headText'>문의사항</div>
            <div className="titleText">{inquiry.title}</div>
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
            <div className="content">
                {inquiry.content}
            </div>
            <div className='comment-container'>
                <h2 className='title'>답글</h2>
                <div className='comment-list'>
                    <div className='comment'>
                        {inquiry.response ? (
                            <div className='comment-box'>
                                <p className='user-name'>관리자</p>
                                <div className='wall'></div>
                                <p className='content'>{inquiry.response.content}</p>
                            </div>
                        ) : (
                            <div className='comment-x'>답글이 없습니다.</div>
                        )}
                    </div>
                </div>
                {inquiry.response && (
                    userRole === 'ADMIN' && <CommentWrite inquiryId={inquiry.id} />
                )}

            </div>
        </div>
    );
}

export default InQuiryView;