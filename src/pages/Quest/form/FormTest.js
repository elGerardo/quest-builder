import style from "./FormTest.module.css";
import globalButtons from "../../../global/buttons.module.css";
import { Container, Spinner, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Test } from "../../../services/Test.js";

let FormTest = (props) => {
  let params = useParams();
  let [test, setTest] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [formData, setFormData] = useState(null);

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

  let onSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  let content = (
    <Container
      className={`${style.container} d-flex justify-content-center align-items-center my-5`}
    >
      {!isLoading ? (
        <div className={`w-50`}>
          <h1>{test.data.title}</h1>
          <Form onSubmit={onSubmit}>
            {test.data.questions.map((item, index) => {
              return item.type !== "select" ? (
                <Form.Group key={item.id} className={`my-5`}>
                  <Form.Label>{item.title}</Form.Label>
                  <Form.Control
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
                    size="lg"
                    onChange={(e) =>
                      updateFormValue(e.target.value, item.title, index)
                    }
                  >
                    <option defaultValue="selected" disabled>
                      Select and option...
                    </option>
                    <option>1</option>
                    <option>2</option>
                  </Form.Select>
                </Form.Group>
              );
            })}
            <button className={`${globalButtons.primary_button}`} type="submit">
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
  );

  return content;
};

export default FormTest;
