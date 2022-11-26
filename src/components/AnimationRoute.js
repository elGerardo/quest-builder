import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//Welcome
import Welcome from "../pages/welcome/Welcome.js";

//Create
//import CreateTest from "../pages/Quest/create/CreateTest.js";
import CreateQuest from "../pages/Quest/create/Create.js";
//import CreateName from "../pages/Quest/create/CreateName.js";
//import CreateCategory from "../pages/Quest/create/CreateCategory";

//Share
import ShareTest from "../pages/Quest/share/Share.js";

//FormTest
import FormTest from "../pages/Quest/form/FormTest.js";

//Answer
import Answer from "../pages/answer/Answer.js"; 

let AnimationRoute = () => {
  let location = useLocation();

  let content = (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Welcome />} />
        <Route path="/create" element={<CreateQuest />} />
        <Route path="/share" element={<ShareTest />} />
        <Route path="/form/:test_id" element={<FormTest />} />
        <Route path="/answer/:answer_id" element={<Answer />} />
        <Route />
      </Routes>
    </AnimatePresence>
  );

  return content;
};

export default AnimationRoute;
