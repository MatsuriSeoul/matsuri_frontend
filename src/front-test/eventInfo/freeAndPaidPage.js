import React, {useEffect, useState} from 'react';
import {Route, Switch, useParams} from 'react-router-dom';

import Article from './fapp/article';
import MoreArticle from './fapp/moreArticle';
import Header from '../layout/header';
import Footer from '../layout/footer';

import '../../css/eventInfo/freeAndPaidPage.css';
import axios from "axios";



const FreeAndPaidPage = () =>{
    const { moreCategory }  = useParams();

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
        <div className="fapp">
            <div className='headerbar'></div>
            <section className='banner'>
                <h1 className='title'>어떤 행사를 원하시나요?</h1>
                <p className='sub-title'>무료와 유료 중 어떤 걸 더 선호하시나요.</p>
                <div className='underbar'></div>
            </section>
            {!moreCategory ? (
                <Article />
            ) : (
                <MoreArticle freeEvents={freeEvents} paidEvents={paidEvents} />
            )}
            <Footer></Footer>
        </div>
    )
}
export default FreeAndPaidPage;