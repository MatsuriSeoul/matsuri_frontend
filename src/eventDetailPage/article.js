import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "../css/eventDetailPage/article.css";
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
        if (window.scrollY > 2300) {
          setActiveTab('tab4');
        }else if (window.scrollY > 1500) {
          setActiveTab('tab3');
        }else if (window.scrollY > 800) {
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

  const totalSlides = SlideTest.length;

  const [likeToglled, setlLikeToggled] = useState(false);

  const handleLikeToggle = () => {
    setlLikeToggled(prevState => !prevState);
  };

  const scrollToTop = (position) => {
    window.scrollTo({ top: position, behavior: 'smooth' });
  };

  return (
    <article className="edp-article">
      <div className="detail-title">
        <h1 className="title">개떼놀이터 인천점</h1>
        <p className="address">인천광역시 계양구</p>
        <p className="sup-info">반려동물 놀이공간과 함께 이용할 수 있는 식당</p>
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
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
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
              <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
            </svg>
            <p className="view-count">230</p>
          </div>
        </div>
        <div className="right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M640-640v-120H320v120h-80v-200h480v200h-80Zm-480 80h640-640Zm560 100q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320Zm80 80H240v-160H80v-240q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v240H720v160Zm80-240v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160h80v-80h480v80h80Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z" />
          </svg>
          <div className="share">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" />
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
        onClick={() => scrollToTop(1650)}>
          <p>여행톡</p>
        </div>
        <div className="wall"></div>
        <div className={`tab tab4 ${activeTab === 'tab4' ? 'active' : ''}`}
        onClick={() => scrollToTop(2350)}>
          <p>추천행사</p>
        </div>
      </nav>

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
        {SlideTest.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={`detail-img id${item.id}`}></div>
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

      <div className="detail-info">
        <h1 className="title">상세정보</h1>
        <p className="info-txt">
          개떼놀이터 인천점은 자체 주차장이 있어 자차로 이용하기 편리하다.
          개떼놀이터는 반려동물과 입장이 가능하다. 이곳은 반려동물 놀이터와
          수영장 셀프 샤워시설까지 갖추고 있어 반려 동물과 함께 많은 손님들이
          찾는다. 반려동물은 입장할 때 숫자에 상관없이 입장이 가능하다(단
          대형견은 6개월 미만 몸무게 18킬로 미만). 놀이터만 이용할 경우 음료만
          주문하면 된다. 식사할 경우 대표 메뉴는 매콤 오징어 삼겹살 불고 기,
          달콤 간장 불고기, 콩나물 오징어 삼겹살 불고기, 모둠 버섯 소불고기가
          있다. 그 외 메뉴로 부대찌개, 해물순두부찌개, 반려동물 간식이 많 이
          나간다. 주변에 경인 아라뱃길이 있어 방문 전후에 둘러보기 좋다.
        </p>
      </div>

      <div className="map"></div>
      <ul className="info-list">
        <li>
          <p className="propertyName">
            <div className="bullet"></div>문의 및 안내
          </p>
          <p className="propertyValue">0507-1413-1950</p>
        </li>
        <li>
          <p className="propertyName">
            <div className="bullet"></div>홈페이지
          </p>
          <p className="propertyValue">
            http://www.instagram.com/mydog_incheo n
          </p>
        </li>
        <li>
          <p className="propertyName">
            <div className="bullet"></div>주소
          </p>
          <p className="propertyValue">인천광역시 계양구 다남로 278</p>
        </li>
        <li>
          <p className="propertyName">
            <div className="bullet"></div>영업시간
          </p>
          <p className="propertyValue">11:00~01:00 (식사 라스트 오더 22:00)</p>
        </li>
        <li>
          <p className="propertyName">
            <div className="bullet"></div>휴일
          </p>
          <p className="propertyValue">연중무휴</p>
        </li>
        <li>
          <p className="propertyName">
            <div className="bullet"></div>주차
          </p>
          <p className="propertyValue">있음</p>
        </li>
        <li>
          <p className="propertyName">
            <div className="bullet"></div>대표메뉴
          </p>
          <p className="propertyValue">매콤 오징어 삼겹살 불고기</p>
        </li>
        <li>
          <p className="propertyName">
            <div className="bullet"></div>취급메뉴
          </p>
          <p className="propertyValue">
            달콤 간장 불고기 / 모둠 버섯 소불고기 / 부대찌개 / 해물순두부찌개 /
            음료 외
          </p>
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
            <input type="submit" value="작성" />
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
                          <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
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
                          <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
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
                                  <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
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
                          <input type="submit" value="작성" />
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
          <div className="recommend-img">
            <div className="like-btn" onClick={handleLikeToggle}>
              <img
                src={likeToglled  ? "/img/icon/heart-fill.svg"  : "/img/icon/heart.svg"}
              ></img>
            </div>
            <h3 className="img-title">초담추어탕</h3>
          </div>
          <div className="recommend-img">
            <div className="like-btn" onClick={handleLikeToggle}>
              <img src="/img/icon/heart.svg"></img>
            </div>
            <h3 className="img-title">초담추어탕</h3>
          </div>
          <div className="recommend-img">
            <div className="like-btn" onClick={handleLikeToggle}>
            <img src="/img/icon/heart.svg"></img>
            </div>
            <h3 className="img-title">초담추어탕</h3>
          </div>
          <div className="recommend-img">
            <div className="like-btn" onClick={handleLikeToggle}>
            <img src="/img/icon/heart.svg"></img>
            </div>
            <h3 className="img-title">초담추어탕</h3>
          </div>
          <div className="recommend-img">
            <div className="like-btn" onClick={handleLikeToggle}>
            <img src="/img/icon/heart.svg"></img>
            </div>
            <h3 className="img-title">초담추어탕</h3>
          </div>
          <div className="recommend-img">
            <div className="like-btn" onClick={handleLikeToggle}>
            <img src="/img/icon/heart.svg"></img>
            </div>
            <h3 className="img-title">초담추어탕</h3>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Article;
