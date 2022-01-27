import { useState, useEffect } from "react";
import {
    Tabs, Calendar, Row, Col, Switch, Tooltip,
    Empty,
} from "antd";
import { connect } from 'react-redux';
import IntlMessage from "components/util-components/IntlMessage";
import { getCalendarDates, createCalendarDate, createCalendarHour, onSelectDate } from "redux/actions/Calendar";
import { useDispatch } from "react-redux";
import { CREATE_CALENDAR_DATE } from "../../../redux/constants/Calendar";
import { COLOR_GREEN, COLOR_RED, } from 'constants/ThemeConstant';
import TimeScheduler from './timeScheduler';

const { TabPane } = Tabs;


const MainSettings = (props) => {
    const { dates, getCalendarDates, onSelectDate, loading } = props;

    const [state] = useState({
        dates: dates
    });

    const dateCellRender = (value) => {
        const date = dates.find(item => item.date === value.format('YYYY-MM-DD'));

        return <CalendarCell date={value} available={date ? date.available : false} loading={loading} />
    }
    const onDateSelect = (selectedDate, e) => {
        const availableDate = dates.find(item => item.date === selectedDate.format('YYYY-MM-DD'))
        onSelectDate({ selectedDate, availableDate })
    }
    const onDateChange = (value, e) => {
        console.log(value)
    }


    useEffect(() => {
        getCalendarDates();
    }, [state.dates]);
    return (
        <div>
            <Tabs defaultActiveKey="1" >
                <TabPane tab={<IntlMessage id="button.calendar" />} key="1">

                    <Row>
                        <Col xs={24} md={14} >
                            <div>
                                {dates ?

                                    <Calendar onChange={onDateChange} fullscreen={true} dateFullCellRender={dateCellRender} onSelect={onDateSelect} />
                                    : <Empty />
                                }

                            </div>
                        </Col><Col xs={24} md={10}>

                            {
                                dates ?
                                    <div className="m-1 m-md-4 mt-2 mt-md-4 mt-lg-1 pt-2 ">
                                        <TimeScheduler
                                        />
                                    </div>
                                    : <Empty />
                            /*dates ?
                                <div className="m-1 m-md-4 mt-2 mt-md-4 mt-lg-1 pt-2 ">
                                    <TimeScheduler selectedDate={state.selectedDate} date={
                                        dates.find(item => item.date===state.selectedDate.format('YYYY-MM-DD'))
                                    } />
                                </div>
                                : <Empty />
                                */}</Col>
                    </Row>

                </TabPane>
                <TabPane tab={<IntlMessage id="button.otherSettings" />} key="2">
                    {<IntlMessage id="button.otherSettings" />}
                </TabPane>
            </Tabs>

        </div>

    );
}

/**
 * Calendar custom cell render Component
 */
const CalendarCell = ({ date, available = false, loading }) => {
    const dispatch = useDispatch();
    const [myLoading, setLoading] = useState(false);
    const onChange = (value) => {
        setLoading(true);
        dispatch({ type: CREATE_CALENDAR_DATE, data: { available: value, date: date.format('YYYY-MM-DD') } });
    }

    return <div className="w-100 p-1" >
        <Tooltip placement="top" title={available ? <IntlMessage id="button.available" /> : <IntlMessage id="button.unAvailable" />} arrowPointAtCenter={true}>
            <div className="w-100 p-1" style={{
                backgroundColor: available ? COLOR_GREEN : COLOR_RED, borderRadius: "5px", border: "1px solid #d1d4e3",


            }}> <div style={{ textAlign: "center", }}>
                    {date.date()}
                </div>
                <div className="" style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                    <Switch size="small" checked={available} onChange={onChange} loading={loading ? myLoading : loading} />

                </div></div> </Tooltip>


    </div >

}




const mapStateToProps = ({ calendar }, ownProps) => {
    const { dates, date, selectedDate, loading } = calendar;
    return {
        dates, date, selectedDate, loading
    }
}
const mapActionsToProps = {
    createCalendarDate, getCalendarDates, createCalendarHour, onSelectDate
}
export default connect(mapStateToProps, mapActionsToProps)(MainSettings)