import { connect } from 'react-redux';
import { useState, useEffect } from "react";
import { myCalendarAddBooking } from 'redux/actions/MyCalendar';
import { getBookings, addDestination, addTagBookingItem } from 'redux/actions';
import moment from "moment";
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { Table, Tag, Tooltip, Card, Col, Row, Input, Image, Button, Select } from 'antd';
import { statusOptions, sortOptions } from "constants/Options";
import { STATUS_COLORS } from 'constants/ThemeConstant';
import { injectIntl } from 'react-intl'

const { Search } = Input;


const ActionColumnRender = ({ intl, routeId, addDestination, addTagBookingItem, record }) => {


    const onAdd = async () => {
        const x = await addDestination({
            routeId,
            destinationId: record.id
        });

        //  addTagBookingItem({ id: record.id, tag: { destination: true } });
    }

    return <div>
        <Tooltip placement="left" title={intl.formatMessage({ id: 'text.addToRoute' })}>
            <Button onClick={onAdd} size="small" shape="circle" icon={<RightOutlined />} ></Button>
        </Tooltip>
    </div>
}


const BookingList = ({ intl, routeId, visible = true, onClose, title = intl.formatMessage({ id: 'text.selectDestination' }), loading, results, totalResults, getBookings, selectedTimeFrame, destinations }) => {
    const bookingTableColumns = [
        {
            title: intl.formatMessage({ id: 'text.item' }),
            dataIndex: 'title',
            render: (text, record) => {
                return <div style={{ width: "120px" }} className="text-truncate">
                    {text}
                </div>
            }
        },
        {
            title: intl.formatMessage({ id: 'text.location' }),
            dataIndex: 'location',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => {
                return <Tag
                    className={STATUS_COLORS["COLOR_" + text]} size={"small"}
                >
                    <div style={{ width: "35px", }} className="text-truncate">{intl.formatMessage({ id: 'text.' + text })}</div>
                </Tag>

            }

        },
        {
            title: intl.formatMessage({ id: 'text.action' }),
            dataIndex: '',
            key: 'x',
            render: (text, record) => {
                return <ActionColumnRenderConnected routeId={routeId} text={text} record={record} selectedTimeFrame={selectedTimeFrame} />
            }

        },
    ]

    const [query, setQuery] = useState({ sortBy: "Submitted", sortType: "Desc", filterByStatus: ["Submitted", 'Booked'], filterByRoute: routeId });
    const [state, setState] = useState({ visible });
    let tableResults = results.filter(item => item.destination !== true);
    const [tableState, setTableState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: tableResults.length
        },
        loading: false,

    });
    if (tableResults.length > 0)
        tableResults = tableResults.map(item => {
            item = { ...item, ...item.pickup };
            return item;
        });
    useEffect(async () => {
        getBookings(query);
    }, [query, destinations]);
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
                {label}
            </Tag>
        );
    }

    const onChangeSearch = (value) => {
        setQuery({ ...query, keyword: value });
    }
    const onChangeFilter = (value) => {
        setQuery({ ...query, filterByStatus: value });
    }
    const onTableChange = (pagination, filters, sorter, extra) => {
        if (extra.action == 'paginate') {
            setTableState({ ...tableState, pagination: { ...tableState.pagination, current: pagination.current } })
            setQuery({ ...query, page: pagination.current });
        }

    }
    const closeMe = () => {
        setState({ ...state, visible: false });
        if (onClose)
            onClose();
    }

    statusOptions.map(item => {
        item.label = intl.formatMessage({ id: 'text.' + item.value })
        return item;
    })
    return (<>

        {state.visible ?
            <div >
                <Row align="middle " justify="space-between" className="pb-3">
                    <Col>
                        <span className="text-gray-light">{title}</span>
                    </Col><Col><Button onClick={closeMe} shape='circle' size="small" type="text"><CloseOutlined /></Button></Col>
                </Row>
                <Row align="middle " justify="space-between" gutter={[0, 12]}>
                    <Col flex="auto">

                        <Select
                            mode="multiple"
                            showArrow
                            size={"small"}
                            tagRender={tagRender}
                            onChange={onChangeFilter}
                            placeholder={intl.formatMessage({ id: 'text.selectStatus' })}
                            style={{ display: "relative", width: "100%" }}
                            options={statusOptions}
                            value={query.filterByStatus}
                        />

                    </Col>
                    <Col className="font-size-xs pl-2 pr-2" >
                        - {intl.formatMessage({ id: 'text.and' })} -
                    </Col>
                    <Col flex="140px">
                        <Search loading={loading} onSearch={onChangeSearch} size="small" placeholder={intl.formatMessage({ id: 'text.inputZipCode' })} style={{ width: "100%" }} />
                    </Col>

                </Row>


                <Table
                    columns={bookingTableColumns}
                    rowKey={record => record.id}
                    dataSource={tableResults}
                    size={"small"}
                    showHeader={false}
                    className="w-100"
                    pagination={tableState.pagination}
                    onChange={onTableChange}
                    expandable={{
                        expandedRowRender: record => <BookingDetails booking={record} />,
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                />
            </div> : ""
        }
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
                        <h5>{intl.formatMessage({ id: 'text.pickupDate' })}: {details.pickupDate} {moment(details.selectedHour, ["HH"]).format("h:mm A")}</h5>
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


const mapStateToProps = ({ bookingList, routeCreator }) => {
    const { results, loading, success, totalResults } = bookingList;
    const { destinations } = routeCreator;

    return {
        results, totalResults, loading, success, destinations
    }
}


const ActionColumnRenderConnected = connect(mapStateToProps, { myCalendarAddBooking, addDestination, addTagBookingItem })(injectIntl(ActionColumnRender));
export default connect(mapStateToProps, { getBookings })(injectIntl(BookingList));
