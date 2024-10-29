import React, {useEffect, useRef, useState} from "react";
import '../../css/noticePage/noticeWrite.css';
import axios from "axios";
import {useHistory} from "react-router-dom";
import Select from "react-select";
const IQWrite = () => {
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState(true); // 공개 여부 기본값: 공개

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // JWT 토큰 사용
        try {
            const inquiry = { title, content, isPublic };  // isPublic 값 추가
            await axios.post('/api/inquiries', inquiry, {
                headers: {
                    'Authorization': `Bearer ${token}` // 인증된 사용자만 작성 가능
                }
            });

            setTitle('');
            setContent('');
            setIsPublic(true);  // 초기화
            alert('문의사항 등록 완료!');
            history.push('/inQuiryPage');
        } catch (error) {
            console.error('문의사항 등록 오류:', error);
        }
    };
    const handleCancle = () =>{
        history.push('/inQuiryPage');
    }

    const options = [
        { value: true, label: '공개' },
        { value: false, label: '비공개' },
    ];
    const [selected, setSelected] = useState(options[0]);

    const onChangeSelect = (e) => {
        if(e){
            setSelected(e);
            setIsPublic(e.value);
        }
        else setSelected(options[0]);

    };


    return (
        <div className='noticle-container'>
            <section className="notice">
                <div className="headText">
                    문의사항 작성
                </div>
                <form className="notice-container" onSubmit={handleSubmit}>
                    <div className="noticeTitleBox">
                        <div className="headTextBox">제목</div>
                        <input className="noticeTitle" type="text" placeholder="제목을 입력해주세요"
                               value={title} onChange={(e) => setTitle(e.target.value)} required
                        ></input>
                    </div>
                    <div className="noticeContentBox">
                        <div className="headTextBox">내용</div>
                        <textarea className="contentText" placeholder="내용을 입력해주세요."
                                  value={content} onChange={(e) => setContent(e.target.value)} required
                        ></textarea>
                    </div>
                    <div className='select'>
                        <Select
                            onChange={onChangeSelect}
                            options={options}
                            value={selected}
                        />
                    </div>
                    <div className="btn-wrap">
                        <button type="submit" className="btnOk">확인</button>
                        <p className="btnReset" onClick={handleCancle}>취소</p>
                    </div>
                </form>
            </section>
        </div>
    );
};
export default IQWrite;
