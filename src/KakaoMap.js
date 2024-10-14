// src/components/KakaoMap.js
import React, { useEffect } from 'react';
import './css/KakaoMap/KaKaoMap.css';

const KakaoMap = ({ mapX, mapY, title }) => {
    useEffect(() => {
        // 좌표가 문자열로 전달될 가능성이 있으므로 parseFloat로 숫자형으로 변환
        const parsedMapX = parseFloat(mapX);
        const parsedMapY = parseFloat(mapY);

        // 좌표 값이 숫자로 변환되지 않은 경우를 대비한 로그
        console.log('KakaoMap 좌표:', { mapX: parsedMapX, mapY: parsedMapY, title });

        // 스크립트 추가
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=385055cf5aeb63a6e5db2a0bbb867f09&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            // 카카오 맵이 로드된 후 실행
            window.kakao.maps.load(() => {
                const container = document.getElementById('kakaomap');
                const options = {
                    center: new window.kakao.maps.LatLng(parsedMapY, parsedMapX), // 변환된 Y, X 좌표 사용
                    level: 3
                };
                const map = new window.kakao.maps.Map(container, options);

                // 마커 표시
                const markerPosition = new window.kakao.maps.LatLng(parsedMapY, parsedMapX);
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                });
                marker.setMap(map);

                // 인포윈도우 생성
                // const iwContent = `<div style="padding:5px;">${title}</div>`;
                // const infowindow = new window.kakao.maps.InfoWindow({
                //     content: iwContent,
                //     removable: true
                // });
                // infowindow.open(map, marker);
            });
        };

        return () => {
            script.remove(); // 스크립트 정리
        };
    }, [mapX, mapY, title]);

    // 지도 바로가기 URL 생성
    const mapUrl = `https://map.kakao.com/link/map/${title},${mapY},${mapX}`;
    const roadUrl = `https://map.kakao.com/link/to/${title},${mapY},${mapX}`;

    return (
        <div>
            <div id="kakaomap">
                <div className='kakaourl'>
                    <a href={mapUrl} target="_blank" className='link' rel="noopener noreferrer">
                        지도크게보기
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                             fill="#e8eaed">
                            <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z"/>
                        </svg>
                    </a>
                    <a href={roadUrl} target="_blank" className='link' rel="noopener noreferrer">
                        길찾기
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                             fill="#e8eaed">
                            <path
                                d="m200-120-40-40 320-720 320 720-40 40-280-120-280 120Zm84-124 196-84 196 84-196-440-196 440Zm196-84Z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default KakaoMap;
