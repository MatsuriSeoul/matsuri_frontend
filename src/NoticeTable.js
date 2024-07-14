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
                    <th>ID</th>
                    <th>제목</th>
                    <th>내용</th>  {/* 이거 지워야함 */}
                    <th>작성날짜</th>
                    <th>조회수</th>
                    <th>댓글</th>     {/* 이거 지워야함 */}
                </tr>
                </thead>
                <tbody>
                {notices.map((notice) => (
                    <tr key={notice.id}>
                        <td>{notice.id}</td>
                        <td>
                            <Link to={`/notice/${notice.id}`}>{notice.title}</Link>
                        </td>
                        <td>{notice.content}</td>  {/* 이거 지워야함 */}
                        <td>{notice.createdTime}</td>   {/* 년도, 월, 일만 나오게 수정 */}
                        <td>{notice.viewcnt}</td>
                        <td><Link to={`/notice/${notice.id}/comment`}>View Comment</Link></td> {/* 이거 지워야함 */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default NoticeTable;

