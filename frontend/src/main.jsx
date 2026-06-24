import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CharacterBrief from "./pages/CharacterBrief.jsx";
import Game from "./pages/Game.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Leaderboards from "./pages/Leaderboards.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />}></Route>
      <Route path="/game/:levelId" element={<CharacterBrief />}></Route>
      <Route path="/game/play/:levelId" element={<Game />}></Route>
      <Route path="/leaderboards" element={<Leaderboards />} />
      <Route path="/leaderboard/:levelId" element={<Leaderboard />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={2500} theme="dark" />
  </StrictMode>,
);
