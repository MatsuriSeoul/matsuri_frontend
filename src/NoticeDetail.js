import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import CommentList from "./CommentList";

const NoticeDetail = () => {
    const { noticeId } = useParams();
    const history = useHistory();
    const [notice, setNotice] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null); // 현재 로그인한 사용자 ID

    // JWT 토큰에서 사용자 ID 추출 (예시)
    const extractUserIdFromToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));

            return payload.userId;
        } catch (error) {
            console.error("토큰에서 사용자 ID 추출 오류:", error);
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인이 필요한 기능입니다.');
            history.push('/notice');
            return;
        }

        const userId = extractUserIdFromToken(token);
        if (!userId) {
            alert('로그인이 필요한 기능입니다.');
            history.push('/notice');
            return;
        }

        setCurrentUserId(userId);

        const fetchNotice = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/notice/${noticeId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const noticeData = response.data;



                // 이미지가 없는 경우 빈 배열로 초기화
                noticeData.images = noticeData.images || [];

                setNotice(noticeData);
            } catch (error) {
                console.error('공지사항 조회 오류.', error);
            }
        };

        fetchNotice();
    }, [noticeId, history]);

    const handleDelete = async () => {

        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirmDelete) {
            return; // 사용자가 취소를 누르면 삭제 중단
        }

        try {
            await axios.delete(`/api/notice/${noticeId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert("공지사항이 삭제되었습니다.");
            history("/api/notice"); // 공지사항 목록으로 리디렉션
        } catch (error) {
            console.error('공지사항 삭제 오류.', error);
        }
    };

    const handleEdit = () => {
        history(`/edit/${noticeId}`); // 공지사항 수정 페이지로 이동
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
                {notice.files.map((file, index) => (
                    <div key={index}>
                        <a href={`http://localhost:8080/api/notice/download/${file.filePath}`} download>
                            {file.fileName}
                        </a>
                    </div>
                ))}
            </div>
            <p>작성날짜: {notice.createdTime}</p>
            <p>조회수: {notice.viewcnt}</p>

            {/* 작성자와 현재 사용자가 동일한 경우에만 수정/삭제 버튼 표시 */}
            {currentUserId && currentUserId === notice.userId ? (
                <div>
                    <button onClick={handleEdit}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
            ) : (
                <div>권한이 없습니다.</div>
            )}

            <p>댓글:</p>
            <ul>
                <CommentList noticeId={noticeId} />
            </ul>
        </div>
    );
};

export default NoticeDetail;
