import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AIPlanerSection2 = ({ region }) => {
    const [category, setCategory] = useState(''); // 카테고리 상태
    const [responseMessage, setResponseMessage] = useState(''); // 서버 응답 메시지
    const [loading, setLoading] = useState(false); // 로딩 상태

    const history = useHistory();  // history 객체 가져오기

    // 서버에 지역 및 카테고리 정보 전송
    const handleCategorySubmit = async () => {
        if (!category) {
            alert("카테고리를 선택하세요!");
            return;
        }

        setLoading(true);

        try {
            // 서버에 지역과 카테고리 전송
            const response = await axios.post('/api/openai/plan', {
                region: region,
                category: category
            });
            console.log('서버 응답:', response.data);
            setResponseMessage('추천 결과를 확인하세요!');

            // 여행 기간 선택 화면으로 이동, 지역과 카테고리 정보를 state로 전달
            history.push({
                pathname: '/plan-section3',
                state: { region, category } // state에 region, category 정보 전달
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
            <h2>{region} 지역에 대한 카테고리를 선택하세요</h2>
            <div>
                {['관광지', '문화시설', '행사', '여행코스', '레포츠', '숙박', '쇼핑', '음식'].map((c) => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => setCategory(c)}
                        style={{ margin: '5px', backgroundColor: category === c ? 'green' : '' }}
                    >
                        {c}
                    </button>
                ))}
            </div>
            <button onClick={handleCategorySubmit}>카테고리 선택</button>

            <p>{responseMessage}</p>

            {loading && <p>서버 요청 중...</p>}
        </div>
    );
};

export default AIPlanerSection2;
