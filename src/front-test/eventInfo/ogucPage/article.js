import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment/moment";

const BoxList =[
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
]

const Article = () =>{

    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showOngoing, setShowOngoing] = useState(true); // 진행 중인 행사를 기본으로 설정

    // API 호출 함수
    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/events/scheduled`);
            setEvents(response.data);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // 진행 중인 행사 필터링
    const ongoingEvents = events.filter(event => {
        const today = moment();
        const startDate = event.beginDe ? moment(event.beginDe) : moment(event.rcptbgndt, "YYYY-MM-DD HH:mm:ss.S");
        const endDate = event.endDe ? moment(event.endDe) : moment(event.rcptenddt, "YYYY-MM-DD HH:mm:ss.S");
        return today.isBetween(startDate, endDate, 'day', '[]');
    });

    // 진행 예정인 행사 필터링
    const upcomingEvents = events.filter(event => {
        const today = moment();
        const startDate = event.beginDe ? moment(event.beginDe) : moment(event.rcptbgndt, "YYYY-MM-DD HH:mm:ss.S");
        return startDate.isAfter(today, 'day');
    });

    return(
        <>
            <section className="sec sec1">
                <Link to={'/ongoingUpComingPage/ongoing'}>
                    <p className="more-btn">더보기 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></p>
                </Link>
                <div className="sec1-container container">
                    <div className="title-hashtag">
                        <div className="design-point"></div>
                        <h1 className="title">개최중인 행사</h1>
                        <p className="sub-title">운영자가 추천하는 개최중인 행사입니다.</p>
                        <div className="hashtag">
                            <p>#어서빨리!</p>
                            <p>#즐길 수 있다고??</p>
                            <p>#궁금하지않아?</p>
                            <p>#여기에 다 있어!!</p>
                        </div>
                    </div>
                    <div className="img-list">
                            {ongoingEvents.slice(0, 6).map((event) => (
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
                </div> 
            </section>    
            <section className="sec sec2">
                <Link to={'/ongoingUpComingPage/upComing'}>
                    <p className="more-btn">더보기 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></p>
                </Link>
                <div className="sec2-container container">
                    <div className="title-hashtag">
                        <div className="design-point"></div>
                        <h1 className="title">개최예정 행사</h1>
                        <p className="sub-title">운영자가 추천하는 개최예정 행사입니다.</p>
                        <div className="hashtag">
                            <p>#두근두근</p>
                            <p>#기대할 만한</p>
                            <p>#곧 있을 행사가</p>
                            <p>#많을 거예요</p>
                        </div>
                    </div>
                    <div className="img-list">
                            {upcomingEvents.slice(0, 6).map((event) => (
                                <Link to={event.svcid ? `/eventDetailPage/seoul-events/${event.svcid}/seoul-events` : `/eventDetailPage/gyeonggi-events/${event.id}/gyeonggi-events`} className='box'>
                                    <div className="img"
                                         style={{
                                             backgroundImage: `url(${event.imageUrl || event.imgurl || '/img/default_img.jpeg'})`,
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
                </div>
            </section>
        </>
    )
}
export default Article;