import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateComment = ({ noticeId, refreshComments }) => {
    const [content, setContent] = useState('');
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');  // localStorage에서 토큰을 가져옴

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
            await axios.post('/api/comment', { content, noticeId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("댓글이 작성되었습니다.");
            setContent('');
            refreshComments();  // 댓글 작성 후 댓글 목록 갱신
        } catch (error) {
            console.log('댓글 작성을 실패하였습니다.', error);
        }
    };

    if (!user) {
        return <div>댓글을 작성하려면 로그인이 필요합니다.</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>내용 :</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div>
                <label>작성자 : {user.userName}</label>
            </div>
            <button type="submit">댓글 작성</button>
        </form>
    );
};

export default CreateComment;
