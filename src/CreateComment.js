import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateComment = ({ noticeId, contentid, refreshComments }) => {
    const [content, setContent] = useState('');
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null); //파일 선택
    const token = localStorage.getItem('token');  // localStorage에서 토큰을 가져옴

    // 파일 선택 핸들러
        const handleFileChange = (e) => {
            setFile(e.target.files[0]);
        };

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                console.log('토큰이 없습니다. 로그인이 필요합니다.');
                return;
            }

            try {
                const response = await axios.get('/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);  // 사용자 정보 저장
            } catch (error) {
                console.log('사용자 정보를 가져오는 데 실패했습니다.', error);
            }
        };

        fetchUser();
    }, [token]);  // 토큰이 변경될 때마다 실행

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }

        try {
            // 이미지 업로드
            let imageUrl = '';
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                const uploadResponse = await axios.post('/api/uploads/comment-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                imageUrl = uploadResponse.data;  // 업로드된 이미지 URL
            }

            // 공지사항 댓글인 경우
            if (noticeId) {
                await axios.post(
                    '/api/comment',  // 공지사항 댓글 API
                    { content, noticeId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }
            // 행사 댓글인 경우
            else if (contentid) {
                await axios.post(
                    '/api/comment',  // 행사 댓글 API
                    { content, contentid, imageUrl },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            setContent('');
            setFile(null);  // 파일 초기화
            alert('댓글이 작성되었습니다.');
            refreshComments();  // 댓글 목록 갱신
        } catch (error) {
            console.error('댓글 작성 실패:', error);
        }

//      위에거 주석치고 이걸로 해도 작성은 됨
//    try {
//            await axios.post('/api/comment', { content, contentid, noticeId }, {
//                headers: {
//                    'Authorization': `Bearer ${token}`
//                }
//            });
//            alert("댓글이 작성되었습니다.");
//            setContent('');
//            refreshComments();  // 댓글 작성 후 댓글 목록 갱신
//        } catch (error) {
//            console.error('댓글 작성 실패:', error);
//        }
//
    };

    if (!user) {
        return <div>댓글을 작성하려면 로그인이 필요합니다.</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>내용 :</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="댓글을 입력하세요."/>
            </div>
            <div>
                <input type="file" onChange={handleFileChange} />
            </div>
            <div>
                <label>작성자 : {user.userName}</label>
            </div>
            <button type="submit">댓글 작성</button>
        </form>
    );
};

export default CreateComment;