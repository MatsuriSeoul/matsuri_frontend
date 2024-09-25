import React, { useState } from 'react';
import axios from 'axios';
import CreateResponse from './CreateResponse';

const InquiryDetail = ({ inquiry, onBack }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(inquiry.title);
    const [content, setContent] = useState(inquiry.content);

    const token = localStorage.getItem('token');
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
            onBack();
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
        <div>
            <button onClick={onBack}>Back</button>
            {isEditing ? (
                <div>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h2>{inquiry.title}</h2>
                    <p>{inquiry.content}</p>
                    <p>{<inquiry className="userId"></inquiry>}</p>
                    <p>작성 시간: {new Date(inquiry.createdTime).toLocaleString()}</p>
                    <p>답변 상태: {inquiry.status}</p>
                </div>
            )}

            {inquiry.response ? (
                <div>
                    <h3>Response</h3>
                    <p>{inquiry.response.content}</p> {/* 답변 내용 표시 */}
                </div>
            ) : (
                userRole === 'ADMIN' && <CreateResponse inquiryId={inquiry.id} />
            )}

            {userId == inquiry.userId && !inquiry.response && (
                <div>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default InquiryDetail;
