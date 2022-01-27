import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/dashboards`} component={lazy(() => import(`./dashboards`))} />
        <Route path={`${APP_PREFIX_PATH}/accounts`} component={lazy(() => import(`./accounts`))} />
        {/* <Route path={`${APP_PREFIX_PATH}/calendar`} component={lazy(() => import(`./myCalendar`))} /> */}
        <Route path={`${APP_PREFIX_PATH}/bookings-list`} component={lazy(() => import(`./bookings`))} />
        <Route exact path={`${APP_PREFIX_PATH}/bookings-create/:name/:id`} component={lazy(() => import(`./bookings/create`))} />
        <Route path={`${APP_PREFIX_PATH}/bookings-create`} component={lazy(() => import(`./bookings/create`))} />
        <Route path={`${APP_PREFIX_PATH}/bookings-map`} component={lazy(() => import(`./bookings/map`))} />
        <Route path={`${APP_PREFIX_PATH}/settings`} component={lazy(() => import(`./settings`))} />
        <Route path={`${APP_PREFIX_PATH}/my-routes`} component={lazy(() => import(`./myRoute`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/dashboards`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
