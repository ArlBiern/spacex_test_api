import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";
import LaunchesContainer from "./features/launches/LaunchesContainer";
import LaunchDetail from "./features/launchDetail/LaunchDetail";
import PageNotFound from "./features/notFound/PageNotFound";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact component={LaunchesContainer} />
        <Route path="/:id" exact component={LaunchDetail} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
