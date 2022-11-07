import { useState } from "react";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import style from "./BuilderItem.module.css";
//TODO investigar que es subscribe
let BuilderItem = (props) => {
  let [title, setTitle] = useState("");
  let [type, setType] = useState("");

  let onSubmit = (e) => {
    e.preventDefault();
    console.log("preventing...");

    let data = {
      title: title,
      type: type,
    };

    props.flowData(data);
  };

  let content = (
    <Container className={`${style.container} row`}>
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
          <Button type="submit">Finish</Button>
        </Form>
      </div>
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
        ) : (
          <span></span>
        )}
      </div>
    </Container>
  );
  return content;
};

export default BuilderItem;
