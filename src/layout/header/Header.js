import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./Header.module.css"
import globalButtons from "../../global/buttons.module.css";

let Header = () => {
  let content = (
    <header className={[`${style.header} shadow-lg`]}>
      <Container className={`py-3`}>
        <Link to="/" className={`${globalButtons.primary_link}`}><h1>Quest Builder</h1></Link>
      </Container>
    </header>
  );

  return content;
};

export default Header;
