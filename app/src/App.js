//CSS Styles
import "./App.css";
//Router
//import { Router, Routes, Route } from "react-router-dom";
//Layouts
//import Main from "./layout/main/Main.js";
import Header from "./layout/header/Header.js";
//Pages
//import Welcome from "./pages/welcome/Welcome.js";
//... quest
//import CreateQuest from "./pages/Quest/create/Create";
//import ShareQuest from "./pages/Quest/share/Share";
import AnimationRoute from "./components/AnimationRoute";

function App() {
  return (
    <div>
      <Header />
      <AnimationRoute />
    </div>
  );
}

export default App;
