import Header from "./layout/header";
import Banner from "./main/banner";
import Section1 from "./main/section1";
import Footer from "./layout/footer";

import "../css/main/banner.css";
import "../css/main/section1.css"

const MainPage = () =>{
    return(
        <>
            <Header/>
            <Banner/>
            <Section1/>
            <Footer/>
        </>
    )
}
export default MainPage;