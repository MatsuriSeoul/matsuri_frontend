import React from "react";
import '../../css/noticePage/noticeWrite.css';
const NoticeWrite = () => {
    return (
        <div>
            <section className="notice">
                <div className="headText">
                    공지사항 작성
                </div>
                <div className="createDate">
                    작성일자 : 2024. 07. 15
                </div>
                <div className="notice-container">
                    <div className="noticeTitleBox">
                        <div className="headTextBox">제목</div>
                        <input className="noticeTitle" type="text" placeholder="제목을 입력해주세요"></input>
                    </div>
                    <div className="noticeContentBox">
                        <div className="headTextBox">내용</div>
                        <textarea className="contentText" placeholder="내용을 입력해주세요."></textarea>
                    </div>
                    <div className="contentCreateDate">
                        <div className="headTextBox">작성일자</div>
                        <input className="createDateText" type="text" placeholder="날짜를 입력해주세요."></input>
                    </div>
                    <div className="btn-wrap">
                        <button className="btnOk">확인</button>
                        <button className="btnReset">취소</button>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default NoticeWrite;
