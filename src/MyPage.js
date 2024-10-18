import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './App.css';
import CommentLikeButton from './CommentLikeButton';

function MyPage() {
    const [userInfo, setUserInfo] = useState({
        userName: '',
        userEmail: '',
        userPhone: '',
        userBirthday: '',
        profileImage: ''
    });
    const [emailVerificationSent, setEmailVerificationSent] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false); // 중복된 이메일 여부
    const [isEmailChecked, setIsEmailChecked] = useState(false); // 중복 검사 통과 여부
    const [newEmail, setNewEmail] = useState('');  // 새로 설정한 이메일
    const [verificationCode, setVerificationCode] = useState(''); // 인증번호 입력 필드
    const [likedComments, setLikedComments] = useState([]); // 댓글 좋아요 저장
    const [authoredComments, setAuthoredComments] = useState([]); //내가 작성한 댓글 목록
    const [editMode, setEditMode] = useState({
        userName: false,
        userEmail: false,
        userPhone: false,
        userBirthday: false
    });
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const history = useHistory();
    const [likedEvents, setLikedEvents] = useState([]); // 내가 좋아요 누른 콘텐츠 목록 저장
    const token = localStorage.getItem('token');



    // 이메일 형식 검사 함수
    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/;
        return emailPattern.test(email);
    };

    // 전화번호 형식 검사 함수 (숫자 10~11자리만 허용)
    const validatePhone = (phone) => {
        const phonePattern = /^010\d{8}$/;
        return phonePattern.test(phone);
    };

    // 생일의 유효한 범위를 체크 (미래 날짜 또는 먼 과거 금지)
    const validateBirthday = (birthday) => {
        const today = new Date();
        const birthDate = new Date(birthday);
        const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate()); // 120년 전까지 허용
        return birthDate <= today && birthDate >= minDate;
    };

    const isValidEvent = (event) => {
        return event && typeof event === 'object';
    };

    // 이미지 URL을 통합하는 함수
    const getUnifiedImageUrl = (event) => {
        if (!isValidEvent(event)) return '/img/mainlogo.png'; // 유효하지 않으면 기본값 반환
        return event.firstImage || event.imageUrl || event.imgurl || '/img/mainlogo.png';
    };

    // 제목을 통합하는 함수
    const getUnifiedTitle = (event) => {
        if (!isValidEvent(event)) return '제목 없음'; // 유효하지 않으면 기본값 반환
        return event.title || event.svcnm || '제목 없음';
    };

    // 썸네일 상세내용 데이터 변환 함수
    const getUnifiedContent = (event) => {
        if (!isValidEvent(event)) return '상세 내용이 없습니다'; // 유효하지 않으면 기본값 반환

        const content = event.overview || '상세 내용이 없습니다'; // overview가 없으면 기본값 반환

        if (event.overview == null) return '상세 내용이 없습니다'  // overview가 null값이면

        // 내용이 40자를 넘으면 자르고 '...'를 붙임
        return content.length > 40 ? `${content.substring(0, 40)}...` : content;
    };

        // 서울과 경기 이벤트의 상세 페이지 경로 설정 함수
        const getEventDetailRoute = (event) => {
            if (!isValidEvent(event)) return '#';

            if (event.svcid) {  // 서울 이벤트의 경우
                return `/seoul-events/${event.svcid}/detail`;
            } else if (event.id) {  // 경기 이벤트의 경우
                return `/gyeonggi-events/${event.id}/detail`;
            } else {
                return '#';  // 기본 경로 처리
            }
        };


    // 상세 페이지 경로 설정 함수
    const getRouteByContentType = (contentid, contenttypeid, svcid, id) => {
        if (!contenttypeid) return '#'; // contenttypeid가 없는 경우 예외 처리

        switch (contenttypeid) {
            case '12':  // 관광지 (숫자)
            case 'TouristAttractionDetail':  // 관광지 (문자열)
                return `/tourist-attraction/${contentid}/${contenttypeid}/detail`;
            case '14':  // 문화 시설 (숫자)
            case 'CulturalFacilityDetail':  // 문화 시설 (문자열)
                return `/cultural-facilities/${contentid}/${contenttypeid}/detail`;
            case '15':  // 축제 공연 행사 (숫자)
            case 'TourEventDetail':  // 축제 공연 행사 (문자열)
                return `/events/${contentid}/${contenttypeid}/detail`;
            case '25':  // 여행코스 (숫자)
            case 'TravelCourseDetail':  // 여행코스 (문자열)
                return `/travel-courses/${contentid}/${contenttypeid}/detail`;
            case '28':  // 레포츠 (숫자)
            case 'LeisureSportsEventDetail':  // 레포츠 (문자열)
                return `/leisure-sports/${contentid}/${contenttypeid}/detail`;
            case '32':  // 숙박 (숫자)
            case 'LocalEventDetail':  // 숙박 (문자열)
                return `/local-events/${contentid}/${contenttypeid}/detail`;
            case '38':  // 쇼핑 (숫자)
            case 'ShoppingEventDetail':  // 쇼핑 (문자열)
                return `/shopping-events/${contentid}/${contenttypeid}/detail`;
            case '39':  // 음식 (숫자)
            case 'FoodEventDetail':  // 음식 (문자열)
                return `/food-events/${contentid}/${contenttypeid}/detail`;
            case 'EventDetail':
                return `/events/${contentid}/detail`;
            default:
                alert("상세 페이지 이동 중 오류 발생.")
                return `/`;  // 기본 경로 처리
        }
    };

    // 상세 페이지로 이동하는 함수
    const handleNavigate = (event) => {
        const { contentid, contenttypeid, svcid, id } = event;

        let route = '#';  // 기본 경로

        // contenttypeid가 없는 경우 서울과 경기 이벤트의 경로를 확인
        if (contenttypeid && (contenttypeid.includes('SeoulEvent') || contenttypeid.includes('GyeonggiEvent'))) {
            route = getEventDetailRoute(event);
        } else {
            // 일반 Tour API 이벤트의 경우
            route = getRouteByContentType(contentid, contenttypeid);
        }

        console.log(`Navigating to: ${route}`);  // 경로 확인
        // 경로로 이동
        history.push(route);
    };

        // 댓글 작성된 페이지로 이동
        const navigateToCommentPage = (comment) => {
            handleNavigate({
                contentid: comment.contentid || '',
                contenttypeid: comment.contenttypeid || '',  // 없을 경우 빈 문자열로 설정
                svcid: comment.svcid,
                id: comment.gyeonggiEvent?.id || comment.contentid  // 경기도 이벤트 또는 contentid
            });
        };


    useEffect(() => {
        if (!token) {
            alert('로그인이 필요한 기능입니다.');
            history.push('/'); // 메인 페이지로 리다이렉션
            return;
        }

        const fetchData = async () => {
            try {
                // 사용자 정보 불러오기
                const userInfoResponse = await axios.get('/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserInfo(userInfoResponse.data);
                setNewEmail(userInfoResponse.data.userEmail);

                // 좋아요한 게시글 목록 불러오기
                const likedEventsResponse = await axios.get('/api/users/liked-events', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // 중첩된 배열을 평탄화하는 코드
                const flattenedEvents = likedEventsResponse.data.flat();

                console.log('받은 데이터:', flattenedEvents);
                setLikedEvents(flattenedEvents);
            } catch (error) {
                console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
            }
        };


        const fetchLikedComments = async () => {
            try {
                const response = await axios.get('/api/users/liked-comments', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setLikedComments(response.data);
            } catch (error) {
                console.error('좋아요한 댓글 불러오기 실패:', error);
            }
        };

        const fetchAuthoredComments = async () => {
            try {
                const response = await axios.get('/api/users/authored-comments', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAuthoredComments(response.data);
            } catch (error) {
                console.error('작성한 댓글 불러오기 실패:', error);
            }
        };

        fetchAuthoredComments();
        fetchLikedComments();
        fetchData();
    }, [history, token]);

    const goToPasswordChange = () => {
        history.push('/change-password'); // 비밀번호 변경 페이지로 이동
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setNewEmail(email);
        const isValid = validateEmail(email);
        setIsEmailValid(isValid);
        setIsEmailChecked(false); // 이메일이 변경될 때마다 중복 검사 초기화
    };

    const handleCheckEmailDuplicate = async () => {
        if (!isEmailValid) {
            alert('유효하지 않은 이메일입니다.');
            return;
        }

        try {
            // 이메일 중복 검사
            const response = await axios.get(`/api/users/check-email/${newEmail}`);
            if (response.data.exists) {
                setIsEmailDuplicate(true); // 중복된 이메일
                setIsEmailChecked(false);
                alert('이미 사용 중인 이메일입니다.');
            } else {
                setIsEmailDuplicate(false); // 중복되지 않음
                setIsEmailChecked(true); // 중복 검사 통과
                alert('사용 가능한 이메일입니다.');
            }
        } catch (error) {
            console.error('이메일 중복 검사 오류', error);
            alert('이메일 중복 검사 중 오류가 발생했습니다.');
        }
    };

    const handleSendVerificationCode = async () => {
        if (!isEmailChecked || isEmailDuplicate) {
            alert('중복 검사를 통과한 후 인증번호를 발송할 수 있습니다.');
            return;
        }

        try {
            await axios.post('/api/users/send-verification-code', { identifier: newEmail, type: 'email' });
            setEmailVerificationSent(true);
            alert('인증번호가 발송되었습니다.');
        } catch (error) {
            console.error('인증번호 발송 오류', error);
            alert('인증번호 발송 실패');
        }
    };

    const handleVerifyCode = async () => {
        try {
            const response = await axios.post('/api/users/verify-code', { identifier: newEmail, code: verificationCode });
            if (response.data.verified) {
                setIsVerified(true);
                alert('인증번호 확인 완료.');
            } else {
                setIsVerified(false);
                alert('인증번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('인증번호 검증 오류', error);
        }
    };

    const handleEmailUpdate = async () => {
        if (!isVerified) {
            alert('이메일 인증을 완료해주세요.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/users/profile', { userEmail: newEmail }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserInfo(prevState => ({ ...prevState, userEmail: newEmail }));
            setMessage('이메일이 성공적으로 변경되었습니다.');
            setEmailVerificationSent(false);
            setIsVerified(false);
            setNewEmail('');
        } catch (error) {
            console.error('이메일 변경 실패', error);
            setMessage('이메일 변경에 실패했습니다.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'userPhone') {
            setIsPhoneValid(validatePhone(value));
        }

        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const toggleEditMode = (field) => {
        setEditMode(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const handleUpdate = async (fieldName) => {
        try {
            const token = localStorage.getItem('token');
            const validBirthday = fieldName === 'userBirthday' ? validateBirthday(userInfo.userBirthday) : true;

            if (fieldName === 'userPhone' && !isPhoneValid) {
                alert('유효한 전화번호 형식이 아닙니다.');
                return;
            }
            if (fieldName === 'userBirthday' && !validBirthday) {
                alert('생일은 유효한 범위 내에서 선택해야 합니다.');
                return;
            }

            await axios.put(`/api/users/profile`, { [fieldName]: userInfo[fieldName] }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage(`${fieldName}이(가) 업데이트되었습니다.`);
            toggleEditMode(fieldName);
        } catch (error) {
            console.error(`${fieldName} 업데이트 실패`, error);
            setMessage(`${fieldName} 업데이트에 실패했습니다.`);
        }
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!selectedImage) {
            alert("이미지를 선택하세요.");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/users/profile-image', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const newImageFileName = response.data;

            setMessage("프로필 이미지가 업데이트되었습니다.");
            setUserInfo(prevState => ({
                ...prevState,
                profileImage: newImageFileName
            }));

            setSelectedImage(null); // 이미지 선택 필드 초기화
        } catch (error) {
            console.error("프로필 이미지 업데이트 실패", error);
            setMessage("프로필 이미지 업데이트에 실패했습니다.");
        }
    };

    const handleImageDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete('/api/users/profile-image', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage("프로필 이미지가 삭제되었습니다.");

            // 삭제 후 기본 이미지로 설정
            setUserInfo(prevState => ({
                ...prevState,
                profileImage: null
            }));
        } catch (error) {
            console.error("프로필 이미지 삭제 실패", error);
            setMessage("프로필 이미지 삭제에 실패했습니다.");
        }
    };

    return (
        <div className="mypage-container">
            <h2>마이페이지</h2>
            <div className="profile-section">
                <h3>프로필 정보</h3>
                <div>
                    <div>
                        <label>프로필 이미지:</label>
                        <img src={userInfo.profileImage ? userInfo.profileImage : `/images/default-profile-image.png`}
                             alt="프로필 이미지" width="100"/>
                        <input type="file" name="profileImage" onChange={handleImageChange}/>
                        <button onClick={handleImageUpload}>이미지 업로드</button>
                        {userInfo.profileImage && (
                            <button onClick={handleImageDelete}>이미지 삭제</button>
                        )}
                    </div>
                    <label>이름:</label>
                    {editMode.userName ? (
                        <>
                            <input type="text" name="userName" value={userInfo.userName} onChange={handleInputChange}/>
                            <button onClick={() => handleUpdate('userName')}>저장</button>
                            <button onClick={() => toggleEditMode('userName')}>취소</button>
                        </>
                    ) : (
                        <>
                            <p>{userInfo.userName}</p>
                            <button onClick={() => toggleEditMode('userName')}>수정</button>
                        </>
                    )}
                </div>
                <div>
                    <label>전화번호:</label>
                    <p>{userInfo.userPhone}</p> {/* 전화번호는 수정 불가능, 보여주기만 함 */}
                </div>
                <div>
                    <label>이메일:</label>
                    {editMode.userEmail ? (
                        <>
                            <input
                                type="email"
                                name="userEmail"
                                value={newEmail}
                                onChange={handleEmailChange} // 중복 검사 추가
                                style={{borderColor: isEmailValid ? 'initial' : 'red'}}
                            />
                            {!isEmailValid && <p style={{color: 'red'}}>유효한 이메일을 입력하세요.</p>}
                            {isEmailDuplicate && <p style={{color: 'red'}}>이미 사용 중인 이메일입니다.</p>}

                            {!isEmailChecked && (
                                <button onClick={handleCheckEmailDuplicate} disabled={!isEmailValid}>
                                    중복 검사
                                </button>
                            )}

                            {isEmailChecked && (
                                <button onClick={handleSendVerificationCode} disabled={isEmailDuplicate}>
                                    인증번호 발송
                                </button>
                            )}

                            {emailVerificationSent && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="인증번호 입력"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)} // 인증번호 입력 필드
                                    />
                                    <button onClick={handleVerifyCode}>인증번호 확인</button>
                                </>
                            )}

                            {isVerified ? (
                                <button onClick={handleEmailUpdate}>이메일 변경</button> // 이메일 변경 버튼
                            ) : (
                                <button disabled>이메일 변경</button> // 인증 완료 전에는 비활성화
                            )}

                            <button onClick={() => toggleEditMode('userEmail')}>취소</button>
                        </>
                    ) : (
                        <>
                            <p>{userInfo.userEmail}</p>
                            <button onClick={() => toggleEditMode('userEmail')}>수정</button>
                        </>
                    )}
                </div>
                <div>
                    <label>생일:</label>
                    {editMode.userBirthday ? (
                        <>
                            <input type="date" name="userBirthday" value={userInfo.userBirthday}
                                   onChange={handleInputChange}/>
                            <button onClick={() => handleUpdate('userBirthday')}>저장</button>
                            <button onClick={() => toggleEditMode('userBirthday')}>취소</button>
                        </>
                    ) : (
                        <>
                            <p>{userInfo.userBirthday}</p>
                            <button onClick={() => toggleEditMode('userBirthday')}>수정</button>
                        </>
                    )}
                </div>
                <div>
                    <button onClick={goToPasswordChange}>비밀번호 변경</button>
                </div>
                {/* 좋아요한 게시글 목록 */}
                <div className="liked-events-section">
                    <h2>내가 좋아요한 게시글</h2>
                    {likedEvents.length > 0 ? (
                        <ul className="liked-events-list">
                            {likedEvents.map((event, index) => (
                                <li key={index} className="liked-event-item">
                                    {/* 유효한 event일 경우에만 렌더링 */}
                                    {isValidEvent(event) && (
                                        <>
                                            <img
                                                src={getUnifiedImageUrl(event)}
                                                alt={getUnifiedTitle(event)}
                                                className="event-thumbnail"
                                                width="100"
                                                onClick={()=> handleNavigate(event)}
                                                style={{cursor: 'pointer'}}
                                            />
                                            <div>
                                                <h4
                                                    className="event-title"
                                                    onClick={() => handleNavigate(event)}  // 클릭 시 이동
                                                    style={{cursor: 'pointer', color: 'blue'}}  // 클릭 가능하게 포인터 스타일 추가
                                                >
                                                    {getUnifiedTitle(event)} {/* title이 없으면 기본값 */}
                                                </h4>
                                                <p>{getUnifiedContent(event)}</p> {/* overview가 없으면 기본값 */}
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>좋아요한 게시글이 없습니다.</p>
                    )}
                </div>
                {/* 좋아요한 댓글 목록 */}
                <div>
                    <h2>내가 좋아요한 댓글</h2>
                    {likedComments.length > 0 ? (
                        likedComments.map((comment) => (
                            <div key={comment.id} onClick={() => navigateToCommentPage(comment)} style={{cursor: 'pointer'}}>
                                <p>내용: {comment.content}</p>
                                <p>작성자: {comment.maskedAuthor}</p>
                            </div>
                        ))
                    ) : (
                        <p>좋아요한 댓글이 없습니다.</p>
                    )}
                </div>
                {/* 작성한 댓글 목록 */}
                <div className="authored-comments-section">
                            <h2>내가 작성한 여행톡</h2>
                            {authoredComments.length > 0 ? (
                                authoredComments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="authored-comment-item"
                                        onClick={() => navigateToCommentPage(comment)} // 클릭 시 해당 페이지로 이동
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <p>내용: {comment.content}</p>
                                        <p>작성일: {new Date(comment.createdAt).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p>작성한 댓글이 없습니다.</p>
                            )}
                        </div>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default MyPage;
