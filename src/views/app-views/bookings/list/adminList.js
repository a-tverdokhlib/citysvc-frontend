import { connect } from 'react-redux';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { updateBooking, getBookings, deleteBooking, hideBookingMessage } from "redux/actions/Booking";
import { PlusOutlined } from '@ant-design/icons';
import { Table, Tag, Card, Col, Row, Input, Image, Button, Select, Tooltip, Modal, Alert } from 'antd';
import Flex from 'components/shared-components/Flex';
import { statusOptions, sortOptions } from "../../../../constants/Options";
import { STATUS_COLORS } from 'constants/ThemeConstant';
import { debounce } from 'lodash';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { injectIntl } from 'react-intl'
import BookingDetails from './bookingDetails';
const { Search } = Input;

const StatusColumnRender = ({ intl, text, record, index, updateBooking, loading }) => {
    // const [status, setStatus] = useState(record.status);
    const onChange = (value) => {
        updateBooking({ type: "booking", data: { status: value }, id: record.id });
    }

    statusOptions.map(item => {
        item.label = intl.formatMessage({ id: 'text.' + item.value })
        return item;
    })
    return <Select className="ml-2" dropdownStyle={{}}
        style={{ width: "100%", borderRadius: "5px", }}
        className={STATUS_COLORS["COLOR_" + record.status]}
        showArrow
        bordered={false}
        options={statusOptions}
        value={record.status}
        onChange={onChange}
        loading={loading}
        size="small"

    />
}
const AdminBookingList = ({ intl, loading, results, success, getBookings, deleteBooking, showMessage, message, totalResults }) => {
    const [query, setQuery] = useState({ sortBy: "Submitted", sortType: "Desc" });
    const [tableState, setTableState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: totalResults
        },
        loading: false,

    });

    const [state, setState] = useState({ submitConfirmVisible: false });
    const bookingTableColumns = [
        {
            title: 'ID',
            dataIndex: 'id',

        },
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Phone',
            dataIndex: 'phone',

        },
        {
            title: 'Item',
            dataIndex: 'title',

        },
        {
            title: 'Location',
            dataIndex: 'location',
        },
        {
            title: 'Pickup Date',
            dataIndex: 'pickupDate',
        },

        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => {
                return <StatusColumnConnected text={text} record={record} />
            }
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, elm) => (
                <div className="text-right d-flex justify-content-end">
                    <Tooltip title="View">
                        <Link to={`./bookings-list/${elm.id}`}>
                            <Button type="link" className="mr-2" icon={<EyeOutlined />} size="small" />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button type="link" danger icon={<DeleteOutlined />} onClick={() => { onDeleteBooking(elm.id) }} size="small" />
                    </Tooltip>
                </div>
            )
        }
    ]
    bookingTableColumns.map(item => {
        item.title = intl.formatMessage({ id: 'text.' + item.dataIndex })
        return item;
    });
    if (results.length > 0)
        results = results.map(item => {
            item = { ...item, ...item.pickup };            
            return item;
        });
    useEffect(async () => {
        // var { limit, page, totalPages, totalResults, results } = await BookingService.getBookings({});
        getBookings(query);
    }, [query]);
    useEffect(async () => {
        setTableState({ ...tableState, pagination: { ...tableState.pagination, total: totalResults } });
    }, [totalResults]);
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
            >
                {label}
            </Tag>
        );
    }
    useEffect(async () => {
        if (showMessage)
            setTimeout(() => {
                hideBookingMessage()
            }, 4000);
    })
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

    const onDeleteBooking = (id) => {
        const booking = results.find(item => item.id == id);
        setState({ ...state, selectedBooking: booking, submitConfirmVisible: true });
    }
    const onSubmitConfirm = (value) => {
        if (value == "ok") {
            deleteBooking({ id: state.selectedBooking.id });
        }
        setState({ ...state, submitConfirmVisible: false });
    }

    const onTableChange = (pagination, filters, sorter, extra) => {
        if (extra.action == 'paginate') {
            setTableState({ ...tableState, pagination: { ...tableState.pagination, current: pagination.current } })
            setQuery({ ...query, page: pagination.current });
        }

    }
    statusOptions.map(item => {
        item.label = intl.formatMessage({ id: 'text.' + item.value })
        return item;
    })
    return (<>
        <Flex justifyContent="between" alignItems="center" className="py-4">
            <h2>{intl.formatMessage({ id: 'text.bookings' })}</h2>
            <div>
                <Link to={"./bookings-create"}>
                    <Button type="primary" className="ml-2">
                        <PlusOutlined />
                        <span>{intl.formatMessage({ id: 'text.new' })}</span>
                    </Button>
                </Link>
            </div>
        </Flex>
        <Row justify="space-between">
            <Col>
                <div className="p-2">
                    {
                        showMessage ? <motion.div
                            initial={{ opacity: 0, marginBottom: 0 }}
                            animate={{
                                opacity: showMessage ? 1 : 0,
                                marginBottom: showMessage ? 20 : 0
                            }}>
                            <Alert type={success ? "success" : "error"} showIcon message={message}></Alert>
                        </motion.div> : ""
                    }
                    <Row align="middle ">
                        <Col>
                            <span>{intl.formatMessage({ id: 'text.filterBy' })}</span>
                        </Col>
                        <Col>
                            <Select className="ml-2"
                                mode="multiple"
                                showArrow
                                tagRender={tagRender}
                                onChange={onChangeFilter}
                                placeholder={intl.formatMessage({ id: 'text.selectStatus' })}
                                style={{ width: '100%', minWidth: '150px' }}
                                options={statusOptions}
                            />
                        </Col>
                        <Col>
                            <span className="pl-4 pr-3">- {intl.formatMessage({ id: 'text.and' })} -</span>
                        </Col>
                        <Col>
                            <Search loading={loading} onSearch={onChangeSearch} size="middle" placeholder={intl.formatMessage({ id: 'text.inputZipCode' })} style={{ width: "170px" }} />
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col>
                <div className="p-2">
                    <Row align="middle ">
                        <Col>
                            <span>{intl.formatMessage({ id: 'text.sortBy' })}:</span>
                        </Col>
                        <Col>
                            <Select className="ml-2"
                                showArrow
                                onChange={onChangeSort}
                                defaultValue={intl.formatMessage({ id: 'text.submitted' })}
                                style={{ width: '100%', minWidth: '150px' }}
                                options={sortOptions}
                            />
                        </Col>
                        <Col>
                            <Select className="ml-3"
                                showArrow
                                onChange={onChangeSortType}
                                defaultValue="desc"
                                style={{ width: '80px' }}
                                options={[{ label: "Desc", value: "desc" }, { label: "Asc", value: "asc" }]}
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
            pagination={tableState.pagination}
            onChange={onTableChange}
            expandable={{
                expandedRowRender: record => <BookingDetails booking={record} />,
                rowExpandable: record => record.name !== 'Not Expandable',
            }}
        />
        <Modal
            title="Booking"
            visible={state.submitConfirmVisible}
            onOk={() => { onSubmitConfirm("ok") }}
            onCancel={() => { onSubmitConfirm("cancel") }}
            okText="Delete"
            cancelText="Cancel"
        >
            <p>{intl.formatMessage({ id: 'text.delete' })}?</p>
        </Modal>
    </>);
}




const mapStateToProps = ({ bookingList }) => {
    const { results, loading, success, message, showMessage, totalResults } = bookingList;

    return {
        results, loading, success, message, showMessage, totalResults
    }
}

const mapActionsToProps = {
    updateBooking, getBookings, deleteBooking
}
const StatusColumnConnected = connect(mapStateToProps, mapActionsToProps)(injectIntl(StatusColumnRender));
export default connect(mapStateToProps, mapActionsToProps)(injectIntl(AdminBookingList));