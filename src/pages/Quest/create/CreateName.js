import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import style from "./CreateName.module.css";
import globalButtons from "../../../global/buttons.module.css";
let CreateName = () => {
  //states
  let [questName, setQuestName] = useState("");

  let content = (
    <motion.div
      initial={{ width: 0 }}
      transition={{ x: { duration: 0.5 } }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth }}
    >
      <Container
        className={`d-flex justify-content-center align-items-center my-5`}
      >
        <div className={`${style.content}`}>
          <div className={`${style.image_container} p-1`}>
            <img
              src="/images/CreateName.png"
              alt="create name"
              className={`m-1`}
            />
            <p>Create a name for you test!</p>
          </div>
          <Form.Group className={`m-5`}>
            <Form.Control
              type="text"
              value={questName}
              onChange={(e) => setQuestName(e.target.value)}
            />
            <div
              className={`m-5 d-flex justify-content-center align-items-center`}
            >
              <button className={`${globalButtons.next_button} shadow`}>
                <div>
                  <span className={`${globalButtons.next_button_text}`}>Continue</span>
                  <span className={`${globalButtons.next_button_icon}`}>
                    <FontAwesomeIcon icon={faCircleRight} />
                  </span>
                  <span className={`${globalButtons.next_button_text_hover}`}>Continue</span>
                </div>
              </button>
            </div>
          </Form.Group>
        </div>
      </Container>
    </motion.div>
  );

  return content;
};

export default CreateName;
