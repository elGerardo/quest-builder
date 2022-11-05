import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./Header.module.css"
import globalButtons from "../../global/buttons.module.css";

let Header = () => {

  /*let mouseMove = (e) => {
    let pointer = document.getElementById("pointer");
    pointer.style.display = "inline"; 
    let x = e.pageX;
    let y = e.pageY;
    pointer.style.left = x + 'px';
    pointer.style.top = y + 'px';
  }

  let mouseLeave = (e) => {
    let pointer = document.getElementById("pointer");
    pointer.style.display = "none";
  };*/

  let content = (
    <header className={[`${style.header} shadow-lg`]} /*onMouseMove={mouseMove} onMouseLeave={mouseLeave}*/>
      <Container onClick={window.scrollTo(0,0)} className={`py-3`} >
        <Link to="/" className={`${globalButtons.primary_link}`}><h1>Quest Builder</h1></Link>
      </Container>
    </header>
  );

  return content;
};

export default Header;
