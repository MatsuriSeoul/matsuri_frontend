import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const NoticeDetail = () => {
    const {noticeId} = useParams();
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await axios.get(`/api/notice/${noticeId}`);
                setNotice(response.data);
            } catch (error) {
                console.error('Error fetching notice', error);
            }
        };
        fetchNotice();
    }, [noticeId]);

    if (!notice) return <div>Loading,,, </div>;

    return (
        <div>
            <h2>{notice.title}</h2>
            <p>{notice.content}</p>
            <p>Created Time : {notice.createdTime}</p>
            <p>View Count: {notice.viewcnt}</p>
            <p>Comments: </p>
            <ul>
                {notice.comments && notice.comments.map(comment => (
                    <li key={comment.id}>{comment.content} - {comment.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default NoticeDetail;