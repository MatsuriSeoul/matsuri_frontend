import React, {useEffect, useState} from "react";
import {useAuth} from "../../../AuthContext";
import {useHistory} from "react-router-dom";
import axios from "axios";
import DecodingInfo from "../../../DecodingInfo";

const LoginForm = () => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };
    const [userId, setUserId] = useState(''); // 사용자 ID
    const [userPassword, setUserPassword] = useState(''); // 사용자 비밀번호
    const [error, setError] = useState(''); // 에러 메시지
    const history = useHistory();
    const { updateAuth } = useAuth(); // 인증 상태 업데이트

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', {
                userId: userId,
                userPassword: userPassword,
            });
            if (response.data && response.data.token) { // 응답에 토큰이 있으면
                const decodedToken = DecodingInfo(response.data.token); // 토큰 디코딩
                // console.log(decodedToken);

                const userIdFromToken = decodedToken ? parseInt(decodedToken.sub, 10) : null;
                const userRoleFromToken = decodedToken ? decodedToken.role : null; // userRole 가져오기

                // console.log("User Role from Token:", userRoleFromToken);

                if (!isNaN(userIdFromToken)) {
                    localStorage.setItem('token', response.data.token); // 로컬스토리지에 토큰 저장
                    localStorage.setItem('userId', userIdFromToken); // 로컬스토리지에 사용자 ID 저장
                    localStorage.setItem('userName', decodedToken.userName); //  로컬 스토리지에 사용자 이름 저장
                    localStorage.setItem('userRole', userRoleFromToken) ;

                    updateAuth({
                        token: response.data.token,
                        userName: response.data.userName,
                        userId: userIdFromToken,
                        userRole : userRoleFromToken
                    });
                    // 폼 필드 상태 초기화
                    setUserId('');
                    setUserPassword('');

                    history.push('/'); // 홈 페이지로 이동
                } else {
                    alert('로그인 정보가 올바르지 않습니다. 다시 확인해주세요.') // 에러 메시지
                }
            } else {
                alert('로그인 정보가 올바르지 않습니다. 다시 확인해주세요.') // 에러 메시지
            }
        } catch (error) {
            alert('로그인 정보가 올바르지 않습니다. 다시 확인해주세요.'); // 에러 메시지
        }
    };

// 네이버 로그인 후 콜백 처리
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');

        if (token) {
            const decodedToken = DecodingInfo(token);
            const userIdFromToken = decodedToken ? parseInt(decodedToken.sub, 10) : null;
            const userRoleFromToken = decodedToken ? decodedToken.role : null;

            if (!isNaN(userIdFromToken)) {
                // JWT 및 사용자 정보를 로컬 스토리지에 저장
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userIdFromToken);
                localStorage.setItem('userName', decodedToken.userName);
                localStorage.setItem('userRole', userRoleFromToken);

                // 인증 상태 업데이트
                updateAuth({
                    token: token,
                    userName: decodedToken.userName,
                    userId: userIdFromToken,
                    userRole: userRoleFromToken
                });

                // 로그인 후 홈 페이지로 리디렉션
                history.push('/');
            }
        }
    }, [history, updateAuth]);

    const handleNaverLogin = () => {
        const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=cAxVyC6eWpTfHY6rLFwK&state=RANDOM_STATE&redirect_uri=${('http://localhost:8080/api/naver/login')}`;

        // 네이버 로그인 페이지로 리디렉션
        window.location.href = naverAuthUrl;
    };

    const handleKakaoLogin = () => {

        const kakaoAuthUrl = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=b9ddfeb73a198051fce018ae3497a86c&redirect_uri=http://localhost:8080/api/kakao/callback';

        window.location.href = kakaoAuthUrl;
    };

    const handleGoogleLogin = () => {
//        window.location.href = '/api/google/login';
        const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=119228587275-t0b61m9s07a0i27e6ft58dgr0cutv8kd.apps.googleusercontent.com&redirect_uri=http://localhost:8080/login/oauth2/code/google&scope=email profile';

        window.location.href = googleAuthUrl;
    };



    return(
        <form className='login-form' onSubmit={handleLogin}>
            <div className="logo">
                대한민국 <b>핫</b>!스팟
            </div>
            <div className="login-wrapper">
                <div className="topBox">
                    <div className="loginIcon"
                         style={{
                             backgroundImage: `url(/img/icon/login.png)`,
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                         }}></div>
                    <div className="loginText">ID 로그인</div>
                </div>
                <div className="bottomBox">
                    <div className="InputBox">
                        <input type="text" className="login-id"
                               value={userId} onChange={(e) =>
                                setUserId(e.target.value)} placeholder="아이디" required></input>
                        <hr></hr>
                        <input type="password" className="login-pw"
                               value={userPassword} onChange={(e) =>
                                setUserPassword(e.target.value)} placeholder="비밀번호" required></input>
                    </div>
                    {/*<div className="autoLogin">*/}
                    {/*    <div className="autoLoginCheckBtn" onClick={toggleCheck}>*/}
                    {/*        <img*/}
                    {/*            src={isChecked ? "img/icon/checked-icon.png" : "img/icon/unchecked-icon.png"}*/}
                    {/*            alt="Toggle Icon"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="autoLoginText">로그인 상태 유지</div>*/}
                    {/*</div>*/}
                    <button className="loginBtn">로그인</button>
                    <div className="wall">
                        <div></div>
                        <p>또는</p>
                        <div></div>
                    </div>
                    <div className="socialLogin">
                        <img onClick={handleKakaoLogin} className="socialLogin-btn" src="/img/icon/kakao-btn.png" alt=''>
                        </img>
                        <img onClick={handleNaverLogin} className="socialLogin-btn" src="/img/icon/naver-btn.png" alt=''>
                        </img>
                        <img onClick={handleGoogleLogin} className="socialLogin-btn" src="/img/icon/google-btn.png" alt=''>
                        </img>
                    </div>
                </div>

            </div>
        </form>
    );
};

export default LoginForm;

