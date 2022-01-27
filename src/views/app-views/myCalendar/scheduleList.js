import React from 'react'
import { connect } from 'react-redux'
import { Badge, Tooltip, Button, Row, Col } from 'antd'
import { DeleteOutlined, DeleteTwoTone, CalendarOutlined } from '@ant-design/icons';
import "./style.css";
import { STATUS_COLORS, STATUS_COLORS_BACKGROUND, STATUS_COLORS_FONT, STATUS_COLORS_BORDER } from 'constants/ThemeConstant';
import { toMoment, toMomentDuration } from '@fullcalendar/moment'
import moment from 'moment';
import calendar from '../calendar';


const mapToWeekViewList = (schedules, start, end, calendar) => {
    var mapped = [];
    const dates = {};
    schedules = schedules.filter(item => {
        var compareDate = moment(toMoment(item.start, calendar), "DD/MM/YYYY");
        var startDate = moment(start, "DD/MM/YYYY");
        var endDate = moment(end, "DD/MM/YYYY");
        dates[moment(item.start).format("DD/MM/YYYY")] = {};
        return compareDate.isBetween(startDate, endDate);
    });
    Object.keys(dates).forEach(date => {
        var filtered = schedules.filter(item => {
            return moment(item.start).format("DD/MM/YYYY") === date;
        })

        filtered = filtered.map(item => {
            const { location, name, phone, pickupdate, selectedHour, title } = item.bookingId.pickup;
            const map = {
                title,
                bullet: "cyan",
                time: moment(item.start).format("HH:mm a") + " - " + moment(item.end).format("HH:mm a"),
                name, phone, pickupdate,
                status: item.bookingId.status,
                location
            }
            return map;
        })

        mapped.push({
            date,
            event: filtered
        })
    });
    mapped = mapped.filter(item => item.event.length > 0);
    return mapped;
}
export const ScheduleList = ({ schedules = [], calendarView }) => {
    const { type, activeStart, activeEnd, calendar } = calendarView;
    const onDelete = (id) => {

    }

    if (type) {
        const momStart = toMoment(activeStart, calendar);
        const momEnd = toMoment(activeEnd, calendar);
        schedules = mapToWeekViewList(schedules, momStart, momEnd, calendar);
    }


    return (
        <div className="p-2 pr-4">
            <h5>Schedules List</h5>
            {
                schedules.map(list => (
                    <div key={list.date} className="calendar-list" >
                        <h5 className="text-gray-light">
                            <CalendarOutlined />
                            <span className="ml-2">{list.date}</span>
                        </h5>
                        {
                            list.event.map((eventItem, i) => (
                                <Row align="middle" key={`${eventItem.title}-${i}`} className={"calendar-list-item"}
                                    style={{
                                        backgroundColor: STATUS_COLORS_BACKGROUND["COLOR_" + eventItem.status]
                                    }}
                                >
                                    <Col flex="auto" >
                                        <Row>
                                            <Col flex="10px">
                                                <Badge color={STATUS_COLORS_FONT["COLOR_" + eventItem.status]} />

                                            </Col>
                                            <Col flex="auto">

                                                <div className="text-truncate" style={{ maxWidth: "180px" }}>{eventItem.title}</div>
                                                <div className="font-size-sm">{eventItem.location}</div>
                                                <div className="text-muted" >{eventItem.time}</div>

                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col flex="20px">
                                        <Tooltip placement="left" title="Remove from calendar">
                                            <Button size={"small"} className={"ant-tag-red p-2"} ><DeleteOutlined></DeleteOutlined></Button>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            ))
                        }
                    </div >
                ))
            }

        </div >
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList)
