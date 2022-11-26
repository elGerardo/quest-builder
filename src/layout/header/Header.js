import { Container } from "react-bootstrap";
//import { Link } from "react-router-dom";
import style from "./Header.module.css"
import globalButtons from "../../global/buttons.module.css";

let Header = () => {
  let content = (
    <header className={[`${style.header} shadow-lg`]}>
      <Container onClick={window.scrollTo(0,0)} className={`py-3`} >
        <a href="/" className={`${globalButtons.primary_link}`}><h1>Test Builder</h1></a>
      </Container>
    </header>
  );

  return content;
};

export default Header;
