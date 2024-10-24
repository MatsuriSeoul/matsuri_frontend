import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AIPlanerSection3 = () => {
    const location = useLocation(); // history에서 state를 받아옴
    const { region, category } = location.state; // state에서 지역과 카테고리 정보를 추출
    const [duration, setDuration] = useState(''); // 여행 기간 상태
    const [responseMessage, setResponseMessage] = useState(''); // 서버 응답 메시지
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 서버에 지역, 카테고리 및 기간 정보 전송
    const handleDurationSubmit = async () => {
        if (!duration) {
            alert("여행 기간을 선택하세요!");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('/api/openai/plan', {
                region: region,
                category: category,
                duration: duration
            });
            console.log('서버 응답:', response.data);
            setResponseMessage('여행 계획이 완료되었습니다! 결과를 확인하세요.');
        } catch (error) {
            console.error('오류 발생:', error);
            setResponseMessage('서버 요청 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>{region} 지역에서 {category} 카테고리로 여행할 기간을 선택하세요</h2>
            <div>
                {['당일', '1박 2일', '2박 3일'].map((d) => (
                    <button
                        key={d}
                        type="button"
                        onClick={() => setDuration(d)}
                        style={{ margin: '5px', backgroundColor: duration === d ? 'green' : '' }}
                    >
                        {d}
                    </button>
                ))}
            </div>
            <button onClick={handleDurationSubmit}>여행 기간 선택</button>

            <p>{responseMessage}</p>

            {loading && <p>서버 요청 중...</p>}
        </div>
    );
};

export default AIPlanerSection3;
