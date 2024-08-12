import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import SignUpForm from "./SignUpForm";
import MainNavigation from "./MainNavigation";
import LoginForm from "./LoginForm";
import UserIdRecoveryForm from "./UserIdRecoveryForm";
import PasswordRecoveryForm from "./PasswordRecoveryForm";
import EventSearch from "./EventSearch";
import TourList from "./TourList";
import TourEventDetail from "./TourEventDetail";
import CreateNotice from "./CreateNotice";
import NoticeTable from "./NoticeTable";
import NoticeDetail from "./NoticeDetail";
import CreateComment from "./CreateComment";
import CommentList from "./CommentList";
import InquiryList from "./InquiryList";
import CreateInquiry from "./CreateInquiry";
import NoticePage from "./NoticePage";
import EditNotice from "./EditNotice";
import CreateInquiry from "./CreateInquiry";
import InquiryList from "./InquiryList";

function App() {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isUserIdRecoveryOpen, setUserIdRecoveryOpen] = useState(false);
    const [isPasswordRecoveryOpen, setPasswordRecoveryOpen] = useState(false);

    const openLoginModal = () => setLoginOpen(true);
    const closeLoginModal = () => setLoginOpen(false);
    const openUserIdRecoveryModal = () => setUserIdRecoveryOpen(true);
    const closeUserIdRecoveryModal = () => setUserIdRecoveryOpen(false);
    const openPasswordRecoveryModal = () => setPasswordRecoveryOpen(true);
    const closePasswordRecoveryModal = () => setPasswordRecoveryOpen(false);

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
                    <MainNavigation
                        openLoginModal={openLoginModal}
                        openUserIdRecoveryModal={openUserIdRecoveryModal}
                        openPasswordRecoveryModal={openPasswordRecoveryModal}
                    />
                    <Switch>
                        <Route path="/signUp" component={SignUpForm}/> {/*회원가입*/}
                        <Route path="/userid-recovery" component={UserIdRecoveryForm}/> {/* 아이디 찾기 폼 */}
                        <Route path="/password-recovery" component={PasswordRecoveryForm}/> {/* 비밀번호 찾기 폼 */}
                        <Route path="/event-search" component={EventSearch} />  {/*행사 검색 기능*/}
                        <Route path="/event-fetch" component={TourList} /> {/*여행 정보 api 불러오기 테스트*/}
                        <Route path="/event-fetch-detail" component={TourEventDetail} />  {/*id에 해당하는 상세 내용 확인 테스트*/}
                        <Route path="/create-notice" component={CreateNotice}/> {/*공지사항 작성*/}
                        <Route path="/edit/:noticeId" component={EditNotice}/> {/*공지사항 수정*/}
                        <Route path="/api/notice" component={NoticePage} /> {/*공지사항 페이지*/}
                        {/*<Route path="/api/notice" component={NoticeTable} /> /!*공지사항 보기*!/*/}
                        <Route path="/notice/:noticeId" component={NoticeDetail} /> {/*공지사항 상세 내용*/}
                        <Route path="/comment" component={CreateComment} />{/*공지사항에 댓글 작성 */}
                        <Route path="/comment/notice/:noticeId" component={CommentList}/> {/*공지사항에 댓글 목록*/}
                        <Route path="/create-inquiries" component={CreateInquiry}/> {/*문의사항 작성*/}
                        <Route path="/api/inquiries" component={InquiryList}/> {/*문의사항 보기*/}
                    </Switch>
                    <LoginForm
                        isOpen={isLoginOpen}
                        onClose={closeLoginModal}
                        onNavigateToUserIdRecovery={openUserIdRecoveryModal}
                        onNavigateToPasswordRecovery={openPasswordRecoveryModal}
                    />
                    <UserIdRecoveryForm
                        isOpen={isUserIdRecoveryOpen}
                        onClose={closeUserIdRecoveryModal}
                    />
                    <PasswordRecoveryForm
                        isOpen={isPasswordRecoveryOpen}
                        onClose={closePasswordRecoveryModal}
                    />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
