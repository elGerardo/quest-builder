import style from "./Builder.module.css";
import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import BuilderItem from "./BuilderItem.js";

let CreateQuest = (props) => {
  //states
  let [questName] = useState(localStorage.getItem("questName"));
  //let [questCategory] = useState(localStorage.getItem("questCategory"));
  //let [questIcon] = useState(localStorage.getItem("questIcon"));
  let [builderItems, setBuilderItems] = useState([]);
  let [show, setShow] = useState(false);

  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

  //events
  let onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  let finishBuild = () => {
    console.log(builderItems)
    localStorage.setItem("build",JSON.stringify(builderItems));
    console.log(JSON.parse(localStorage.getItem("build")));
  };

  useEffect(() => {}, []);

  let content = (
    <Container
      className={`d-flex justify-content-center align-items-center my-5`}
    >
      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BuilderItem
            flowCloseModal={handleClose}
            flowData={(builderData) =>
              setBuilderItems((currentItems) => [...currentItems, builderData])
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={`${style.content}`}>
        <h1>{questName}</h1>
        {builderItems.length === 0 && (
          <h2 className={`text-center`}>
            It looks like you don't have any question registered yet. Press the
            <FontAwesomeIcon icon={faPlus} /> button on the footer to add a new
            question!
          </h2>
        )}
        <Form onSubmit={onSubmit}>
          {builderItems.map((item) =>
            item.type === "text" || item.type === "number" ? (
              <Form.Group key={item.title}>
                <Form.Label>{item.title}</Form.Label>
                <Form.Control size="lg" type={item.type} />
              </Form.Group>
            ) : item.type === "select" ? (
              <Form.Group>
                <Form.Label>{item.title}</Form.Label>
                <Form.Select aria-label={item.title}>
                  <option disabled selected>
                    Select an option...
                  </option>
                  {item.options.map((itemOption) => {
                    return (
                      <option key={itemOption.option} value={itemOption.value}>
                        {itemOption.option}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            ) : (
              <span></span>
            )
          )}
        </Form>
        <div
          className={`${style.footer_btns} fixed-bottom d-flex justify-content-center align-items-center`}
        >
          <div className={`shadow-lg bg-white rounded p-3`}>
            <OverlayTrigger
              key="add"
              placement="top"
              overlay={<Tooltip className={`fs-4`}>Add Question</Tooltip>}
            >
              <Button onClick={handleShow} className={`mx-3`} variant="light">
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              key="finish"
              placement="top"
              overlay={<Tooltip className={`fs-4`}>Finish Quest</Tooltip>}
            >
              <Button
                onClick={finishBuild}
                className={`mx-3`}
                variant="primary"
                type="submit"
              >
                Finish
              </Button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </Container>
  );
  return content;
};

export default CreateQuest;
