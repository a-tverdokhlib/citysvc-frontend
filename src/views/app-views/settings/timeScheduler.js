import { useState } from "react";
import {
    Button, Row, Col, Divider,
    Empty, TimePicker, Tooltip
} from "antd";
import { connect } from 'react-redux';
import IntlMessage from "components/util-components/IntlMessage";
import { COLOR_DARK_RED, COLOR_GRAY } from "constants/ThemeConstant";

import { createCalendarHour, deleteCalendarHour } from "redux/actions/Calendar";

import { COLOR_7 } from 'constants/ThemeConstant';
import { DeleteOutlined, ClockCircleOutlined, PlusOutlined } from '@ant-design/icons';




const TimeScheduler = (props) => {
    const { selectedDate, dates } = props
    const date = dates.find(item => item.date === selectedDate.format('YYYY-MM-DD'))

    return <>
        {date && date.available ? <>
            <CTimeSchedulerAddForm />
            <CTimeSchedulerList />
        </>
            :
            <Empty />
        }
    </>
}

const TimeSchedulerAddForm = ({ selectedDate, createCalendarHour, availableDate, loading }) => {
    const [selectedRange, setSelectedRange] = useState({});

    const onSelectHour = (time) => {
        if (time)
            setSelectedRange({
                from: time[0].format("h:mm a"),
                to: time[1].format("h:mm a")
            });
    }
    const onAddHour = () => {
        createCalendarHour({ ...selectedRange, available: true, dateId: availableDate.id })
    }
    return <>
        <Divider orientation="left" >Set Available Hours for <span style={{ color: COLOR_7 }}> {selectedDate.format('YYYY-MM-DD')}</span></Divider>
        <Row className="m-4">
            <Col>
                <TimePicker.RangePicker minuteStep={10} onChange={onSelectHour} format={"h:mm a"} />
            </Col>
            <Col >
                <Button className="ml-2"
                    type="primary"
                    icon={<PlusOutlined onClick={onAddHour} />}

                />
            </Col>
        </Row>
    </>
}

const TimeSchedulerList = ({ availableDate, deleteCalendarHour }) => {
    return <>
        {availableDate ?
            availableDate.hours.map(item => {
                return <TimeSchedulerListItem deleteCalendarHour={deleteCalendarHour} dateId={availableDate.id} availableHours={item} key={item._id} />

            })
            :
            <Empty></Empty>
        }
    </>
}

const TimeSchedulerListItem = ({ availableHours, dateId, deleteCalendarHour }) => {
    const { to, from, _id } = availableHours;
    const onDelete = () => {
        deleteCalendarHour({ id: _id, dateId })
    }
    return <div className="pl-3 m-2 ml-4 mr-3"
        style={{ display: "flex", fontSize: "16px", justifyContent: "space-between", alignItems: "center", width: "255px", borderRadius: "10px", border: "1px solid #e6ebf1", backgroundColor: COLOR_GRAY }}>
        <span><ClockCircleOutlined /> {from}</span> - <span>{to}</span>
        <span>
            <Tooltip placement="left" title={<IntlMessage id="button.delete" />} arrowPointAtCenter={true}>
                <Button onClick={onDelete} type="link" style={{ color: COLOR_DARK_RED }}><DeleteOutlined /></Button></Tooltip>
        </span>
    </div>
}
const mapStateToProps = ({ calendar }) => {
    const { dates, date, selectedDate, availableDate, loading } = calendar;
    return {
        dates, date, selectedDate, availableDate, loading
    }
}



const CTimeSchedulerAddForm = connect(mapStateToProps, { createCalendarHour })(TimeSchedulerAddForm);
const CTimeSchedulerList = connect(mapStateToProps, { deleteCalendarHour })(TimeSchedulerList);
export default connect(mapStateToProps)(TimeScheduler);

