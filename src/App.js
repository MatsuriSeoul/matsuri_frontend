import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import SignUpForm from "./SignUpForm";
import MainNavigation from "./MainNavigation";
import LoginForm from "./LoginForm";
import UserIdRecoveryForm from "./UserIdRecoveryForm";
import PasswordRecoveryForm from "./PasswordRecoveryForm";
import EventSearch from "./EventSearch";
import TourList from "./TourList";
import CreateNotice from "./CreateNotice";
import CreateComment from "./CreateComment";
import CommentList from "./CommentList";
import Category from "./Category";
import TouristAttractionDetail from "./TouristAttractionDetail";
import CulturalFacilityDetail from './CulturalFacilityDetail';
import NoticePage from "./NoticePage";
import NoticeDetail from "./NoticeDetail";
import EditNotice from "./EditNotice";
import EventDetail from "./EventDetail";
import InquiryList from "./InquiryList";
import CreateInquiry from "./CreateInquiry";
import TravelCourseDetail from "./TravelCourseDetail";
import LeisureSportsDetail from "./LeisureSportsDetail";
import LocalEventDetail from "./LocalEventDetail";
import ShoppingEventDetail from "./ShoppingEventDetail";
import FoodEventDetail from "./FoodEventDetail";
import RegionSelection from "./RegionSelection";
import GyeonggiEventList from "./GyeonggiEventList";
import SeoulEventList from "./SeoulEventList";
import IncheonEventList from "./IncheonEventList";
import DaejeonEventList from "./DaejeonEventList";
import GangwonEventList from "./GangwonEventList";
import BusanEventList from "./BusanEventList";
import UlsanEventList from "./UlsanEventList";
import DaeguEventList from "./DaeguEventList";
import JeonnamEventList from "./JeonnamEventList";
import JeonbukEventList from "./JeonbukEventList";
import ChungnamEventList from "./ChungnamEventList";
import ChungbukEventList from "./ChungbukEventList";
import GyeongnamEventList from "./GyeongnamEventList";
import GyeongbukEventList from "./GyeongbukEventList";
import JejuEventList from "./JejuEventList";
import MyPage from "./MyPage";
import PasswordChange from "./PasswordChange";
import SeoulEventDetail from "./SeoulEventDetail";
import GyeonggiEventDetail from "./GyeonggiEventDetail";
import HotSpotMainPage from "./HotSpotMainPage";
import FreePaidEvents from "./FreePaidEvents";
import ScheduledEvents from "./ScheduledEvents";

// frontend
import MainPage from './front-test/mainPage';
import EventDetailPage from './front-test/eventDetailPage';
import AreaPage from './front-test/areaPage';
import HotPlacePage from './front-test/hotPlacePage';
import ThemePage from './front-test/themePage';
import FNoticePage from './front-test/noticePage'
import SelectSearchPage from './front-test/eventInfo/selectSearchPage';
import FreeAndPaidPage from './front-test/eventInfo/freeAndPaidPage';

