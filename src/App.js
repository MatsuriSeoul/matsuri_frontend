import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import DistrictDetail from "./DistrictDetail";



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
                        <Route path="/event-search" component={EventSearch}/> {/*행사 검색 기능*/}
                        <Route path="/event-fetch" component={TourList}/> {/*여행 정보 api 불러오기 테스트*/}

                        {/*공지사항 관련 라우터 경로*/}
                        <Route path="/create-notice" component={CreateNotice}/> {/*공지사항 작성*/}
                        <Route path="/notice/:noticeId" component={NoticeDetail}/> {/*공지사항 디테일*/}
                        <Route path="/edit/:noticeId" component={EditNotice}/> {/*공지사항 수정*/}
                        <Route path="/api/notice" component={NoticePage}/> {/*공지사항 테이블*/}
                        <Route path="/comment" component={CreateComment}/>{/*공지사항에 댓글 작성 */}
                        <Route path="/comment/notice/:noticeId" component={CommentList}/> {/*공지사항에 댓글 목록*/}

                        {/*마이페이지 관련 라우터 경로*/}
                        <Route path="/userProfile" component={MyPage}/>{/*유저 프로필*/}
                        <Route path="/change-password" component={PasswordChange}/> {/*비밀번호 변경*/}

                        {/*문의사항 라우터 경로*/}
                        <Route path="/inquiry-list" component={InquiryList}/>
                        <Route path="/create-inquiry" component={CreateInquiry}/>


                        {/*카테고리 라우터 경로*/}
                        <Route path="/category/:category" component={Category}/>
                        <Route path="/category" component={Category}/>

                        <Route path="/tourist-attraction/:contentid/:contenttypeid/detail"
                               component={TouristAttractionDetail}/>
                        <Route path="/cultural-facilities/:contentid/:contenttypeid/detail"
                               component={CulturalFacilityDetail}/>
                        <Route path="/events/:contentid/:contenttypeid/detail" component={EventDetail}/>
                        <Route path="/travel-courses/:contentid/:contenttypeid/detail" component={TravelCourseDetail}/>
                        <Route path="/leisure-sports/:contentid/:contenttypeid/detail" component={LeisureSportsDetail}/>
                        <Route path="/local-events/:contentid/:contenttypeid/detail" component={LocalEventDetail}/>
                        <Route exact path="/shopping-events/:contentid/:contenttypeid/detail"
                               component={ShoppingEventDetail}/>
                        <Route path="/food-events/:contentid/:contenttypeid/detail" component={FoodEventDetail}/>
                        <Route path="/seoul-events/:svcid/detail" component={SeoulEventDetail}/>
                        <Route path="/gyeonggi-events/:id/detail" component={GyeonggiEventDetail}/>

                        {/*지역 카테고리 라우터 경로*/}
                        <Route path="/region-select" component={RegionSelection}/>
                        <Route path="/region/gyeonggi" component={GyeonggiEventList}/>
                        <Route path="/region/seoul" component={SeoulEventList}/>
                        <Route path="/region/seoul/:subregionCode" component={SeoulEventList} />
                        <Route path="/region/incheon" component={IncheonEventList}/>
                        <Route path="/region/daejeon" component={DaejeonEventList}/>
                        <Route path="/region/gangwon" component={GangwonEventList}/>
                        <Route path="/region/busan" component={BusanEventList}/>
                        <Route path="/region/ulsan" component={UlsanEventList}/>
                        <Route path="/region/daegu" component={DaeguEventList}/>
                        <Route path="/region/jeonnam" component={JeonnamEventList}/>
                        <Route path="/region/jeonbuk" component={JeonbukEventList}/>
                        <Route path="/region/chungnam" component={ChungnamEventList}/>
                        <Route path="/region/chungbuk" component={ChungbukEventList}/>
                        <Route path="/region/gyeongnam" component={GyeongnamEventList}/>
                        <Route path="/region/gyeongbuk" component={GyeongbukEventList}/>
                        <Route path="/region/jeju" component={JejuEventList}/>

                        <Route path="/hotspot" component={HotSpotMainPage}/>
                        <Route path="/free-paid-events" component={FreePaidEvents} />
                        <Route path="/scheduled-events" component={ScheduledEvents} />

                        <Route path="/district/:contentid/:contenttypeid/detail" component={DistrictDetail} />

                        <Route path="/mainpage" component={MainPage} />
                        <Route path="/eventDetailPage/:apitype/:contentid/:contenttypeid" component={EventDetailPage} />
                        <Route path="/areaPage" component={AreaPage} />
                        <Route path="/hotPlacePage" component={HotPlacePage } />
                        <Route path="/themePage" component={ThemePage} />
                        <Route path="/themePage/*" component={ThemePage} />
                        <Route path="/noticePage" component={FNoticePage} />
                        <Route path="/selectSearchPage" component={SelectSearchPage} />
                        <Route path="/freeAndPaidPage/*" component={FreeAndPaidPage} />


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
/*jaman*/