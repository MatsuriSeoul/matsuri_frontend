import React, {useState, useEffect, useContext} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';

import '../../css/layout/header.css';
import AuthContext from "../../AuthContext";
import axios from "axios";

const Header = ({toggleModal}) => {
    //로그인 관련 로직
    const { auth, updateAuth } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = async () => {
        // 서버에 로그아웃 이벤트를 알림
        try {
            await axios.post('/api/logout', { userName: auth.userName, userId: auth.userId });
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }


        // 로컬 스토리지에서 인증 정보 제거
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');

        // Auth 상태 업데이트
        updateAuth({ token: null, userName: null, userId: null, userRole: null });

        alert('로그아웃 하였습니다.');
        history.push('/');
    };


  useEffect(() => {
    // 컴포넌트가 마운트될 때 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  }, []);
  
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const location = useLocation();
  const pathname = location.pathname; // 현재 경로 가져오기
  const themepageName = pathname.split('/')[1];

  const pageName = pathname.split('/').pop();


  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    return (
        <header className={`header ${isActive ? 'active' : ''} ${isHovered ? 'on' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
            <div className='header-container'>
                <Link to={'/'}>
                    <div className="logo">
                        <img src="/img/main_logo.png" alt="Main Logo" />
                    </div>
                </Link>
                <nav className="navigation">
                    <Link to={'/mainpage'}><p className={`col ${pageName === 'mainpage' ? 'active' : ''}`}>홈</p></Link>
                    <Link to={'/themePage'}><p className={`col ${themepageName === 'themePage' ? 'active' : ''}`}>테마</p></Link>
                    <Link to={'/areaPage'}><p className={`col ${pageName === 'areaPage' ? 'active' : ''}`}>지역</p></Link>
                    <Link to={'/selectSearchPage'}><p className={`col ${pageName === 'selectSearchPage' ? 'active' : ''}`}>행사정보</p></Link>
                    <p className={`col ${pageName === 'aaa' ? 'active' : ''}`}>나의 행사</p>
                    <Link to={'/noticePage'}><p className={`col lastcol ${pageName === 'noticePage' ? 'active' : ''}`}>공지사항</p></Link>
                </nav>
                <div className="right">
                    {/*<form className="search">*/}
                    {/*    <input type="text" placeholder="어디로, 어떤 여행을 떠날 예정인가요?" />*/}
                    {/*    <input id="search-logo" type="submit" />*/}
                    {/*    <label className="search-logo" htmlFor="search-logo">*/}
                    {/*        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>*/}
                    {/*    </label>*/}
                    {/*</form>*/}
                    {!auth.token ? (
                        <button className='LoginLogout-btn' onClick={toggleModal}>
                            로그인
                        </button>
                    ) : (
                        <button className='LoginLogout-btn' onClick={handleLogout}>
                            로그아웃
                        </button>
                    )}
                    {!auth.token ? (
                        <div className="user-link" onClick={toggleModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                 fill={!auth.token ? "#333333" : "#000000"}>
                                <path
                                    d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                            </svg>
                        </div>
                    ) : (
                        <Link to={'/userInfo'}>
                            <div className="user-link">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                     width="24px"
                                     fill={!auth.token ? "#333333" : "#000000"}>
                                    <path
                                        d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                                </svg>
                            </div>
                        </Link>
                    )}

                </div>
            </div>
            <div className='sub-header'>
                <div className='list eventinfo-list'>
                    <Link to={'/freeAndPaidPage'}><p>무료 / 유료 행사</p></Link>
                    <p>진행 / 개최예정 행사</p>
                </div>
                <div className='list notice-list'>
                    <Link to={'/noticePage'}><p>공지사항</p></Link>
                    <Link to={'/inQuiryPage'}><p>문의사항</p></Link>
                </div>
            </div>
        </header>
    );
};

const LogoutButton = () => {
    const {auth, updateAuth} = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = async () => {
        // 서버에 로그아웃 이벤트를 알림
        try {
            await axios.post('/api/logout', {userName: auth.userName, userId: auth.userId});
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }


        // 로컬 스토리지에서 인증 정보 제거
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');

        // Auth 상태 업데이트
        updateAuth({ token: null, userName: null, userId: null, userRole: null });

        alert('로그아웃 하였습니다.');
        history.push('/');
    };

    return (
        <button className='logout-btn' onClick={handleLogout}>로그아웃</button>
    );
}

export default Header;
