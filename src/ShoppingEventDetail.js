/*
* 쇼핑 이벤트 상세페이지
* */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ShoppingEventDetail = () => {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [firstImage, setFirstImage] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        // 쇼핑 상세 정보 API 불러오기 (로컬 DB에서)
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/shopping-events/${contentid}/detail`);
                setDetail(response.data);
            } catch (error) {
                console.error('상세 정보 불러오기 실패', error);
            }
        };

        // 소개 정보 API 불러오기 (외부 API에서)
        const fetchIntro = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/shopping-events/${contentid}/${contenttypeid}/intro`);
                setIntro(response.data);
            } catch (error) {
                console.error('소개 정보 불러오기 실패', error);
            }
        };

        // 첫 번째 이미지를 가져오기 위한 fetchAndSaveShoppingEvents 호출
        const fetchFirstImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/fetchAndSaveShopping`, {
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
                const response = await axios.get(`http://localhost:8080/api/shopping-events/${contentid}/images`);
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
            <p>홈페이지:
                <span dangerouslySetInnerHTML={{ __html: detail.homepage }} />
            </p>
            <p>유모차 대여 정보: {intro.chkbabycarriageshopping}</p>
            <p>신용카드 가능 정보: {intro.chkcreditcardshopping}</p>
            <p>애완동물 동반 가능 정보: {intro.chkpetshopping}</p>
            <p>문화센터 바로가기: {intro.culturecenter}</p>
            <p>장서는 날: {intro.fairday}</p>
            <p>문의 및 안내: {intro.infocentershopping}</p>
            <p>개장일: {intro.opendateshopping}</p>
            <p>영업 시간: {intro.opentime}</p>
            <p>주차 시설: {intro.parkingshopping}</p>
            <p>쉬는 날: {intro.restdateshopping}</p>
            <p>화장실 설명: {intro.restroom}</p>
            <p>판매 품목: {intro.saleitem}</p>
            <p>판매 품목별 가격: {intro.saleitemcost}</p>
            <p>규모: {intro.scaleshopping}</p>
            <p>매장 안내: {intro.shopguide}</p>

            {/* 이미지 정보 API 출력 */}
            <h2>이미지 갤러리</h2>
            <div>
                {Array.isArray(images) && images.map((image, index) => (
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

export default ShoppingEventDetail;
