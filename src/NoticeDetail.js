import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import CreateComment from "./CreateComment";
import './NoticeDetail.css';
import CommentList from "./CommentList";

const NoticeDetail = () => {
    const { noticeId } = useParams();
    const history = useHistory();
    const [notice, setNotice] = useState(null);
    const currentUserId = localStorage.getItem('admin'); // 현재 로그인한 사용자 ID

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/notice/${noticeId}`);
                const noticeData = response.data;
                // 이미지가 없는 경우 빈 배열로 초기화
                noticeData.images = noticeData.images || [];

                // 이미지 경로가 웹에서 접근 가능한지 로그로 확인
                noticeData.images.forEach((image, index) => {
                    console.log(`Image ${index} path:`, image.imagePath);
                });

                setNotice(noticeData);

            } catch (error) {
                console.error('공지사항 조회 오류.', error);
            }
        };
        fetchNotice();
    }, [noticeId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/notice/${noticeId}`);
            alert("공지사항이 삭제되었습니다.");
            history.push("/api/notice"); // 공지사항 목록으로 리디렉션
        } catch (error) {
            console.error('공지사항 삭제 오류.', error);
        }
    };

    const handleEdit = () => {
        history.push(`/edit/${noticeId}`); // 공지사항 수정 페이지로 이동
    };

    if (!notice) return <div>Loading...</div>;

    return (
        <div>
            <h2>제목: {notice.title}</h2>
            <div>작성자: {notice.userName}</div>
            <div>
                <h3>본문 :</h3>
                <p>{notice.content}</p>
                    <div>
                        {notice.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.imagePath}
                                alt={`Notice Image ${index}`}
                                style={{width: "200px", margin: "10px 0"}}
                            />
                        ))}
                    </div>
            </div>
                <div>
                    {notice.attachmentPath &&
                        <a href={`/uploads/${notice.attachmentPath}`} download>첨부파일 다운로드</a>}
                </div>
                    <p>작성날짜: {notice.createdTime}</p>
            <p>조회수: {notice.viewcnt}</p>

            {/*{notice.author === currentUserId && ( // 작성자와 현재 사용자가 동일한지 확인*/}
            <div>
                <button onClick={handleEdit}>수정</button>
                <button onClick={handleDelete}>삭제</button>
            </div>


            <p>댓글:</p>
            <ul>
                <CommentList noticeId={noticeId}/>
            </ul>
        </div>
);
};

export default NoticeDetail;

