import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  // Set the pagesize and API_KEY
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_API;

  // define state
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState("light"); 

  // a function to handle top loading progress bar
  const updateProgress = (progress) => {
    setProgress(progress);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#212522";
      document.body.style.color = "white";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };

  return (
    <>
      {/* Wrap Everything inside React Router & define the routes */}
      <BrowserRouter>
        <NavBar toggleMode={toggleMode} mode={mode}/>
        <LoadingBar color="#f11946" progress={progress} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={updateProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                key="general"
                country={"in"}
                category="general"
                mode={mode}
              />
            }
          ></Route>
          <Route
            exact
            path="/home"
            element={
              <News
                setProgress={updateProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                key="general"
                country={"in"}
                category="general"
                mode={mode}
              />
            }
          ></Route>
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={updateProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                key="business"
                country={"in"}
                category="business"
                mode={mode}
              />
            }
          ></Route>
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={updateProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                key="entertainment"
                country={"in"}
                category="entertainment"
                mode={mode}
              />
            }
          ></Route>
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={updateProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                key="science"
                country={"in"}
                category="science"
                mode={mode}
              />
            }
          ></Route>
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={updateProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                key="sports"
                country={"in"}
                category="sports"
                mode={mode}
              />
            }
          ></Route>
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={updateProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                key="health"
                country={"in"}
                category="health"
                mode={mode}
              />
            }
          ></Route>
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={updateProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                key="technology"
                country={"in"}
                category="technology"
                mode={mode}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
