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
                    <th>Title</th>
                    <th>Content</th>
                    <th>Created Time</th>
                    <th>View Count</th>
                    <th>Comment</th>
                </tr>
                </thead>
                <tbody>
                {notices.map((notice) => (
                    <tr key={notice.id}>
                        <td>{notice.id}</td>
                        <td>
                            <Link to={`/notice/${notice.id}`}>{notice.title}</Link>
                        </td>
                        <td>{notice.content}</td>
                        <td>{notice.createdTime}</td>
                        <td>{notice.viewcnt}</td>
                        <td><Link to={`/notice/${notice.id}/comment`}>View Comment</Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default NoticeTable;

