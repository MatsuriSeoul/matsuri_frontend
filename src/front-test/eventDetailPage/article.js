import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
// import LikeButton from "../../LikeButton";
import KaKaoMap from "../../KakaoMap";

import "swiper/css";
import "swiper/css/navigation";
import KakaoMap from "../../KakaoMap";
import LikeButton from "../../LikeButton";
import CommentEventList from "../../CommentEventList";


const CommentTest = [
  {
    id: 1,
    name: "최윤서",
    imgurl: "/img/test/emoji1.png",
    date: "2024.7.1",
    text: "실내 실외 알차게 구성 돼있어서 아이들과 방문하기 좋은 곳입니다",
    subComments: [
      {
        id: 1.1,
        name: "김영희",
        text: "이 댓글 너무 좋아요!",
        date: "2024.7.1",
        imgurl: "/img/test/emoji1.png",
      },
      {
        id: 1.2,
        name: "이철수",
        text: "저도 같은 생각이에요.",
        date: "2024.7.1",
        imgurl: "/img/test/emoji1.png",
      },
    ],
  },
  {
    id: 2,
    name: "임민섭",
    imgurl: "/img/test/emoji1.png",
    date: "2024.7.2",
    text: "아이들과 왔는데 놀거리도 다양하고 화랑이 있던 시절 역사이야기도 할수 있어서 즐거운 경험이 되네요.",
    subComments: [
      {
        id: 2.1,
        name: "박지혜",
        imgurl: "/img/test/emoji1.png",
        text: "잘 보고 갑니다.",
        date: "2024.7.2",
      },
    ],
  },
  {
    id: 3,
    name: "박성욱",
    imgurl: "/img/test/emoji1.png",
    date: "2024.7.3",
    text: "화랑배움터 ,4D 돔 영상관은 만 4세이상 이용가능해요, 특히 돔 영상관은 천장에 스크린이 있기 때문에 뒷쪽에 앉아서 보시는게 좋은것 같아요. 볼풀공 총 놀이 할수 있는 곳이 있는 귀화랑성을 아이가 가장 좋아했어요.안쪽에는 클라이밍 하고 미끄럼틀도 타고 놀수 있구요. 아이와 가볼만한곳으로 추천합니다.",
    subComments: [],
  },
];

