import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';

const allEvent = Array.from({length: 100}, (_, i) => `Post ${i + 1}`);
const RecommendList = Array.from({length: 20}, (_, i) => `Post ${i + 1}`);

const MoreArticle = ({freeEvents, paidEvents}) => {
    const {moreCategory} = useParams();
    const [visibleCount, setVisibleCount] = useState(16);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 8);
    };

    const Events = moreCategory === 'free' ? freeEvents : paidEvents;
    const RecommendEvents = moreCategory === 'free' ? paidEvents : freeEvents;

    return (
        <section className='morearticle'>
            <div className='event-list'>
                <div className='list'>
                    {Events.slice(0, visibleCount).map((event, index) => (
                        <Link to={event.svcid ? `/eventDetailPage/seoul-events/${event.svcid}/seoul-events` : `/eventDetailPage/gyeonggi-events/${event.id}/gyeonggi-events`} className='box'>
                            <div className="img"
                                 style={{
                                     backgroundImage: `url(${(event.imageUrl && event.imageUrl !== '') || (event.imgurl && event.imgurl !== '') ? event.imageUrl || event.imgurl : '/img/default_img.jpeg'})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center',
                                 }}
                            >
                            </div>
                            <h1 className="title">{event.title || event.svcnm}</h1>
                            <p className="address">{event.addr || event.placenm}</p>
                        </Link>
                    ))}
                </div>
                {visibleCount < Events.length && (
                    <button className='more-btn' onClick={handleLoadMore}>더보기</button>
                )}
            </div>
            <aside className='sidebar'>

                    {moreCategory === 'free' ? (
                        <div className='hashtag-box'>
                            <p>#내.돈.내.산</p>
                            <p>#유료인 만큼</p>
                            <p>#더 재밌는 행사가</p>
                            <p>#많을 거예요</p>
                        </div>
                    ) : (
                        <div className='hashtag-box'>
                            <p>#공짜로</p>
                            <p>#즐길 수 있다고??</p>
                            <p>#궁금하지않아?</p>
                            <p>#여기에 다 있어!!</p>
                        </div>

                    )}
            <div className='recommend-list'>
                    <h2 className='main-title'>{moreCategory === 'free' ? '유료행사' : '무료행사'}는 어떠신가요?</h2>
                    {RecommendEvents.slice(0, 8).map((event) => (
                        <Link to={event.svcid ? `/eventDetailPage/seoul-events/${event.svcid}/seoul-events` : `/eventDetailPage/gyeonggi-events/${event.id}/gyeonggi-events`} className='recommend'>
                            <div className='txt'>
                                <h3 className='title'>{event.title || event.svcnm}</h3>
                                <p className='addr'>{event.addr || event.placenm}</p>
                                <p className='info'>설악 워터피아에서 즐기는 세계스파여행</p>
                            </div>

                            <div className="img"
                                 style={{
                                     backgroundImage: `url(${(event.imageUrl && event.imageUrl !== '') || (event.imgurl && event.imgurl !== '') ? event.imageUrl || event.imgurl : '/img/default_img.jpeg'})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center',
                                 }}
                            ></div>
                        </Link>
                    ))}
                </div>
            </aside>

        </section>
    )
}

export default MoreArticle;