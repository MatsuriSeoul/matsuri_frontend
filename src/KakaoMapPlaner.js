import React, { useEffect } from 'react';

const KakaoMapPlaner = ({ locations }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=385055cf5aeb63a6e5db2a0bbb867f09&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('kakaomap');
                const options = { center: new window.kakao.maps.LatLng(37.5665, 126.9780), level: 8 };
                const map = new window.kakao.maps.Map(container, options);
                const bounds = new window.kakao.maps.LatLngBounds();

                // 각 일차에 따른 색상 설정
                const colors = {
                    '1일차': '#0077FF',  // 파란색 (더 진한 색)
                    '2일차': '#D2691E',  // 초코브라운
                    '3일차': '#32CD32',  // 라임그린
                };

                // 일차별로 데이터 그룹화 및 선 그리기
                Object.keys(locations).forEach((day) => {
                    const linePath = [];

                    locations[day].forEach((event) => {
                        const markerPosition = new window.kakao.maps.LatLng(parseFloat(event.mapy), parseFloat(event.mapx));
                        linePath.push(markerPosition);
                        bounds.extend(markerPosition);

                        // 마커 생성
                        const marker = new window.kakao.maps.Marker({ position: markerPosition, map });

                        // 번호 표시 오버레이
                        new window.kakao.maps.CustomOverlay({
                            map,
                            position: marker.getPosition(),
                            content: `<div style="background:#fff;border:1px solid #000;border-radius:3px;padding:2px;font-size:12px;text-align:center;width:24px;height:24px">${event.index}</div>`,
                        });
                    });

                    // Polyline 생성하여 선 그리기
                    if (linePath.length > 1) {
                        const polyline = new window.kakao.maps.Polyline({
                            path: linePath,
                            strokeWeight: 5, // 선 굵기를 5로 설정하여 가독성 강화
                            strokeColor: colors[day] || '#FF4500', // 일차에 맞는 색상 (기본값: 주황색)
                            strokeOpacity: 0.9, // 약간의 투명도를 추가하여 지도와 대비
                            strokeStyle: 'solid',
                        });

                        polyline.setMap(map);
                    }
                });

                map.setBounds(bounds);
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [locations]);

    return (
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
            <div id="kakaomap" style={{width: '100%', height: '100%'}}/>
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.3)',
                fontSize: '16px',
                zIndex: 1000,
                lineHeight: '1.8',
            }}>
                <p><span style={{color: '#0077FF', fontSize: '20px'}}>■</span> 1일차</p>
                <p><span style={{color: '#D2691E', fontSize: '20px'}}>■</span> 2일차</p>
                <p><span style={{color: '#32CD32', fontSize: '20px'}}>■</span> 3일차</p>
            </div>
        </div>
    );
};

export default KakaoMapPlaner;
