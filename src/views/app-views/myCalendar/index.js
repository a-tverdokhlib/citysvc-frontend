import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import momentPlugin, { toMoment, toMomentDuration } from '@fullcalendar/moment'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { Card, Drawer, Tag, Row, Col, Modal, Alert, Image, Button, Tooltip } from 'antd';
import BookingList from '../myCalendar/bookingList';
import bookingList from '../myCalendar/bookingList';
import { getMyCalendarBookings, myCalendarShowMessage, myCalendarDeleteBooking } from 'redux/actions';
import { motion } from 'framer-motion';
import { STATUS_COLORS, STATUS_COLORS_BACKGROUND, STATUS_COLORS_FONT, STATUS_COLORS_BORDER } from 'constants/ThemeConstant';
import moment from 'moment';
import { DeleteOutlined, DeleteTwoTone } from '@ant-design/icons';
import ScheduleList from './scheduleList';
import { injectIntl } from 'react-intl'

export const MyCalendar = ({ results, intl, loading, success, message, showMessage, getMyCalendarBookings, myCalendarShowMessage }) => {
    const [calendarView, setCalendarView] = useState({});
    const [dateStart, setDateStart] = useState('');
    var setCalendarViewCalled = false;
    const [bookListModal, setBookListModal] = useState(
        {
            show: false,
            title: "",
            selectedTimeFrame: {}
        });
    const [bookModal, setBookModal] = useState(
        {
            show: false,
            title: "",
            pickupDetails: {},
            pickupImages: [],
            pickupStart: "",
            pickupEnd: "",
            status: "",
            title: "",
            id: ""
        });
    const [query, setQuery] = useState({});
    const onSelect = (value) => {
        const momStart = toMoment(value.startStr, value.view.calendar);
        const momEnd = toMoment(value.end, value.view.calendar);
        const title = momStart.format("MM/DD/YYYY") == momEnd.format("MM/DD/YYYY") ? momStart.format("MM/DD/YYYY h:mm a") + " - " + momEnd.format("h:mm a") : momStart.format("MM/DD/YYYY h:mm a") + " - " + momEnd.format("MM/DD/YYYY h:mm a")
        setBookListModal({
            show: true, title, selectedTimeFrame: {
                start: value.startStr, end: value.endStr
            }
        });
    }
    const onBookingClick = (info) => {
        const momStart = toMoment(info.event.startStr, info.view.calendar);
        const momEnd = toMoment(info.event.endStr, info.view.calendar);
        const title = momStart.format("MM/DD/YYYY") == momEnd.format("MM/DD/YYYY") ? momStart.format("MM/DD/YYYY h:mm a") + " - " + momEnd.format("h:mm a") : momStart.format("MM/DD/YYYY h:mm a") + " - " + momEnd.format("MM/DD/YYYY h:mm a")

        setBookModal({
            show: true,
            pickupDetails: info.event.extendedProps.pickup,
            pickupImages: info.event.extendedProps.images,
            pickupStart: info.event.startStr,
            pickupEnd: info.event.endStr,
            status: info.event.extendedProps.status,
            title,
            id: info.event.id
        });
    }
    const bookDrawerOnClose = () => {
        setBookListModal({ show: false, title: "", selectedTimeFrame: {} });
    }
    const bookModalOnClose = () => {
        setBookModal({
            show: false,
            title: "",
            pickupDetails: {},
            pickupImages: [],
            pickupStart: "",
            pickupEnd: "",
            status: "",
            title: "",
            id: ""
        });
    }

    /* const calendarViewDidMount = (view) => {
         setCalendarViewCalled = true;
         setCalendarView(view.view);
     }
 
     const onDatesSet = (temp) => {
         if (setCalendarViewCalled === false) {
             setDateStart(temp.start);
         }
     }*/
    results = results.map((item) => {

        item.backgroundColor = STATUS_COLORS_BACKGROUND["COLOR_" + item.bookingId.status];
        item.borderColor = STATUS_COLORS_BORDER["COLOR_" + item.bookingId.status];
        item.textColor = STATUS_COLORS_FONT["COLOR_" + item.bookingId.status];
        item.extendedProps = item.bookingId;
        if (item.bookingId.pickup) {

            item.title = item.bookingId.pickup.title;
        }

        return item;
    })

    useEffect(async () => {
        getMyCalendarBookings(query);
    }, [query])

    useEffect(() => {
        if (showMessage)
            setTimeout(() => {
                myCalendarShowMessage(false);
            }, 4000);
    }, [showMessage]);
    useEffect(async () => {
        if (success) {
            setBookModal({
                show: false,
                title: "",
                pickupDetails: {},
                pickupImages: [],
                pickupStart: "",
                pickupEnd: "",
                status: "",
                title: "",
                id: ""
            });
        }
    }, [success]);
    return (
        <Card>
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

            <div style={{ position: "relative", overflow: "hidden" }}>
                <FullCalendar
                    events={results}
                    plugins={[interactionPlugin, momentPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'timeGridDay,timeGridWeek,dayGridMonth,listDay,listWeek,listMonth'
                    }}

                    allDaySlot={false}
                    nowIndicator={true}
                    selectable={true}
                    slotMinTime={"05:00:00"}
                    slotMaxTime={"24:00:00"}
                    slotDuration={"00:30:00"}
                    //viewDidMount={calendarViewDidMount}
                    /* eventContent={(arg) => {
 
                         return <div style={{ backgroundColor: "#f00" }} >{arg.timeText}ss</div>
                     }
 
                     }*/
                    // slotLabelInterval={"00:30"}
                    // stickyHeaderDates={true}
                    eventClick={onBookingClick}
                    buttonText={{
                        today: intl.formatMessage({ id: 'text.today' }),
                        month: intl.formatMessage({ id: 'text.month' }),
                        week: intl.formatMessage({ id: 'text.week' }),
                        day: intl.formatMessage({ id: 'text.day' }),
                        listDay: intl.formatMessage({ id: 'text.listDay' }),
                        listWeek: intl.formatMessage({ id: 'text.listWeek' }),
                        listMonth: intl.formatMessage({ id: 'text.listMonth' }),

                    }}
                    //scrollTime={"07:00:00"}
                    select={onSelect}

                //datesSet={onDatesSet}

                />

                <Modal
                    title={intl.formatMessage({ id: 'text.addBookingFor' }) + ": " + bookListModal.title}
                    centered
                    visible={bookListModal.show}
                    footer={null}
                    onCancel={bookDrawerOnClose}
                    className="w-100 "
                    // wrapClassName="w-50"
                    style={{ maxWidth: "800px" }}
                    maskClosable={false}
                >
                    <BookingList selectedTimeFrame={bookListModal.selectedTimeFrame} />
                </Modal>
                <Modal
                    title={intl.formatMessage({ id: 'text.scheduledOn' }) + " : " + bookModal.title}
                    centered
                    visible={bookModal.show}
                    footer={null}
                    onCancel={bookModalOnClose}
                    className="w-100 "
                    // wrapClassName="w-50"
                    style={{ maxWidth: "500px" }}
                    maskClosable={false}
                >
                    <PickupDetailsConnected details={bookModal.pickupDetails}
                        images={bookModal.pickupImages}
                        pickupStart={bookModal.pickupStart}
                        pickupEnd={bookModal.pickupEnd}
                        status={bookModal.status}
                        scheduleId={bookModal.id}
                    />
                </Modal>

            </div>

        </Card>
    )
}
const PickupDetails = ({ details, images, status, scheduleId, loading, myCalendarDeleteBooking, intl }) => {
    const [visible, setVisible] = useState(false);
    const onBookingRemove = () => {
        myCalendarDeleteBooking(scheduleId);
    }
    return <Card className="p-0 "  >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <h6>
                    {intl.formatMessage({ id: 'text.pickupInformtion' })}
                </h6>

                <article >

                    <div >
                        <h5>{details.name}</h5>
                        <h5>{intl.formatMessage({ id: 'text.item' })} : {details.title}</h5>
                        <h5>{intl.formatMessage({ id: 'text.pickupDate' })} : {details.pickupDate} {moment(details.selectedHour, ["HH"]).format("h:mm A")}</h5>
                        <p>
                            {details.location}
                        </p>
                    </div>

                </article>
            </div>
            <Image
                preview={{ visible: false }}
                width={100}
                src={images[0]}
                onClick={() => setVisible(true)}
            />

            <div style={{ display: 'none' }}>
                <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>

                    {
                        images.map((item, index) => {
                            return <Image width={150} src={item} key={index} />
                        })
                    }
                </Image.PreviewGroup>
            </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Tag className={STATUS_COLORS["COLOR_" + status]}>
                <span className="ml-2 font-weight-semibold">{intl.formatMessage({ id: 'text.' + status })}</span>
            </Tag>
            <Tooltip placement="left" title={intl.formatMessage({ id: 'text.removeFromCalendar' })}>
                <Button loading={loading} onClick={onBookingRemove} size={"small"} className={"ant-tag-red"} ><DeleteOutlined></DeleteOutlined></Button>
            </Tooltip>
        </div>
    </Card>
}
const mapStateToProps = ({ myCalendar }) => {

    const { myCalendarBookings: results, loading, success, message, showMessage } = myCalendar;
    return {
        results, loading, success, message, showMessage
    }
}

const mapDispatchToProps = {
    getMyCalendarBookings, myCalendarShowMessage
}
const PickupDetailsConnected = connect(mapStateToProps, { myCalendarDeleteBooking })(injectIntl(PickupDetails));

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MyCalendar))
