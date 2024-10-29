import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const CommentWrite = ({ category, noticeId, contentid, svcid, refreshComments }) => {
    const [content, setContent] = useState('');
    const [user, setUser] = useState(null);
    const [images, setImages] = useState([]); //이미지 선택
    const [imagePreviews, setImagePreviews] = useState([]);
    const token = localStorage.getItem('token');  // localStorage에서 토큰을 가져옴

    // 이미지 파일 선택 핸들러
    const handleImageChange = (event) => {
        setImages(Array.from(event.target.files));
    };

    // 이미지 미리보기 설정
    useEffect(() => {
        if (images && images.length > 0) {
            const newImagePreviews = images.map((image) => URL.createObjectURL(image));
            setImagePreviews(newImagePreviews);

            // 메모리 누수 방지를 위한 클린업 함수
            return () => {
                newImagePreviews.forEach((url) => URL.revokeObjectURL(url));
            };
        } else {
            setImagePreviews([]);
        }
    }, [images]);

    // 이미지 삭제 핸들러
    const handleImageRemove = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                alert('로그인이 필요한 기능입니다.');
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

        const formData = new FormData();
        formData.append('content', content);
        if (noticeId) formData.append('noticeId', noticeId);
        if (contentid) formData.append('contentid', contentid);
        if (category) formData.append('category', category);
        if (svcid) formData.append('svcid', svcid);
        if (category === 'gyeonggi-events' && contentid) {
            formData.append('gyeonggiEventId', contentid);
        }
        images.forEach((image) => {
            formData.append('images', image); // `images` 배열로 다중 이미지 추가
        });

        try {

            await axios.post('/api/comment', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setContent('');
            setImages([]);
            setImagePreviews([]);
            alert('댓글이 작성되었습니다.');
            refreshComments();  // 댓글 목록 갱신
        } catch (error) {
            console.error('댓글 작성 실패:', error);
        }

    };

    if (!user) {
        return <div className='login-x'>댓글을 작성하려면 로그인이 필요합니다.</div>;
    }

    return (
        <form className='comment-write' onSubmit={handleSubmit}>
            <input className='write' type='text' placeholder='댓글을 입력해주세요'
                   value={content} onChange={(e) => setContent(e.target.value)}/>
            <button type='submit' className='enter-btn'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                     fill="#111111">
                    <path
                        d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z"/>
                </svg>
            </button>
        </form>
    )
}
export default CommentWrite;