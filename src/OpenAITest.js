import React, { useState } from 'react';
import axios from 'axios';

const OpenAIChat = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [region, setRegion] = useState('');  // 지역 상태
    const [category, setCategory] = useState('');  // 카테고리 상태

    // 폼 제출 시 데이터 처리 및 AI API 호출
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (region.trim() === "" || category.trim() === "") {
            return;
        }

        console.log('선택된 지역:', region);
        console.log('선택된 카테고리:', category);

        // 사용자 메시지를 추가
        setChatHistory((prevHistory) => [
            ...prevHistory,
            { sender: 'user', message: `${region}의 ${category} 정보를 알려주세요!` }
        ]);

        try {
            const result = await axios.post('/api/openai/prompt', { region: region.toLowerCase(), category });

            console.log('AI Response:', result.data);

            const titles = result.data.titles; // AI 응답에서 titles 추출

            // AI의 응답을 추가
            if (titles && titles.length > 0) {
                setChatHistory((prevHistory) => [
                    ...prevHistory,
                    { sender: 'ai', message: formatResponse(titles) }
                ]);
            } else {
                setChatHistory((prevHistory) => [
                    ...prevHistory,
                    { sender: 'ai', message: `해당 지역(${region})과 카테고리(${category})에 대한 정보를 찾을 수 없습니다.` }
                ]);
            }
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'ai', message: '오류가 발생했습니다. 다시 시도해주세요.' }
            ]);
        }
    };

    // 텍스트 내 이미지 URL을 <img> 태그로 변환하고 상위 2개의 행사만 표시
    const formatResponse = (titles) => {
        let eventCount = 0; // 상위 두 개의 행사를 카운팅하기 위한 변수

        return titles.slice(0, 2).map((title, index) => (
            <div key={index} style={styles.aiMessage}>
                <p>제목: {title}</p>
                <p>자동 생성 추천 문구: {generateRecommendation(title)}</p>
            </div>
        ));
    };

    // 제목을 기반으로 추천 문구를 생성하는 함수
    const generateRecommendation = (title) => {
        return `${title}는 꼭 방문해볼 만한 멋진 장소입니다! 이곳에서 특별한 경험을 만끽하세요.`;
    };

    return (
        <div style={styles.chatContainer}>
            <div style={styles.chatBox}>
                {chatHistory.map((chat, index) => (
                    <div key={index} style={chat.sender === 'user' ? styles.userMessage : styles.aiMessage}>
                        <strong>{chat.sender === 'user' ? '사용자' : 'AI'}:</strong>
                        <div>{chat.message}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={styles.inputForm}>
                <div>
                    <label>지역을 선택하세요:</label>
                    <div>
                        {['서울', '경기', '인천', '대전', '강원', '부산', '울산', '대구', '전남', '전북', '충남', '충북', '경남', '경북', '제주'].map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setRegion(r)}
                                style={region === r ? styles.activeButton : styles.button}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label>카테고리를 선택하세요:</label>
                    <div>
                        {['관광지', '문화시설', '행사', '여행코스', '레포츠', '숙박', '쇼핑', '음식'].map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setCategory(c)}
                                style={category === c ? styles.activeButton : styles.button}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
                <button type="submit" style={styles.sendButton}>검색</button>
            </form>
        </div>
    );
};

// 스타일 정의
const styles = {
    chatContainer: {
        maxWidth: '800px',
        maxHeight: '600px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    chatBox: {
        border: '1px solid #ccc',
        padding: '10px',
        height: '300px',
        overflowY: 'scroll',
        backgroundColor: '#f9f9f9',
    },
    userMessage: {
        textAlign: 'right',
        backgroundColor: '#daf1da',
        padding: '10px',
        borderRadius: '10px',
        margin: '5px 0',
    },
    aiMessage: {
        textAlign: 'left',
        backgroundColor: '#f1f0f0',
        padding: '10px',
        borderRadius: '10px',
        margin: '5px 0',
    },
    inputForm: {
        marginTop: '10px',
    },
    button: {
        margin: '5px',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
    },
    activeButton: {
        margin: '5px',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: '1px solid #4CAF50',
    },
    sendButton: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '10px',
    },
};

export default OpenAIChat;
