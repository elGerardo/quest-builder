import style from "./Share.module.css";
import globalButtons from "../../../global/buttons.module.css";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faShare,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

let CreateQuest = () => {
  let [tests] = useState(
    localStorage.getItem("finished_test") != null
      ? JSON.parse(localStorage.getItem("finished_test"))
      : []
  );

  let [currentShare, setCurrentShare] = useState();

  let [show, setShow] = useState(false);

  let handleClose = () => setShow(false);
  let handleShow = (currentShare) => {
    setShow(true);
    setCurrentShare(currentShare);
  };

  let content = (
    <Container className={`${style.container} my-5`}>
      {tests.lenght === 0 ? (
        <div
          className={`d-flex justify-content-center align-items-center flex-column`}
        >
          <h2 className={`my-5 text-secondary`}>
            It looks like you don't any test registered yet. What are you
            waiting for to do one? ;)
          </h2>
          <Link to="/create" className={`${globalButtons.primary_button}`}>
            <FontAwesomeIcon icon={faPlus} className={`mx-2`} />
            <span>Create Quest</span>
          </Link>
        </div>
      ) : (
        <div
          className={`${style.tests} d-flex justify-content-center align-items-center flex-column`}
        >
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Share</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Use the following link to share your test</p>
              <i className={`text-secondary`}>
                http://localhost:3000/share<span>{currentShare}</span>
              </i>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {tests.map((item) => {
            return (
              <div
                className={`w-50 bg-white shadow rounded p-5`}
                key={item.uuid_reply}
              >
                <Row>
                  <Col className={`${style.test_info}`}>
                    <Link
                      to={item.uuid_reply}
                      style={{ textDecoration: "none" }}
                    >
                      <p className={`text-dark`}>{item.test.title}</p>
                      <span className={`text-secondary`}>
                        Questions {item.test.items.length}
                      </span>
                    </Link>
                  </Col>
                  <Col
                    className={`${style.group_icons} d-flex justify-content-center align-items-center`}
                  >
                    <div
                      onClick={() => handleShow(item.uuid_reply)}
                      className={`mx-3 px-3 py-2 rounded-circle`}
                    >
                      <FontAwesomeIcon icon={faShare} />
                    </div>
                    <div className={`mx-3 px-3 py-2 rounded-circle`}>
                      <FontAwesomeIcon icon={faEdit} />
                    </div>
                    <div
                      className={`${style.delete} mx-3 px-3 py-2 rounded-circle`}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
  return content;
};

export default CreateQuest;
