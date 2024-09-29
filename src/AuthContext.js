import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(); // 인증 컨텍스트 생성

export const useAuth = () => useContext(AuthContext); // 인증 컨텍스트 사용 훅

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token') || null,
        userName: localStorage.getItem('userName') || null,
        userId: localStorage.getItem('userId') || null,
        userRole: localStorage.getItem('userRole') || null
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('userName');
        const userId = localStorage.getItem('userId');
        const userRole = localStorage.getItem('userRole');

        if (token && userName && userId && userRole) {
            console.log("로컬 스토리지에서 유효한 값 읽어옴:", { token, userName, userId, userRole });
            setAuth({
                token,
                userName,
                userId,
                userRole
            });
        } else {
            console.warn("토큰이 유효하지 않음, 상태 초기화 생략");
        }
    }, []);


    // updateAuth에서 null도 허용하도록 처리
    const updateAuth = (newAuth) => {
        if (newAuth && newAuth.token !== null) {
            console.log("새로운 인증 정보 업데이트", newAuth);
            localStorage.setItem('token', newAuth.token);
            localStorage.setItem('userName', newAuth.userName);
            localStorage.setItem('userId', newAuth.userId);
            localStorage.setItem('userRole', newAuth.userRole);
            setAuth(newAuth);
        } else if (newAuth && newAuth.token === null) {
            console.log("로그아웃 처리");
            // 로그아웃 시에는 그대로 상태를 null로 업데이트
            setAuth({
                token: null,
                userName: null,
                userId: null,
                userRole: null
            });
        } else {
            console.error("Received invalid auth data:", newAuth);
        }
    };

    const logout = () => {
        console.log("로그아웃 호출됨");
        localStorage.clear(); // 로컬 스토리지 비우기
        updateAuth({ token: null, userName: null, userId: null, userRole: null });
    };

    return (
        <AuthContext.Provider value={{ auth, updateAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
