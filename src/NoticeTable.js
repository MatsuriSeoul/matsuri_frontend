import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const NoticeTable = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get("/api/notice");
                setNotices(response.data);
            } catch (error) {
                console.error('Error fetching notice', error);
            }
        };
        fetchNotices();
    }, []);

    return (
        <div>
            <h2>Notice</h2>
            <table>
                <thead>
                <tr>
                    <th>공지 번호</th>
                    <th>제목</th>
                    <th>게시일자</th>
                    <th>작성자</th>
                    <th>조회수</th>
                </tr>
                </thead>
                <tbody>
                {notices.map((notice) => (
                    <tr key={notice.id}>
                        <td>{notice.id}</td>
                        <td>
                            <Link to={`/notice/${notice.id}`}>{notice.title}</Link>
                        </td>
                        <td>{notice.createdTime}</td>
                        <td>{notice.author}</td>
                        <td>{notice.viewcnt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default NoticeTable;

