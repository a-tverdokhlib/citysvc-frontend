import { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import { Col, Row, Card, Tooltip, Tag, Button, Popover, Alert, Empty } from 'antd';
import { connect } from "react-redux";
import BookingList from "./bookingList";
import { ClockCircleOutlined, EnvironmentFilled, PlusOutlined } from '@ant-design/icons';
import { STATUS_COLORS } from "constants/ThemeConstant";
import { getRouteData, directionError, directionSuccess } from "redux/actions";
import Flex from 'components/shared-components/Flex';
import CreateDirection from "./createDirection";
import { motion } from 'framer-motion';
import { injectIntl } from 'react-intl'
const CustomMarker = injectIntl(({ intl, data }) => {
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
                    <Tooltip title={intl.formatMessage({ id: 'text.pickupDate' })}>
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

})
export const RouteCreator = ({ intl, routeData, directionError, directionSuccess, hideMessage, match, results, message, success, getRouteData, destinations, myLocation }) => {
    const routeId = match.params.id;
    const [gMap, setGmap] = useState({
        bookings: [],
        markers: []
    });
    const [markers, setMarkers] = useState([]);
    const loadMap = (map, maps) => {
        if (maps) {
            const directionService = new maps.DirectionsService();
            const directionRenderer = new maps.DirectionsRenderer();
            setGmap({ ...gMap, map, maps, directionService, directionRenderer });
        }

    };

    const createRoute = (myLocation, destinations) => {


        gMap.directionRenderer.setMap(gMap.map);


        let waypoints = [];
        if (destinations.length > 1) {
            waypoints = destinations.map(item => {
                return {
                    location: new gMap.maps.LatLng(item.pickup.latitude, item.pickup.longitude),
                    stopover: true
                }
            })
            var destination = destinations[destinations.length - 1];

            // waypoints.shift();
            waypoints.pop();

        }
        else {
            var destination = destinations[0];
        }

        if (!myLocation.latitude) {
            if (gMap.directionRenderer != null) {
                gMap.directionRenderer.setMap(null);

            }
        }
        else
            gMap.directionService.route(
                {
                    origin: { lat: myLocation.latitude, lng: myLocation.longitude },
                    destination: { lat: destination.pickup.latitude, lng: destination.pickup.longitude },
                    travelMode: gMap.maps.TravelMode.DRIVING,
                    waypoints: waypoints
                },
                (result, status) => {
                    if (status === "OK") {
                        gMap.directionRenderer.setDirections(result);
                        directionSuccess(result);
                        console.error(`ok fetching directions ${result}`);
                    } else {
                        console.error(`error fetching directions ${result}`);
                        directionError();
                    }
                }
            );
    }
    useEffect(async () => {
        let markers = gMap.bookings.map((item, index) => {
            return <CustomMarker data={item} lat={item.pickup.latitude} lng={item.pickup.longitude} key={index} />
        })
        setMarkers(markers);
        updateBounds();
    }, [gMap]);

    useEffect(async () => {
        getRouteData(routeId);
    }, []);
    useEffect(async () => {
        if (gMap.map)
            createRoute(myLocation, destinations);
    }, [destinations, myLocation, gMap]);


    const updateBounds = () => {
        if (gMap.maps) {
            let bounds = new gMap.maps.LatLngBounds();
            gMap.bookings.forEach(item => {
                bounds.extend({ lat: item.pickup.latitude, lng: item.pickup.longitude });
            })
            if (gMap.bookings.length > 0)
                gMap.map.fitBounds(bounds);
        }
    }

    return (
        <>
            {routeData === undefined && success === false ? <Empty /> :
                <Row>
                    <Col md={9} className="pr-4" >
                        <Card className="p-2"  >
                            <CreateDirection routeId={routeId} />
                        </Card>
                    </Col>
                    <Col md={15} >
                        <div className="w-100">
                            <div style={{ height: '500px', width: '100%' }} >

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
                            </div>
                        </div>
                    </Col>
                </Row>
            }
        </>
    )
}

const mapStateToProps = ({ routeCreator }) => {
    const { myLocation, isShowMessage, success, message, loading, routeData, destinations } = routeCreator;
    return { myLocation, isShowMessage, success, message, loading, routeData, destinations };
}

const mapDispatchToProps = {
    getRouteData, directionSuccess, directionError
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RouteCreator))
