import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import LogoutButton from './LogoutButton';

function MainNavigation({ openLoginModal }) {
    const { auth } = useContext(AuthContext);

    return (
        <nav>
            <ul>
                {!auth.token ? (
                    <>
                        <li><Link to="/signUp">회원가입</Link></li>
                        <li>
                            <button onClick={openLoginModal}>로그인</button>
                        </li>
                    </>
                ) : (
                    <li>
                        <LogoutButton />
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default MainNavigation;
