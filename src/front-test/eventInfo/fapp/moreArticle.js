import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const allEvent = Array.from({ length: 100 }, (_, i) => `Post ${i + 1}`);
const RecommendList = Array.from({ length: 20 }, (_, i) => `Post ${i + 1}`);

const MoreArticle = () =>{
    const {moreCategory} = useParams();

    const [visibleCount, setVisibleCount] = useState(16); 

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 8);
      };
    return(
        <section className='morearticle'>
            <div className='event-list'>
                <div className='list'>
                    {allEvent.slice(0, visibleCount).map((item, index)=> (
                        <div className="box">
                            <div className="img">
                                <div className="like-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                                </div>
                            </div>
                            <h1 className="title">신나는 캠핑</h1>
                            <p className="address">대전 중구</p>
                        </div>
                    ))}
                </div>
                {visibleCount < allEvent.length && (
                    <button className='more-btn' onClick={handleLoadMore}>더보기</button>
                )}
            </div>
            <aside className='sidebar'>
                <div className='hashtag-box'>
                    <p>#공짜로</p>
                    <p>#즐길 수 있다고??</p>
                    <p>#궁금하지않아?</p>
                    <p>#여기에 다 있어!!</p>
                </div>
                <div className='recommend-list'>
                    <h2 className='main-title'>유료행사는 어떠신가요?</h2>
                    {RecommendList.slice(0, 8).map((item) =>(
                        <div className='recommend'>
                            <div className='txt'>
                                <h3 className='title'>에코랜드 테마파크</h3>
                                <p className='addr'>제주특별자치도 제주시</p>
                                <p className='info'>설악 워터피아에서 즐기는 세계스파여행</p>
                            </div>
                            <div className='img'></div>
                        </div>
                    ))}
                </div>
            </aside>
            
        </section>
    )
}
export default MoreArticle;