import { Routes, Route } from "react-router-dom";
import Home from "./../pages/Home";
import NotFound from "./../pages/NotFound";
import Board from "../pages/Board";
import Display from "./Layout";
import About from "../pages/About";
import Project from "./../pages/Project";
import WriteBoard from "./WriteBoard";

function Router() {
  return (
    <Routes>
      <Route element={<Display />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/project' element={<Project />} />
        <Route path='/board' element={<Board />} />
        <Route path='/board/writeBoard' element={<WriteBoard />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
export default Router;
