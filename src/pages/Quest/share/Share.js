import style from "./Share.module.css";
import globalButtons from "../../../global/buttons.module.css";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Spinner,
  Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faShare,
  faTrash,
  //faEdit,
  faClipboard,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Test } from "../../../services/Test.js";

let ShareTest = () => {
  let [tests, setTests] = useState(
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
  }, [selectedId, currentData]);

  let getTest = useCallback(async (id) => {
    setIsLoading(true);
    let response = await new Test().find(id);
    console.log(response.data);
    setCurrentData(response);
    setIsLoading(false);
  }, []);

  let deleteTest = (index) => {
    if (localStorage.getItem("login") != null) {
      //is loged
      //change status to removed
      return;
    }

    let storage = JSON.parse(localStorage.getItem("finished_test"));

    delete storage.splice(index, 1);
    setTests(storage);
    localStorage.setItem("finished_test", JSON.stringify(storage));
    return;
  };

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
          delay: 0.6,
        },
      }}
      exit={{ opacity: 0, y: 200 }}
    >
      <div
        className={`${style.frontground}`}
        onClick={() => setSelectedId(null)}
        id="frontground"
      ></div>

      <Container className={`${style.container} my-5`}>
        {tests.length === 0 ? (
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
                        "http://localhost:3000/form/" + currentShare
                      )
                    }
                    className={`rounded-circle mx-3 px-3 py-2 ${style.clipboard}`}
                  >
                    <FontAwesomeIcon icon={faClipboard} />
                  </span>
                </p>
                <i className={`text-secondary`}>
                  http://localhost:3000/form/<span>{currentShare}</span>
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
                  className={`w-75 p-5 bg-white rounded shadow-lg ${style.motion_div}`}
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
                            {currentData.data.questions_count}{" "}
                            {currentData.data.questions_count === 1
                              ? "Question"
                              : "Questions"}
                          </span>
                        </Col>
                        <Col
                          className={`${style.group_icons} d-flex justify-content-center align-items-center`}
                        >
                          <div
                            onClick={() => handleShow(currentData.data.id)}
                            className={`mx-3 px-3 py-2 rounded-circle`}
                          >
                            <FontAwesomeIcon icon={faShare} />
                          </div>
                          {/*<div className={`mx-3 px-3 py-2 rounded-circle`}>
                            <FontAwesomeIcon icon={faEdit} />
                          </div>*/}
                          {/*<div
                            onClick={() => deleteTest(index //error to get index)}
                            className={`${style.delete} mx-3 px-3 py-2 rounded-circle`}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                        </div>*/}
                        </Col>
                      </Row>
                      <hr />
                      <div>
                        <div className={`d-flex`}>
                          <p className={`d-flex flex-column text-center`}>
                            Total Answers{" "}
                            <span>{currentData.data.answers_count}</span>
                          </p>
                        </div>
                        <div>
                          <button
                            className={`${globalButtons.tertiary_button} mx-5`}
                          >
                            <span>See Charts</span>
                          </button>
                          <button
                            className={`${globalButtons.tertiary_button} m-5`}
                          >
                            <span>Download PDF</span>
                          </button>
                        </div>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>No. Answer</th>
                              <th>User Name</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentData.data.answers.map((answer, index) => {
                              return (
                                <tr key={answer.id}>
                                  <td className={`text-center`}>{index + 1}</td>
                                  <td>
                                    {answer.username !== null
                                      ? answer.username
                                      : "N/A"}
                                  </td>
                                  <td className={`text-center`}>
                                    <a
                                      href={`/answer/${answer.id}`}
                                      className={`${globalButtons.primary_button}`}
                                    >
                                      See Answers
                                    </a>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
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
            {tests.map((item, index) => {
              return (
                <motion.div
                  className={`w-50 bg-white shadow rounded p-5 m-5`}
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
                      {/*<div className={`mx-3 px-3 py-2 rounded-circle`}>
                        <FontAwesomeIcon icon={faEdit} />
                      </div>*/}
                      <div
                        onClick={() => deleteTest(index)}
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

export default ShareTest;
