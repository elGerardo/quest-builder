import style from "./FormTest.module.css";
import globalButtons from "../../../global/buttons.module.css";
import { Container, Spinner, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Test } from "../../../services/Test.js";
import { Answer } from "../../../services/Answer.js";
import { AnimatePresence, motion } from "framer-motion";

let FormTest = (props) => {
  let params = useParams();
  let [test, setTest] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [formData, setFormData] = useState(null);
  let [isFinished, setIsFinished] = useState(false);
  let [someError, setSomeError] = useState(false);

  useEffect(() => {
    getTest(params.test_id);
  }, [params]);

  let getTest = async (testId) => {
    await new Test().find(testId).then((response) => {
      let itemArray = [];
      let baseStateArray = [];
      response.data.questions.forEach((item) => {
        let itemObject = {
          question: item.title,
          value: "",
        };
        itemArray.push(itemObject);
        baseStateArray.push({});
      });

      setFormData(baseStateArray);
      setTest(response);
      setIsLoading(false);
    });
  };

  let updateFormValue = (value, question, index) => {
    let itemArray = formData;
    itemArray[index].value = value;
    itemArray[index].question = question;
    setFormData(itemArray);
    return;
  };

  let onSubmit = async (event) => {
    event.preventDefault();

    let data = {
      test_id: params.test_id,
      username: null,
      answers: formData,
    };
    let response = await new Answer().store(data);
    setIsFinished(true);
    if (response.message !== "success") {
      console.log("Something went wrong, please call to the test owner.");
      setSomeError(true);
      return;
    }

    return;
  };

  let content = (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="form"
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
          exit={{ opacity: 0, y: 200 }}
        >
          <Container
            className={`${style.container} d-flex justify-content-center align-items-center my-5`}
          >
            {!isLoading ? (
              <div className={`w-50 bg-white my-5 shadow-lg p-5 rounded`}>
                <h1>{test.data.title}</h1>
                <Form onSubmit={onSubmit}>
                  {test.data.questions.map((item, index) => {
                    return item.type !== "select" ? (
                      <Form.Group key={item.id} className={`my-5`}>
                        <Form.Label>{item.title}</Form.Label>
                        <Form.Control
                          required
                          onChange={(e) =>
                            updateFormValue(e.target.value, item.title, index)
                          }
                          size="lg"
                          type={item.type}
                        />
                      </Form.Group>
                    ) : (
                      <Form.Group key={item.id}>
                        <Form.Label>{item.title}</Form.Label>
                        <Form.Select
                          required
                          defaultValue="selected"
                          size="lg"
                          onChange={(e) =>
                            updateFormValue(e.target.value, item.title, index)
                          }
                        >
                          <option value="selected" disabled>
                            Select and option...
                          </option>
                          {item.options.map((option) => {
                            return (
                              <option key={option.option} value={option.value}>
                                {option.option}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    );
                  })}
                  <button
                    className={`${globalButtons.primary_button} m-3`}
                    type="submit"
                  >
                    Finish Test
                  </button>
                </Form>
              </div>
            ) : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
              </Spinner>
            )}
          </Container>
        </motion.div>
      )}
      {isFinished && (
        <motion.div
          key="finished"
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
          exit={{ opacity: 0, y: 200 }}
        >
          <Container
            className={`${style.container} d-flex justify-content-center align-items-center my-5`}
          >
            <div className={`w-50 bg-white my-5 shadow-lg p-5 rounded`}>
              {someError ? (
                <h2>Something went wrong, please call to the test owner.</h2>
              ) : (
                <h2>
                  Your answers have been stored, you already can close this
                  page.
                </h2>
              )}
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return content;
};

export default FormTest;
