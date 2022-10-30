//CSS Styles
import "./App.css";
//Router
import { Routes, Route } from "react-router-dom";
//Layouts
import Main from "./layout/main/Main.js";
import Header from "./layout/header/Header.js";
//Pages
import Welcome from "./pages/welcome/Welcome.js";
//... quest
import CreateQuest from "./pages/Quest/create/Create";
import ShareQuest from "./pages/Quest/share/Share";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route index element={<Welcome />} />
        <Route path="/create" element={<CreateQuest />} />
        <Route path="/share" element={<ShareQuest />} />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
