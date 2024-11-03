import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from 'react-router-dom';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";


const Banner = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(1);
  const swiperRef = useRef(null);
  const [autoplaying, setAutoplaying] = useState(true);

  const currentEvent = events[currentSlide - 1]; //slide에 맞는 txt 뿌려주기 위한 변수

  const slicenum = 7; //임시로 가져오는 갯수 지정

  const toggleAutoplay = () => {
    if (autoplaying) {
      swiperRef.current.swiper.autoplay.stop();
    } else {
      swiperRef.current.swiper.autoplay.start();
    }
    setAutoplaying(!autoplaying);
  };

  useEffect(() => {
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

  // const totalSlides = events.length;
  const totalSlides = slicenum;
  const progressPercentage = (currentSlide / totalSlides) * 100;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/category/행사`, {
          params: {
            numOfRows: '10',
            pageNo: '1'
          }
        });

        console.log('API Response:', response.data); // 응답 데이터 로그

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setEvents(response.data);
        } else {
          console.log('행사를 찾을수 없거나 데이터 포맷 실패', response.data);
          setEvents([]);
        }
      } catch (error) {
        console.error('행사 적용 실패', error);
        setError('행사 적용 실패');
      }
    };

    fetchEvents();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <section className="main_banner">
        <div className="swiper-container">
          <div className="event-info">
            {currentEvent && (
                <>
                  <p className="event-date">행사기간 : {currentEvent.eventstartdate.slice(0, 4) +
                      '.' + currentEvent.eventstartdate.slice(4, 6) + '.' +
                      currentEvent.eventstartdate.slice(6)} ~
                    {currentEvent.eventenddate.slice(4, 6) + '.' +
                        currentEvent.eventenddate.slice(6)}</p>
                  <h1 className="title">{currentEvent.title || "none"}</h1>
                  <p className="addr">
                    {currentEvent.addr1 || "none"}
                  </p>
                  <Link to={`/eventDetailPage/events/${currentEvent.contentid}/${currentEvent.contenttypeid}`}><p className="detail-link">자세히 보기</p></Link>
                </>
            )}
            <div className="swiper-tool">
              {/* pagination-bar */}
              <div className="swiper-pagination-wrapper">
                <div className="swiper-pagination-background"></div>
                <div
                    className="swiper-pagination-progress"
                    style={{width: `${progressPercentage}%`}}
                ></div>
              </div>
              {/* pagination-count */}
              <div className="swiper-pagination-info">
                <p>
                  <b>{String(currentSlide).padStart(2, "0")}</b> /{" "}
                  {String(totalSlides).padStart(2, "0")}
                </p>
              </div>

              <div className="swiper-button-prev">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#5f6368"
                >
                  <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                </svg>
              </div>

              <div className="autoplay-control" onClick={toggleAutoplay}>
                <img
                    src={autoplaying ? "/img/icon/pause.svg" : "/img/icon/play.svg"}
                    alt="autoplay toggle"
                />
              </div>

              <div className="swiper-button-next">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#5f6368"
                >
                  <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                </svg>
              </div>
            </div>
          </div>
          <Swiper
              ref={swiperRef}
              slidesPerView={1.1}
              spaceBetween={30}
              loopedSlides={2}
              loop={true}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Navigation, Pagination]}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              pagination={{el: ".swiper-pagination", clickable: true}}
              className="mySwiper banner-swiper"
          >
            {events.slice(0, slicenum).map((event) => (
                <SwiperSlide>
                  <Link to={`/eventDetailPage/events/${event.contentid}/${event.contenttypeid}`}>
                    <div className='event-img'
                         style={{
                           backgroundImage: `url(${event.firstimage})`, // 이미지 URL을 url()로 감싸야 합니다.
                           backgroundSize: 'cover', // 이미지를 박스에 맞게 조절
                           backgroundPosition: 'center', // 이미지를 중앙에 위치
                         }}
                    ></div>
                  </Link>
                </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section>
  );
};

export default Banner;
