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
import ShareQuest from "../pages/Quest/share/Share.js";

//FormTest
import FormTest from "../pages/Quest/form/FormTest.js";

let AnimationRoute = () => {
  let location = useLocation();

  let content = (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Welcome />} />
        <Route path="/create" element={<CreateQuest />} />
        <Route path="/share" element={<ShareQuest />} />
        <Route path="/form/:test_id" element={<FormTest />} />
        <Route />
      </Routes>
    </AnimatePresence>
  );

  return content;
};

export default AnimationRoute;
