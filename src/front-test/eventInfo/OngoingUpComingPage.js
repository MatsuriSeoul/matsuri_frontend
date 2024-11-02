import React, {useEffect, useState} from 'react';
import {Route, Switch, useParams} from 'react-router-dom';

import Article from './ogucPage/article';
import MoreArticle from './ogucPage/moreArticle';
import Header from '../layout/header';
import Footer from '../layout/footer';

import '../../css/eventInfo/freeAndPaidPage.css';
import axios from "axios";
import moment from "moment";



const OngoingUpComingPage = () =>{
    const { moreCategory }  = useParams();

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
            console.error('행사 데이터를 가져오는 중 오류 발생:', error);
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
        <div className="fapp">
            <Header></Header>
            <div className='headerbar'></div>
            <section className='banner'>
                <h1 className='title'>어떤 행사를 원하시나요?</h1>
                <p className='sub-title'>개최중인 행사와 개최예정 중 어떤 걸 원하시나요.</p>
                <div className='underbar'></div>
            </section>
            {!moreCategory ? (
                <Article />
            ) : (
                <MoreArticle ongoing={ongoingEvents} upComing={upcomingEvents} />
            )}
            <Footer></Footer>
        </div>
    )
}
export default OngoingUpComingPage;