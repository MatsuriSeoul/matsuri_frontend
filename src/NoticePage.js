import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './NoticePage.css';

const NoticePage = ({ token }) => {
    const [notices, setNotices] = useState([]);
    const [userRole, setUserRole] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get('/api/notice');
                setNotices(response.data);
            } catch (error) {
                console.error('Error fetching notices', error);
            }
        };

        const fetchUserRole = () => {
            if (token) {
                const parsedToken = JSON.parse(atob(token.split('.')[1]));
                setUserRole(parsedToken.userRole);
            }
        };

        fetchNotices();
        fetchUserRole();
    }, [token]);

    const handleCreateNotice = () => {
        // CreateNotice 페이지로 이동
        history.push('/create-notice');
    };

    return (
        <div className="notice-page">
            <div className="notice-header">
                <h2>공지사항</h2>
                    <button className="write-button" onClick={handleCreateNotice}>글쓰기</button>
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
