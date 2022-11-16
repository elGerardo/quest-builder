import style from "./Share.module.css";
import globalButtons from "../../../global/buttons.module.css";
import { Container, Row, Col, Modal, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faShare,
  faTrash,
  faEdit,
  faClipboard,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Test } from "../../../services/Test.js";

let CreateQuest = () => {
  let [tests] = useState(
    localStorage.getItem("finished_test") != null
      ? JSON.parse(localStorage.getItem("finished_test"))
      : []
  );
  let [currentShare, setCurrentShare] = useState(null);
  //let [currentData, setCurrentData] = useState(null);
  let [currentData, setCurrentData] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [show, setShow] = useState(false);
  let [selectedId, setSelectedId] = useState(null);

  let handleClose = () => setShow(false);
  let handleShow = (currentShare) => {
    setShow(true);
    setCurrentShare(currentShare);
  };

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    if (selectedId != null) {
      document.getElementById("frontground").style.display = "block";
    } else {
      document.getElementById("frontground").style.display = "none";
    }
  }, [selectedId]);

  let getTest = useCallback(async (id) => {
    setIsLoading(true);
    let response = await new Test().find(id);
    setCurrentData(response);
    setIsLoading(false);
  }, []);

  /*
  let getTest = async (id) => {
    let response = await new Test().find(id);
    //currentData = data;
    setCurrentData(response);
    console.log(currentData);

    //console.log(currentData);
  };
  */

  let content = (
    <motion.div
      key="shareTests"
      initial={{ opacity: 0, y: -200 }}
      transition={{ y: { duration: 0.5 } }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0.5,
        },
      }}
    >
      <div
        className={`${style.frontground}`}
        onClick={() => setSelectedId(null)}
        id="frontground"
      ></div>

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
                <p>
                  Use the following link to share your test{" "}
                  <span
                    onClick={() =>
                      navigator.clipboard.writeText(
                        "http://localhost:3000/share/" + currentShare
                      )
                    }
                    className={`rounded-circle mx-3 px-3 py-2 ${style.clipboard}`}
                  >
                    <FontAwesomeIcon icon={faClipboard} />
                  </span>
                </p>
                <i className={`text-secondary`}>
                  http://localhost:3000/share/<span>{currentShare}</span>
                </i>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <AnimatePresence>
              {selectedId && (
                <motion.div
                  className={`position-absolute w-50 p-5 bg-white rounded shadow-lg ${style.motion_div}`}
                  layoutId={selectedId}
                >
                  <button
                    onClick={() => {
                      setSelectedId(null);
                    }}
                    className={`${globalButtons.secondary_button} ${style.close_motion} position-absolute`}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                  {currentData !== null && !isLoading ? (
                    <div>
                      <Row>
                        <Col className={`${style.test_info}`}>
                          <p>{currentData.data.title}</p>
                          <span className={`text-secondary`}>
                            {currentData.data.questions.lenght}{" "}
                            {currentData.data.questions.lenght === 0
                              ? "Question"
                              : "Questions"}
                          </span>
                        </Col>
                        <Col
                          className={`${style.group_icons} d-flex justify-content-center align-items-center`}
                        >
                          <div className={`mx-3 px-3 py-2 rounded-circle`}>
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
                      <hr />
                      <div>
                        <div className={`d-flex`}>
                          <p className={`mx-5 d-flex flex-column text-center`}>
                            Total Entries <span>10</span>
                          </p>
                          <p className={`mx-5 d-flex flex-column text-center`}>
                            Total Answers <span>7</span>
                          </p>
                          <p className={`mx-5 d-flex flex-column text-center`}>
                            Withour Answer <span>3</span>
                          </p>
                        </div>
                        <div>
                          <button
                            className={`${globalButtons.tertiary_button} m-5`}
                          >
                            <span>Download PDF</span>
                          </button>
                          <button
                            className={`${globalButtons.tertiary_button} mx-5`}
                          >
                            <span>See Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden"></span>
                    </Spinner>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {tests.map((item) => {
              return (
                <motion.div
                  className={`w-50 bg-white shadow rounded p-5 my-3`}
                  key={item.uuid_reply}
                  layoutId={item.uuid_reply}
                >
                  <Row>
                    <Col
                      onClick={() => {
                        getTest(item.uuid_reply);
                        setSelectedId(item.uuid_reply);
                      }}
                      className={`${style.test_info}`}
                    >
                      <p className={`text-dark`}>{item.test.title}</p>
                      <span className={`text-secondary`}>
                        {item.test.items.length}{" "}
                        {item.test.items.length === 1
                          ? "Question"
                          : "Questions"}
                      </span>
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
                </motion.div>
              );
            })}
          </div>
        )}
      </Container>
    </motion.div>
  );
  return content;
};

export default CreateQuest;
