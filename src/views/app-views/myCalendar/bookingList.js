import { connect } from 'react-redux';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { myCalendarAddBooking } from 'redux/actions/MyCalendar';
import { getBookings, myCalendarShowMessage, showBookingMessage } from 'redux/actions';
import moment from "moment";
import { LoadingOutlined, CheckCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { Table, Tag, Space, Tooltip, Empty, Card, Col, Row, Input, Image, Button, Radio, Select, Alert } from 'antd';
import BookingService from 'services/BookingService';
import Flex from 'components/shared-components/Flex';
import { statusOptions, sortOptions } from "constants/Options";
import { STATUS_COLORS } from 'constants/ThemeConstant';
import { motion } from "framer-motion"
import { injectIntl } from 'react-intl'



const ActionColumnRender = ({ intl, myCalendarLoading, myCalendarSuccess, text, record, myCalendarAddBooking, selectedTimeFrame }) => {

    const onAdd = () => {
        myCalendarAddBooking({
            bookingId: record.id,
            start: selectedTimeFrame.start,
            end: selectedTimeFrame.end,
        })
    }

    return <Button onClick={onAdd} size="small" type="primary" loading={myCalendarLoading}>{intl.formatMessage({ id: 'text.add' })}</Button>

}


const BookingList = ({ intl, results, getBookings, selectedTimeFrame, myCalendarMessage, myCalendarSuccess, myCalendarShowMessage, showMessage }) => {
    const bookingTableColumns = [
        {
            title: intl.formatMessage({ id: 'text.add' }),
            dataIndex: 'name',
        },
        {
            title: intl.formatMessage({ id: 'text.add' }),
            dataIndex: 'title',

        },
        {
            title: intl.formatMessage({ id: 'text.add' }),
            dataIndex: 'location',
        },
        {
            title: intl.formatMessage({ id: 'text.add' }),
            dataIndex: 'status',
            render: (text, record) => {
                return <Tag
                    className={STATUS_COLORS["COLOR_" + text]} size={"small"}
                >
                    {intl.formatMessage({ id: 'text.' + text })}
                </Tag>
            }

        },
        {
            title: intl.formatMessage({ id: 'text.add' }),
            dataIndex: '',
            key: 'x',
            render: (text, record) => {
                return <ActionColumnRenderConnected text={text} record={record} selectedTimeFrame={selectedTimeFrame} />
            }

        },
    ]
    const [query, setQuery] = useState({ sortBy: "Submitted", sortType: "Desc", filterByStatus: ["Submitted"] });
    const [tableState, setTableState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 100,
        },
        loading: false,

    });
    if (results.length > 0)
        results = results.map(item => {
            item = { ...item, ...item.pickup };
            return item;
        });
    useEffect(async () => {
        getBookings(query);
    }, [query]);

    useEffect(async () => {
        if (myCalendarSuccess) {
            getBookings(query);
            myCalendarShowMessage(false);
        }
    }, [myCalendarSuccess]);
    useEffect(() => {
        if (showMessage)
            setTimeout(() => {
                myCalendarShowMessage(false);
            }, 2000);
    }, [showMessage]);


    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                className={STATUS_COLORS["COLOR_" + value]}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginRight: 3 }}
                size={"small"}
            >
                {intl.formatMessage({ id: 'text.' + value })}
            </Tag>
        );
    }

    const onChangeSort = (value) => {
        setQuery({ ...query, sortBy: value });

    }
    const onChangeSearch = (value) => {
        setQuery({ ...query, keyword: value });
    }
    const onChangeFilter = (value) => {
        setQuery({ ...query, filterByStatus: value });
    }
    const onChangeSortType = (value) => {
        setQuery({ ...query, sortType: value });
    }
    statusOptions.map(item => {
        item.label = intl.formatMessage({ id: 'text.' + item.value })
        return item;
    })
    return (<>
        {showMessage ?
            <motion.div
                initial={{ opacity: 0, marginBottom: 0 }}
                animate={{
                    opacity: showMessage ? 1 : 0,
                    marginBottom: showMessage ? 20 : 0
                }}>
                <Alert type={myCalendarSuccess ? "success" : "error"} showIcon message={myCalendarMessage}></Alert>
            </motion.div>
            : ""}
        <Row justify="space-between">
            <Col>
                <div className="p-2">
                    <Row align="middle ">
                        <Col>
                            <h5>{intl.formatMessage({ id: 'text.filterBy' })}:</h5>
                        </Col>
                        <Col>
                            <Select className="ml-2"
                                mode="multiple"
                                showArrow
                                size={"small"}
                                tagRender={tagRender}
                                onChange={onChangeFilter}
                                placeholder={intl.formatMessage({ id: 'text.selectStatus' })}
                                style={{ width: '100%', minWidth: '150px' }}
                                options={statusOptions}
                                value={query.filterByStatus}
                            />
                        </Col>

                    </Row>
                </div>
            </Col>

        </Row>
        <Table
            columns={bookingTableColumns}
            rowKey={record => record.id}
            dataSource={results}
            size={"small"}
            showHeader={false}

            pagination={tableState.pagination}
            expandable={{
                expandedRowRender: record => <BookingDetails booking={record} />,
                rowExpandable: record => record.name !== 'Not Expandable',
            }}
        />
    </>);
}

const BookingDetails = ({ booking }) => {
    const { pickup, shipping, images } = booking;
    return <PickupDetails details={pickup} images={images} />

}

const PickupDetails = injectIntl(({ intl, details, images }) => {
    const [visible, setVisible] = useState(false);
    return <Card className="p-1 "  >
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
    </Card>
})

const mapStateToProps = ({ bookingList, myCalendar }) => {
    const { results, loading, success } = bookingList;
    const { results: myCalendarResults, loading: myCalendarLoading, success: myCalendarSuccess, message: myCalendarMessage, showMessage } = myCalendar;
    return {
        results, loading, success, myCalendarResults, myCalendarLoading, myCalendarSuccess, myCalendarMessage, showMessage
    }
}

const ActionColumnRenderConnected = connect(mapStateToProps, { myCalendarAddBooking })(injectIntl(ActionColumnRender));
export default connect(mapStateToProps, { getBookings, myCalendarShowMessage })(injectIntl(BookingList));
