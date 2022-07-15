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

  // a function to handle top loading progress bar
  const updateProgress = (progress) => {
    setProgress(progress);
  };

  return (
    <>
      {/* Wrap Everything inside React Router & define the routes */}
      <BrowserRouter>
        <NavBar />
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
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
