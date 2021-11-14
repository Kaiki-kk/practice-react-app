import { VFC } from "react";
import { Switch, Route } from "react-router-dom";
import { Page404 } from "../components/pages/Page404";
import { Login } from "../components/pages/Login";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { homeRouters } from "./homeRouters";
import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router: VFC = () => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/">
          <Login />
        </Route>
        <Route
          path="/home"
          render={({ match: { url } }) => (
            <Switch>
              {homeRouters.map((route) => (
                <Route exact={route.exact} path={`${url}${route.path}`}>
                  <HeaderLayout>{route.children}</HeaderLayout>
                </Route>
              ))}
            </Switch>
          )}
        />
      </LoginUserProvider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
};
