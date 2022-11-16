import style from "./Welcome.module.css";
import globalButtons from "../../global/buttons.module.css";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faShare } from "@fortawesome/free-solid-svg-icons";
//import { Link } from "react-router-dom";
//import { motion } from "framer-motion";

let Welcome = () => {
  let content = (
    <Container
      className={`${style.container} d-flex justify-content-center align-items-center my-5`}
    >
      <div className={`d-flex w-100`}>
        <div className={`${style.banner_image} w-100 text-center`}>
          <img src="/images/banner.png" alt="banner" />
        </div>

        <div
          className={`${style.banner_text} w-100 text-left d-flex justify-content-center align-items-center`}
        >
          <div>
            <h1 className={`display-1`}>
              <strong>
                Create and Share
                <br /> your Tests.
              </strong>
            </h1>
            <p className={`display-6`}>
              Create you test and share them with anyone,
              <br /> it's too easy and useful.
            </p>

            <div
              className={`d-flex justify-content-center align-items-center my-5 py-5 rounded shadow-lg`}
            >
              <a
                href="/share"
                className={`${globalButtons.secondary_button} mx-5`}
              >
                <FontAwesomeIcon icon={faShare} className={`mx-2`} />
                <span>Share Quest</span>
              </a>
              <a
                href="/create"
                className={`${globalButtons.primary_button} mx-5`}
              >
                <FontAwesomeIcon icon={faPlus} className={`mx-2`} />
                <span>Create Quest</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
  return content;
};

export default Welcome;
