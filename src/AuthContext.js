import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(); // 인증 컨텍스트 생성

export const useAuth = () => useContext(AuthContext); // 인증 컨텍스트 사용 훅

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ // 인증 상태
        token: localStorage.getItem('token') || null, // 로컬 스토리지에서 토큰 가져오기
        userName: localStorage.getItem('userName') || null, // 로컬 스토리지에서 사용자 닉네임 가져오기
        userId: localStorage.getItem('userId') || null, // 로컬 스토리지에서 사용자 ID 가져오기
    });

    useEffect(() => { // 컴포넌트 마운트 시 실행
        const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
        const userName = localStorage.getItem('userName'); // 로컬 스토리지에서 사용자 닉네임 가져오기
        const userId = localStorage.getItem('userId'); // 로컬 스토리지에서 사용자 ID 가져오기

        if (token && userName && userId) { // 토큰과 사용자 닉네임, 사용자 ID가 있을 경우
            setAuth({ token, userName, userId }); // 인증 상태 설정
        }
    }, []);

    const updateAuth = (newAuth) => { // 인증 상태 업데이트 함수
        localStorage.setItem('token', newAuth.token); // 로컬 스토리지에 토큰 저장
        localStorage.setItem('userName', newAuth.userName); // 로컬 스토리지에 사용자 닉네임 저장
        localStorage.setItem('userId', newAuth.userId); // 로컬 스토리지에 사용자 ID 저장
        setAuth(newAuth); // 인증 상태 업데이트
    };

    const logout = () => { // 로그아웃
        localStorage.clear(); // 로컬 스토리지 비우기
        setAuth({ token: null, userName: null, userId: null, profileImage: null }); // 인증 상태 초기화
    };


    return (
        <AuthContext.Provider value={{ auth, updateAuth, logout }}> {/* 인증 컨텍스트 제공 */}
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
