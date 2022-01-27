import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ClockCircleOutlined, LinkOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import moment from 'moment';
import {
    Steps, Row, Col, Form, Input, Calendar,
    Button, Divider, Alert, Image, Card, Tabs, Empty, Modal, Badge, Result, TimePicker
} from 'antd';
import { motion } from 'framer-motion';
import { COLOR_GRAY, COLOR_GREEN } from 'constants/ThemeConstant';
import { getCalendarDates } from "redux/actions/Calendar";
import { injectIntl } from 'react-intl'

export const BookingPickupDate = ({ intl, getCalendarDates, pickupData, dates = [], loading, onUpdate }) => {
    const [state, setState] = useState({
        pickupDate: moment(pickupData.pickupDate).format('YYYY-MM-DD'),

    });

    let date = dates.find(item => item.date == state.pickupDate);
    const availableHours = date ? date.hours.map((item, index) => {
        return <div className="p-1 m-1 pl-3 pr-3" key={"availableHours" + index}
            style={{
                display: "flex", fontSize: "16px", justifyContent: "space-between",
                alignItems: "center", width: "255px", borderRadius: "10px", border: "1px solid #e6ebf1", backgroundColor: COLOR_GREEN
            }}>
            <span><ClockCircleOutlined /> {item.from}</span> - <span>{item.to}</span>

        </div>
    }) : "";

    const dateSelect = (value) => {
        setState({ ...state, pickupDate: value.format('YYYY-MM-DD') })
    }

    const onSelectHour = (time) => {
        if (time) {
            setState({
                ...state, selectedHour: {
                    from: time[0].format("h:mm a"),
                    to: time[1].format("h:mm a")
                }
            });
        }

    }
    const dateCellRender = (value) => {
        const bookingDates = dates

        var bgColor = "#f6cdcd";

        for (var i = 0; i < bookingDates.length; i++) {
            const item = bookingDates[i];
            if (moment(value.format('YYYY-MM-DD')).isSame(item.date) && item.available) {
                bgColor = "#caffc4";
            }
            else if (moment(value.format('YYYY-MM-DD')).isSame(item.date)) {

                bgColor = "#f6cdcd";
            }
        }
        if (state.pickupDate == value.format('YYYY-MM-DD')) {
            bgColor = "#86bbf2";
        }
        const status = <div className="w-100 h-100 p-2" >
            <div style={{
                backgroundColor: bgColor, borderRadius: "5px", border: "1px solid #d1d4e3",
                padding: "10px",
                display: "flex", justifyContent: "space-around", alignItems: "center"
            }}>
                {value.date()}
            </div>
        </div>

        return (
            status
        );
    }

    useEffect(() => {
        getCalendarDates();
    }, []);
    useEffect(() => {
        setState({ ...state, selectedHour: pickupData.selectedHour, pickupDate: pickupData.pickupDate })
    }, [pickupData]);

    const updatePickupDate = () => {
        onUpdate({ pickupDate: state.pickupDate, selectedHour: state.selectedHour }, 'pickup');
    }
    return (
        <Row>

            <Col md={12}>
                <div className="p-1 p-md-2 " >
                    <Calendar fullscreen={false} dateFullCellRender={dateCellRender} onSelect={dateSelect} />
                </div>
            </Col>
            <Col md={12}> <div className="p-1 p-md-2 p-lg-5" >

                {state.pickupDate ?
                    <div>

                        <Divider orientation="left" >{intl.formatMessage({ id: 'text.selectedDateIs' })}<span style={{ color: "#4b64e8" }}>{state.pickupDate}</span></Divider>
                        <h5>{intl.formatMessage({ id: 'text.chooseTimeForPickup' })}</h5>
                        {
                            state.selectedHour ?
                                <TimePicker.RangePicker className='mt-2'
                                    minuteStep={10} onChange={onSelectHour}
                                    format={"h:mm a"}
                                    defaultValue={[
                                        moment(state.selectedHour.from, "h:mm a"), moment(state.selectedHour.to, "h:mm a")
                                    ]}
                                /> : ""
                        }
                        <Button className='ml-md-2 ml-lg-4 mt-2' type="primary" onClick={updatePickupDate} loading={loading}>
                            {intl.formatMessage({ id: 'text.update' })}                        </Button>
                        <Divider orientation="left" ></Divider>
                        <h5>{intl.formatMessage({ id: 'text.availablePickupHoursFor' })} <span style={{ color: "#4b64e8" }}>{state.pickupDate}</span></h5>
                        <div >
                            {availableHours.length > 0 ? availableHours : <Empty description={intl.formatMessage({ id: 'text.noAvailableHours' })} />}
                        </div>
                    </div>

                    : ""
                } </div></Col>

        </Row>
    )
}

const mapStateToProps = ({ calendar }) => {
    const { dates } = calendar;
    return {
        dates
    }
};

const mapDispatchToProps = {
    getCalendarDates
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BookingPickupDate))
