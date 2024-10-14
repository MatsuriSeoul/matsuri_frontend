import React, { useState } from 'react';
import axios from 'axios';

const OpenAIChat = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [region, setRegion] = useState('');  // 지역 상태
    const [category, setCategory] = useState('');  // 카테고리 상태

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (region.trim() === "" || category.trim() === "") {
            return;
        }

        // 선택된 지역과 카테고리 확인
        console.log('선택된 지역:', region); // 선택된 지역 확인
        console.log('선택된 카테고리:', category); // 선택된 카테고리 확인

        try {
            // 지역을 소문자로 변환하여 전송
            const result = await axios.post('/api/openai/prompt', { region: region.toLowerCase(), category });

            console.log('AI Response:', result.data);

            const completionText = result.data.choices && result.data.choices[0].message.content;

            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'ai', message: completionText }
            ]);
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'ai', message: '오류가 발생했습니다. 다시 시도해주세요.' }
            ]);
        }
    };


    return (
        <div style={styles.chatContainer}>
            <h1>OpenAI 대화</h1>
            <div style={styles.chatBox}>
                {chatHistory.map((chat, index) => (
                    <div
                        key={index}
                        style={chat.sender === 'user' ? styles.userMessage : styles.aiMessage}
                    >
                        <strong>{chat.sender === 'user' ? '사용자' : 'AI'}:</strong>
                        <p>{chat.message}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={styles.inputForm}>
                <div>
                    <label>지역을 선택하세요:</label>
                    <div>
                        {/* 지역 선택 버튼 목록 */}
                        {['서울', '경기', '인천', '대전', '강원', '부산', '울산', '대구', '전남', '전북', '충남', '충북', '경남', '경북', '제주'].map((r) => (
                            <button key={r} type="button" onClick={() => setRegion(r)} style={styles.button}>
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label>카테고리를 선택하세요:</label>
                    <div>
                        {/* 카테고리 선택 버튼 목록 */}
                        {['관광지', '문화시설', '행사', '여행코스', '레포츠', '숙박', '쇼핑', '음식'].map((c) => (
                            <button key={c} type="button" onClick={() => setCategory(c)} style={styles.button}>
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

const styles = {
    chatContainer: {
        maxWidth: '600px',
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
    // 클릭된 상태 스타일
    activeButton: {
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