const Article = () => {
  //content-api (EventDetail.js 참고)
  const { apitype, contentid, contenttypeid } = useParams();
  const [detail, setDetail] = useState(null);
  const [intro, setIntro] = useState(null);
  // const [firstImage, setFirstImage] = useState(null);
  const [images, setImages] = useState([]);
  const [similarEvents, setSimilarEvents] = useState([]);  // 유사한 여행지 데이터 상태

  useEffect(() => {

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
        const response = await axios.get(`http://localhost:8080/api/${apitype}/${contentid}/detail`);
        setDetail(response.data);
      } catch (error) {
        console.error('상세 정보 불러오기 실패', error);
      }
    };

    // 소개 정보 API 불러오기 (외부 API에서)
    const fetchIntro = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${apitype}/${contentid}/${contenttypeid}/intro`);
        setIntro(response.data);
      } catch (error) {
        console.error('소개 정보 불러오기 실패', error);
      }
    };

    // 이미지 정보 조회 API 호출하여 이미지 목록 가져오기
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${apitype}/${contentid}/images`);
        setImages(response.data);
      } catch (error) {
        console.error('이미지 정보 불러오기 실패', error);
      }
    };

    // 유사한 여행지 정보 가져오기
    const fetchSimilarEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${apitype}/${contenttypeid}/similar-events`);
        setSimilarEvents(response.data.slice(0, 6));
      } catch (error) {
        console.error('유사한 여행지 불러오기 실패', error);
      }
    };

    fetchDetail();
    fetchIntro();
    fetchImages();
    fetchSimilarEvents();
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

  if (!detail || !intro) return <div>Loading...</div>;

  return (
      <div className='edp-container'>
        <article className="edp-article">
          <div className="detail-title">
            <h1 className="title">{detail.title}</h1>
            <p className="address">{detail.addr1}</p>
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
              <LikeButton contentId={contentid} contentType={contenttypeid} />
            </div>
            <div className="right">
              {/*<div className="share">*/}
              {/*  <svg*/}
              {/*      xmlns="http://www.w3.org/2000/svg"*/}
              {/*      height="24px"*/}
              {/*      viewBox="0 -960 960 960"*/}
              {/*      width="24px"*/}
              {/*      fill="#e8eaed"*/}
              {/*  >*/}
              {/*    <path*/}
              {/*        d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"/>*/}
              {/*  </svg>*/}
              {/*  <p className="share-count">1</p>*/}
              {/*</div>*/}
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
          {images !== null ? (
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
                      <div className='detail-img'
                           style={{
                             backgroundImage: `url('${image.originimgurl}')`,
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                             backgroundRepeat: 'no-repeat'
                           }}
                      ></div>
                    </SwiperSlide>
                ))}

                {/* pagination-count */}
                <div className="swiper-pagination-info">
                  <p>
                    {currentSlide} / {totalSlides}
                  </p>
                </div>

                <div className="swiper-button swiper-button-prev"></div>
                <div className="swiper-button swiper-button-next"></div>
              </Swiper>
          ) : (
              <img src='/img/default_img.jpeg' className='default_img'></img>
          )}
          <div className="detail-info">
            <h1 className="title">상세정보</h1>
            <p className="info-txt">
              {detail.overview}
            </p>
          </div>

          {/* 지도 표시 부분 */}
          {detail.mapx && detail.mapy ? (
              <KakaoMap mapX={detail.mapx} mapY={detail.mapy} title={detail.title}/>
          ) : (
              <div></div>
          )}

          <ul className="info-list">
            <li>
              <p className="propertyName">
                <div className="bullet"></div>
                관람 가능 연령
              </p>
              <p className="propertyValue">{intro.agelimit || '-'}</p>
            </li>
            <li>
              <p className="propertyName">
                <div className="bullet"></div>
                예매처
              </p>
              <p className="propertyValue">{intro.bookingplace || '-'}</p>
            </li>
            <li>
              <p className="propertyName">
                <div className="bullet"></div>
                할인 정보
              </p>
              <p className="propertyValue">{intro.discountinfofestival || '-'}</p>
            </li>
            <li>
              <p className="propertyName">
                <div className="bullet"></div>
                행사 장소
              </p>
              <p className="propertyValue">{intro.eventplace || '-'}</p>
            </li>
            <li>
              <p className="propertyName">
                <div className="bullet"></div>
                행사 시작일
              </p>
              {intro.eventstartdate ? (
                  <p className="propertyValue">{intro.eventstartdate.slice(0, 4)}.
                    {intro.eventstartdate.slice(4, 6)}.
                    {intro.eventstartdate.slice(6)}</p>
              ) : (
                  <p className="propertyValue">-</p>
              )}
            </li>
            <li>
              <p className="propertyName">
                <div className="bullet"></div>
                행사 종료일
              </p>
              {intro.eventenddate ? (
                  <p className="propertyValue">{intro.eventenddate.slice(0, 4)}.
                    {intro.eventenddate.slice(4, 6)}.
                    {intro.eventenddate.slice(6)}</p>
              ) : (
                  <p className="propertyValue">-</p>
              )}
            </li>
            <li>
              <p className="propertyName">
                <div className="bullet"></div>
                행사 프로그램
              </p>
              <p className="propertyValue">{intro.program || '-'}</p>
            </li>
            <li>
              <p className="propertyName">
                <div className="bullet"></div>
                관람 소요 시간
              </p>
              <p className="propertyValue">{intro.spendtimefestival || '-'}</p>
            </li>
            <li>
              <p className="propertyName">
                <div className="bullet"></div>
                이용 요금
              </p>
              <p className="propertyValue">{intro.usetimefestival || '-'}</p>
            </li>
            <li>
              <p className="propertyName">
                <div className="bullet"></div>
                주최자 정보
              </p>
              <p className="propertyValue">{intro.sponsor1 || '-'}</p>
            </li>
            <li>
              <p className="propertyName">
                <div className="bullet"></div>
                주최자 연락처
              </p>
              <p className="propertyValue">{intro.sponsor1tel || '-'}</p>
            </li>
            <li>
              <p className="propertyName">
                <div className="bullet"></div>
                주관사 정보
              </p>
              <p className="propertyValue">{intro.sponsor2 || '-'}</p>
            </li>
          </ul>

          <div className="hashtag">
            <div className="tag">#음식</div>
            <div className="tag">#맛집</div>
          </div>
          <CommentEventList category={apitype} contentid={contentid} contenttypeid={contenttypeid} />


          {/*<div className="trip-recommend">*/}
          {/*  <div className="title">*/}
          {/*    <h2>'개떼놀이터 인천점'와(과) 유사한 여행지 추천</h2>*/}
          {/*    <img className="icon" src="/img/emoji/emoji1.png"></img>*/}
          {/*  </div>*/}
          {/*  <div className="recommend-list">*/}
          {/*    {similarEvents.slice(0, 6).map((event, index) => (*/}
          {/*        <Link to={`/eventDetailPage/tourapi/${event.contentid}/${event.contenttypeid}`}>*/}
          {/*          <div className='recommend-img' key={index}*/}
          {/*               style={{*/}
          {/*                 backgroundImage: `url(${event.firstimage || event.firstImage || event.first_image || event[1] || '/img/default_img.jpeg'})`,*/}
          {/*                 backgroundSize: 'cover', // 이미지를 박스에 맞게 조절*/}
          {/*                 backgroundPosition: 'center', // 이미지를 중앙에 위치*/}
          {/*               }}>*/}
          {/*            <div className="like-btn" onClick={handleLikeToggle}>*/}
          {/*              <img*/}
          {/*                  src={likeToglled ? "/img/icon/heart-fill.svg" : "/img/icon/heart.svg"}*/}
          {/*              ></img>*/}
          {/*            </div>*/}
          {/*            <h3 className="img-title">{event.title || event[0]}</h3>*/}
          {/*          </div>*/}
          {/*        </Link>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </article>
        <div className='side-container'>
          <div className='sub-sticky'></div>
          <aside className='sidebar'>
            <div className='hashtag-box'>
              <p>#공짜로</p>
              <p>#즐길 수 있다고??</p>
              <p>#궁금하지않아?</p>
              <p>#여기에 다 있어!!</p>
            </div>
            <div className='recommend-list'>
              <h2 className='main-title'>유료행사는 어떠신가요?</h2>
              {similarEvents.slice(0, 8).map((event) => (
                  <div className='recommend'>
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
                  </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

  );
};

export default Article;
