import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const LikeButton = ({ contentId, contentType }) => {  // contentType 추가
    const [like, setLike] = useState(false); // 좋아요 여부
    const [likeCount, setLikeCount] = useState(0); // 좋아요 숫자
    const [showUsers, setShowUsers] = useState(false); // 사용자 목록 보이기/숨기기
    const [likedUsers, setLikedUsers] = useState([]); // 좋아요를 누른 사용자 목록
    const token = localStorage.getItem('token'); // JWT 토큰 가져오기

    // 콘솔 로그로 전달된 props 확인
    useEffect(() => {
    }, [contentId, contentType]);

    useEffect(() => {
        // 좋아요 상태 및 좋아요 숫자 불러오기
        const fetchLikeStatus = async () => {
            if (!contentId || !contentType) {
                return;
            }

            if (token && token !== 'null') { // 토큰이 null이 아닌지 확인
                try {
                    const response = await axios.get(`http://localhost:8080/api/likes/${contentId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                        params: { contentType },  // contentType 전달
                    });
                    setLike(response.data.isLiked); // 사용자가 좋아요를 눌렀는지 확인
                    setLikeCount(Number(response.data.likeCount) || 0); // 좋아요 숫자 설정, NaN 방지
                } catch (error) {
                    console.error('좋아요 상태 불러오기 실패:', error);
                }
            } else {
                console.log('사용자가 로그인되어 있지 않습니다.');
            }
        };
        fetchLikeStatus();
    }, [contentId, contentType, token]);

    const handleLikeClick = async () => {
        if (!token || token === 'null') {
            alert('로그인이 필요합니다.');
            return;
        }

        if (!contentId || !contentType) {
            return;
        }

        try {
            if (like) {
                await axios.delete(`http://localhost:8080/api/likes`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { contentId, contentType }, // contentId와 contentType 전달
                });
                setLikeCount(likeCount - 1); // 좋아요 숫자 감소
            } else {
                await axios.post(`http://localhost:8080/api/likes`, null, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { contentId, contentType }, // contentId와 contentType 전달
                });
                setLikeCount(likeCount + 1); // 좋아요 숫자 증가
            }
            setLike(!like); // 좋아요 상태 반전
        } catch (error) {
            console.error('좋아요 처리 실패:', error);
        }
    };

    // 좋아요를 누른 사용자 목록 불러오기
    const fetchLikedUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/likes/${contentId}/users`);
            if (response.data && response.data.length > 0) {
                setLikedUsers(response.data); // 좋아요를 누른 사용자 목록 설정
            } else {
                setLikedUsers([]); // 사용자 목록이 없는 경우 빈 배열로 설정
            }
        } catch (error) {
            console.error('좋아요 사용자 목록 불러오기 실패:', error);
        }
    };

    // 사용자 목록 보이기/숨기기 토글 핸들러
    const handleToggleUsers = () => {
        if (!showUsers) {
            fetchLikedUsers(); // 사용자 목록을 보일 때만 불러옵니다.
        }
        setShowUsers(!showUsers); // 목록 토글
    };

    return (
        <div className="like">
            <button onClick={handleLikeClick}>
                {like ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="#ff5353">
                        <path
                            d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#5f6368"
                    >
                        <path
                            d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
                    </svg>
                )}
            </button>
            <p className="like-count">{likeCount}</p>
            {/*<button onClick={handleToggleUsers}>*/}
            {/*    {showUsers ? '<' : '>'} /!* 사용자 목록 토글 버튼 *!/*/}
            {/*</button>*/}

            {/*/!* 사용자 목록 표시 *!/*/}
            {/*{showUsers && (*/}
            {/*    <div>*/}
            {/*        <h3>좋아요를 누른 사람들:</h3>*/}
            {/*        <ul className="user-list">*/}
            {/*            {likedUsers.length > 0 ? (*/}
            {/*                likedUsers.map((user, index) => (*/}
            {/*                    <li key={index} className="user-item">*/}
            {/*                        <div className="user-profile">*/}
            {/*                            {user.profileImage ? (*/}
            {/*                                <img*/}
            {/*                                    src={user.profileImage}*/}
            {/*                                    alt={user.userName}*/}
            {/*                                    className="profile-image"*/}
            {/*                                />*/}
            {/*                            ) : (*/}
            {/*                                <div className="default-profile-image"/>*/}
            {/*                            )}*/}
            {/*                            <p className="user-name">{user.userName}</p>*/}
            {/*                        </div>*/}
            {/*                    </li>*/}
            {/*                ))*/}
            {/*            ) : (*/}
            {/*                <p>좋아요를 누른 사람이 없습니다.</p>*/}
            {/*            )}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default LikeButton;
