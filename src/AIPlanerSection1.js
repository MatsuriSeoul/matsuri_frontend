import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';  // history를 사용하기 위해 추가

const AIPlanerSection1 = () => {
    const [region, setRegion] = useState(''); // 지역 상태
    const [responseMessage, setResponseMessage] = useState(''); // 서버 응답 메시지
    const [loading, setLoading] = useState(false); // 로딩 상태

    const history = useHistory();  // history 객체 가져오기

    // 서버에 지역 정보 전송
    const handleSelectClick = async () => {
        if (!region) {
            alert("지역을 먼저 선택하세요!"); // 지역이 선택되지 않았을 경우 경고 메시지
            return;
        }

        setLoading(true);

        try {
            // 지역만 전송하는 새로운 엔드포인트로 요청
            const response = await axios.post('/api/openai/region', {
                region: region
            });
            console.log('서버 응답:', response.data); // 서버로부터의 응답 로그
            setResponseMessage(response.data.message); // 서버로부터 메시지 설정

            // 카테고리 선택 화면으로 이동
            history.push('/plan-section2', { region });  // 지역을 가지고 카테고리 선택 화면으로 이동
        } catch (error) {
            console.error('오류 발생:', error);
            setResponseMessage('서버 요청 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>여행 지역을 선택하세요</h2>
            <div>
                {['서울', '경기', '인천', '대전', '강원', '부산', '울산', '대구', '전남', '전북', '충남', '충북', '경남', '경북', '제주'].map((r) => (
                    <button
                        key={r}
                        type="button"
                        onClick={() => setRegion(r)}
                        style={{ margin: '5px', backgroundColor: region === r ? 'green' : '' }}
                    >
                        {r}
                    </button>
                ))}
            </div>
            <button onClick={handleSelectClick}>선택</button>

            <p>{responseMessage}</p>

            {loading && <p>서버 요청 중...</p>}
        </div>
    );
};

export default AIPlanerSection1;
