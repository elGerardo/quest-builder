import { useEffect, useState } from "react";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import style from "./BuilderItem.module.css";
//TODO investigar que es subscribe
let BuilderItem = (props) => {
  let [title, setTitle] = useState("");
  let [type, setType] = useState("");
  let [selectOptionsQuantity, setSelectOptionsQuantity] = useState(0);

  let onSubmit = (e) => {
    e.preventDefault();
    if (type === "text" || type === "number") {
      let data = {
        title: title,
        type: type,
      };

      props.flowData(data);
      props.flowCloseModal(true);
      return;
    }

    if (type === "select") {
      let data = {
        title: title,
        type: type,
        options: [],
      };

      for (let index = 0; index < e.target.length; index++) {
        if (e.target[index].id === "value") {
          data.options.push({
            option: e.target[index - 1].value,
            value: e.target[index].value,
          });
        }
      }

      props.flowData(data);
      props.flowCloseModal(true);
      return;
    }
  };

  useEffect(() => {}, []);

  let content = (
    <Container className={`${style.container} row`}>
      {/* Builder */}
      <div className={`col text-left`}>
        <h2>Builder</h2>
        <hr />
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="title..."
            />{" "}
          </Form.Group>
          <label htmlFor="question_type">Type</label>
          <Form.Group className={`mb-3`}>
            <Form.Check
              inline
              onClick={() => setType("text")}
              type="radio"
              label="Open"
              name="question_type"
              id="open"
            />
            <Form.Check
              inline
              onClick={() => setType("number")}
              type="radio"
              label="Number"
              name="question_type"
              id="number"
            />
            <Form.Check
              inline
              onClick={() => setType("select")}
              type="radio"
              label="Select"
              name="question_type"
              id="select"
            />
            <Form.Check
              inline
              onClick={() => setType("multiple")}
              type="radio"
              label="Multiple"
              name="question_type"
              id="multiple"
            />
          </Form.Group>
          {type === "select" || type === "multiple" ? (
            <div>
              <Form.Control
                min="0"
                type="number"
                value={selectOptionsQuantity}
                onChange={(e) => setSelectOptionsQuantity(e.target.value)}
                placeholder="Quantity options"
              ></Form.Control>

              {Array.from(Array(parseInt(selectOptionsQuantity)), (e, i) => {
                return (
                  <div key={i} className={`row`}>
                    <div className={`col`}>
                      <Form.Control
                        size="sm"
                        placeholder="option"
                        type="text"
                        id="option"
                      ></Form.Control>
                    </div>
                    <div className={`col`}>
                      <Form.Control
                        size="sm"
                        placeholder="value"
                        type="number"
                        id="value"
                      ></Form.Control>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <span></span>
          )}
          <Button type="submit">Finish</Button>
        </Form>
      </div>

      {/* How will looks */}
      <div className={`col text-left`}>
        <h2>How will looks</h2>
        <hr />
        <h3>{title}</h3>
        {type === "text" ? (
          <FloatingLabel label="Write your answer..." className={`mb-3`}>
            <Form.Control
              as="textarea"
              className={`py-5`}
              placeholder="Write your answer..."
            />
          </FloatingLabel>
        ) : type === "number" ? (
          <Form.Control
            size="lg"
            type="number"
            placeholder="Write a number..."
          />
        ) : type === "select" ? (
          <Form.Select aria-label="Default select example">
            <option defaultValue="selected" disabled>
              Select an option...
            </option>
            <option value="1">Here will be all your options</option>
            <option value="1">To Choose</option>
          </Form.Select>
        ) : type === "multiple" ? (
          <div>
            <Form.Check inline label="Here will be all your" id="checkbox1" name="group1" type="checkbox" />
            <Form.Check inline label="Multiple options to Choose" id="checkbox2" name="group2" type="checkbox" />
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </Container>
  );
  return content;
};

export default BuilderItem;
