import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Components/Pages/Main/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
