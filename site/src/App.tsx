import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { Colors } from "./colors";

function App(): React.ReactElement {
  return <BrowserRouter>
    <Switch>
      <Route path="/colors">
        <Colors />
      </Route>
      <Route path="/">
        <Redirect to="/colors/main/rocks" />
      </Route>
    </Switch>
  </BrowserRouter>;
}

export default App;
