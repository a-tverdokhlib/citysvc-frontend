import React, { useState, lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import CalenDar from 'react-calendar';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Aside, CalendarWrapper } from './Style';
import { ShareButtonPageHeader } from './components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from './components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from './components/buttons/calendar-button/calendar-button';
import { Main } from '../styled';
import { Button } from './components/buttons/buttons';

import { Cards } from './components/cards/frame/cards-frame';
import { PageHeader } from './components/page-headers/page-headers';
import 'react-calendar/dist/Calendar.css';
import { eventVisible, addNewEvents } from 'redux/calendar/actionCreator';
const YearCalendar = lazy(() => import('./overview/Year'));
const MonthCalendar = lazy(() => import('./overview/Month'));
const WeekCalendar = lazy(() => import('./overview/Week'));
const DayCalendar = lazy(() => import('./overview/Day'));
const TodayCalendar = lazy(() => import('./overview/Today'));
const ScheduleCalendar = lazy(() => import('./overview/Schedule'));

const Calendars = () => {
  const dispatch = useDispatch();
  const { events, isVisible } = { events: [], isVisible: true }
  /* useSelector(state => {
    return {
      events: state.Calender.events,
      isVisible: state.Calender.eventVisible,
    };
  });
*/
  const { path } = useRouteMatch();
  const [state, setState] = useState({
    date: new Date(),
    visible: false,
  });

  const onChange = date => setState({ date });

  const onHandleVisible = () => {
    dispatch(eventVisible(!isVisible));
  };

  return (
    <>



      <CalendarWrapper>
        <Row>

          <Col xs={24}>
            <Switch>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton paragraph={{ rows: 15 }} active />
                  </Cards>
                }
              >
                <Route path={`${path}/year`} component={YearCalendar} />
                <Route path={`${path}/month`} component={MonthCalendar} />
                <Route path={`${path}/week`} component={WeekCalendar} />
                <Route path={`${path}/day`} component={DayCalendar} />
                <Route path={`${path}/today`} component={TodayCalendar} />
                <Route path={`${path}/schedule`} component={ScheduleCalendar} />
              </Suspense>
            </Switch>
          </Col>
        </Row>
      </CalendarWrapper>

    </>
  );
};

export default Calendars;
