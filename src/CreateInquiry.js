import React, { useState } from 'react';
import axios from 'axios';

const CreateInquiry = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState(true); // 공개 여부 기본값: 공개

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // JWT 토큰 사용
        try {
            const inquiry = { title, content, isPublic };  // isPublic 값 추가
            await axios.post('/api/inquiries', inquiry, {
                headers: {
                    'Authorization': `Bearer ${token}` // 인증된 사용자만 작성 가능
                }
            });

            setTitle('');
            setContent('');
            setIsPublic(true);  // 초기화
            alert('문의사항 등록 완료!');
        } catch (error) {
            console.error('문의사항 등록 오류:', error);
        }
    };

    return (
        <div>
            <h1>Create Inquiry</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div>
                    <label>공개 여부</label>
                    <select value={isPublic ? 'true' : 'false'} onChange={(e) => setIsPublic(e.target.value === 'true')}>
                        <option value="true">공개</option>
                        <option value="false">비공개</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateInquiry;
