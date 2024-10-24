import '../../css/MyPage/userInfo.css';
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";


const SlideTest = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

const UserInfo = () => {

    const [isLiked, setIsLiked] = useState(false);

    const handleLikeToggle = () => {
        setIsLiked(prevState => !prevState);
    };
    
    const modules = [Navigation];
    return (
        <div className="userInfoContainer">
            <div className="userProfileWrapper">
                <div className="userProfileTab">마이페이지</div>
                <div className="tailBox"></div>
                <div className="userProfileContainer">
                    <div className="profileIcon"><svg width="146" height="146" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M122.042 113.743C128.595 105.86 133.152 96.514 135.328 86.4967C137.505 76.4795 137.237 66.0854 134.547 56.1937C131.857 46.302 126.824 37.2037 119.874 29.6685C112.924 22.1333 104.261 16.3829 94.6183 12.9036C84.9759 9.42441 74.6373 8.31875 64.4771 9.6802C54.3169 11.0417 44.6341 14.8302 36.2478 20.7252C27.8614 26.6203 21.0183 34.4485 16.2972 43.5476C11.5761 52.6467 9.11605 62.7491 9.12502 73C9.12886 87.9019 14.3802 102.327 23.9577 113.743L23.8665 113.821C24.1858 114.204 24.5508 114.532 24.8793 114.911C25.29 115.381 25.7325 115.824 26.1568 116.28C27.4283 117.67 28.7514 118.993 30.1262 120.249C30.552 120.626 30.9779 120.994 31.4037 121.353C32.8637 122.616 34.3693 123.805 35.9206 124.921C36.1213 125.058 36.3038 125.236 36.5046 125.378V125.323C47.1902 132.843 59.9379 136.879 73.0046 136.879C86.0713 136.879 98.819 132.843 109.505 125.323V125.378C109.705 125.236 109.883 125.058 110.089 124.921C111.64 123.802 113.145 122.613 114.605 121.353C115.031 120.991 115.457 120.623 115.883 120.249C117.255 118.993 118.578 117.67 119.852 116.28C120.277 115.824 120.715 115.381 121.13 114.911C121.454 114.532 121.823 114.204 122.143 113.816L122.042 113.743ZM73 36.5C77.0607 36.5 81.0302 37.7042 84.4066 39.9602C87.7829 42.2162 90.4145 45.4227 91.9684 49.1743C93.5224 52.9259 93.929 57.0541 93.1368 61.0367C92.3446 65.0194 90.3892 68.6777 87.5178 71.5491C84.6465 74.4204 80.9882 76.3758 77.0055 77.168C73.0228 77.9602 68.8947 77.5536 65.1431 75.9997C61.3915 74.4457 58.1849 71.8142 55.9289 68.4378C53.6729 65.0615 52.4688 61.092 52.4688 57.0313C52.4688 51.5861 54.6319 46.3639 58.4822 42.5135C62.3326 38.6632 67.5548 36.5 73 36.5ZM36.532 113.743C36.6111 107.752 39.0457 102.034 43.3089 97.8243C47.5722 93.6149 53.3213 91.2531 59.3125 91.25H86.6875C92.6788 91.2531 98.4279 93.6149 102.691 97.8243C106.954 102.034 109.389 107.752 109.468 113.743C99.4618 122.76 86.4697 127.75 73 127.75C59.5303 127.75 46.5382 122.76 36.532 113.743Z" fill="#CACACA"/>
                    </svg>
                </div>
                    <div className="profileName">정민철</div>
                    <div className="profileEmail">xhflzm123@naver.com</div>
                </div>
            </div>
            
            <div className="profileContainer">
                <div className="profileInfoContainer">
                    <div className="headText">기본 정보</div>
                    <div className="profileInfo">
                        <div className="profileRow">
                        <div className="profileIcon profilePhoto">
                        <svg width="146" height="146" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M122.042 113.743C128.595 105.86 133.152 96.514 135.328 86.4967C137.505 76.4795 137.237 66.0854 134.547 56.1937C131.857 46.302 126.824 37.2037 119.874 29.6685C112.924 22.1333 104.261 16.3829 94.6183 12.9036C84.9759 9.42441 74.6373 8.31875 64.4771 9.6802C54.3169 11.0417 44.6341 14.8302 36.2478 20.7252C27.8614 26.6203 21.0183 34.4485 16.2972 43.5476C11.5761 52.6467 9.11605 62.7491 9.12502 73C9.12886 87.9019 14.3802 102.327 23.9577 113.743L23.8665 113.821C24.1858 114.204 24.5508 114.532 24.8793 114.911C25.29 115.381 25.7325 115.824 26.1568 116.28C27.4283 117.67 28.7514 118.993 30.1262 120.249C30.552 120.626 30.9779 120.994 31.4037 121.353C32.8637 122.616 34.3693 123.805 35.9206 124.921C36.1213 125.058 36.3038 125.236 36.5046 125.378V125.323C47.1902 132.843 59.9379 136.879 73.0046 136.879C86.0713 136.879 98.819 132.843 109.505 125.323V125.378C109.705 125.236 109.883 125.058 110.089 124.921C111.64 123.802 113.145 122.613 114.605 121.353C115.031 120.991 115.457 120.623 115.883 120.249C117.255 118.993 118.578 117.67 119.852 116.28C120.277 115.824 120.715 115.381 121.13 114.911C121.454 114.532 121.823 114.204 122.143 113.816L122.042 113.743ZM73 36.5C77.0607 36.5 81.0302 37.7042 84.4066 39.9602C87.7829 42.2162 90.4145 45.4227 91.9684 49.1743C93.5224 52.9259 93.929 57.0541 93.1368 61.0367C92.3446 65.0194 90.3892 68.6777 87.5178 71.5491C84.6465 74.4204 80.9882 76.3758 77.0055 77.168C73.0228 77.9602 68.8947 77.5536 65.1431 75.9997C61.3915 74.4457 58.1849 71.8142 55.9289 68.4378C53.6729 65.0615 52.4688 61.092 52.4688 57.0313C52.4688 51.5861 54.6319 46.3639 58.4822 42.5135C62.3326 38.6632 67.5548 36.5 73 36.5ZM36.532 113.743C36.6111 107.752 39.0457 102.034 43.3089 97.8243C47.5722 93.6149 53.3213 91.2531 59.3125 91.25H86.6875C92.6788 91.2531 98.4279 93.6149 102.691 97.8243C106.954 102.034 109.389 107.752 109.468 113.743C99.4618 122.76 86.4697 127.75 73 127.75C59.5303 127.75 46.5382 122.76 36.532 113.743Z" fill="#CACACA"/>
                        </svg>

                        </div>
                            <div className="profileDetails">
                                <div className="profileName">정민철</div>
                                <div className="profileEmail">xhflzm123@naver.com</div>
                            </div>
                            <button className="actionButton">실명 수정</button>
                        </div>

                        <div className="profileRow">
                            <div className="profileIcon phoneIcon">
                            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.4245 0H1.49185C0.736195 0 0.121826 0.5125 0.121826 1.14286V14.8571C0.121826 15.4875 0.736195 16 1.49185 16H11.4245C12.1801 16 12.7945 15.4875 12.7945 14.8571V1.14286C12.7945 0.5125 12.1801 0 11.4245 0ZM11.2532 14.7143H1.6631V1.28571H11.2532V14.7143ZM5.60191 12.8929C5.60191 13.0823 5.69212 13.264 5.8527 13.3979C6.01328 13.5319 6.23107 13.6071 6.45817 13.6071C6.68526 13.6071 6.90306 13.5319 7.06364 13.3979C7.22422 13.264 7.31443 13.0823 7.31443 12.8929C7.31443 12.7034 7.22422 12.5217 7.06364 12.3878C6.90306 12.2538 6.68526 12.1786 6.45817 12.1786C6.23107 12.1786 6.01328 12.2538 5.8527 12.3878C5.69212 12.5217 5.60191 12.7034 5.60191 12.8929Z" fill="#333333"/>
                            </svg>
                            </div>
                            <div className="profileText">+82 010-****-****</div>
                            <button className="actionButton">수정</button>
                        </div>

                        <div className="profileRow">
                            <div className="profileIcon emailIcon">
                            <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.0312 0.8125H0.96875C0.605762 0.8125 0.3125 1.06387 0.3125 1.375V12.625C0.3125 12.9361 0.605762 13.1875 0.96875 13.1875H18.0312C18.3942 13.1875 18.6875 12.9361 18.6875 12.625V1.375C18.6875 1.06387 18.3942 0.8125 18.0312 0.8125ZM17.2109 2.76016V11.9219H1.78906V2.76016L1.22305 2.38223L2.029 1.49453L2.90674 2.07988H16.0953L16.973 1.49453L17.779 2.38223L17.2109 2.76016ZM9.5 6.47266L2.02695 1.49277L1.221 2.38047L8.79248 7.42715C8.99395 7.56131 9.2418 7.63413 9.49692 7.63413C9.75204 7.63413 9.9999 7.56131 10.2014 7.42715L17.2109 2.76016L17.777 2.38223L16.971 1.49453L9.5 6.47266Z" fill="#333333"/>
                            </svg>

                            </div>
                            <div className="profileText">xh****@n****.com</div>
                            <button className="actionButton">수정</button>
                        </div>

                        <div className="profileRow">
                            <div className="profileIcon birthdayIcon">
                            <svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.704 0H1.2122C0.818804 0 0.500977 0.284375 0.500977 0.636364V13.3636C0.500977 13.7156 0.818804 14 1.2122 14H19.704C20.0974 14 20.4152 13.7156 20.4152 13.3636V0.636364C20.4152 0.284375 20.0974 0 19.704 0ZM18.8149 12.5682H2.10123V1.43182H18.8149V12.5682ZM12.6429 6.28409H15.3855C15.4144 6.28409 15.4366 6.2125 15.4366 6.125V5.17045C15.4366 5.08295 15.4144 5.01136 15.3855 5.01136H12.6429C12.614 5.01136 12.5918 5.08295 12.5918 5.17045V6.125C12.5918 6.2125 12.614 6.28409 12.6429 6.28409ZM12.7496 9.14773H16.8769C16.9636 9.14773 17.0347 9.07614 17.0347 8.98864V8.03409C17.0347 7.94659 16.9636 7.875 16.8769 7.875H12.7496C12.6629 7.875 12.5918 7.94659 12.5918 8.03409V8.98864C12.5918 9.07614 12.6629 9.14773 12.7496 9.14773ZM4.05709 10.2017H5.0328C5.12614 10.2017 5.20171 10.1361 5.20838 10.0526C5.29284 9.0483 6.23076 8.25284 7.36872 8.25284C8.50667 8.25284 9.4446 9.0483 9.52905 10.0526C9.53572 10.1361 9.61129 10.2017 9.70464 10.2017H10.6803C10.7045 10.2017 10.7283 10.1974 10.7505 10.1889C10.7727 10.1804 10.7927 10.168 10.8093 10.1523C10.826 10.1367 10.8389 10.1182 10.8473 10.098C10.8557 10.0778 10.8594 10.0562 10.8582 10.0347C10.7959 8.97472 10.1469 8.05199 9.20011 7.52699C9.61765 7.11632 9.84836 6.58074 9.84688 6.02557C9.84688 4.7946 8.73782 3.7983 7.37094 3.7983C6.00406 3.7983 4.895 4.7946 4.895 6.02557C4.895 6.60426 5.13948 7.12926 5.54176 7.52699C5.05975 7.79424 4.65719 8.16191 4.36847 8.59859C4.07974 9.03527 3.91343 9.52798 3.88373 10.0347C3.87484 10.1261 3.95485 10.2017 4.05709 10.2017ZM7.36872 4.99148C8.00215 4.99148 8.51779 5.45483 8.51779 6.02557C8.51779 6.59631 8.00215 7.05966 7.36872 7.05966C6.73528 7.05966 6.21965 6.59631 6.21965 6.02557C6.21965 5.45483 6.73528 4.99148 7.36872 4.99148Z" fill="#333333"/>
                            </svg>

                            </div>
                            <div className="profileText">1999.09.20</div>
                            <button className="actionButton">수정</button>
                        </div>

                        <div className="profileRow">
                            <div className="profileIcon passwordIcon">
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.9466 6.16H12.5476V2.24C12.5476 1.00275 11.3688 0 9.91436 0H4.81237C3.35789 0 2.17908 1.00275 2.17908 2.24V6.16H0.780148C0.416014 6.16 0.121826 6.41025 0.121826 6.72V13.44C0.121826 13.7497 0.416014 14 0.780148 14H13.9466C14.3107 14 14.6049 13.7497 14.6049 13.44V6.72C14.6049 6.41025 14.3107 6.16 13.9466 6.16ZM3.6603 2.24C3.6603 1.69925 4.17667 1.26 4.81237 1.26H9.91436C10.55 1.26 11.0664 1.69925 11.0664 2.24V6.16H3.6603V2.24ZM13.1237 12.74H1.60305V7.42H13.1237V12.74ZM6.78733 10.3075V11.235C6.78733 11.312 6.86139 11.375 6.95191 11.375H7.77481C7.86533 11.375 7.93939 11.312 7.93939 11.235V10.3075C8.10921 10.2038 8.23597 10.0569 8.30141 9.88802C8.36685 9.71912 8.36761 9.53692 8.30357 9.36764C8.23952 9.19835 8.11399 9.05072 7.94503 8.94599C7.77608 8.84126 7.57242 8.78483 7.36336 8.78483C7.15431 8.78483 6.95064 8.84126 6.78169 8.94599C6.61273 9.05072 6.4872 9.19835 6.42316 9.36764C6.35912 9.53692 6.35987 9.71912 6.42531 9.88802C6.49076 10.0569 6.61751 10.2038 6.78733 10.3075Z" fill="#333333"/>
                            </svg>

                            </div>
                            <div className="profileText">비밀번호</div>
                            <button className="actionButton">수정</button>
                        </div>
                    </div>
                </div>

                <div className="myLikeContainer">
                    <div className="headText">좋아요</div>
                    <div className='likeSwiper-wrapper'>
                        <div className='like-button-wrapper'>
                            <div className='like-button-prev'></div>
                            <div className='like-button-next'></div>
                        </div>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={10}
                            loop={true}
                            loopedSlides={3}
                            modules={modules}
                            navigation={{
                            prevEl: ".like-button-prev",
                            nextEl: ".like-button-next",
                            }}
                            className={"mySwiper likeSwiper"}
                        >
                            {SlideTest.map((slide) => (
                                <SwiperSlide key={slide.id}>
                                    <div className={`slide-content slide${slide.id}`}></div>
                                    <div className="like-btn" onClick={handleLikeToggle}>
                                        <img
                                            src={isLiked  ? "/img/icon/heart-fill.svg"  : "/img/icon/heart.svg"}
                                        ></img>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                <div className="myRecentContainer">
                    <div className="headText">최근 본 페이지</div>
                    <div className='recentSwiper-wrapper'>
                        <div className='recent-button-wrapper'>
                            <div className='recent-button-prev'></div>
                            <div className='recent-button-next'></div>
                        </div>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={10}
                            loop={true}
                            loopedSlides={3}
                            modules={modules}
                            navigation={{
                            prevEl: ".recent-button-prev",
                            nextEl: ".recent-button-next",
                            }}
                            className={"mySwiper recentSwiper"}
                        >
                            {SlideTest.map((slide) => (
                                <SwiperSlide key={slide.id}>
                                    <div className={`slide-content slide${slide.id}`}></div>
                                    <div className="like-btn" onClick={handleLikeToggle}>
                                        <img
                                            src={isLiked  ? "/img/icon/heart-fill.svg"  : "/img/icon/heart.svg"}
                                        ></img>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserInfo;