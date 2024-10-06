import React, { useEffect, useState } from 'react';
import { useHistory  } from 'react-router-dom';
import axios from 'axios';
import InquiryDetail from './InquiryDetail';

const InquiryList = () => {
    const [inquiries, setInquiries] = useState([]);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [userRole, setUserRole] = useState('');  // 유저 역할 저장
    const history = useHistory();

    useEffect(() => {
        // 문의사항 불러오기
        const fetchInquiries = async () => {
            try {
                const response = await axios.get('/api/inquiries');
                setInquiries(response.data);
            } catch (error) {
                console.error('Error fetching inquiries:', error);
                setInquiries([]);
            }
        };

        fetchInquiries();

        // 로컬 스토리지에서 userRole 가져오기
        const role = localStorage.getItem('userRole');
        if (role) {
            setUserRole(role);
        }
    }, []);

    const handleInquiryClick = (inquiry) => {
        // 비공개 문의는 작성자나 관리자만 볼 수 있도록 제한
        const userId = localStorage.getItem('userId');
        if (!inquiry.isPublic && userRole !== 'ADMIN' && userId != inquiry.userId) {
            alert('비공개 문의입니다. 관리자 또는 작성자만 볼 수 있습니다.');
            return;
        }
        setSelectedInquiry(inquiry);
    };

    const handleBack = () => {
        setSelectedInquiry(null);
    };

    // 문의사항 작성 폼으로 이동하는 함수
    const handleCreateInquiry = () => {
        history.push('/create-inquiry');  // 문의사항 작성 페이지로 이동
    };

    return (
        <div>
            <h1>Inquiries</h1>

            {/* 사용자 역할이 'USER'일 때 문의사항 작성 버튼 표시 */}
            {userRole === 'USER' && (
                <button onClick={handleCreateInquiry}>문의사항 작성</button>
            )}

            {selectedInquiry ? (
                <InquiryDetail inquiry={selectedInquiry} onBack={handleBack} />
            ) : (
                <ul>
                    {Array.isArray(inquiries) && inquiries.length > 0 ? (
                        inquiries.map(inquiry => (
                            <li key={inquiry.id} onClick={() => handleInquiryClick(inquiry)}>
                                <h2>#{inquiry.id} - {inquiry.title}</h2>
                                <p>작성 시간: {new Date(inquiry.createdTime).toLocaleString()}</p>
                                <p>답변 상태: {inquiry.status}</p>
                                <p>공개 여부: {inquiry.isPublic ? '공개' : '비공개'}</p>
                            </li>
                        ))
                    ) : (
                        <p>문의 내역 없음.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default InquiryList;
