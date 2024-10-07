import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const allPosts = Array.from({ length: 100 }, (_, i) => `Post ${i + 1}`);

const Article = () =>{
    const { themeId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

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

    return(
        <div className="tp-article">
            <div className="path">
                <div className="homeicon">
                    <img src="/img/icon/home.svg"></img>
                </div>
                <div className="arrow-wall">
                    <img src="/img/icon/arrow_2.svg"></img>
                </div>
                <p className="first">테마</p>
                <div className="arrow-wall">
                <img src="/img/icon/arrow_2.svg"></img>
                </div>
                <p className="second">{themeId}</p>
            </div>

            <div className={`container ${themeId === '2' ? 'active' : ''}`}>
                {currentPosts.map((post, index) => (
                    <div className="box" key={index}>
                        <div className="img"></div>
                        <div className="txt">
                            <h3 className="title">명동 쇼핑</h3>
                            <p className="info">명동은 최근 각 브랜드들이 명동 상권에 주요
                                매장을 공격적으로 오픈하면서 과거의 명성을 되찾고 있다.</p>     
                        </div>
                        <div className="link-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                        </div>
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
        </div>
    )
}
export default Article;