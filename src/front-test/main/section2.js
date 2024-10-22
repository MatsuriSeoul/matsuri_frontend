import Section2Left from './section2/section2Left';
import Section2Right from './section2/section2Right';
import "../../css/main/section2.css";

const Section2 = () =>{
    return(
        <div className="main_section2">
            <Section2Left></Section2Left>
            <Section2Right></Section2Right>
        </div>
    );
}
export default Section2;