import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LikeButton from "./LikeButton";

const FoodEventDetail = () => {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [firstImage, setFirstImage] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        // 음식 이벤트 상세 정보 API 호출
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/food-events/${contentid}/detail`);
                setDetail(response.data);
            } catch (error) {
                console.error('상세 정보 불러오기 실패', error);
            }
        };

        // 소개 정보 API 호출
        const fetchIntro = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/food-events/${contentid}/${contenttypeid}/intro`);
                setIntro(response.data);
            } catch (error) {
                console.error('소개 정보 불러오기 실패', error);
            }
        };

        // 첫 번째 이미지를 가져오기 위한 fetchAndSaveFood 호출
        const fetchFirstImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/fetchAndSaveFood`, {
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
        // 이미지 정보 가져오기
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/food-events/${contentid}/images`);
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
            <LikeButton contentId={contentid} contentType="FoodEventDetail" />
            <p>{detail.overview}</p>

            <h2>추가 정보</h2>
            <p>신용카드 가능 정보: {intro.chkcreditcardfood}</p>
            <p>할인 정보: {intro.discountinfofood}</p>
            <p>대표 메뉴: {intro.firstmenu}</p>
            <p>문의 및 안내: {intro.infocenterfood}</p>
            <p>어린이 놀이방 여부: {intro.kidsfacility}</p>
            <p>개업일: {intro.opendatefood}</p>
            <p>영업시간: {intro.opentimefood}</p>
            <p>포장 가능: {intro.packing}</p>
            <p>주차 시설: {intro.parkingfood}</p>
            <p>예약 안내: {intro.reservationfood}</p>
            <p>쉬는 날: {intro.restdatefood}</p>
            <p>규모: {intro.scalefood}</p>
            <p>좌석 수: {intro.seat}</p>
            <p>금연/흡연 여부: {intro.smoking}</p>
            <p>취급 메뉴: {intro.treatmenu}</p>
            <p>인허가 번호: {intro.lcnsno}</p>

            {/* 이미지 정보 출력 */}
            <h2>이미지 갤러리</h2>
            <div>
                {images && images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <p>원본 이미지:</p>
                            <img src={image.originimgurl} alt={`원본 이미지 ${index + 1}`} width="300" />
                            <p>썸네일 이미지:</p>
                            <img src={image.smallimageurl} alt={`썸네일 이미지 ${index + 1}`} width="150" />
                        </div>
                    ))
                ) : (
                    <p>이미지가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default FoodEventDetail;
