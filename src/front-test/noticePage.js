import React, {useState, useEffect, useContext} from 'react';
import Select from 'react-select';

import Header from './layout/header';
import Footer from './layout/footer';
import '../css/noticePage/noticePage.css';
import AuthContext from "../AuthContext";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";


const FNoticePage = () =>{

    const { auth } = useContext(AuthContext);

    const [notices, setNotices] = useState([]);
    const [allNotices, setAllNotices] = useState([]);
    const history = useHistory();
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get('/api/notice');
                setNotices(response.data);
                setAllNotices(response.data); // 전체 공지사항 저장
            } catch (error) {
                console.error('Error fetching notices', error);
            }
        };
        fetchNotices();
    }, [auth.token]);

    const handleCreateNotice = () => {
        if (userRole === 'ADMIN') {
            history.push('/noticePage/write');
        }
        else {
            alert('글쓰기 권한이 없습니다. 관리자에게 문의하세요.');
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const postsPerPage = 20;

    // 현재 페이지에 해당하는 게시글 추출
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = notices.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 수 계산
    const totalPages = Math.ceil(notices.length / postsPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    // 이전 페이지로 이동
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 다음 페이지로 이동
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 페이지 버튼을 표시할 범위 계산
    const pageButtonsToShow = 10;
    const startPage = Math.max(1, currentPage - Math.floor(pageButtonsToShow / 2));
    const endPage = Math.min(totalPages, startPage + pageButtonsToShow - 1);

    // 페이지 버튼 배열 생성
    const pageButtons = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    const options = [
        { value: '제목본문', label: '제목 + 본문' },
        { value: '제목', label: '제목' },
        { value: '본문', label: '본문' },
    ];
    const [selected, setSelected] = useState(options[0]); 

    const onChangeSelect = (e: any) => {
        if (e) setSelected(e);
        else setSelected(options[0]); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const filteredNotices = allNotices.filter(notice => {
            if (selected.value === '제목본문') {
                return (
                    notice.title.includes(inputValue) ||
                    notice.content.includes(inputValue)
                );
            } else if (selected.value === '제목') {
                return notice.title.includes(inputValue);
            } else if (selected.value === '본문') {
                return notice.content.includes(inputValue);
            }
            return true;
        });

        setNotices(filteredNotices);
        setInputValue('');
    };

    const handleAllSearch = () => {
        setNotices(allNotices); // 전체 공지사항으로 복원
        setInputValue(''); // 입력값 초기화
    };

    return(
        <div className="noticepage">
            <Header></Header>
            <div className='headerbar'></div>
            <section
              className="banner"
              style={{
                backgroundImage: `url('/img/notice-banner.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat'
              }}
            >
                 <h1 className="banner-title">공지사항</h1>
            </section>
            <article className="article">
                <div className='wriht-box'>
                    <p className='post-count'>총 {notices.length}개의 글이 있습니다.</p>
                    {userRole === 'ADMIN' && (
                        <button className="write-btn" onClick={handleCreateNotice}>
                            공지 작성
                        </button>
                    )}
                </div>

                <div className='post-list'>
                    <div className='thead'>
                        <p className='th-title th1'>구분</p>
                        <p className='th-title th2'>제목</p>
                        <p className='th-title th3'>작성자</p>
                        <p className='th-title th4'>작성일</p>
                        <p className='th-title th5'>조회수</p>
                    </div>
                    {currentPosts.map(notice => (
                        <Link to={`./noticePage/${notice.id}`}>
                            <div className="post" key={notice.id}>
                                <p className='division'>공지사항</p>
                                <p className='post-title'>{notice.title}</p>
                                <p className='author'>운영자</p>
                                <p className='creation-date'>{notice.createdTime}</p>
                                <p className='viewcnt'>{notice.viewcnt}</p>
                            </div>
                        </Link>
                ))}
                </div>
                {totalPages > 0 ? (
                    <div className="pagination">
                        <div
                            onClick={handlePreviousPage}
                            className={`btn prevbtn ${currentPage === 1 ? 'active' : ''}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#555555"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                        </div>
                        <div className="pagenumber">
                            {pageButtons.map(pageNumber => (
                                <div
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`num ${pageNumber === currentPage ? 'active' : ''}`}
                                >
                                    {pageNumber}
                                </div>
                            ))}
                        </div>
                        <div
                            onClick={handleNextPage}
                            className={`btn nextbtn ${currentPage === totalPages ? 'active' : ''}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#555555"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                        </div>
                    </div>
                ) : (<></>)}
                <form className='post-search' onSubmit={handleSubmit}>
                <Select
                  onChange={onChangeSelect}
                  options={options}
                  value={selected}
                />
                {/* https://1two13.tistory.com/entry/React-react-select-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%84%9C-select-%EB%A7%8C%EB%93%A4%EA%B8%B0-select-%EC%A0%84%EB%B6%80-%EC%B4%88%EA%B8%B0%ED%99%94%ED%95%98%EB%8A%94-%EB%B2%95 */}
                
                <input 
                    type='text' 
                    placeholder='검색' 
                    className='search-text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type='submit' className='submit-btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                </button>
                <button type='button' className='all-search'  onClick={handleAllSearch}>전체보기</button>
                </form>
            </article>
            <Footer></Footer>
        </div>
    )
}

export default FNoticePage;