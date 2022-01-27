import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';
import { useSelector } from "react-redux";
const Dashboards = ({ match }) => {
  const userData = useSelector(state => state.user.userData);
  let index = "empty";
  if (userData && userData.role == "client")
    index = "client";
  else if (userData && userData.role == "admin")
    index = "default";
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route path={`${match.url}/${index}`} component={lazy(() => import(`./${index}`))} />
        <Redirect from={`${match.url}`} to={`${match.url}/${index}`} />
      </Switch>
    </Suspense>
  )
};

export default Dashboards;