// css
import "./css/reset.css";

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
                    <MainNavigation
                        openLoginModal={openLoginModal}
                        openUserIdRecoveryModal={openUserIdRecoveryModal}
                        openPasswordRecoveryModal={openPasswordRecoveryModal}
                    />
                    <div>
                        <Routes>
                            <Route path="/signUp" element={<SignUpForm />} /> {/*회원가입*/}
                            <Route path="/userid-recovery" element={<UserIdRecoveryForm />} /> {/* 아이디 찾기 폼 */}
                            <Route path="/password-recovery" element={<PasswordRecoveryForm />} /> {/* 비밀번호 찾기 폼 */}
                            <Route path="/event-search" element={<EventSearch />} /> {/*행사 검색 기능*/}
                            <Route path="/event-fetch" element={<TourList />} /> {/*여행 정보 api 불러오기 테스트*/}

                            {/*공지사항 관련 라우터 경로*/}
                            <Route path="/create-notice" element={<CreateNotice />} /> {/*공지사항 작성*/}
                            <Route path="/notice/:noticeId" element={<NoticeDetail />} /> {/*공지사항 디테일*/}
                            <Route path="/edit/:noticeId" element={<EditNotice />} /> {/*공지사항 수정*/}
                            <Route path="/api/notice" element={<NoticePage />} /> {/*공지사항 테이블*/}
                            <Route path="/comment" element={<CreateComment />} /> {/*공지사항에 댓글 작성 */}
                            <Route path="/comment/notice/:noticeId" element={<CommentList />} /> {/*공지사항에 댓글 목록*/}

                            {/*마이페이지 관련 라우터 경로*/}
                            <Route path="/userProfile" element={<MyPage />} /> {/*유저 프로필*/}
                            <Route path="/change-password" element={<PasswordChange />} /> {/*비밀번호 변경*/}

                            {/*문의사항 라우터 경로*/}
                            <Route path="/inquiry-list" element={<InquiryList />} />
                            <Route path="/create-inquiry" element={<CreateInquiry />} />

                            {/*카테고리 라우터 경로*/}
                            <Route path="/category/:category" element={<Category />} />
                            <Route path="/category" element={<Category />} />

                            <Route path="/tourist-attraction/:contentid/:contenttypeid/detail" element={<TouristAttractionDetail />} />
                            <Route path="/cultural-facilities/:contentid/:contenttypeid/detail" element={<CulturalFacilityDetail />} />
                            <Route path="/events/:contentid/:contenttypeid/detail" element={<EventDetail />} />
                            <Route path="/travel-courses/:contentid/:contenttypeid/detail" element={<TravelCourseDetail />} />
                            <Route path="/leisure-sports/:contentid/:contenttypeid/detail" element={<LeisureSportsDetail />} />
                            <Route path="/local-events/:contentid/:contenttypeid/detail" element={<LocalEventDetail />} />
                            <Route exact path="/shopping-events/:contentid/:contenttypeid/detail" element={<ShoppingEventDetail />} />
                            <Route path="/food-events/:contentid/:contenttypeid/detail" element={<FoodEventDetail />} />
                            <Route path="/seoul-events/:svcid/detail" element={<SeoulEventDetail />} />
                            <Route path="/gyeonggi-events/:id/detail" element={<GyeonggiEventDetail />} />

                            {/*지역 카테고리 라우터 경로*/}
                            <Route path="/region-select" element={<RegionSelection />} />
                            <Route path="/region/gyeonggi" element={<GyeonggiEventList />} />
                            <Route path="/region/seoul" element={<SeoulEventList />} />
                            <Route path="/region/seoul/:subregionCode" element={<SeoulEventList />} />
                            <Route path="/region/incheon" element={<IncheonEventList />} />
                            <Route path="/region/daejeon" element={<DaejeonEventList />} />
                            <Route path="/region/gangwon" element={<GangwonEventList />} />
                            <Route path="/region/busan" element={<BusanEventList />} />
                            <Route path="/region/ulsan" element={<UlsanEventList />} />
                            <Route path="/region/daegu" element={<DaeguEventList />} />
                            <Route path="/region/jeonnam" element={<JeonnamEventList />} />
                            <Route path="/region/jeonbuk" element={<JeonbukEventList />} />
                            <Route path="/region/chungnam" element={<ChungnamEventList />} />
                            <Route path="/region/chungbuk" element={<ChungbukEventList />} />
                            <Route path="/region/gyeongnam" element={<GyeongnamEventList />} />
                            <Route path="/region/gyeongbuk" element={<GyeongbukEventList />} />
                            <Route path="/region/jeju" element={<JejuEventList />} />

                            <Route path="/hotspot" element={<HotSpotMainPage />} />
                            <Route path="/free-paid-events" element={<FreePaidEvents />} />
                            <Route path="/scheduled-events" element={<ScheduledEvents />} />

                            <Route path="/mainpage" element={<MainPage />} />
                            <Route path="/eventDetailPage" element={<EventDetailPage />} />
                            <Route path="/areaPage" element={<AreaPage />} />
                            <Route path="/hotPlacePage" element={<HotPlacePage />} />
                            <Route path="/themePage" element={<ThemePage />} />
                            <Route path="/themePage/*" element={<ThemePage />} />
                            <Route path="/noticePage" element={<FNoticePage />} />
                            <Route path="/selectSearchPage" element={<SelectSearchPage />} />
                            <Route path="/freeAndPaidPage/*" element={<FreeAndPaidPage />} />
                        </Routes>
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
/*jaman*/