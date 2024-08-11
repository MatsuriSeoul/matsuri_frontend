import "../css/layout/footer.css"

const Footer = () =>{
    return(
        <footer className="footer">
            <div className="f-top">
                <div className="left">
                    <p>개인정보처리방침</p>
                    <div className="wall"></div>
                    <p>저작권 보호정책</p>
                </div>
                <div className="icons">
                    <img className="facebook" src="/img/footer/facebook.png"></img>
                    <img className="instagram" src="/img/footer/instagram.png"></img>
                    <img className="youtube" src="/img/footer/youtube.png"></img>
                </div>
            </div>
            <div className="f-mid">
                <div className="left">
                    <div className="address">
                        <p>대전광역시 동구 용운동 300-716, 대전대학교 / Tel : 012-3456-7890</p>
                    </div>
                    <p>Copyright © 대한민국 핫!스팟</p>
                </div>
                <div className="right">
                    <h2 className="title">운영<img src="/img/footer/open_in_new.svg"></img></h2>
                    <p className="time">월~금, 오전 9시~오후 6시</p>
                    <p className="email">xhflzm123@naver.com</p>
                    <h2 className="title mid">관공불편처리센터<img src="/img/footer/open_in_new.svg"></img></h2>
                    <h2 className="title">일반 관광 문의<img src="/img/footer/open_in_new.svg"></img></h2>
                    <span className="num">1330</span>
                </div>
            </div>
            <div className="f-bot"></div>
        </footer>
    )
}

export default Footer;