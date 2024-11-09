import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";

const Article = () =>{
    //api
    const { themeItem } = useParams();
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {

            setEvents([]);

            let response;

            // 카테고리에 따라 API 요청
            if (themeItem === '관광지') {
                response = await axios.get(`http://localhost:8080/api/tourist-attractions/category/${themeItem}`);
            } else if (themeItem === '문화시설') {
                response = await axios.get(`http://localhost:8080/api/cultural-facilities/category/${themeItem}`, {
                    params: { numOfRows: '10', pageNo: '1' }
                });
            } else if (themeItem === '행사') {
                response = await axios.get(`http://localhost:8080/api/events/category/${themeItem}`, {
                    params: { numOfRows: '50', pageNo: '1' }
                });
            } else if (themeItem === '여행코스') {
                response = await axios.get(`http://localhost:8080/api/travel-courses/category/${themeItem}`, {
                    params: { numOfRows: '50', pageNo: '1' }
                });
            } else if (themeItem === '레포츠') {
                response = await axios.get(`http://localhost:8080/api/leisure-sports/category/${themeItem}`, {
                    params: { numOfRows: '10', pageNo: '1' }
                });
            } else if (themeItem === '숙박') {
                response = await axios.get(`http://localhost:8080/api/local-events/category/${themeItem}`, {
                    params: { numOfRows: '10', pageNo: '1' }
                });
            } else if (themeItem === '쇼핑') {
                response = await axios.get(`http://localhost:8080/api/shopping-events/category/${themeItem}`, {
                    params: { numOfRows: '10', pageNo: '1' }
                });
            } else if (themeItem === '음식') {
                response = await axios.get(`http://localhost:8080/api/food-events/category/${themeItem}`, {
                    params: { numOfRows: '10', pageNo: '1' }
                });
            }

            // 중복된 이벤트 제거
            const uniqueEvents = response.data.filter((event, index, self) =>
                index === self.findIndex((e) => e.contentid === event.contentid)
            );

            setEvents(uniqueEvents); // 상태 업데이트
        } catch (error) {

        }
    };

    useEffect(() => {
        setCurrentPage(1);
        fetchEvents();
    }, [themeItem]);

    useEffect(() => {
        fetchEvents();
    },[]);
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    // 현재 페이지에 해당하는 게시글 추출
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = events.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 수 계산
    const totalPages = Math.ceil(events.length / postsPerPage);

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
                <p className="second">{themeItem}</p>
            </div>

            <div className={`container ${themeItem === '여행코스' ? 'active' : ''}`}>
                {currentPosts.map((event, index) => (
                    <div className="box" key={index}>
                        <div className="img"
                             style={{
                                 backgroundImage: `url(${event.firstimage || event[1] || '/img/default_img.jpeg'})`,
                                 backgroundSize: 'cover',
                                 backgroundPosition: 'center',
                             }}
                        ></div>
                        <div className="txt">
                            <h3 className="title">{event.title}</h3>
                            <p className="info">{event.addr1}</p>
                            {/*<p className="info">{event.details?.overview}</p>*/}
                        </div>
                        <Link to={`/eventDetailPage/events/${event.contentid}/${event.contenttypeid}`} className="link-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button
                    type="button"
                    onClick={handlePreviousPage}
                    className={`btn prevbtn ${currentPage === 1 ? 'active' : ''}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#555555"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                </button>
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
                <button
                    type="button"
                    onClick={handleNextPage}
                    className={`btn nextbtn ${currentPage === totalPages ? 'active' : ''}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#555555"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                </button>
            </div>
        </div>
    )
}
export default Article;