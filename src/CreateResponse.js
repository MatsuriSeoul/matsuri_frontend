import React, { useState } from 'react';
import axios from 'axios';

const CreateResponse = ({ inquiryId }) => {
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
        } catch (error) {
            console.error('답변 게시 오류:', error);
        }
    };

    return (
        <div>
            <h3>Create Response</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateResponse;
