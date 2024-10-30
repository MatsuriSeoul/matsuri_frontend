import React, { useState } from 'react';
import axios from 'axios';

const CommentWrite = ({ inquiryId, onCommentSubmit }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // JWT 토큰 사용
        try {
            const response = { content };
            await axios.post(`/api/inquiries/${inquiryId}/response`, response, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setContent('');
            alert('답변 게시 완료!');
            onCommentSubmit();
        } catch (error) {
            console.error('답변 게시 오류:', error);
        }
    };

    return (
        <form className='comment-write' onSubmit={handleSubmit}>
            <input className='write' type='text' placeholder='답글을 입력해주세요'
                   value={content} onChange={(e) => setContent(e.target.value)}/>
            <button type='submit' className='enter-btn'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                     fill="#111111">
                    <path
                        d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z"/>
                </svg>
            </button>
        </form>
    )
}
export default CommentWrite;