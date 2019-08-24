import React from "react";
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  RouteComponentProps
} from "react-router-dom";
import { connect } from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./hoc/Layout";

interface IAppProps {
  isAuthenticated: boolean;
}

const App = (props: IAppProps) => {
  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>;
};

const mapStateToProps = ({ auth }: any) => {
  return {
    isAuthenticated: auth.isAuthenticated
  };
};

// export default withRouter(connect(mapStateToProps)(App));
export default withRouter(
  connect<{}, {}, any & RouteComponentProps>(mapStateToProps)(App)
);
