import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import "swiper/css";
import "swiper/css/navigation";
import KakaoMap from "../../KakaoMap";
import LikeButton from "../../LikeButton";
import CommentEventList from "../../CommentEventList";
import {useAuth} from "../../AuthContext";
import ReviewComponent from "../../ReviewComponent";



const Article = () => {
  //content-api (EventDetail.js 참고)
  const { apitype, contentid, contenttypeid } = useParams();
  const [detail, setDetail] = useState(null);
  const [intro, setIntro] = useState(null);
  // const [firstImage, setFirstImage] = useState(null);
  const [images, setImages] = useState([]);
  const [similarEvents, setSimilarEvents] = useState([]);  // 유사한 여행지 데이터 상태
  const { auth } = useAuth();


  const categoryTypeMap = {
    12: "tourist-attractions",  //관광지
    14: "cultural-facilities",  //문화시설
    15: "events",               //행사
    25: "travel-courses",   //여행코스
    28: "leisure-sports",   //레포츠
    32: "local-events",     //숙박
    38: "shopping-events",  //쇼핑
    39: "food-events",       //음식
    'seoul-events': "seoul-events",
    'gyeonggi-events': "gyeonggi-events"
  };

  const likeCategoryTypeMap = {
    12: "TouristAttractionDetail",
    14: "CulturalFacilityDetail",
    15: "EventDetail",
    25: "TravelCourseDetail",
    28: "LeisureSportsEventDetail",
    32: "LocalEventDetail",
    38: "ShoppingEventDetail",
    39: "FoodEventDetail",
    'seoul-events': "SeoulEventDetail",
    'gyeonggi-events': "GyeonggiEventDetail"
  };

  let categoryType = categoryTypeMap[contenttypeid] || "unknown";
  let likeCategoryType = likeCategoryTypeMap[contenttypeid] || "UnknownDetail";

  // 클릭 로그 저장 로직 추가
  const logClick = async (contentId, contentTypeId) => {
    if (!auth || !auth.token) {

      return;
    }

    try {
      const clickData = {
        contentid: contentId,
        category: contentTypeId,
      };

      // 클릭 로그를 서버에 저장하는 API 호출
      const response = await axios.post('http://localhost:8080/api/clicks/log', clickData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      });


    } catch (error) {
      console.error('로그 저장 중 오류:', error);
    }
  };

  useEffect(() => {
    categoryType = categoryTypeMap[contenttypeid] || "unknown";
    likeCategoryType = likeCategoryTypeMap[contenttypeid] || "UnknownDetail";

    // 페이지에 접근할 때 클릭 로그를 저장
    logClick(contentid, contenttypeid);  // 로그 저장 로직 실행

    window.scrollTo({
      top: 0,
      // behavior: 'smooth' // 부드러운 스크롤 효과
    });

    const fetchSeoulEventDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/seoul-events/${contentid}`);
        console.log(response.data);  // 서버 응답을 콘솔에 출력
        setDetail(response.data);
      } catch (error) {
        console.error('서울 이벤트 상세 정보 가져오기 실패: ' + error);
      }
    };

    const fetchGyeonggiEventDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/gyeonggi-events/${contentid}`);
        console.log(response.data);  // 서버 응답을 콘솔에 출력
        setDetail(response.data);
      } catch (error) {
        console.error('경기 이벤트 상세 정보 가져오기 실패: ' + error);
      }
    };

    // 상세 정보 API 불러오기 (로컬 DB에서)
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${categoryType}/${contentid}/detail`);
        setDetail(response.data);
        console.log('setDetail: ', response.data);
      } catch (error) {
        console.error('상세 정보 불러오기 실패', error);
      }
    };

    // 소개 정보 API 불러오기 (외부 API에서)
    const fetchIntro = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${categoryType}/${contentid}/${contenttypeid}/intro`);
        setIntro(response.data);
      } catch (error) {
        console.error('소개 정보 불러오기 실패', error);
      }
    };

    // 이미지 정보 조회 API 호출하여 이미지 목록 가져오기
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${categoryType}/${contentid}/images`);
        setImages(response.data);
      } catch (error) {
        console.error('이미지 정보 불러오기 실패', error);
      }
    };

    // 유사한 여행지 정보 가져오기
    const fetchSimilarEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${categoryType}/${contenttypeid}/similar-events`);
        setSimilarEvents(response.data.slice(0, 6));
      } catch (error) {
        console.error('유사한 여행지 불러오기 실패', error);
      }
    };
    // 서울/경기 유사한 여행지 정보 가져오기
    const seoulfetchSimilarEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/15/similar-events`);
        setSimilarEvents(response.data.slice(0, 6));
      } catch (error) {
        console.error('유사한 여행지 불러오기 실패', error);
      }
    };

    if(contenttypeid === 'seoul-events'){
      fetchSeoulEventDetail();
      seoulfetchSimilarEvents();
    }else if(contenttypeid === 'gyeonggi-events'){
      fetchGyeonggiEventDetail();
      seoulfetchSimilarEvents();
    }
    else{
      fetchDetail();
      fetchIntro();
      fetchImages();
      fetchSimilarEvents();
    }
    console.log('api 불러오기 성공');
    console.log('images: ' + images + 'detail: ' + detail + 'intro: ' + intro );

  }, [contentid, contenttypeid]);

  //홈페이지 링크 복사하기
  const pageLinkCopy = () => {
    const url = extractUrl(detail.homepage); // URL 추출
    if (url) {
      navigator.clipboard.writeText(url).then(() => {
        alert(`주소가 복사되었습니다.\n${url}`);
      }).catch(err => {
        console.error('복사 실패:', err);
      });
    } else {
      alert('홈페이지 링크가 존재하지 않습니다.'); // URL이 없을 때 경고 메시지
    }
  };
  const extractUrl = (link) => {
    const regex = /href="(.*?)"/; // href 속성의 URL을 찾는 정규 표현식
    const match = link.match(regex);
    return match ? match[1] : null; // URL 반환 또는 null
  };

  const [currentSlide, setCurrentSlide] = useState(1);
  const swiperRef = useRef(null);
  const [activeCommentIds, setActiveCommentIds] = useState([]);
  const [isFixed, setIsFixed] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');


  const handleSubCommentClick = (commentId) => {
    setActiveCommentIds((prevIds) =>
        prevIds.includes(commentId)
            ? prevIds.filter((id) => id !== commentId)
            : [...prevIds, commentId]
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsFixed(true);
        if (window.scrollY >= 2250) {
          setActiveTab('tab4');
        } else if (window.scrollY >= 1550) {
          setActiveTab('tab3');
        } else if (window.scrollY >= 900) {
          setActiveTab('tab2');
        }
      } else {
        setIsFixed(false);
        setActiveTab('tab1');
      }
      console.log(activeTab);
    };

    handleScroll(); // 초기 스크롤 위치 체크
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const swiperInstance = swiperRef.current?.swiper;
      console.log('Swiper Instance:', swiperInstance); // Swiper 인스턴스 로그

      if (swiperInstance) {
        const updateProgress = () => {
          const { realIndex } = swiperInstance;
          setCurrentSlide(realIndex + 1);
        };

        swiperInstance.on("slideChange", updateProgress);
        updateProgress();

        // 컴포넌트 언마운트 시 이벤트 리스너 해제
        return () => {
          swiperInstance.off("slideChange", updateProgress);
        };
      }
    }, 0); // 렌더링이 완료된 후에 접근

    return () => {
      clearTimeout(timeoutId);
    };
  }, [swiperRef, images]);

  let totalSlides = 0;

  if(images !== null){
    totalSlides = images.length;
  }
  const [likeToglled, setlLikeToggled] = useState(false);

  const handleLikeToggle = () => {
    setlLikeToggled(prevState => !prevState);
  };

  const scrollToTop = (position) => {
    window.scrollTo({ top: position, behavior: 'smooth' });
  };

  if (!detail) return <div>Loading...</div>;

  return (
      <div className='edp-container'>
        <article className="edp-article">
          <div className="detail-title">
            <h1 className="title">{detail.title || detail.svcnm}</h1>
            <p className="address">{detail.addr1 || detail.placenm}</p>
            <p className="sup-info">더 자세한 내용은 링크를 통해 확인하세요.
              <div className='link' onClick={pageLinkCopy}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                     fill="#e8eaed">
                  <path
                      d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/>
                </svg>
              </div>
            </p>
          </div>
          <div className="icons">
            <div className="likeView">
              <LikeButton contentId={contentid} contentType={likeCategoryType} />
            </div>
            <div className="right">
            </div>
          </div>
          <nav className={`scroll-tab ${isFixed ? 'active' : ''}`}>
            <div className={`tab tab2 ${activeTab === 'tab1' ? 'active' : ''}`}
                 onClick={() => scrollToTop(300)}>
              <p>사진보기</p>
            </div>
            <div className="wall"></div>
            <div className={`tab tab2 ${activeTab === 'tab2' ? 'active' : ''}`}
                 onClick={() => scrollToTop(900)}>
              <p>상세보기</p>
            </div>
            <div className="wall"></div>
            <div className={`tab tab3 ${activeTab === 'tab3' ? 'active' : ''}`}
                 onClick={() => scrollToTop(1550)}>
              <p>여행톡</p>
            </div>
            <div className="wall"></div>
            <div className={`tab tab4 ${activeTab === 'tab4' ? 'active' : ''}`}
                 onClick={() => scrollToTop(2250)}>
              <p>추천행사</p>
            </div>
          </nav>
          {images.length > 0 ? (
              <Swiper
                  ref={swiperRef}
                  slidesPerView={1}
                  modules={[Navigation]}
                  navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                  }}
                  className="mySwiper edpArticle-swiper"
              >

                {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                      className='detail-img'
                      style={{
                        backgroundImage: `url('${image.originimgurl}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                  }}
                  ></div>
                </SwiperSlide>
                ))}
                <div className="swiper-pagination-info">
                  <p>
                    {currentSlide} / {totalSlides}
                  </p>
                </div>

                <div className="swiper-button swiper-button-prev"></div>
                <div className="swiper-button swiper-button-next"></div>
              </Swiper>
          ) : (
              <>
                {detail.imgurl ? (
                      <div
                          className='default_img'
                          style={{
                            backgroundImage: `url('${detail.imgurl}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                      ></div>
                  ) : (
                      <img src='/img/default_img.jpeg' className='default_img' alt='Default'/>
                  )}
              </>
          )}
            <div className="detail-info">
            <h1 className="title">상세정보</h1>
            <p className="info-txt">
              {detail.overview}
            </p>
          </div>

          {/* 지도 표시 부분 */}
          {(detail.mapx || detail.mapX || detail.x) && (detail.mapy || detail.mapY || detail.y)  ? (
              <KakaoMap mapX={detail.mapx || detail.mapX || detail.x} mapY={detail.mapy || detail.mapY || detail.y} title={detail.title || detail.svcnm}/>
          ) : (
              <div></div>
          )}

          {/*<ul className="info-list">*/}
          {/*  <li>*/}
          {/*    <p className="propertyName">*/}
          {/*      <div className="bullet"></div>*/}
          {/*      관람 가능 연령*/}
          {/*    </p>*/}
          {/*    <p className="propertyValue">{intro.agelimit || '-'}</p>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <p className="propertyName">*/}
          {/*      <div className="bullet"></div>*/}
          {/*      예매처*/}
          {/*    </p>*/}
          {/*    <p className="propertyValue">{intro.bookingplace || '-'}</p>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <p className="propertyName">*/}
          {/*      <div className="bullet"></div>*/}
          {/*      할인 정보*/}
          {/*    </p>*/}
          {/*    <p className="propertyValue">{intro.discountinfofestival || '-'}</p>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <p className="propertyName">*/}
          {/*      <div className="bullet"></div>*/}
          {/*      행사 장소*/}
          {/*    </p>*/}
          {/*    <p className="propertyValue">{intro.eventplace || '-'}</p>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <p className="propertyName">*/}
          {/*      <div className="bullet"></div>*/}
          {/*      행사 시작일*/}
          {/*    </p>*/}
          {/*    {intro.eventstartdate ? (*/}
          {/*        <p className="propertyValue">{intro.eventstartdate.slice(0, 4)}.*/}
          {/*          {intro.eventstartdate.slice(4, 6)}.*/}
          {/*          {intro.eventstartdate.slice(6)}</p>*/}
          {/*    ) : (*/}
          {/*        <p className="propertyValue">-</p>*/}
          {/*    )}*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <p className="propertyName">*/}
          {/*      <div className="bullet"></div>*/}
          {/*      행사 종료일*/}
          {/*    </p>*/}
          {/*    {intro.eventenddate ? (*/}
          {/*        <p className="propertyValue">{intro.eventenddate.slice(0, 4)}.*/}
          {/*          {intro.eventenddate.slice(4, 6)}.*/}
          {/*          {intro.eventenddate.slice(6)}</p>*/}
          {/*    ) : (*/}
          {/*        <p className="propertyValue">-</p>*/}
          {/*    )}*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <p className="propertyName">*/}
          {/*      <div className="bullet"></div>*/}
          {/*      행사 프로그램*/}
          {/*    </p>*/}
          {/*    <p className="propertyValue">{intro.program || '-'}</p>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <p className="propertyName">*/}
          {/*      <div className="bullet"></div>*/}
          {/*      관람 소요 시간*/}
          {/*    </p>*/}
          {/*    <p className="propertyValue">{intro.spendtimefestival || '-'}</p>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <p className="propertyName">*/}
          {/*      <div className="bullet"></div>*/}
          {/*      이용 요금*/}
          {/*    </p>*/}
          {/*    <p className="propertyValue">{intro.usetimefestival || '-'}</p>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <p className="propertyName">*/}
          {/*      <div className="bullet"></div>*/}
          {/*      주최자 정보*/}
          {/*    </p>*/}
          {/*    <p className="propertyValue">{intro.sponsor1 || '-'}</p>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <p className="propertyName">*/}
          {/*      <div className="bullet"></div>*/}
          {/*      주최자 연락처*/}
          {/*    </p>*/}
          {/*    <p className="propertyValue">{intro.sponsor1tel || '-'}</p>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <p className="propertyName">*/}
          {/*      <div className="bullet"></div>*/}
          {/*      주관사 정보*/}
          {/*    </p>*/}
          {/*    <p className="propertyValue">{intro.sponsor2 || '-'}</p>*/}
          {/*  </li>*/}
          {/*</ul>*/}

          <div className="hashtag">
            <div className="tag">#음식</div>
            <div className="tag">#맛집</div>
          </div>
          {categoryType === 'seoul-events' ? (
              <CommentEventList category="seoul-events" svcid={detail.svcid} />
          ) : (
              <CommentEventList category={apitype} contentid={contentid} contenttypeid={contenttypeid} />
          )}
        </article>
        <div className='side-container'>
          <div className='sub-sticky'></div>
          <aside className='sidebar'>
            <div className='recommend-list'>
              <h2 className='main-title'>유사한 여행지 추천</h2>
              {similarEvents.slice(0, 8).map((event) => (
                  <Link to={`/eventDetailPage/events/${event.contentid}/${event.contenttypeid}`} className="recommend">
                    <div className='txt'>
                      <h3 className='title'>{event.title || event.svcnm}</h3>
                      <p className='addr'>{event.addr1 || event.placenm}</p>
                    </div>

                    <div className="img"
                         style={{
                           backgroundImage: `url(${event.firstimage || event.firstImage || event.first_image || event[1] || '/img/default_img.jpeg'})`,
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                         }}
                    ></div>
                  </Link>
              ))}
              {/*네이버 블로그 리뷰 */}
              <ReviewComponent query={detail.title} />
            </div>
          </aside>
        </div>
      </div>

  );
};

export default Article;
