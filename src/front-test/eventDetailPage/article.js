import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import '../../App.css';
import "swiper/css";
import "swiper/css/navigation";
import KakaoMap from "../../KakaoMap";
import LikeButton from "../../LikeButton";
import CommentEventList from "../../CommentEventList";
import {useAuth} from "../../AuthContext";
import ReviewComponent from "../../ReviewComponent";
import DetailViewComponent from "./DetailViewComponent";



const Article = () => {
  //content-api (EventDetail.js 참고)
  const { apitype, contentid, contenttypeid } = useParams();
  const [detail, setDetail] = useState(null);
  const [intro, setIntro] = useState(null);
  // const [firstImage, setFirstImage] = useState(null);
  const [images, setImages] = useState(null);
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
        setDetail(response.data);
        setImages([1]);
      } catch (error) {
      }
    };

    const fetchGyeonggiEventDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/gyeonggi-events/${contentid}`);
        setDetail(response.data);
        setImages([1]);
      } catch (error) {

      }
    };

    // 상세 정보 API 불러오기 (로컬 DB에서)
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${categoryType}/${contentid}/detail`);
        setDetail(response.data);
      } catch (error) {

      }
    };

    // 소개 정보 API 불러오기 (외부 API에서)
    const fetchIntro = async () => {
      try {
          const response = await axios.get(`http://localhost:8080/api/${categoryType}/${contentid}/${contenttypeid}/intro`);
        setIntro(response.data);
      } catch (error) {

      }
    };

    // 이미지 정보 조회 API 호출하여 이미지 목록 가져오기
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${categoryType}/${contentid}/images`);
        setImages(response.data);
      } catch (error) {

      }
    };

      // 유사한 여행지 정보 가져오기
      const fetchSimilarEvents = async () => {
          try {
              const response = await axios.get(`http://localhost:8080/api/${categoryType}/${contenttypeid}/similar-events`);
              setSimilarEvents(response.data.slice(0, 6));
          } catch (error) {
              console.error('유사한 여행지 정보 불러오기 실패', error);
          }
      };
    // 서울/경기 유사한 여행지 정보 가져오기
    const seoulfetchSimilarEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/15/similar-events`);
        setSimilarEvents(response.data.slice(0, 6));
      } catch (error) {

      }
    };

    const fetchSigunguDetail = async () => {
        try {
            const apiKey = '13jkaARutXp/OwAHynRnYjP7BJuMVGIZx2Ki3dRMaDlcBqrfZHC9Zk97LCCuLyKfiR2cVhyWy59t96rPwyWioA=='; // API 키 설정
            const url = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${apiKey}&contentId=${contentid}&defaultYN=Y&addrinfoYN=Y&overviewYN=Y&mapinfoYN=Y&firstImageYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json`;
            const response = await axios.get(url);
            const item = response.data.response.body.items.item[0];  // 상세 정보의 첫 번째 항목
            setDetail(item);
        } catch (error) {
        }
    };

    if(contenttypeid === 'seoul-events'){
      fetchSeoulEventDetail();
      seoulfetchSimilarEvents();
    }else if(contenttypeid === 'gyeonggi-events'){
      fetchGyeonggiEventDetail();
      seoulfetchSimilarEvents();
    }else if(apitype === 'sigungu'){
        fetchSigunguDetail();
        fetchIntro();
        fetchImages();
        fetchSimilarEvents();
    }
    else{
      fetchDetail();
      fetchIntro();
      fetchImages();
      fetchSimilarEvents();
    }

  }, [contentid, contenttypeid]);


  //홈페이지 링크 복사하기
  const pageLinkCopy = () => {
    const url = extractUrl(detail.homepage || detail.hmpgUrl ); // URL 추출
    if (url) {
      navigator.clipboard.writeText(url).then(() => {
        alert(`주소가 복사되었습니다.\n${url}`);
      }).catch(err => {

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
      if (window.scrollY > 400) {
        setIsFixed(true);
        if (window.scrollY >= 1800) {
          setActiveTab('tab3');
        } else if (window.scrollY >= 950) {
          setActiveTab('tab2');
        }
      } else {
        setIsFixed(false);
        setActiveTab('tab1');
      }
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

    const formatDate = (date) => {
        if (!date) {
            return '-';
        }
        return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6)}`;
    };
    // 각 contenttypeid에 따라 추가 정보를 렌더링하는 함수
    const renderAdditionalInfo = () => {


        if (!intro) {
            return;
        }

        switch (contenttypeid) {
            case '12': // 관광지
                return (
                    <ul className="info-list">
                        <li><p className="propertyName"><div className="bullet"></div>이용 시간</p><p className="propertyValue">{intro.usetime || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>주차 정보</p><p className="propertyValue">{intro.parking || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>수용 인원</p><p className="propertyValue">{intro.accomcount || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>유모차 대여 정보</p><p className="propertyValue">{intro.chkbabycarriage || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>애완동물 동반 가능 여부</p><p className="propertyValue">{intro.chkpet || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>체험 가능 연령</p><p className="propertyValue">{intro.expagerange || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>체험 안내</p><p className="propertyValue">{intro.expguide || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>문의 및 안내</p><p className="propertyValue">{intro.infocenter || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>개장일</p><p className="propertyValue">{intro.opendate || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>쉬는 날</p><p className="propertyValue">{intro.restdate || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>이용 시기</p><p className="propertyValue">{intro.useseason || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>이용 시간</p><p className="propertyValue">{intro.usetime || '-'}</p></li>
                    </ul>
                );
            case '14': // 문화시설
                return (
                    <ul className="info-list">
                        <li><p className="propertyName"><div className="bullet"></div>이용 시간</p><p className="propertyValue">{intro.usetimeculture || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>주차 정보</p><p className="propertyValue">{intro.parkingculture || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>주차 요금</p><p className="propertyValue">{intro.parkingfee || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>수용 인원</p><p className="propertyValue">{intro.accomcountculture || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>유모차 대여 정보</p><p className="propertyValue">{intro.chkbabycarriageculture || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>신용카드 가능 여부</p><p className="propertyValue">{intro.chkcreditcardculture || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>애완동물 동반 가능 여부</p><p className="propertyValue">{intro.chkpetculture || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>할인 정보</p><p className="propertyValue">{intro.discountinfo || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>문의 및 안내</p><p className="propertyValue">{intro.infocenterculture || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>쉬는 날</p><p className="propertyValue">{intro.restdateculture || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>규모</p><p className="propertyValue">{intro.scale || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>관람 소요 시간</p><p className="propertyValue">{intro.spendtime || '-'}</p></li>
                    </ul>
                );
            case '15': // 축제/공연/행사
                return (
                    <ul className="info-list">
                        <li><p className="propertyName"><div className="bullet"></div>관람 가능 연령</p><p className="propertyValue">{intro.agelimit || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>예매처</p><p className="propertyValue">{intro.bookingplace || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>할인 정보</p><p className="propertyValue">{intro.discountinfofestival || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>행사 장소</p><p className="propertyValue">{intro.eventplace || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>행사 시작일</p><p className="propertyValue">{formatDate(intro.eventstartdate)}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>행사 종료일</p><p className="propertyValue">{formatDate(intro.eventenddate)}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>행사 프로그램</p><p className="propertyValue">{intro.program || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>관람 소요 시간</p><p className="propertyValue">{intro.spendtimefestival || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>이용 요금</p><p className="propertyValue">{intro.usetimefestival || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>주최자 정보</p><p className="propertyValue">{intro.sponsor1 || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>주최자 연락처</p><p className="propertyValue">{intro.sponsor1tel || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>주관사 정보</p><p className="propertyValue">{intro.sponsor2 || '-'}</p></li>
                    </ul>
                );

            case '25': // 여행코스
                return (
                    <ul className="info-list">
                        <li><p className="propertyName"><div className="bullet"></div>코스 총 거리</p><p className="propertyValue">{intro.distance || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>문의 및 안내</p><p className="propertyValue">{intro.infocentertourcourse || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>코스 일정</p><p className="propertyValue">{intro.schedule || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>코스 총 소요 시간</p><p className="propertyValue">{intro.taketime || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>코스 테마</p><p className="propertyValue">{intro.theme || '-'}</p></li>
                    </ul>
                );

            case '28': // 레포츠
                return (
                    <ul className="info-list">
                        <li><p className="propertyName"><div className="bullet"></div>수용 인원</p><p className="propertyValue">{intro.accomcountleports || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>애완동물 동반 가능 여부</p><p className="propertyValue">{intro.chkpetleports || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>체험 가능 연령</p><p className="propertyValue">{intro.expagerangeleports || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>문의 및 안내</p><p className="propertyValue">{intro.infocenterleports || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>개장 기간</p><p className="propertyValue">{intro.openperiod || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>주차 요금</p><p className="propertyValue">{intro.parkingfeeleports || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>주차 시설</p><p className="propertyValue">{intro.parkingleports || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>예약 안내</p><p className="propertyValue">{intro.reservation || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>쉬는 날</p><p className="propertyValue">{intro.restdateleports || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>규모</p><p className="propertyValue">{intro.scaleleports || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>입장료</p><p className="propertyValue">{intro.usefeeleports || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>이용 시간</p><p className="propertyValue">{intro.usetimeleports || '-'}</p></li>
                    </ul>
                );

            case '39': // 음식
                return (
                    <ul className="info-list">
                        <li><p className="propertyName"><div className="bullet"></div>할인 정보</p><p className="propertyValue">{intro.discountinfofood || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>대표 메뉴</p><p className="propertyValue">{intro.firstmenu || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>문의 및 안내</p><p className="propertyValue">{intro.infocenterfood || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>어린이 놀이방 여부</p><p className="propertyValue">{intro.kidsfacility || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>개업일</p><p className="propertyValue">{intro.opendatefood || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>영업시간</p><p className="propertyValue">{intro.opentimefood || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>포장 가능</p><p className="propertyValue">{intro.packing || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>주차 시설</p><p className="propertyValue">{intro.parkingfood || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>예약 안내</p><p className="propertyValue">{intro.reservationfood || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>쉬는 날</p><p className="propertyValue">{intro.restdatefood || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>규모</p><p className="propertyValue">{intro.scalefood || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>취급 메뉴</p><p className="propertyValue">{intro.treatmenu || '-'}</p></li>
                    </ul>
                );

            case '32': // 숙박
                return (
                    <ul className="info-list">
                        <li><p className="propertyName"><div className="bullet"></div>수용 가능 인원</p><p className="propertyValue">{intro.accomcountlodging || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>입실 시간</p><p className="propertyValue">{intro.checkintime || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>퇴실 시간</p><p className="propertyValue">{intro.checkouttime || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>객실 내 취사 여부</p><p className="propertyValue">{intro.chkcooking || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>문의 및 안내</p><p className="propertyValue">{intro.infocenterlodging || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>주차 시설</p><p className="propertyValue">{intro.parkinglodging || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>객실 수</p><p className="propertyValue">{intro.roomcount || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>객실 유형</p><p className="propertyValue">{intro.roomtype || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>규모</p><p className="propertyValue">{intro.scalelodging || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>바비큐장 여부</p><p className="propertyValue">{intro.barbecue || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>캠프파이어 여부</p><p className="propertyValue">{intro.campfire || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>노래방 여부</p><p className="propertyValue">{intro.karaoke || '-'}</p></li>
                    </ul>
                );

            case '38': // 쇼핑
                return (
                    <ul className="info-list">
                        <li><p className="propertyName"><div className="bullet"></div>유모차 대여 정보</p><p className="propertyValue">{intro.chkbabycarriageshopping || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>신용카드 가능 정보</p><p className="propertyValue">{intro.chkcreditcardshopping || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>애완동물 동반 가능 정보</p><p className="propertyValue">{intro.chkpetshopping || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>문의 및 안내</p><p className="propertyValue">{intro.infocentershopping || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>영업 시간</p><p className="propertyValue">{intro.opentime || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>주차 시설</p><p className="propertyValue">{intro.parkingshopping || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>쉬는 날</p><p className="propertyValue">{intro.restdateshopping || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>규모</p><p className="propertyValue">{intro.scoaleshopping || '-'}</p></li>
                        <li><p className="propertyName"><div className="bullet"></div>매장안내</p><p className="propertyValue">{intro.shopguide || '-'}</p></li>
                    </ul>
                );

            default:
                return <p>추가 정보가 없습니다.</p>;
        }
    };

    // 불필요한 텍스트를 제거하는 함수
    const cleanDetailContent = (content) => {
        // 제거할 정확한 텍스트 패턴 정의 (정규 표현식)
        const unwantedTextsPattern = /1\. 공공시설 예약서비스 이용시 필수 준수사항[\s\S]*서울시에서 제공하는 다양하고 많은 혜택을 받으실 수 있습니다\./;

        // 정규 표현식을 사용하여 패턴과 일치하는 부분을 제거
        return content.replace(unwantedTextsPattern, '').trim();
    };

    // HTML 엔티티를 디코딩하는 함수
    const decodeHtmlEntities = (text) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
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
                          <p className="view-count">
                              <DetailViewComponent />
                          </p> {/*이 조회수 값 넣어주시면됩니다.*/}
                      </div>
                  </div>
                  <div className="right">
                  </div>
              </div>
              <nav className={`scroll-tab ${isFixed ? 'active' : ''}`}>
                  <div className={`tab tab2 ${activeTab === 'tab1' ? 'active' : ''}`}
                       onClick={() => scrollToTop(400)}>
                      <p>사진보기</p>
                  </div>
                  <div className="wall"></div>
                  <div className={`tab tab2 ${activeTab === 'tab2' ? 'active' : ''}`}
                       onClick={() => scrollToTop(950)}>
                      <p>상세보기</p>
                  </div>
                  <div className="wall"></div>
                  <div className={`tab tab3 ${activeTab === 'tab3' ? 'active' : ''}`}
                       onClick={() => scrollToTop(1800)}>
                      <p>여행톡</p>
                  </div>
              </nav>
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
                  <>
                    {images ? (
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
                              <img src='/img/default_img.jpeg' className='default_img' alt='Default'/>
                          </>
                      )}
                  </>
              )}

              <div className="detail-info">
                  <h1 className="title">상세정보</h1>
                  {contenttypeid === 'seoul-events' ? (
                      <p className="info-txt">
                        {decodeHtmlEntities(cleanDetailContent(detail.dtlcont))}
                      </p>
                  ) : (
                      <p className="info-txt">
                          {detail.overview}
                      </p>
                  )}

              </div>

              {/* 지도 표시 부분 */}
              {(detail.mapx || detail.mapX || detail.x) && (detail.mapy || detail.mapY || detail.y) ? (
                  <KakaoMap mapX={detail.mapx || detail.mapX || detail.x} mapY={detail.mapy || detail.mapY || detail.y}
                            title={detail.title || detail.svcnm}/>
              ) : (
                  <div></div>
              )}

              {/* 추가 정보 표시 */}
              {contenttypeid === 'seoul-events' ? (
                  <ul className="info-list">
                      <li><p className="propertyName"><div className="bullet"></div>장소</p><p className="propertyValue">{detail.placenm || '-'}</p></li>
                      <li><p className="propertyName"><div className="bullet"></div>대상</p><p className="propertyValue">{detail.usetgtinfo || '-'}</p></li>
                      <li><p className="propertyName"><div className="bullet"></div>결제 방법</p><p className="propertyValue">{detail.payatnm || '-'}</p></li>
                      <li><p className="propertyName"><div className="bullet"></div>시작일</p><p className="propertyValue">{formatDate(detail.svcopnbgndt) || '-'}</p></li>
                      <li><p className="propertyName"><div className="bullet"></div>종료일</p><p className="propertyValue">{formatDate(detail.svcopnenddt) || '-'}</p></li>
                      <li><p className="propertyName"><div className="bullet"></div>접수 시작일</p><p className="propertyValue">{formatDate(detail.rcptbgndt) || '-'}</p></li>
                      <li><p className="propertyName"><div className="bullet"></div>접수 종료일</p><p className="propertyValue">{formatDate(detail.rcptenddt) || '-'}</p></li>
                      <li><p className="propertyName"><div className="bullet"></div>지역</p><p className="propertyValue">{detail.areanm || '-'}</p></li>
                      <li><p className="propertyName"><div className="bullet"></div>전화번호</p><p className="propertyValue">{detail.telno || '-'}</p></li>
                      <li><p className="propertyName"><div className="bullet"></div>이용 시간</p><p className="propertyValue">{detail.vMin} - {detail.vMax || '-'}</p></li>
                  </ul>
              ) : (
                  <>
                      {contenttypeid === 'gyeonggi-events' ? (
                          <ul className="info-list">
                              <li><p className="propertyName"><div className="bullet"></div>기관명</p><p className="propertyValue">{detail.instNm || '-'}</p></li>
                              <li><p className="propertyName"><div className="bullet"></div>분류</p><p className="propertyValue">{detail.categoryNm || '-'}</p></li>
                              <li><p className="propertyName"><div className="bullet"></div>시작일</p><p className="propertyValue">{formatDate(detail.beginDe) || '-'}</p></li>
                              <li><p className="propertyName"><div className="bullet"></div>종료일</p><p className="propertyValue">{formatDate(detail.endDe) || '-'}</p></li>
                              <li><p className="propertyName"><div className="bullet"></div>주소</p><p className="propertyValue">{detail.addr || '-'}</p></li>
                              <li><p className="propertyName"><div className="bullet"></div>시간</p><p className="propertyValue">{detail.eventTmInfo || '-'}</p></li>
                              <li><p className="propertyName"><div className="bullet"></div>비용</p><p className="propertyValue">{detail.partcptExpnInfo || '-'}</p></li>
                              <li><p className="propertyName"><div className="bullet"></div>전화번호</p><p className="propertyValue">{detail.telnoInfo || '-'}</p></li>
                              <li><p className="propertyName"><div className="bullet"></div>주최기관명</p><p className="propertyValue">{detail.hostInstNm || '-'}</p></li>
                          </ul>
                      ) : (
                          <>
                              {renderAdditionalInfo()}
                          </>
                      )}

                  </>
              )}


              <div className="hashtag">
                  <div className="tag">#음식</div>
                  <div className="tag">#맛집</div>
              </div>
              <div className="icons">
                  <div className="likeView">
                      <LikeButton contentId={contentid} contentType={likeCategoryType}/>
                  </div>
              </div>
              {categoryType === 'seoul-events' ? (
                  <CommentEventList category="seoul-events" svcid={detail.svcid}/>
              ) : (
                  <CommentEventList category={categoryType} contentid={contentid} contenttypeid={contenttypeid}/>
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
