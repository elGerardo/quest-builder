import style from "./Create.module.css";
import { useState } from "react";
import {
  Container,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
//import { motion } from "framer-motion";
let ShareQuest = () => {
  //states
  let [title, setTitle] = useState("");

  //events
  let onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  let content = (
    
      <Container
        className={`d-flex justify-content-center align-items-center my-5`}
      >
        <div className={`${style.content}`}>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <div
              className={`fixed-bottom d-flex justify-content-center align-items-center`}
            >
              <div className={`shadow-lg bg-white rounded p-3`}>
                <OverlayTrigger
                  key="add"
                  placement="top"
                  overlay={<Tooltip className={`fs-4`}>Add Question</Tooltip>}
                >
                  <Button variant="light">
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  key="finish"
                  placement="top"
                  overlay={<Tooltip className={`fs-4`}>Finish Quest</Tooltip>}
                >
                  <Button variant="primary" type="submit">
                    Finish
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
          </Form>
        </div>
      </Container>
  );
  return content;
};

export default ShareQuest;
