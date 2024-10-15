import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OpenAIChat = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [region, setRegion] = useState('');  // 지역 상태
    const [category, setCategory] = useState('');  // 카테고리 상태
    const [loading, setLoading] = useState(false);  // 데이터 로딩 상태

    // 페이지 처음 방문 시 AI의 첫 메시지를 랜덤하게 설정하는 함수
    const getRandomGreeting = () => {
        const greetings = [
            '안녕하세요! 무엇을 도와드릴까요?',
            '환영합니다! 어떤 정보를 찾고 계신가요?',
            '안녕하세요! 지역과 카테고리를 선택해서 필요한 정보를 찾아보세요.',
            '안녕하세요! 여행지를 찾고 계신가요? 아래에서 선택해 주세요.'
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    };

    // 페이지 첫 로드 시 AI 메시지를 전송
    useEffect(() => {
        setChatHistory((prevHistory) => [
            ...prevHistory,
            { sender: 'ai', message: getRandomGreeting() }
        ]);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (region.trim() === "" || category.trim() === "") {
            return;
        }

        // 사용자 입력 메시지 추가
        setChatHistory((prevHistory) => [
            ...prevHistory,
            { sender: 'user', message: `${region}의 ${category} 정보를 알려주세요!` }
        ]);

        // 로딩 상태 활성화
        setLoading(true);

        // 검색 중 메시지 추가
        setChatHistory((prevHistory) => [
            ...prevHistory,
            { sender: 'ai', message: `${region}에 대한 ${category} 정보를 찾는 중이에요! 잠시만 기다려주세요.` }
        ]);

        try {
            const result = await axios.post('/api/openai/prompt', { region: region.toLowerCase(), category });

            console.log('AI Response:', result.data);

            // titles가 유효한지 체크
            const titles = result.data && result.data.titles ? result.data.titles : [];

            if (titles.length === 0) {
                setChatHistory((prevHistory) => [
                    ...prevHistory,
                    { sender: 'ai', message: `해당 지역(${region})과 카테고리(${category})에 대한 정보를 찾을 수 없습니다.` }
                ]);
            } else {
                // AI 추천 문구 생성
                setChatHistory((prevHistory) => [
                    ...prevHistory,
                    { sender: 'ai', message: formatResponse(titles) } // 결과 데이터 사용
                ]);
            }
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'ai', message: '오류가 발생했습니다. 다시 시도해주세요.' }
            ]);
        } finally {
            setLoading(false); // 로딩 상태 비활성화
        }
    };

    // 텍스트 내 이미지 URL을 <img> 태그로 변환하고 "제목", "추천 문구", "이미지" 형식으로 표시
    const formatResponse = (titles) => {
        if (!titles || titles.length === 0) {
            return <p>검색 결과가 없습니다.</p>; // 검색 결과가 없을 때 처리
        }

        return titles.map((item, index) => (
            <div key={index} style={styles.aiMessage}>
                <p>제목: {item.title}</p>
                <p>자동 생성 추천 문구: {generateRecommendation(item.title)}</p>
                {item.firstimage && (
                    <img src={item.firstimage} alt={item.title} style={styles.image} />
                )} {/* 이미지가 있을 때만 표시 */}
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
            {loading && <p>{region}에 대한 {category}를 찾는 중이에요!</p>} {/* 로딩중 텍스트 표시 */}
        </div>
    );
};

const styles = {
    chatContainer: {
        maxWidth: '1000px', // 폼 크기 확대
        maxHeight: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    chatBox: {
        border: '1px solid #ccc',
        padding: '10px',
        height: '500px',  // 더 큰 채팅 박스 높이
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
    image: {
        maxWidth: '70%',  // 이미지 크기를 70%로 줄임
        height: 'auto',
        margin: '10px 0',
    }
};

export default OpenAIChat;
