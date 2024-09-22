import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './NoticePage.css';

const NoticePage = ({ token }) => {
    const [notices, setNotices] = useState([]);
    const history = useHistory();
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get('/api/notice');
                setNotices(response.data);
            } catch (error) {
                console.error('Error fetching notices', error);
            }
        };


        fetchNotices();
    }, [token]);

    const handleCreateNotice = () => {
        if (userRole === 'ADMIN') {
        history.push('/create-notice');
        }
        else {
            alert('글쓰기 권한이 없습니다. 관리자에게 문의하세요.');
        }
    };

    return (
        <div className="notice-page">
            <div className="notice-header">
                <h2>공지사항</h2>
                {/* userRole이 'ADMIN'일 때만 글쓰기 버튼을 렌더링 */}
                {userRole === 'ADMIN' && (
                    <button className="write-button" onClick={handleCreateNotice}>
                        글쓰기
                    </button>
                )}
            </div>
            <table className="notice-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>제목</th>
                    <th>작성일</th>
                    <th>작성자</th>
                    <th>조회수</th>
                </tr>
                </thead>
                <tbody>
                {notices.map(notice => (
                    <tr key={notice.id}>
                        <td>{notice.id}</td>
                        <td><Link to={`/notice/${notice.id}`}>{notice.title}</Link></td>
                        <td>{notice.createdTime}</td>
                        <td>{notice.author}</td>
                        <td>{notice.viewcnt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                {/* 페이지네이션 컴포넌트나 페이지네이션 버튼들 */}
            </div>
        </div>
    );
};

export default NoticePage;
