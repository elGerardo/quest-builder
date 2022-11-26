import globalButtons from "../../global/buttons.module.css"
//import style from "./answer.module.css";
import { useEffect, useState } from "react";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Spinner, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Answer } from "../../services/Answer.js";
import { motion } from "framer-motion";


let Answers = () => {
  let params = useParams();

  let [answers, setAnswers] = useState(null);

  useEffect(() => {
    findAnswers(params.answer_id);
  }, [params]);

  let findAnswers = async (answersId) => {
    let response = await new Answer().find(answersId);
    setAnswers(response.data.items);
  };

  let content = (
    <motion.div
      key="shareTests"
      initial={{ opacity: 0, y: -200 }}
      transition={{ y: { duration: 0.5 } }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.4,
          delay: 0.5,
        },
      }}
      exit={{ opacity: 0, y: 200 }}
    >
      <Container className={`bg-white`} style={{marginTop:"5rem"}}>
        <Link className={`${globalButtons.tertiary_button}`} to="/share"><FontAwesomeIcon icon={faCaretLeft}/>Back</Link>
        {answers !== null ? (
          <Table striped bordered hover className={`my-5`}>
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((item) => {
                return (
                  <tr key={item.value}>
                    <td>{item.question}</td>
                    <td>{item.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
        )}
      </Container>
    </motion.div>
  );
  return content;
};

export default Answers;
