import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TouristAttractionDetail = () => {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [firstImage, setFirstImage] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        // 관광지 상세 정보 API 불러오기 (로컬 DB에서)
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tourist-attractions/${contentid}/detail`);
                setDetail(response.data);
            } catch (error) {
                console.error('상세 정보 불러오기 실패', error);
            }
        };

        // 소개 정보 API 불러오기 (외부 API에서)
        const fetchIntro = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tourist-attractions/${contentid}/${contenttypeid}/intro`);
                setIntro(response.data);
            } catch (error) {
                console.error('소개 정보 불러오기 실패', error);
            }
        };

        // 첫 번째 이미지를 가져오기 위한 fetchAndSaveTouristAttractions 호출
        const fetchFirstImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/fetchAndSaveTouristAttractions`, {
                    params: {
                        numOfRows: '1',
                        pageNo: '1'
                    }
                });
                if (response.data.length > 0) {
                    const attraction = response.data.find(attraction => attraction.contentid === contentid);
                    if (attraction) {
                        setFirstImage(attraction.firstimage);
                    }
                }
            } catch (error) {
                console.error('첫 번째 이미지 가져오기 실패', error);
            }
        };

        // 이미지 정보 조회 API 호출하여 이미지 목록 가져오기
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tourist-attractions/${contentid}/images`);
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
                <img src={firstImage} alt={detail.title} width="300" />
            )}
            <p>{detail.overview}</p>

            <h2>추가 정보</h2>
            <p>전화: {intro.tel}</p>
            <p>홈페이지:
                {/* HTML 태그를 포함한 문자열을 렌더링 */}
                <span dangerouslySetInnerHTML={{__html: detail.homepage}}/>
            </p>
            <p>이용 시간: {intro.usetime}</p>
            <p>주차 정보: {intro.parking}</p>
            <p>수용 인원: {intro.accomcount}</p>
            <p>유모차 대여 정보: {intro.chkbabycarriage}</p>
            <p>신용카드 가능 여부: {intro.chkcreditcard}</p>
            <p>애완동물 동반 가능 여부: {intro.chkpet}</p>
            <p>체험 가능 연령: {intro.expagerange}</p>
            <p>체험 안내: {intro.expguide}</p>
            <p>세계문화유산 여부: {intro.heritage1}</p>
            <p>세계자연유산 여부: {intro.heritage2}</p>
            <p>세계기록유산 여부: {intro.heritage3}</p>
            <p>문의 및 안내: {intro.infocenter}</p>
            <p>개장일: {intro.opendate}</p>
            <p>쉬는 날: {intro.restdate}</p>
            <p>이용 시기: {intro.useseason}</p>
            <p>이용 시간: {intro.usetime}</p>

            {/* 이미지 정보 API 출력 */}
            <h2>이미지 갤러리</h2>
            <div>
                {images.map((image, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <p>원본 이미지:</p>
                        <img src={image.originimgurl} alt={`원본 이미지 ${index + 1}`} width="300" />
                        <p>썸네일 이미지:</p>
                        <img src={image.smallimageurl} alt={`썸네일 이미지 ${index + 1}`} width="150" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TouristAttractionDetail;