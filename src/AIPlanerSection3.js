import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

const AIPlanerSection3 = () => {
    const history = useHistory();
    const location = useLocation();
    const { region, categories } = location.state; // 전달된 지역과 카테고리 받기
    const [duration, setDuration] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // 기간 선택 및 서버 요청
    const handleDurationSubmit = async () => {
        if (!duration) {
            alert("여행 기간을 선택하세요!");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('/api/openai/result', {
                region: region,
                categories: categories,  // 배열로 전달
                duration: duration
            });
            console.log('서버 응답:', response.data);

            // 결과 페이지로 이동, 서버 응답 데이터를 함께 전달
            history.push({
                pathname: '/plan-result',
                state: { result: response.data, region, categories, duration }
            });
        } catch (error) {
            console.error('오류 발생:', error);
            setResponseMessage('서버 요청 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>{region} 지역에서 {categories.join(', ')} 카테고리로 여행할 기간을 선택하세요</h2>
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
