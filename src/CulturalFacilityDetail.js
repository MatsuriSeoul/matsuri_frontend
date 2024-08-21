import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CulturalFacilityDetail = () => {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [firstImage, setFirstImage] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/cultural-facilities/${contentid}/detail`);
                console.log('Detail Response:', response.data);
                setDetail(response.data);
            } catch (error) {
                console.error('상세 정보 불러오기 실패', error);
            }
        };

        const fetchIntro = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/cultural-facilities/${contentid}/${contenttypeid}/intro`);
                console.log('Intro Response:', response.data);
                setIntro(response.data);
            } catch (error) {
                console.error('소개 정보 불러오기 실패', error);
            }
        };

        const fetchFirstImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/cultural-facilities/fetchAndSaveCulturalFacilities`, {
                    params: {
                        numOfRows: '1',
                        pageNo: '1'
                    }
                });
                console.log('First Image Response:', response.data);
                if (response.data.length > 0) {
                    const facility = response.data.find(facility => facility.contentid === contentid);
                    if (facility) {
                        setFirstImage(facility.firstimage);
                    }
                }
            } catch (error) {
                console.error('첫 번째 이미지 가져오기 실패', error);
            }
        };

        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/cultural-facilities/${contentid}/images`);
                console.log('Images Response:', response.data);
                setImages(response.data);
            } catch (error) {
                console.error('이미지 정보 불러오기 실패', error);
            }
        };

        const fetchData = async () => {
            await fetchDetail();
            await fetchIntro();
            await fetchFirstImage();
            await fetchImages();
            setLoading(false); // 모든 데이터 로드 후 로딩 상태 해제
        };

        fetchData();
    }, [contentid, contenttypeid]);

    if (loading) return <div>Loading...</div>; // 로딩 중 표시

    if (!detail || !intro) return <div>데이터가 없습니다.</div>; // 데이터가 없는 경우

    return (
        <div>
            <h1>{detail.title}</h1>
            {firstImage && (
                <img src={firstImage} alt={detail.title} width="300" />
            )}
            <p>{detail.overview}</p>

            <h2>추가 정보</h2>
            <p>전화: {intro.tel}</p>
            <p>홈페이지: <a href={intro.homepage}>{intro.homepage}</a></p>
            <p>이용 시간: {intro.usetime}</p>
            <p>주차 정보: {intro.parking}</p>

            {/* 이미지 정보 api 출력 */}
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

export default CulturalFacilityDetail;

