import { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import Flex from 'components/shared-components/Flex';
import { ClockCircleOutlined, EnvironmentFilled, PlusOutlined } from '@ant-design/icons';
import { Tag, Tooltip, Input, Empty, Col, Row, Button, Select, Popover } from 'antd';
import { statusOptions } from "../../../../constants/Options";
import { connect } from "react-redux";
import { getBookings } from "redux/actions/Booking";
import { STATUS_COLORS } from "constants/ThemeConstant";
import mapStyle from './mapstyle';
import { injectIntl } from "react-intl";
const { Search } = Input;

const CustomMarker = ({ data }) => {
    const ItemHeader = ({ name, address, ownerName }) => (
        <div>

            <span className="text-muted">{ownerName}</span><br />
            <span className="text-muted">{address}</span>
        </div>
    )
    const ItemInfo = ({ pickupDate, status, address, name, statusColor, selectedHour }) => (
        <>

            <Flex alignItems="center" justifyContent="between">

                <div className="mr-3 mt-3">
                    <Tooltip title="Pickup Date">
                        <ClockCircleOutlined className="text-muted font-size-md text-primary" />
                        <span className="ml-1 text-muted">{pickupDate}  </span>
                        <span className="ml-1 text-muted">{selectedHour.from} - {selectedHour.to}</span>
                    </Tooltip>
                </div>
                <div className="mt-3">
                    <Tag className={STATUS_COLORS["COLOR_" + status]} >

                        <span className={"ml-2 font-weight-semibold "}>{status}</span>
                    </Tag>
                </div>
            </Flex>
        </>
    )
    const createInfoWindowContent = (data) => {
        return <>
            <Flex alignItems="center" justifyContent="start">
                <img style={{ width: "80px", maxHeight: "80px", marginRight: "10px", borderRadius: "10px" }} src={data.images.length > 0 ? data.images[0] : ""} />
                <div style={{ flexGrow: 1, padding: "5px" }}><Flex alignItems="center" justifyContent="between">

                    <ItemHeader name={data.pickup.title} ownerName={data.pickup.name} address={data.pickup.location} />

                </Flex>
                </div>
            </Flex>
            <div className="mt-2">
                <ItemInfo
                    pickupDate={data.pickup.pickupDate}
                    selectedHour={data.pickup.selectedHour}
                    status={data.status || "Recieved"}
                    statusColor={data.statusColor || "bg-warning"}

                />
            </div>
        </>

    }
    return <Popover content={createInfoWindowContent(data)} title={data.title}>
        <div style={{ position: "relative", marginLeft: "-20px", marginTop: "-40px" }}>
            <Button block type="text"  ><div className={STATUS_COLORS["COLOR_" + data.status]} style={{ display: "flex ", alignItems: "center", justifyContent: "space-around", fontSize: "28px" }} ><EnvironmentFilled /></div></Button>
        </div>
    </Popover>

}
const updateMap = ({ map, maps }, results) => {
    if (map) {
        let bounds = new maps.LatLngBounds();
        results.forEach(item => {

            map.setOptions({
                styles: mapStyle
            })
            bounds.extend({ lat: item.latitude, lng: item.longitude });
        });
        map.fitBounds(bounds);
    }
}
const BookingMap = ({ intl, loading, results, success, getBookings }) => {
    const [gMap, setGmap] = useState({});
    const [query, setQuery] = useState({});
    if (results.length > 0)
        results = results.map(item => {
            item = { ...item, ...item.pickup };
            return item;
        });
    useEffect(async () => {
        getBookings(query);

    }, [query]);
    updateMap(gMap, results);
    const markers = results.map((item, index) => {
        return <CustomMarker data={item} lat={item.latitude} lng={item.longitude} key={index} />
    })


    const loadMap = (map, maps) => {
        setGmap({ map, maps });
        let bounds = new maps.LatLngBounds();
        results.forEach(item => {
            /*  let content = 's';
  
              let marker = new maps.Marker({
                  position: { lat: item.latitude, lng: item.longitude },
                  map,
                  draggable: false
              });
              
              const infowindow = new maps.InfoWindow({
                  content: content// createInfoWindowContent(item),
              });
            marker.addListener("click", () => {
                  infowindow.open({
                      anchor: marker,
                      map,
                      shouldFocus: false,
                  });
              });*/
            map.setOptions({
                styles: mapStyle
            })
            bounds.extend({ lat: item.latitude, lng: item.longitude });
        })

        map.fitBounds(bounds);
    };
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
    const onChangeFilter = (value) => {
        setQuery({ ...query, filterByStatus: value });
    }
    const onChangeSort = (value) => {
        setQuery({ ...query, sortBy: value });

    }
    const onChangeSearch = (value) => {
        setQuery({ ...query, keyword: value });
    }
    statusOptions.map(item => {
        item.label = intl.formatMessage({ id: 'text.' + item.value })
        return item;
    })
    return (<div>
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

        </Row>
        {results.length > 0 ?
            <div style={{ height: '500px', width: '100%' }}>

                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBYHbKZtVrRwnBoYhEamqgMQWhVDtNLTrg" }}
                    defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
                    defaultZoom={1}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
                    defaultOptions={{ mapId: "12f7b45ccae6f788" }}
                >
                    {markers}
                </GoogleMapReact>
            </div> : <Empty />
        }
    </div>);

}

const mapStateToProps = ({ bookingList }) => {
    const { results, loading, success } = bookingList;
    return {
        results, loading, success
    }
}

const mapActionsToProps = {
    getBookings
}
export default connect(mapStateToProps, mapActionsToProps)(injectIntl(BookingMap));
