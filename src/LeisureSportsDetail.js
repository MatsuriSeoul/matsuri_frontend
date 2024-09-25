/*
* 레저스포츠 상세 페이지
* */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LeisureSportsDetail = () => {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [firstImage, setFirstImage] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        // 레저스포츠 상세 정보 API 불러오기 (로컬 DB에서)
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/leisure-sports/${contentid}/detail`);
                setDetail(response.data);
            } catch (error) {
                console.error('상세 정보 불러오기 실패', error);
            }
        };

        // 소개 정보 API 불러오기 (외부 API에서)
        const fetchIntro = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/leisure-sports/${contentid}/${contenttypeid}/intro`);
                setIntro(response.data);
            } catch (error) {
                console.error('소개 정보 불러오기 실패', error);
            }
        };

        // 첫 번째 이미지를 가져오기 위한 fetchAndSaveLeisureSportsEvents 호출
        const fetchFirstImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/fetchAndSaveLeisureSports`, {
                    params: {
                        numOfRows: '1',
                        pageNo: '1'
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
                const response = await axios.get(`http://localhost:8080/api/leisure-sports/${contentid}/images`);
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
            <p>수용 인원: {intro.accomcountleports}</p>
            <p>유모차 대여 정보: {intro.chkbabycarriageleports}</p>
            <p>신용카드 가능 정보: {intro.chkcreditcardleports}</p>
            <p>애완동물 동반 가능 정보: {intro.chkpetleports}</p>
            <p>체험 가능 연령: {intro.expagerangeleports}</p>
            <p>문의 및 안내: {intro.infocenterleports}</p>
            <p>개장 기간: {intro.openperiod}</p>
            <p>주차 요금: {intro.parkingfeeleports}</p>
            <p>주차 시설: {intro.parkingleports}</p>
            <p>예약 안내: {intro.reservation}</p>
            <p>쉬는 날: {intro.restdateleports}</p>
            <p>규모: {intro.scaleleports}</p>
            <p>입장료: {intro.usefeeleports}</p>
            <p>이용 시간: {intro.usetimeleports}</p>

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

export default LeisureSportsDetail;
