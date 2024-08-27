import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetail = () => {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [firstImage, setFirstImage] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        // 행사 상세 정보 API 불러오기 (로컬 DB에서)
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/${contentid}/detail`);
                setDetail(response.data);
            } catch (error) {
                console.error('상세 정보 불러오기 실패', error);
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

    return (
        <div>
            <h1>{detail.title}</h1>
            {firstImage && (
                <img src={firstImage} alt={detail.title} width="300"/>
            )}
            <p>{detail.overview}</p>

            <h2>추가 정보</h2>
            <p>홈페이지:
                {/* HTML 태그를 포함한 문자열을 렌더링 */}
                <span dangerouslySetInnerHTML={{__html: detail.homepage}}/>
            </p>
            <p>관람 가능 연령: {intro.agelimit}</p>
            <p>예매처: {intro.bookingplace}</p>
            <p>할인 정보: {intro.discountinfofestival}</p>
            <p>행사 종료일: {intro.eventenddate}</p>
            <p>행사 시작일: {intro.eventstartdate}</p>
            <p>행사 장소: {intro.eventplace}</p>
            <p>행사 프로그램: {intro.program}</p>
            <p>관람 소요 시간: {intro.spendtimefestival}</p>
            <p>이용 요금: {intro.usetimefestival}</p>
            <p>주최자 정보: {intro.sponsor1}</p>
            <p>주최자 연락처: {intro.sponsor1tel}</p>
            <p>주관사 정보: {intro.sponsor2}</p>
            <p>주관사 연락처: {intro.sponsor2tel}</p>


            {/* 이미지 정보 API 출력 */}
            <h2>이미지 갤러리</h2>
            <div>
                {images.map((image, index) => (
                    <div key={index} style={{marginBottom: '20px'}}>
                        <p>원본 이미지:</p>
                        <img src={image.originimgurl} alt={`원본 이미지 ${index + 1}`} width="300"/>
                        <p>썸네일 이미지:</p>
                        <img src={image.smallimageurl} alt={`썸네일 이미지 ${index + 1}`} width="150"/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventDetail;
