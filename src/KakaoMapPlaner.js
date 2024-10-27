import React, { useEffect } from 'react';

const KakaoMapPlaner = ({ locations }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=385055cf5aeb63a6e5db2a0bbb867f09&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('kakaomap');
                const options = {
                    center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                    level: 8,
                };
                const map = new window.kakao.maps.Map(container, options);
                const bounds = new window.kakao.maps.LatLngBounds();

                // 각 일차에 따른 색상 설정
                const colors = {
                    '1일차': '#87CEEB',  // 하늘색
                    '2일차': '#8B4513',  // 갈색
                    '3일차': '#ADFF2F',  // 연두색
                    '당일': '#87CEEB'    // 당일은 하늘색
                };

                // 일차별로 데이터 그룹화 및 선 그리기
                Object.keys(locations).forEach((day) => {
                    const linePath = [];

                    locations[day].forEach((event) => {
                        const markerPosition = new window.kakao.maps.LatLng(parseFloat(event.mapy), parseFloat(event.mapx));
                        linePath.push(markerPosition);
                        bounds.extend(markerPosition);

                        // 마커 생성
                        const marker = new window.kakao.maps.Marker({
                            position: markerPosition,
                            map,
                        });

                        // 번호 표시 오버레이
                        new window.kakao.maps.CustomOverlay({
                            map,
                            position: marker.getPosition(),
                            content: `<div style="background:#fff;border:1px solid #000;border-radius:3px;padding:2px;font-size:12px;text-align:center;width:24px;height:24px">${event.index}</div>`,
                        });
                    });

                    // Polyline 생성하여 선 그리기
                    if (linePath.length > 1) {  // 선을 그릴 위치가 2개 이상일 경우에만 그리기
                        const polyline = new window.kakao.maps.Polyline({
                            path: linePath,
                            strokeWeight: 3,
                            strokeColor: colors[day] || '#000000', // 일차에 맞는 색상
                            strokeOpacity: 1,
                            strokeStyle: 'solid',
                        });

                        polyline.setMap(map);
                    }
                });

                map.setBounds(bounds);
            });
        };

        return () => {
            // Clean up the script tag and remove map instance if component unmounts
            document.head.removeChild(script);
        };
    }, [locations]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div id="kakaomap" style={{ width: '100%', height: '100%' }} />
            <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '5px',
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
                fontSize: '12px',
                zIndex: 1000,
            }}>
                <p><span style={{ color: '#87CEEB' }}>■</span> 1일차</p>
                <p><span style={{ color: '#8B4513' }}>■</span> 2일차</p>
                <p><span style={{ color: '#ADFF2F' }}>■</span> 3일차</p>
            </div>
        </div>
    );
};

export default KakaoMapPlaner;
