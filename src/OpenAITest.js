import React, { useState } from 'react';
import axios from 'axios';

const OpenAIChat = () => {
    const [prompt, setPrompt] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (prompt.trim() === "") return;

        // 사용자 메시지 추가
        setChatHistory([...chatHistory, { sender: 'user', message: prompt }]);

        try {
            // Spring Boot API에 요청 전송
            const result = await axios.post('/api/openai/prompt', { prompt });

            // AI 응답 확인 (response.data가 객체일 경우)
            const completionText = result.data.choices && result.data.choices[0].message.content;

            // 응답을 문자열로 변환하여 추가
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

        // 입력창 초기화
        setPrompt('');
    };

    return (
        <div style={styles.chatContainer}>
            <h1>OpenAI 대화</h1>
            <div style={styles.chatBox}>
                {chatHistory.map((chat, index) => (
                    <div
                        key={index}
                        style={
                            chat.sender === 'user'
                                ? styles.userMessage
                                : styles.aiMessage
                        }
                    >
                        <strong>{chat.sender === 'user' ? '사용자' : 'AI'}:</strong>
                        <p>{typeof chat.message === 'string' ? chat.message : JSON.stringify(chat.message)}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={styles.inputForm}>
                <textarea
                    rows="3"
                    cols="50"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    style={styles.textArea}
                />
                <button type="submit" style={styles.sendButton}>전송</button>
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
    textArea: {
        width: 'calc(100% - 80px)',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
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
