import '../../css/MyPage/userInfo.css';
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import "swiper/css";
import "swiper/css/navigation";
import LoginPage from "../login/LoginPage";
import ChangePw from "./changePw";
import {Navigation} from "swiper/modules";


const SlideTest = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

const UserInfo = () => {
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
    const fileInputRef = useRef(null);



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
        return event.firstImage || event.imageUrl || event.imgurl || '/img/default_img.jpeg';
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
                return `/eventDetailPage/tourist-attractions/${contentid}/${contenttypeid}`;
            case '14':  // 문화 시설 (숫자)
            case 'CulturalFacilityDetail':  // 문화 시설 (문자열)
                return `/eventDetailPage/cultural-facilities/${contentid}/${contenttypeid}`;
            case '15':  // 축제 공연 행사 (숫자)
            case 'TourEventDetail':  // 축제 공연 행사 (문자열)
                return `/eventDetailPage/events/${contentid}/${contenttypeid}`;
            case '25':  // 여행코스 (숫자)
            case 'TravelCourseDetail':  // 여행코스 (문자열)
                return `/eventDetailPage/travel-courses/${contentid}/${contenttypeid}`;
            case '28':  // 레포츠 (숫자)
            case 'LeisureSportsEventDetail':  // 레포츠 (문자열)
                return `/eventDetailPage/leisure-sports/${contentid}/${contenttypeid}`;
            case '32':  // 숙박 (숫자)
            case 'LocalEventDetail':  // 숙박 (문자열)
                return `/eventDetailPage/local-events/${contentid}/${contenttypeid}`;
            case '38':  // 쇼핑 (숫자)
            case 'ShoppingEventDetail':  // 쇼핑 (문자열)
                return `/eventDetailPage/shopping-events/${contentid}/${contenttypeid}`;
            case '39':  // 음식 (숫자)
            case 'FoodEventDetail':  // 음식 (문자열)
                return `/eventDetailPage/food-events/${contentid}/${contenttypeid}`;
            case 'EventDetail':
                return `/eventDetailPage/events/${contentid}`;
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


                setLikedEvents(flattenedEvents);
            } catch (error) {

            }
        };


        const fetchLikedComments = async () => {
            try {
                const response = await axios.get('/api/users/liked-comments', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setLikedComments(response.data);
            } catch (error) {

            }
        };

        const fetchAuthoredComments = async () => {
            try {
                const response = await axios.get('/api/users/authored-comments', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAuthoredComments(response.data);
            } catch (error) {

            }
        };

        fetchAuthoredComments();
        fetchLikedComments();
        fetchData();
    }, [history, token, userInfo.profileImage]);

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
            setVerificationCode('');
            toggleEditMode('userEmail');
        } catch (error) {

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

            setMessage(`${fieldName} 업데이트에 실패했습니다.`);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);

        if (file) {
            await handleImageUpload(file); // 파일을 선택하면 즉시 업로드
        }
    };

    const handleImageUpload = async (file) => {
        if (!file) {
            alert("이미지를 선택하세요.");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/users/profile-image', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const newImageFileName = response.data; // 업로드된 이미지 이름을 가져옴

            setMessage("프로필 이미지가 업데이트되었습니다.");
            setUserInfo(prevState => ({
                ...prevState,
                profileImage: newImageFileName
            }));

            setSelectedImage(null); // 이미지 선택 필드 초기화
        } catch (error) {

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

            setMessage("프로필 이미지 삭제에 실패했습니다.");
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="userInfoContainer">
            {isModalOpen && (
                <ChangePw closeModal={() => setIsModalOpen(false)}/>
            )}
            <div className="userProfileWrapper">
                <div className="userProfileTab">마이페이지</div>
                <div className="tailBox"
                style={{
                    backgroundImage: `url(/img/tail.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}></div>
                <div className="userProfileContainer">
                    <div className="profileIcon"
                         style={{
                             backgroundImage: `url(${userInfo.profileImage ? userInfo.profileImage : `/img/icon/user.svg`})`,
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                         }}>
                    </div>
                    <div className="profileName">{userInfo.userName}</div>
                    <div className="profileEmail">{userInfo.userEmail}</div>
                    <div className='ch-img'>
                        <input type="file" accept="image/*" name="profileImage" onChange={handleImageChange} ref={fileInputRef}
                               style={{display: 'none'}}/>
                        <button className='change-btn' onClick={handleButtonClick}>프로필 수정</button>
                        {userInfo.profileImage && (
                            <button className='change-btn delete-img' onClick={handleImageDelete}>이미지 삭제</button>
                        )}
                    </div>
                </div>

            </div>

            <div className="profileContainer">
                <div className="profileInfoContainer">
                    <div className="headText">기본 정보</div>
                    <div className="profileInfo">
                        <div className="profileRow">
                            <div className="profileIcon profilePhoto"
                                 style={{
                                     backgroundImage: `url(${userInfo.profileImage ? userInfo.profileImage : `/img/icon/user.svg`})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center',
                                 }}></div>
                            {editMode.userName ? (
                                <div className='profileDetails-box'>
                                    <div className="profileDetails">
                                        <input className='name-change input-change' type="text" name="userName"
                                               value={userInfo.userName} onChange={handleInputChange}/>
                                    </div>
                                    <div className='btn-box'>
                                        <button className="actionButton" onClick={() => handleUpdate('userName')}>저장
                                        </button>
                                        <button className="actionButton cancle"
                                                onClick={() => toggleEditMode('userName')}>취소
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='profileDetails-box'>
                                    <div className="profileDetails">
                                        <div className="profileName">{userInfo.userName}</div>
                                        <div className="profileEmail">{userInfo.userEmail}</div>
                                    </div>
                                    <button className="actionButton" onClick={() => toggleEditMode('userName')}>수정
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="profileRow">
                            <div className="profileIcon phoneIcon">
                                <svg width="13" height="16" viewBox="0 0 13 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.4245 0H1.49185C0.736195 0 0.121826 0.5125 0.121826 1.14286V14.8571C0.121826 15.4875 0.736195 16 1.49185 16H11.4245C12.1801 16 12.7945 15.4875 12.7945 14.8571V1.14286C12.7945 0.5125 12.1801 0 11.4245 0ZM11.2532 14.7143H1.6631V1.28571H11.2532V14.7143ZM5.60191 12.8929C5.60191 13.0823 5.69212 13.264 5.8527 13.3979C6.01328 13.5319 6.23107 13.6071 6.45817 13.6071C6.68526 13.6071 6.90306 13.5319 7.06364 13.3979C7.22422 13.264 7.31443 13.0823 7.31443 12.8929C7.31443 12.7034 7.22422 12.5217 7.06364 12.3878C6.90306 12.2538 6.68526 12.1786 6.45817 12.1786C6.23107 12.1786 6.01328 12.2538 5.8527 12.3878C5.69212 12.5217 5.60191 12.7034 5.60191 12.8929Z"
                                        fill="#333333"/>
                                </svg>
                            </div>
                            <div className="profileText">{userInfo.userPhone}</div>
                        </div>

                        <div className="profileRow">
                            <div className="profileIcon emailIcon">
                                <svg width="19" height="14" viewBox="0 0 19 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18.0312 0.8125H0.96875C0.605762 0.8125 0.3125 1.06387 0.3125 1.375V12.625C0.3125 12.9361 0.605762 13.1875 0.96875 13.1875H18.0312C18.3942 13.1875 18.6875 12.9361 18.6875 12.625V1.375C18.6875 1.06387 18.3942 0.8125 18.0312 0.8125ZM17.2109 2.76016V11.9219H1.78906V2.76016L1.22305 2.38223L2.029 1.49453L2.90674 2.07988H16.0953L16.973 1.49453L17.779 2.38223L17.2109 2.76016ZM9.5 6.47266L2.02695 1.49277L1.221 2.38047L8.79248 7.42715C8.99395 7.56131 9.2418 7.63413 9.49692 7.63413C9.75204 7.63413 9.9999 7.56131 10.2014 7.42715L17.2109 2.76016L17.777 2.38223L16.971 1.49453L9.5 6.47266Z"
                                        fill="#333333"/>
                                </svg>

                            </div>
                            {editMode.userEmail ? (
                                <div className='change-emailbox'>
                                    <div className='email-check1'>
                                        <input className='email-change input-change' type="text" name="userName"
                                               value={newEmail}
                                               onChange={handleEmailChange}/>
                                        {!isEmailChecked && (
                                            <button className='actionButton' onClick={handleCheckEmailDuplicate}
                                                    disabled={!isEmailValid}>
                                                중복검사
                                            </button>
                                        )}

                                        {isEmailChecked && (
                                            <button className='actionButton' onClick={handleSendVerificationCode}
                                                    disabled={isEmailDuplicate}>
                                                인증번호 발송
                                            </button>
                                        )}
                                    </div>
                                    {isEmailChecked && (
                                        <div className='email-check2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                                 viewBox="0 -960 960 960"
                                                 width="24px" fill="#555555">
                                                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                                            </svg>
                                            <input
                                                className='email-code input-change'
                                                type="text"
                                                placeholder="인증번호 입력"
                                                value={verificationCode}
                                                onChange={(e) => setVerificationCode(e.target.value)} // 인증번호 입력 필드
                                            />
                                            <button className='actionButton' onClick={handleVerifyCode}>인증번호 확인</button>
                                        </div>
                                    )}
                                    <div className='email-change-btns'>
                                        {isVerified &&
                                            <button onClick={handleEmailUpdate} className='actionButton'>변경</button>}
                                        <button className='actionButton cancle-btn'
                                                onClick={() => toggleEditMode('userEmail')}>취소
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='email-textbox'>
                                    <div className="profileText">{userInfo.userEmail}</div>
                                    <button type='button' className='actionButton'
                                            onClick={() => toggleEditMode('userEmail')}>수정
                                    </button>
                                </div>
                            )}

                        </div>

                        <div className="profileRow">
                            <div className="profileIcon birthdayIcon">
                                <svg width="21" height="14" viewBox="0 0 21 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.704 0H1.2122C0.818804 0 0.500977 0.284375 0.500977 0.636364V13.3636C0.500977 13.7156 0.818804 14 1.2122 14H19.704C20.0974 14 20.4152 13.7156 20.4152 13.3636V0.636364C20.4152 0.284375 20.0974 0 19.704 0ZM18.8149 12.5682H2.10123V1.43182H18.8149V12.5682ZM12.6429 6.28409H15.3855C15.4144 6.28409 15.4366 6.2125 15.4366 6.125V5.17045C15.4366 5.08295 15.4144 5.01136 15.3855 5.01136H12.6429C12.614 5.01136 12.5918 5.08295 12.5918 5.17045V6.125C12.5918 6.2125 12.614 6.28409 12.6429 6.28409ZM12.7496 9.14773H16.8769C16.9636 9.14773 17.0347 9.07614 17.0347 8.98864V8.03409C17.0347 7.94659 16.9636 7.875 16.8769 7.875H12.7496C12.6629 7.875 12.5918 7.94659 12.5918 8.03409V8.98864C12.5918 9.07614 12.6629 9.14773 12.7496 9.14773ZM4.05709 10.2017H5.0328C5.12614 10.2017 5.20171 10.1361 5.20838 10.0526C5.29284 9.0483 6.23076 8.25284 7.36872 8.25284C8.50667 8.25284 9.4446 9.0483 9.52905 10.0526C9.53572 10.1361 9.61129 10.2017 9.70464 10.2017H10.6803C10.7045 10.2017 10.7283 10.1974 10.7505 10.1889C10.7727 10.1804 10.7927 10.168 10.8093 10.1523C10.826 10.1367 10.8389 10.1182 10.8473 10.098C10.8557 10.0778 10.8594 10.0562 10.8582 10.0347C10.7959 8.97472 10.1469 8.05199 9.20011 7.52699C9.61765 7.11632 9.84836 6.58074 9.84688 6.02557C9.84688 4.7946 8.73782 3.7983 7.37094 3.7983C6.00406 3.7983 4.895 4.7946 4.895 6.02557C4.895 6.60426 5.13948 7.12926 5.54176 7.52699C5.05975 7.79424 4.65719 8.16191 4.36847 8.59859C4.07974 9.03527 3.91343 9.52798 3.88373 10.0347C3.87484 10.1261 3.95485 10.2017 4.05709 10.2017ZM7.36872 4.99148C8.00215 4.99148 8.51779 5.45483 8.51779 6.02557C8.51779 6.59631 8.00215 7.05966 7.36872 7.05966C6.73528 7.05966 6.21965 6.59631 6.21965 6.02557C6.21965 5.45483 6.73528 4.99148 7.36872 4.99148Z"
                                        fill="#333333"/>
                                </svg>

                            </div>
                            <div className="profileText">{userInfo.userBirthday}</div>
                        </div>

                        <div className="profileRow">
                            <div className="profileIcon passwordIcon">
                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.9466 6.16H12.5476V2.24C12.5476 1.00275 11.3688 0 9.91436 0H4.81237C3.35789 0 2.17908 1.00275 2.17908 2.24V6.16H0.780148C0.416014 6.16 0.121826 6.41025 0.121826 6.72V13.44C0.121826 13.7497 0.416014 14 0.780148 14H13.9466C14.3107 14 14.6049 13.7497 14.6049 13.44V6.72C14.6049 6.41025 14.3107 6.16 13.9466 6.16ZM3.6603 2.24C3.6603 1.69925 4.17667 1.26 4.81237 1.26H9.91436C10.55 1.26 11.0664 1.69925 11.0664 2.24V6.16H3.6603V2.24ZM13.1237 12.74H1.60305V7.42H13.1237V12.74ZM6.78733 10.3075V11.235C6.78733 11.312 6.86139 11.375 6.95191 11.375H7.77481C7.86533 11.375 7.93939 11.312 7.93939 11.235V10.3075C8.10921 10.2038 8.23597 10.0569 8.30141 9.88802C8.36685 9.71912 8.36761 9.53692 8.30357 9.36764C8.23952 9.19835 8.11399 9.05072 7.94503 8.94599C7.77608 8.84126 7.57242 8.78483 7.36336 8.78483C7.15431 8.78483 6.95064 8.84126 6.78169 8.94599C6.61273 9.05072 6.4872 9.19835 6.42316 9.36764C6.35912 9.53692 6.35987 9.71912 6.42531 9.88802C6.49076 10.0569 6.61751 10.2038 6.78733 10.3075Z"
                                        fill="#333333"/>
                                </svg>

                            </div>
                            <div className="profileText">비밀번호</div>
                            <button className="actionButton" onClick={openModal}>수정</button>
                        </div>
                    </div>
                </div>

                <div className="myLikeContainer">
                    <div className="headText">내가 좋아요한 게시글</div>
                    <div className='likeSwiper-wrapper'>
                        {likedEvents.length > 0 ? (
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={10}
                                navigation={{
                                    prevEl: '.like-button-prev',
                                    nextEl: '.like-button-next',
                                }}
                                modules={[Navigation]} // Navigation 모듈 추가
                                className={"mySwiper likeSwiper"}
                            >
                                {likedEvents.map((event, index) => (
                                    <SwiperSlide key={event.id || index}> {/* 고유한 key 설정 */}
                                        <div className='slide-content'
                                             style={{
                                                 backgroundImage: `url(${getUnifiedImageUrl(event)})`,
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center',
                                             }}
                                             onClick={() => handleNavigate(event)}>
                                            <div className='slide-content-txt'>
                                                <p className='title'>{getUnifiedTitle(event)}</p>
                                                {/*<p className='overview'>{getUnifiedContent(event)}</p>*/}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <p className='likedEvents-x'>
                                좋아요한 게시글이 없습니다.
                            </p>
                        )}
                        <div className='like-button-wrapper'>
                            <div className='like-button-prev'
                                 style={{
                                     backgroundImage: `url(/img/mypage/ButtonPreviousslide.png)`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center',
                                 }}></div>
                            <div className='like-button-next'
                                 style={{
                                     backgroundImage: `url(/img/mypage/ButtonNextslide.png)`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center',
                                 }}></div>
                        </div>
                    </div>
                </div>

                <div className="myRecentContainer">
                    <div className="headText">내가 좋아요한 댓글</div>
                    <div className='recentSwiper-wrapper'>
                        {likedComments.length > 0 ? (
                            likedComments.map((comment) => (
                                <div className='like-comment' key={comment.id}
                                     onClick={() => navigateToCommentPage(comment)} style={{cursor: 'pointer'}}>
                                    <p className='name'>{comment.maskedAuthor}</p>
                                    <div className='wall'></div>
                                    <p className='content'>{comment.content}</p>
                                </div>
                            ))
                        ) : (
                            <p className='likedEvents-x'>좋아요한 댓글이 없습니다.</p>
                        )}
                    </div>
                </div>
                <div className="myRecentContainer lastContainer">
                    <div className="headText">내가 작성한 여행톡</div>
                    <div className='recentSwiper-wrapper'>
                        {authoredComments.length > 0 ? (
                            authoredComments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="authored-comment-item"
                                    onClick={() => navigateToCommentPage(comment)} // 클릭 시 해당 페이지로 이동
                                    style={{cursor: 'pointer'}}
                                >
                                    <p className='content'>{comment.content}</p>
                                    <div className='wall'></div>
                                    <p className='date'>{new Date(comment.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className='likedEvents-x'>작성한 댓글이 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserInfo;