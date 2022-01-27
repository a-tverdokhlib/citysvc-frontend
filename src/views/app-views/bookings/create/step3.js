import {
    Steps, Row, Col, Form, Input, Calendar,
    Button, Divider, Alert, Image, Card, Tabs, Empty, Modal, Badge, Result, TimePicker
} from 'antd';

import { ClockCircleOutlined, LinkOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { useState, useEffect } from "react";
import moment from 'moment';
import { motion } from 'framer-motion';
import { COLOR_GRAY, COLOR_GREEN } from 'constants/ThemeConstant';
const Step3 = ({ intl, onHourSelect, onDateSelect, state, dates, showMessage, success, message }) => {

    const [selectedRange, setSelectedRange] = useState({});

    const hourButtons = (Array.from(Array(24).keys())).map(i => {
        let hour = i + 1;
        let hourText = moment(hour, ["HH"]).format("h:mm A");
        const bgColor = state.selectedHour == hour ? "#86bbf2" : "#caffc4";
        if (state.selectedHour === hour) {
            return <Badge count={<CheckCircleTwoTone twoToneColor="#2e4ae0" style={{ top: "10px", right: "10px" }} />}>
                <Button className="m-1" onClick={() => { onHourSelect(hour) }} style={{ width: "100px", backgroundColor: bgColor }} key={i} > {hourText}</Button>

            </Badge>
        }
        else {
            return <Button className="m-2" onClick={() => { onHourSelect(hour) }} style={{ width: "100px", backgroundColor: bgColor }} key={i} > {hourText}</Button>

        }
    })
    let date = dates.find(item => item.date == state.pickupDate);
    const availableHours = date ? date.hours.map((item, index) => {
        return <div className="p-1 m-1 pl-3 pr-3" key={"availableHours" + index}
            style={{
                display: "flex", fontSize: "16px", justifyContent: "space-between",
                alignItems: "center", width: "255px", borderRadius: "10px", border: "1px solid #e6ebf1", backgroundColor: COLOR_GREEN
            }}>
            <span><ClockCircleOutlined /> {item.from}</span> - <span>{item.to}</span>

        </div>
    }) : ""




    const dateSelect = (value) => {
        onDateSelect(value);


    }
    const onSelectHour = (time) => {
        if (time) {
            onHourSelect({
                from: time[0].format("h:mm a"),
                to: time[1].format("h:mm a")
            })
            setSelectedRange({
                from: time[0].format("h:mm a"),
                to: time[1].format("h:mm a")
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

    return <Row>

        <Col md={12}>
            <div className="p-1 p-md-2 " >
                <Calendar fullscreen={false} dateFullCellRender={dateCellRender} onSelect={dateSelect} />
            </div>
        </Col>
        <Col md={12}> <div className="p-1 p-md-2 p-lg-5" >
            {showMessage ?

                <motion.div
                    initial={{ opacity: 0, marginBottom: 0 }}
                    animate={{
                        opacity: showMessage ? 1 : 0,
                        marginBottom: showMessage ? 20 : 0
                    }}>
                    <Alert type={success ? "success" : "error"} showIcon message={message}></Alert>
                </motion.div>
                : ""}
            {state.pickupDate ?
                <div>

                    <Divider orientation="left" >{intl.formatMessage({ id: 'text.sekectedDate' })} <span style={{ color: "#4b64e8" }}>{state.pickupDate}</span></Divider>
                    <h5>{intl.formatMessage({ id: 'text.chooseTime' })}</h5>
                    <TimePicker.RangePicker minuteStep={10} onChange={onSelectHour} format={"h:mm a"} />
                    <Divider orientation="left" ></Divider>
                    <h5>{intl.formatMessage({ id: 'text.pickupHours' })}<span style={{ color: "#4b64e8" }}>{state.pickupDate}</span></h5>
                    <div >
                        {availableHours}
                    </div>
                </div>

                : ""
            } </div></Col>

    </Row>
}

export default Step3;

