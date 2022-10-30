import style from "./Welcome.module.css";
import globalButtons from "../../global/buttons.module.css";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faShare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

let Welcome = () => {
  let content = (
    <Container
      className={`${style.container} d-flex justify-content-center align-items-center`}
    >
      <div>
        <h2>Create easy Quests and share them with anyone</h2>
        <div className={`d-flex justify-content-center align-items-center my-5`}>
          <Link to="/create" className={`${globalButtons.primary} mx-5`}>
            <FontAwesomeIcon icon={faPlus} className={`mx-2`} /> 
            <span>Create Quest</span>
          </Link>
          <Link to="/share" className={`${globalButtons.primary} mx-5`}>
            <FontAwesomeIcon icon={faShare} className={`mx-2`} />
            <span>Share Quest</span>
          </Link>
        </div>
      </div>
    </Container>
  );
  return content;
};

export default Welcome;
