import { connect } from 'react-redux';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import IntlMessage from "components/util-components/IntlMessage";
import { injectIntl } from 'react-intl'
import { updateBooking, getBookings } from "redux/actions/Booking";
import moment from "moment";
import { LoadingOutlined, CheckCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { Table, Tag, Space, Tooltip, Empty, Card, Col, Row, Input, Image, Button, Radio, Select } from 'antd';
import BookingService from 'services/BookingService';
import Flex from 'components/shared-components/Flex';
import { statusOptions, sortOptions } from "../../../../constants/Options";
import { STATUS_COLORS } from 'constants/ThemeConstant';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { debounce } from 'lodash';

const { Search } = Input;
export var bookingTableColumns = [
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
]

const StatusColumnRender = ({ text, record, index, updateBooking, loading }) => {
    // const [status, setStatus] = useState(record.status);
    const onChange = (value) => {
        updateBooking({ type: "booking", data: { status: value }, id: record.id });
    }


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
const UserBookingList = ({ loading, results, success, getBookings, userId, intl }) => {
    const [query, setQuery] = useState({ sortBy: intl.formatMessage({ id: 'text.submitted' }), sortType: "Desc", filterByUser: userId });
    const [tableState, setTableState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
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

    bookingTableColumns = bookingTableColumns.map(item => {
        item.title = intl.formatMessage({ id: 'text.' + item.dataIndex })
        return item;
    })

    return (<>

        <Row justify="space-between">
            <Col>
                <div className="p-2">
                    <Row align="middle ">
                        <Col>
                            <span>{intl.formatMessage({ id: 'text.filterBy' })}:</span>
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
                            <span>Sort By:</span>
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
            expandable={{
                expandedRowRender: record => <BookingDetails booking={record} />,
                rowExpandable: record => record.name !== 'Not Expandable',
            }}
        />
    </>);
}

const BookingDetails = ({ booking }) => {
    const { pickup, shipping, images } = booking;
    return <Row justify="start" align="top">
        <Col xs={24} md={14} className="p-2"> <InjectIntlPickupDetails details={pickup} images={images} /></Col>
        <Col xs={24} md={10} className="p-2"> <InjectIntlShippingDetails details={shipping} /></Col>
    </Row>


}

const PickupDetails = ({ details, images, intl }) => {
    const [visible, setVisible] = useState(false);
    return <Card className="p-1 " >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <h6>
                    {intl.formatMessage({ id: 'text.pickupInformtion' })}
                </h6>

                <article >

                    <div >
                        <h5>{details.name}</h5>
                        <h5>  {intl.formatMessage({ id: 'text.item' })} : {details.title}</h5>
                        <h5>  {intl.formatMessage({ id: 'text.phone' })}: {details.phone}</h5>
                        <h5>  {intl.formatMessage({ id: 'text.price' })} : {details.price}</h5>
                        <h5>  {intl.formatMessage({ id: 'text.pickupDate' })} : {details.pickupDate} {moment(details.selectedHour, ["HH"]).format("h:mm A")}</h5>
                        <p>
                            {details.location}
                        </p>
                    </div>
                </article>
            </div>
            <Image
                preview={{ visible: false }}
                width={200}
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
}

const ShippingDetails = ({ details, intl }) => {
    return <Card className="p-1 " >
        <div >
            <h6>
                {intl.formatMessage({ id: 'text.shippingInformtion' })}
            </h6>
        </div>

        <article >
            <div >
                <h5>{details.name}</h5>
                <h5> {intl.formatMessage({ id: 'text.phone' })}: {details.phone}</h5>
                <p>
                    {details.location}
                </p>
            </div>
        </article>
    </Card>
}
const mapStateToProps = ({ bookingList }) => {
    const { results, loading, success } = bookingList;
    return {
        results, loading, success
    }
}

const mapActionsToProps = {
    updateBooking, getBookings
}
const InjectIntlPickupDetails = injectIntl(PickupDetails);
const InjectIntlShippingDetails = injectIntl(ShippingDetails);

const StatusColumnConnected = connect(mapStateToProps, mapActionsToProps)(injectIntl(StatusColumnRender));
export default connect(mapStateToProps, mapActionsToProps)(injectIntl(UserBookingList));
