import style from "./Builder.module.css";
import globalButtons from "../../../global/buttons.module.css";
import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRotate } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { Test } from "../../../services/Test.js";
import BuilderItem from "./BuilderItem.js";
import { useNavigate } from "react-router-dom";

let CreateQuest = (props) => {
  let navigate = useNavigate();

  //states
  let [questName] = useState(localStorage.getItem("questName"));
  let [modalType, setModalType] = useState(false);
  let [questCategory] = useState(localStorage.getItem("questCategory"));
  let [isLoading, setIsLoading] = useState(false);
  //let [questIcon] = useState(localStorage.getItem("questIcon"));
  let [builderItems, setBuilderItems] = useState(
    localStorage.getItem("build") != null
      ? JSON.parse(localStorage.getItem("build")).items
      : []
  );
  let [show, setShow] = useState(false);

  let handleClose = () => setShow(false);
  let handleShow = (e) => setShow(e);

  //events
  let finishTest = async (isLogin) => {
    if (!isLogin) {
      let data = {
        status: "finish",
        test: {
          title: questName,
          category: questCategory,
          items: builderItems,
        },
        login: null,
        uuid_reply: null,
      };

      //post service
      let post = await new Test().store(data);

      data.uuid_reply = post.uuid_reply;

      if (localStorage.getItem("finished_test") != null) {
        let tests = JSON.parse(localStorage.getItem("finished_test"));
        tests.push(data);

        localStorage.setItem("finished_test", JSON.stringify(tests));

        localStorage.removeItem("questName");
        localStorage.removeItem("questCategory");
        localStorage.removeItem("build");

        navigate("/share", { replace: true });
        return;
      }

      localStorage.setItem("finished_test", JSON.stringify([data]));
      localStorage.removeItem("questName");
      localStorage.removeItem("questCategory");
      localStorage.removeItem("build");

      navigate("/share", { replace: true });
      return;
    } else {
      /*
    redirect
    login
    
    let data = {
      status: "finish",
      items: builderItems,
      login: { with_data }
    };
    */
    }
  };

  useEffect(() => {
    if (builderItems.length > 0) {
      let data = {
        status: "building",
        items: builderItems,
      };
      localStorage.setItem("build", JSON.stringify(data));
    }
  }, [builderItems]);

  let content = (
    <Container
      className={`d-flex justify-content-center align-items-center my-5`}
    >
      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "finish" ? (
              <span>Finish Test</span>
            ) : modalType === "add" ? (
              <span>New Question</span>
            ) : (
              <span>Restart Test</span>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`py-5`}>
          {modalType === "finish" ? (
            isLoading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
              </Spinner>
            ) : (
              <div className={`text-center`}>
                <h2>You haven't loged yet</h2>
                <p className={`text-center mb-5`}>
                  Your test will be saved for a while. If you want to persist
                  you test your whole life create and account... it's free ;)
                </p>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    finishTest(false);
                  }}
                  className={`${globalButtons.secondary_button} m-5`}
                >
                  <span>Finish Anyway</span>
                </button>
                <button className={`${globalButtons.primary_button} mx-5`}>
                  <span>Create Account</span>
                </button>
              </div>
            )
          ) : modalType === "add" ? (
            <BuilderItem
              emitCloseModal={handleClose}
              emitData={(builderData) =>
                setBuilderItems((currentItems) => [
                  ...currentItems,
                  builderData,
                ])
              }
            />
          ) : (
            <div className={`text-center`}>
              <h2>
                Are you sure you want to restart your test? You will lose all
                your questions registered.
              </h2>
              <div
                className={`d-flex justify-content-center align-items-center`}
              >
                <button
                  onClick={() => {
                    localStorage.removeItem("build");
                    localStorage.removeItem("questName");
                    localStorage.removeItem("questCategory");
                    window.location.reload();
                  }}
                  className={`${globalButtons.secondary_button} m-5`}
                >
                  <span>Restart Test</span>
                </button>
                <button
                  onClick={handleClose}
                  className={`${globalButtons.primary_button} mx-5`}
                >
                  <span>No, I don't want to restart</span>
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
        {/*<Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>*/}
      </Modal>

      <div className={`${style.content}`}>
        <h1>{questName}</h1>
        {builderItems.length === 0 && (
          <h2 className={`text-center`}>
            It looks like you don't have any question registered yet. Press the
            <span>
              {" "}
              <FontAwesomeIcon icon={faPlus} />{" "}
            </span>
            button on the footer to add a new question!
          </h2>
        )}
        <Form>
          {builderItems.map((item) =>
            item.type === "text" || item.type === "number" ? (
              <Form.Group key={item.title + item.type}>
                <Form.Label>{item.title}</Form.Label>
                <Form.Control size="lg" type={item.type} />
              </Form.Group>
            ) : item.type === "select" ? (
              <Form.Group key={item.title + item.type}>
                <Form.Label>{item.title}</Form.Label>
                <Form.Select aria-label={item.title}>
                  <option key={`default`} disabled defaultValue={`selected`}>
                    Select an option...
                  </option>
                  {item.options.map((itemOption) => {
                    return (
                      <option
                        key={itemOption.option + itemOption.value}
                        value={itemOption.value}
                      >
                        {itemOption.option}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            ) : item.type === "multiple" ? (
              <div>
                <Form.Label>{item.title}</Form.Label>
                <Form.Group>
                  {item.options.map((itemOption) => {
                    return (
                      <Form.Check
                        inline
                        key={itemOption.option + itemOption.value}
                        label={itemOption.value}
                        id={`check-${itemOption.value}`}
                        name="group"
                        type="checkbox"
                      />
                    );
                  })}
                </Form.Group>
              </div>
            ) : (
              <span key={item.title + item.type}></span>
            )
          )}
        </Form>
        <div
          className={`${style.footer_btns} fixed-bottom d-flex justify-content-center align-items-center`}
        >
          <div className={`shadow-lg bg-white rounded p-3`}>
            <OverlayTrigger
              key="restart"
              placement="top"
              overlay={<Tooltip className={`fs-4`}>Restar Test</Tooltip>}
            >
              <Button
                onClick={() => {
                  handleShow(true);
                  setModalType("restart");
                }}
                className={`mx-3`}
                variant="light"
              >
                <FontAwesomeIcon icon={faRotate} />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              key="add"
              placement="top"
              overlay={<Tooltip className={`fs-4`}>Add Question</Tooltip>}
            >
              <Button
                onClick={() => {
                  handleShow(true);
                  setModalType("add");
                }}
                className={`mx-3`}
                variant="light"
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              key="finish"
              placement="top"
              overlay={<Tooltip className={`fs-4`}>Finish Test</Tooltip>}
            >
              <Button
                disabled={builderItems.length === 0}
                onClick={() => {
                  handleShow(true);
                  setModalType("finish");
                }}
                className={`${globalButtons.primary_button} mx-3`}
                variant="primary"
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
