/*
* 행사 상세 페이지
* */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LikeButton from "./LikeButton";

const EventDetail = () => {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [firstImage, setFirstImage] = useState(null);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 행사 상세 정보 API 불러오기 (로컬 DB에서)
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/${contentid}/detail`);
                setDetail(response.data);
            } catch (error) {
                setError('상세 정보 불러오기 실패: ' + error.message);
            }
        };

        // 소개 정보 API 불러오기 (외부 API에서)
        const fetchIntro = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/${contentid}/${contenttypeid}/intro`);
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
                const response = await axios.get(`http://localhost:8080/api/events/${contentid}/images`);
                setImages(response.data);
            } catch (error) {
                console.error('이미지 정보 불러오기 실패', error);
            }
        };

        fetchDetail();
        fetchIntro();
        fetchFirstImage();
        fetchImages();
    }, [contentid, contenttypeid]);

    if (!detail || !intro) return <div>Loading...</div>;

    // 유효성 검사 함수
    const isValidField = (field, defaultValue = '정보 없음') => field ? field : defaultValue;


    return (
        <div>
            <h1>{isValidField(detail.title, '제목 없음')}</h1>
            {firstImage && (
                <img src={firstImage} alt={isValidField(detail.title, '이미지')} width="300" />
            )}
            <LikeButton contentId={contentid} contentType="EventDetail" />
            <p>{isValidField(detail.overview)}</p>

            <h2>추가 정보</h2>
            <p>홈페이지:
                {/* HTML 태그를 포함한 문자열을 렌더링 */}
                <span dangerouslySetInnerHTML={{ __html: isValidField(detail.homepage) }} />
            </p>
            <p>관람 가능 연령: {isValidField(intro.agelimit)}</p>
            <p>예매처: {isValidField(intro.bookingplace)}</p>
            <p>할인 정보: {isValidField(intro.discountinfofestival)}</p>
            <p>행사 종료일: {isValidField(intro.eventenddate)}</p>
            <p>행사 시작일: {isValidField(intro.eventstartdate)}</p>
            <p>행사 장소: {isValidField(intro.eventplace)}</p>
            <p>행사 프로그램: {isValidField(intro.program)}</p>
            <p>관람 소요 시간: {isValidField(intro.spendtimefestival)}</p>
            <p>이용 요금: {isValidField(intro.usetimefestival)}</p>
            <p>주최자 정보: {isValidField(intro.sponsor1)}</p>
            <p>주최자 연락처: {isValidField(intro.sponsor1tel)}</p>
            <p>주관사 정보: {isValidField(intro.sponsor2)}</p>
            <p>주관사 연락처: {isValidField(intro.sponsor2tel)}</p>

            {/* 이미지 정보 API 출력 */}
            <h2>이미지 갤러리</h2>
            <div>
                {images.map((image, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <p>원본 이미지:</p>
                        <img src={image.originimgurl || '/img/mainlogo.png'} alt={`원본 이미지 ${index + 1}`} width="300" />
                        <p>썸네일 이미지:</p>
                        <img src={image.smallimageurl || '/img/mainlogo.png'} alt={`썸네일 이미지 ${index + 1}`} width="150" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventDetail;
