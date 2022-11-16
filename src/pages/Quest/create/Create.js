import { Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleRight,
  faChalkboard,
  faPen,
  faSquarePollHorizontal,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import style from "./Create.module.css";
import globalButtons from "../../../global/buttons.module.css";
import Builder from "./Builder.js";

let Create = () => {
  //states
  let [questName, setQuestName] = useState("");
  let [questCategory, setQuestCategory] = useState("");
  let [isCreateName, setIsCreateName] = useState(true);
  let [isChooseCategory, setIsChooseCategory] = useState(false);
  let [isBuilder, setIsBuilder] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("questName") != null) {
      setIsCreateName(false);
      setIsChooseCategory(true);
    }
    if (localStorage.getItem("questCategory") != null) {
      setIsChooseCategory(false);
      setIsBuilder(true);
    }
  }, []);

  let nextBuilder = (step) => {
    /*let body = document.getElementsByTagName("body")[0];
    body.style.overflowY = "hidden";
    setInterval(() => {
      body.style.overflowY = "inline";
    }, 0.5);*/
    if (step === 1) {
      setIsCreateName(false);
      setIsChooseCategory(true);
      return;
    }
    if (step === 2) {
      setIsChooseCategory(false);
      setIsBuilder(true);

      localStorage.setItem("questName", questName);
      localStorage.setItem("questCategory", questCategory);

      return;
    }
  };

  let content = (
    <AnimatePresence>
      {isCreateName && (
        <motion.div
          key="createName"
          initial={{ opacity: 0, x: -200 }}
          transition={{ x: { duration: 0.5 } }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.5,
              delay: 0.5,
            },
          }}
          exit={{ opacity: 0, x: 200 }}
        >
          <Container
            className={`${style.container}  d-flex justify-content-center align-items-center my-5`}
          >
            <div className={`${style.content}`}>
              <h1 className={`display-2`}>Create a name for you test!</h1>
              <p>
                Your test name can be anything. You can write something clearly,
                creative or whaterever cool name you can imagine.
              </p>
              <Form.Group className={`m-5`}>
                <Form.Control
                  type="text"
                  value={questName}
                  onChange={(e) => setQuestName(e.target.value)}
                />
                <div
                  className={`m-5 d-flex justify-content-center align-items-center`}
                >
                  <button
                    disabled={questName < 1}
                    onClick={() => nextBuilder(1)}
                    className={`${globalButtons.next_button} shadow`}
                  >
                    <div>
                      <span className={`${globalButtons.next_button_text}`}>
                        Continue
                      </span>
                      <span className={`${globalButtons.next_button_icon}`}>
                        <FontAwesomeIcon icon={faCircleRight} />
                      </span>
                      <span
                        className={`${globalButtons.next_button_text_hover}`}
                      >
                        Continue
                      </span>
                    </div>
                  </button>
                </div>
              </Form.Group>
            </div>
          </Container>
        </motion.div>
      )}
      {isChooseCategory && (
        <motion.div
          key="chooseCategory"
          initial={{ opacity: 0, x: -200 }}
          transition={{ x: { duration: 0.5 } }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.5,
              delay: 0.5,
            },
          }}
          exit={{ opacity: 0, x: 200 }}
        >
          <Container
            className={`${style.container} d-flex justify-content-center align-items-center my-5`}
          >
            <div className={`${style.content}`}>
              <h1 className={`display-2 text-center`}>Choose a category</h1>
              <p className={`text-center`}>
                We already have some categories wich might you like, if you
                don't find the yours you can write your own category. Your
                selection won't affect the way that you build your test.
              </p>
              <Form.Group className={`m-1`}>
                <div className={`row`}>
                  <label
                    htmlFor="radio-exam"
                    className={`${style.row} mx-2 rounded d-flex justify-content-left align-items-center col`}
                  >
                    <div
                      className={`d-flex justify-content-center justify-content-center`}
                    >
                      <Form.Check
                        type="radio"
                        id="radio-exam"
                        name="categorySelect"
                        onClick={(e) => {
                          setQuestCategory("exam");
                        }}
                      />
                      <div
                        className={`d-flex flex-column justify-content-left col`}
                      >
                        <span>
                          <FontAwesomeIcon icon={faChalkboard} /> Exam
                        </span>
                        <span className={`${style.category_item_message}`}>
                          It's time to challenge to the students.
                        </span>
                      </div>
                    </div>
                  </label>
                  <label
                    htmlFor="radio-vocational"
                    className={`${style.row} mx-2 rounded d-flex justify-content-center align-items-center col`}
                  >
                    <div
                      className={`d-flex justify-content-center justify-content-center`}
                    >
                      <Form.Check
                        type="radio"
                        id="radio-vocational"
                        name="categorySelect"
                        onClick={(e) => {
                          setQuestCategory("vocational");
                        }}
                      />
                      <div
                        className={`d-flex flex-column justify-content-left col`}
                      >
                        <span>
                          <FontAwesomeIcon icon={faPen} /> Vocational
                        </span>
                        <span className={`${style.category_item_message}`}>
                          What really they can do?
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
                <div className={`my-2 row`}>
                  <label
                    htmlFor="radio-survey"
                    className={`${style.row} mx-2 rounded d-flex justify-content-center align-items-center col`}
                  >
                    <div
                      className={`d-flex justify-content-center justify-content-center`}
                    >
                      <Form.Check
                        type="radio"
                        id="radio-survey"
                        name="categorySelect"
                        onClick={(e) => {
                          setQuestCategory("survey");
                        }}
                      />
                      <div
                        className={`d-flex flex-column justify-content-left col`}
                      >
                        <span>
                          <FontAwesomeIcon icon={faSquarePollHorizontal} />{" "}
                          Survey
                        </span>
                        <span className={`${style.category_item_message}`}>
                          Take information by easy way.
                        </span>
                      </div>
                    </div>
                  </label>
                  <label
                    htmlFor="radio-none"
                    className={`${style.row} mx-2 rounded d-flex justify-content-center align-items-center col`}
                  >
                    <div
                      className={`d-flex justify-content-center justify-content-center`}
                    >
                      <Form.Check
                        type="radio"
                        id="radio-none"
                        name="categorySelect"
                        onClick={(e) => {
                          setQuestCategory("none");
                        }}
                      />
                      <div
                        className={`d-flex flex-column justify-content-left col`}
                      >
                        <span>
                          <FontAwesomeIcon icon={faCloud} /> None
                        </span>
                        <span className={`${style.category_item_message}`}>
                          None category.
                        </span>
                      </div>
                    </div>
                  </label>
                </div>

                <div
                  className={`m-5 d-flex justify-content-center align-items-center`}
                >
                  <button
                    disabled={questCategory === ""}
                    onClick={() => nextBuilder(2)}
                    className={`${globalButtons.next_button} shadow`}
                  >
                    <div>
                      <span className={`${globalButtons.next_button_text}`}>
                        Continue
                      </span>
                      <span className={`${globalButtons.next_button_icon}`}>
                        <FontAwesomeIcon icon={faCircleRight} />
                      </span>
                      <span
                        className={`${globalButtons.next_button_text_hover}`}
                      >
                        Continue
                      </span>
                    </div>
                  </button>
                </div>
              </Form.Group>
            </div>
          </Container>
        </motion.div>
      )}
      {isBuilder && (
        <motion.div
          key="isBuilder"
          initial={{ opacity: 0, x: -200 }}
          transition={{ x: { duration: 0.5 } }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.5,
              delay: 0.5,
            },
          }}
          exit={{ opacity: 0, x: 200 }}
        >
          <Builder />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return content;
};

export default Create;
