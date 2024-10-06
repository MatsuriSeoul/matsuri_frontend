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
  const [firstImage, setFirstImage] = useState(null);
  const [images, setImages] = useState([]);
  const [similarEvents, setSimilarEvents] = useState([]);  // 유사한 여행지 데이터 상태

  useEffect(() => {
    // 행사 상세 정보 API 불러오기 (로컬 DB에서)
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

    // 첫 번째 이미지를 가져오기 위한 fetchAndSaveEvents 호출
    const fetchFirstImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/fetchAndSaveEvents`, {
          params: {
            numOfRows: '1',
            pageNo: '1',
            eventStartDate: '20240101'
          }
        });
        if (response.data.length > 0) {
          const event = response.data.find(event => event.contentid === contentid);
          if (event) {
            setFirstImage(event.firstimage);
          }
        }
      } catch (error) {
        console.error('첫 번째 이미지 가져오기 실패', error);
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
        setSimilarEvents(response.data.slice(0, 6));  // 최대 4개의 유사한 이벤트만 가져옴
      } catch (error) {
        console.error('유사한 여행지 불러오기 실패', error);
      }
    };
    // if(apitype === 'tourapi'){
    //   fetchDetail();
    //   fetchIntro();
    //   fetchFirstImage();
    //   fetchImages();
    // }else if(apitype === 'seoulapi'){
    //
    // }else if(apitype === 'gyeonggiapi'){
    //
    // }
    fetchDetail();
    fetchIntro();
    fetchFirstImage();
    fetchImages();
    fetchSimilarEvents();
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
        }else if (window.scrollY >= 1550) {
          setActiveTab('tab3');
        }else if (window.scrollY >= 900) {
          setActiveTab('tab2');
        }
      }else {
        setIsFixed(false);
        setActiveTab('tab1');
      }
      console.log(activeTab);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    const swiperInstance = swiperRef.current?.swiper;
    if (!swiperInstance) return;

    const updateProgress = () => {
      const { realIndex } = swiperInstance;
      setCurrentSlide(realIndex + 1);
    };

    swiperInstance.on("slideChange", updateProgress);
    updateProgress();

    return () => {
      swiperInstance.off("slideChange", updateProgress);
    };
  }, [swiperRef]);

  const totalSlides = images.length;

  const [likeToglled, setlLikeToggled] = useState(false);

  const handleLikeToggle = () => {
    setlLikeToggled(prevState => !prevState);
  };

  const scrollToTop = (position) => {
    window.scrollTo({ top: position, behavior: 'smooth' });
  };

  if (!detail || !intro) return <div>Loading...</div>;

  return (
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
            <div className="like">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
              >
                <path
                    d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
              </svg>
              <p className="like-count">1</p>
            </div>
            <div className="view">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
              >
                <path
                    d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
              </svg>
              <p className="view-count">230</p>
            </div>
          </div>
          <div className="right">
            <div className="share">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
              >
                <path
                    d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"/>
              </svg>
              <p className="share-count">1</p>
            </div>
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
                    <img className='detail-img' src={image.originimgurl} alt={`원본 이미지 ${index + 1}`}/>
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

        <div className="comment-container">
          <div className="title">
            <h1>여행톡</h1>
            <p className="comment-count">1</p>
          </div>
          <form className="comment-write">
          <textarea></textarea>
            <div className="btn">
              {/* <button className="img-update"></button> */}
              <input type="submit" value="작성"/>
            </div>
          </form>
          <div className="comment-list">
            {CommentTest.map((item) => (
                <div className="comment-box">
                  <div className="comment">
                    <div className="user-profile">
                      <img src={item.imgurl}></img>
                    </div>
                    <div className="comment-article">
                      <p className="comment-txt">{item.text}</p>
                      <div className="comment-userInfo">
                        <p className="userName">{item.name}</p>
                        <div className="wall"></div>
                        <p className="date">{item.date}</p>
                      </div>
                      <div className="comment-btn">
                        <div className="like-btn btn">
                          <div className="icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#5f6368"
                            >
                              <path
                                  d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
                            </svg>
                          </div>
                          <p className="count">1</p>
                        </div>
                        <div
                            className="subComment-btn btn"
                            onClick={() => handleSubCommentClick(item.id)}
                        >
                          <div className="icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#e8eaed"
                            >
                              <path
                                  d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
                            </svg>
                          </div>
                          <p className="count">2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {activeCommentIds.includes(item.id) &&
                      item.subComments.length > 0 && (
                          <div className="subComments">
                            {item.subComments.map((subComment) => (
                                <div className="subComment" key={subComment.id}>
                                  <div className="sub-icon"></div>
                                  <div className="user-profile">
                                    <img
                                        src={subComment.imgurl}
                                        alt={subComment.name}
                                    ></img>
                                  </div>
                                  <div className="comment-article">
                                    <p className="comment-txt">{subComment.text}</p>
                                    <div className="comment-userInfo">
                                      <p className="userName">{subComment.name}</p>
                                      <div className="wall"></div>
                                      <p className="date">{subComment.date}</p>
                                    </div>
                                    <div className="comment-btn">
                                      <div className="like-btn btn">
                                        <div className="like-icon icon">
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              height="24px"
                                              viewBox="0 -960 960 960"
                                              width="24px"
                                              fill="#5f6368"
                                          >
                                            <path
                                                d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
                                          </svg>
                                        </div>
                                        <p className="count">1</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            ))}
                            <div className="sub-container">
                              <div className="sub-icon"></div>
                              <form className="comment-write">
                                <textarea placeholder="답글을 입력하세요"></textarea>
                                <div className="btn">
                                  <input type="submit" value="작성"/>
                                </div>
                              </form>
                            </div>
                          </div>
                      )}
                </div>
            ))}
          </div>
        </div>

        <div className="trip-recommend">
          <div className="title">
            <h2>'개떼놀이터 인천점'와(과) 유사한 여행지 추천</h2>
            <img className="icon" src="/img/emoji/emoji1.png"></img>
          </div>
          <div className="recommend-list">
            {similarEvents.slice(0, 6).map((event, index) => (
                <Link to={`/eventDetailPage/tourapi/${event.contentid}/${event.contenttypeid}`}>
                  <div className='recommend-img' key={index}
                       style={{
                         backgroundImage: `url(${event.firstImage})`, // 이미지 URL을 url()로 감싸야 합니다.
                         backgroundSize: 'cover', // 이미지를 박스에 맞게 조절
                         backgroundPosition: 'center', // 이미지를 중앙에 위치
                       }}>
                    <div className="like-btn" onClick={handleLikeToggle}>
                      <img
                          src={likeToglled ? "/img/icon/heart-fill.svg" : "/img/icon/heart.svg"}
                      ></img>
                    </div>
                    <h3 className="img-title">{event.title}</h3>
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </article>
  );
};

export default Article;
