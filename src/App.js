import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
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
import NoticePage from "./NoticePage";


// frontend
import MainPage from './front-test/mainPage';
import EventDetailPage from './front-test/eventDetailPage';
import AreaPage from './front-test/areaPage';
import HotPlacePage from './front-test/hotPlacePage';
import ThemePage from './front-test/themePage';
import FNoticePage from './front-test/noticePage'
import SelectSearchPage from './front-test/eventInfo/selectSearchPage';
import FreeAndPaidPage from './front-test/eventInfo/freeAndPaidPage';
import UserInfo from "./front-test/MyPage/userInfo";
import InQuiryPage from "./front-test/InQuiryPage";
import NoticeView from "./front-test/notice/noticeView";
// css
import "./css/reset.css";
import openAITest from "./OpenAITest";
import EventItem from "./EventItem";
import UserRecommendations from "./UserRecommendations";
import PopularEvents from "./PopularEvents";
import AIPlanerSection1 from "./AIPlanerSection1";
import AIPlanerSection2 from "./AIPlanerSection2";
import AIPlanerSection3 from "./AIPlanerSection3";
import AIPlanerResult from "./AIPlanerResult";
import NoticeWrite from "./front-test/notice/noticeWrite";
import InQuiryView from "./front-test/inQuiry/inquiryView";
import IQWrite from "./front-test/inQuiry/inquiryWrite";
import OngoingUpComingPage from "./front-test/eventInfo/OngoingUpComingPage";
import AIPlanerCommentList from "./AIPlanerCommentList";
import Header from "./front-test/layout/header";
import LoginPage from "./front-test/login/LoginPage";


function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('login'); // 'login', 'findId', 'findPw', 'signUp'

    const toggleModal = () => {
        setModalContent('login');
        setIsModalOpen(!isModalOpen);
    };

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    return (
        <Router>
            <AuthProvider>
                <div>
                    <Header toggleModal={toggleModal} />
                    <Switch>
                        <Route path="/eventDetailPage/:apitype/:contentid/:contenttypeid" component={EventDetailPage} />
                        <Route path="/areaPage/:areaId" component={AreaPage} />
                        <Route path="/hotPlacePage/:hareaId" component={HotPlacePage} />
                        <Route path="/themePage/:themeItem?" component={ThemePage} />
                        <Route path="/noticePage/write" component={NoticeWrite} />
                        <Route path="/noticePage/:noticeId" component={NoticeView} />
                        <Route path="/noticePage" component={FNoticePage} />
                        <Route path="/inQuiryPage/iqWrite" component={IQWrite} />
                        <Route path="/inQuiryPage/inquiryView/:id" component={InQuiryView} />
                        <Route path="/inQuiryPage" component={InQuiryPage} />
                        <Route path="/selectSearchPage" component={SelectSearchPage} />
                        <Route path="/ongoingUpComingPage/:moreCategory?" component={OngoingUpComingPage} />
                        <Route path="/freeAndPaidPage/:moreCategory?" component={FreeAndPaidPage} />
                        <Route path="/userInfo" component={UserInfo} />
                        <Route path="/" component={MainPage} />

                        <Route path="/:category/events/:contentid/:contenttypeid/detail" component={EventDetail} />

                        {/*AI*/}
                        <Route path="/api/openai/prompt" component={openAITest}/>
                        <Route path="/api/openai/personalized-recommendation/:userId" component={UserRecommendations}/>
                        <Route path="/api/clicks/log" component={EventItem}/>
                        <Route path="/api/clicks/personalized" component={UserRecommendations}/>
                        <Route path="/api/clicks/personalized/recommendation" component={UserRecommendations}/>
                        <Route path="/api/clicks/category-data" component={UserRecommendations}/>
                        <Route path="/api/clicks/popular" component={PopularEvents}/>
                        <Route path="/plan-section1" component={AIPlanerSection1} />    {/*AI여행 플래너*/}
                        <Route path="/plan-section2" component={AIPlanerSection2} />    {/*AI여행 플래너*/}
                        <Route path="/plan-section3" component={AIPlanerSection3} />    {/*AI여행 플래너*/}
                        <Route path="/plan-result" component={AIPlanerResult} />    {/*AI여행 플래너*/}
                        <Route path="/api/comment/aiplaner/:category/:contentid/:contenttypeid/detail" component={AIPlanerCommentList}/>
                        <Route path="/api/openai/refresh-plan" component={AIPlanerResult}/>

                    </Switch>
                    {isModalOpen && (
                        <LoginPage content={modalContent}
                                   closeModal={() => setIsModalOpen(false)}
                                   openModal={openModal}
                        />
                    )}
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
