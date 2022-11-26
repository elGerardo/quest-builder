import { useEffect, useState } from "react";
import { Container, Form, FloatingLabel } from "react-bootstrap";
import style from "./BuilderItem.module.css";
import globalButtons from "../../../global/buttons.module.css";

let HowWillLook = (props) => {
  let [componentData, setComponentData] = useState(props);

  useEffect(() => {
    setComponentData(props);
  }, [props, componentData]);

  let content = (
    <div className={`col text-left`}>
      <h2>How will looks</h2>
      <hr />
      <h3>{componentData.data.title}</h3>
      {componentData.data.type === "text" ? (
        <FloatingLabel label="Write your answer..." className={`mb-3`}>
          <Form.Control
            as="textarea"
            className={`py-5`}
            placeholder="Write your answer..."
          />
        </FloatingLabel>
      ) : componentData.data.type === "number" ? (
        <Form.Control size="lg" type="number" placeholder="Write a number..." />
      ) : componentData.data.type === "select" ? (
        <Form.Select aria-label="Default select example">
          <option defaultValue="selected" disabled>
            Select an option...
          </option>
          {componentData.data.selectOptions.map((e, i) => {
            return <option key={i}>{e.option}</option>;
          })}
        </Form.Select>
      ) : componentData.data.type === "multiple" ? (
        <div>
          {componentData.data.selectOptions.map((e, i) => {
            return (
              <Form.Check
                inline
                key={i}
                label={e.option}
                id={`check-${i}`}
                name="group"
                type="checkbox"
              />
            );
          })}
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
  return content;
};

//TODO investigar que es subscribe
let BuilderItem = (props) => {
  let [title, setTitle] = useState("");
  let [type, setType] = useState("");
  let [selectOptions, setSelectOptions] = useState([]);

  let [howWillLookData, setHowWillLookData] = useState({
    title: "",
    type: "",
    selectOptions: [],
  });

  let onSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    if (type === "text" || type === "number") {
      let data = {
        title: title,
        type: type,
        options: [],
      };

      props.emitData(data);
      props.emitCloseModal(true);
      return;
    }

    if (type === "select" || type === "multiple") {
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

      props.emitData(data);
      props.emitCloseModal(true);
      return;
    }
  };

  let updateSelectObjects = (total) => {
    let itemArray = howWillLookData;
    let itemLength = itemArray.selectOptions.length;
    if (itemArray.selectOptions.length < parseInt(total)) {
      for (let index = 0; index < parseInt(total) - itemLength; index++) {
        itemArray.selectOptions.push({});
      }
    } else {
      for (let index = 0; index < itemLength - parseInt(total); index++) {
        itemArray.selectOptions.pop();
      }
    }

    setSelectOptions(itemArray.selectOptions);
    setHowWillLookData({
      ...howWillLookData,
      selectOptions: itemArray.selectOptions,
    });
  };

  let updateHowWillLookData = (value, index) => {
    let itemArray = howWillLookData;
    itemArray.selectOptions[index].option = value;
    setHowWillLookData({
      ...howWillLookData,
      selectOptions: itemArray.selectOptions,
    });
    return;
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
              required
              size="lg"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setHowWillLookData({
                  ...howWillLookData,
                  title: e.target.value,
                });
              }}
              type="text"
              placeholder="title..."
            />{" "}
          </Form.Group>
          <label htmlFor="question_type">Type</label>
          <Form.Group className={`mb-3`}>
            <Form.Check
              required
              inline
              onClick={() => {
                setType("text");
                setHowWillLookData({ ...howWillLookData, type: "text" });
              }}
              type="radio"
              label="Open"
              name="question_type"
              id="open"
            />
            <Form.Check
              required
              inline
              onClick={() => {
                setType("number");
                setHowWillLookData({ ...howWillLookData, type: "number" });
              }}
              type="radio"
              label="Number"
              name="question_type"
              id="number"
            />
            <Form.Check
              required
              inline
              onClick={() => {
                setType("select");
                setHowWillLookData({ ...howWillLookData, type: "select" });
              }}
              type="radio"
              label="Select"
              name="question_type"
              id="select"
            />
            <Form.Check
              required
              inline
              onClick={() => {
                setType("multiple");
                setHowWillLookData({
                  ...howWillLookData,
                  type: "multiple",
                });
              }}
              type="radio"
              label="Multiple"
              name="question_type"
              id="multiple"
            />
          </Form.Group>
          {type === "select" || type === "multiple" ? (
            <div>
              <Form.Control
                required
                min="0"
                type="number"
                onChange={(e) => {
                  updateSelectObjects(
                    isNaN(parseInt(e.target.value)) ? 0 : e.target.value
                  );
                }}
                placeholder="Quantity options"
              />
              {Array.from(Array(parseInt(selectOptions.length)), (e, i) => {
                return (
                  <div key={i} className={`row`}>
                    <div className={`col`}>
                      <Form.Control
                        required
                        size="sm"
                        placeholder="option"
                        type="text"
                        id="option"
                        onChange={(e) =>
                          updateHowWillLookData(e.target.value, i)
                        }
                      ></Form.Control>
                    </div>
                    <div className={`col`}>
                      <Form.Control
                        required
                        size="sm"
                        placeholder="value"
                        type="text"
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
          <button
            className={`${globalButtons.primary_button} my-3`}
            type="submit"
          >
            Finish
          </button>
        </Form>
      </div>

      {/* How will looks */}

      <HowWillLook data={howWillLookData} />
    </Container>
  );
  return content;
};

export default BuilderItem;
