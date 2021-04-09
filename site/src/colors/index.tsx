import React from "react";
import { createUseStyles } from "react-jss";
import { Redirect, Route, Switch } from "react-router";
import { SpinnerCircularFixed } from "spinners-react";
import { Header } from "../misc/header";
import { Content, Layout } from "../misc/layout";
import { useLoadedData } from "./data/loader";
import { ColorViewer } from "./colorViewer";
import { ColorDetails } from "./colorDetails";

const useStyles = createUseStyles({
  loading: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const Colors: React.FC = () => {
  const classes = useStyles();
  const loaded = useLoadedData();

  switch (loaded.state) {
    case "error": return <Layout>
      <Header title="Error" />
      <Content>
        <pre>{loaded.err.stack ? loaded.err.stack : loaded.err.message}</pre>
      </Content>
    </Layout >;

    case "pending": return <Layout>
      <Content>
        <Header title="Loading..." />
        <div className={classes.loading}>
          <SpinnerCircularFixed size="10em" color="blue" />
        </div>
      </Content>
    </Layout>;

    case "loaded": return <Switch>
      <Route path="/colors/details/:id">
        <ColorDetails colors={loaded.colors} worlds={loaded.worlds} />
      </Route>
      <Route path="/colors/:wclass/:group/:region?">
        <ColorViewer colors={loaded.colors} worlds={loaded.worlds} />
      </Route>
      <Route path="/">
        <Redirect to="/colors/main/rocks" />
      </Route>
    </Switch>;
  }
};