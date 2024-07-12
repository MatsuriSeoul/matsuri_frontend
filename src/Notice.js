import React from "react";
import {Link} from "react-router-dom";

const Notice = ({notice}) => {
    return (
        <tr>
            <td>{notice.id}</td>
            <td>
                <Link to={`/notice/${notice.id}`}>{notice.title}</Link>
            </td>
            <td>내용 : {notice.content}</td>
            <td>조회수 : {notice.viewcnt}</td>
            <td>게시일자 : {notice.createdTime}</td>
            <td>
                <Link to={`/notice/${notice.id}/comment`}>View Comments</Link>
            </td>
        </tr>
    );
};

export default Notice;