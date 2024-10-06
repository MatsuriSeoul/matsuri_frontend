import React, { useState, useEffect  } from 'react';
import Select from 'react-select';

import Header from './layout/header';
import Footer from './layout/footer';
import '../css/noticePage/noticePage.css';

const allPosts = Array.from({ length: 492 }, (_, i) => `Post ${i + 1}`);

const FNoticePage = () =>{

    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const postsPerPage = 20;

    // 현재 페이지에 해당하는 게시글 추출
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 수 계산
    const totalPages = Math.ceil(allPosts.length / postsPerPage);

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
        setInputValue(''); 
    };

    return(
        <div className="noticepage">
            <Header></Header>
            <div className='headerbar'></div>
            <section
              className="banner"
              style={{
                backgroundImage: `url('/img/notice-bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat'
              }}
            >
                {/* <h1 className="banner-title">웹이름 소식</h1> */}
            </section>
            <article className="article">
                <h2 className='article-title'>공지사항</h2>
                <p className='post-count'>총 500개의 글이 있습니다.</p>
                <div className='post-list'>
                    <div className='thead'>
                        <p className='th-title th1'>구분</p>
                        <p className='th-title th2'>제목</p>
                        <p className='th-title th3'>작성자</p>
                        <p className='th-title th4'>작성일</p>
                    </div>
                    {currentPosts.map((post, index) => (
                        <div className="post" key={index}>
                            <p className='division'>공지사항</p>
                            <p className='post-title'>7월11일(목)  서버 점검 안내(09:00~16:00)</p>
                            <p className='author'>운영자</p>
                            <p className='creation-date'>24.07.04</p>
                        </div>
                ))}
                </div>
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
                
                </form>
            </article>
            <Footer></Footer>
        </div>
    )
}

export default FNoticePage;