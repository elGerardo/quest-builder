import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//Welcome
import Welcome from "../pages/welcome/Welcome.js";

//Create
import CreateQuest from "../pages/Quest/create/Create.js";
import CreateName from "../pages/Quest/create/CreateName.js";

//Share
import ShareQuest from "../pages/Quest/share/Share.js";

let AnimationRoute = () => {
  let location = useLocation();

  let content = (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Welcome />} />
        
        <Route path="/create" element={<CreateQuest />} />
        <Route path="/create/CreateName" element={<CreateName />}/>
        
        <Route path="/share" element={<ShareQuest />} />
        <Route />
      </Routes>
    </AnimatePresence>
  );

  return content;
};

export default AnimationRoute;
