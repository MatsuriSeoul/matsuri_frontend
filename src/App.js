import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import SignUpForm from "./SignUpForm";
import MainNavigation from "./MainNavigation";
import LoginForm from "./LoginForm";

function App() {
    const [isLoginOpen, setLoginOpen] = useState(false);

    const openLoginModal = () => setLoginOpen(true);
    const closeLoginModal = () => setLoginOpen(false);
    useEffect(() => {
        // 서버 실행시 초기화
        localStorage.removeItem('token');
        localStorage.removeItem('userNick');
        localStorage.removeItem('userId');
    }, []);

    return (
        <Router>
            <AuthProvider>
                <div>
                    <MainNavigation openLoginModal={openLoginModal} />
                    <Switch>
                        <Route path="/signUp" component={SignUpForm} />
                    </Switch>
                    <LoginForm isOpen={isLoginOpen} onClose={closeLoginModal} />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
