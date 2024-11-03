import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";

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

    const [freeEvents, setFreeEvents] = useState([]);
    const [paidEvents, setPaidEvents] = useState([]);

    const fetchFreeEvents = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/events/free`);
            setFreeEvents(response.data);
        } catch (error) {

        }
    };
    const fetchPaidEvents = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/events/paid`);
            setPaidEvents(response.data);
        } catch (error) {

        }
    };
    useEffect(() => {
        fetchFreeEvents();
        fetchPaidEvents();
    }, []);

    return(
        <>
            <section className="sec sec1">
                <Link to={'/freeAndPaidPage/free'}>
                    <p className="more-btn">더보기 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></p>
                </Link>
                <div className="sec1-container container">
                    <div className="title-hashtag">
                        <div className="design-point"></div>
                        <h1 className="title">무료 행사</h1>
                        <p className="sub-title">운영자가 추천하는 무료 행사입니다.</p>
                        <div className="hashtag">
                            <p>#공짜로</p>
                            <p>#즐길 수 있다고??</p>
                            <p>#궁금하지않아?</p>
                            <p>#여기에 다 있어!!</p>
                        </div>
                    </div>
                    <div className="img-list">
                            {freeEvents.slice(0, 6).map((event) => (
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
            <section className="sec sec2">
                <Link to={'/freeAndPaidPage/paid'}>
                    <p className="more-btn">더보기 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></p>
                </Link>
                <div className="sec2-container container">
                    <div className="title-hashtag">
                        <div className="design-point"></div>
                        <h1 className="title">유료 행사</h1>
                        <p className="sub-title">운영자가 추천하는 유료 행사입니다.</p>
                        <div className="hashtag">
                            <p>#내.돈.내.산</p>
                            <p>#유료인 만큼</p>
                            <p>#더 재밌는 행사가</p>
                            <p>#많을 거예요</p>
                        </div>
                    </div>
                    <div className="img-list">
                            {paidEvents.slice(0, 6).map((event) => (
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