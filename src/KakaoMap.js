// src/components/KakaoMap.js
import React, { useEffect } from 'react';

const KakaoMap = ({ mapX, mapY, title }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=385055cf5aeb63a6e5db2a0bbb867f09&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(mapY, mapX), // Y, X 좌표를 사용
                    level: 3
                };
                const map = new window.kakao.maps.Map(container, options);

                // 마커 표시
                const markerPosition = new window.kakao.maps.LatLng(mapY, mapX);
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                });
                marker.setMap(map);

                // 인포윈도우 생성
                const iwContent = `<div style="padding:5px;">${title}</div>`;
                const infowindow = new window.kakao.maps.InfoWindow({
                    content: iwContent,
                    removable: true
                });
                infowindow.open(map, marker);
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
            <div id="map" style={{ width: '100%', height: '400px' }} />
            <p>
                <a href={mapUrl} target="_blank" rel="noopener noreferrer">지도 크게 보기</a> |
                <a href={roadUrl} target="_blank" rel="noopener noreferrer">길찾기</a>
            </p>
        </div>
    );
};

export default KakaoMap;
