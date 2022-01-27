import { Input, Row, Col, Button, Tooltip, Alert, Tabs } from 'antd'
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyLocationError, getMyLocationSuccess, getMyLocation, showMessage, hideMessage, updateRoute } from "redux/actions/RouteCreator";
import {
    AimOutlined, NodeExpandOutlined, PlusOutlined
} from '@ant-design/icons';
import BookingList from './bookingList';
import { motion } from 'framer-motion';
import RouteCreatorService from "services/RouteCreator";
import Destinations from "./destinations";
import Directions from './directions';
import { injectIntl } from 'react-intl'

const { Search } = Input;
export const CreateDirection = ({ intl, routeId, isShowMessage, updateRoute, routeData, success, hideMessage, loading, destinations, message }) => {
    const [state, setState] = useState({
        show: "main"
    });
    const onBookingListClose = () => {
        setState({ ...state, show: "main" });
    }
    const onDirectionClose = () => {
        setState({ ...state, show: "main" });
    }
    const onNewDestination = () => {
        setState({ ...state, show: "destination" });
    }
    const onShowDirection = () => {
        setState({ ...state, show: "directions" });
    }
    useEffect(async () => {
        if (isShowMessage) {
            setTimeout(() => {
                hideMessage();
            }, 2000)
        }
    }, [isShowMessage]);

    return (
        <>
            {
                isShowMessage ? <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isShowMessage ? 1 : 0,
                    }}>
                    <Alert type={success ? "success" : "error"} showIcon message={message}></Alert>
                </motion.div> : ""
            }
            {state.show == "main" && <div>
                <Row align="middle " justify="space-between" className="pb-3">
                    <Col>
                        <span className="text-gray-light">{routeData.name}</span>
                    </Col>

                    { //<Col><Button >Save</Button></Col>
                    }
                </Row>

                <ConnectedStartLocation routeId={routeId} />

                <AddDestination destinations={destinations} onNewDestination={onNewDestination} onShowDirection={onShowDirection} />

                <Destinations routeId={routeId} />


            </div>
            }{
                state.show == "destination" &&
                <motion.div
                    initial={{ x: -50, }}
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    animate={{
                        x: state.show == 'destination' ? 0 : -50

                    }}>
                    <BookingList routeId={routeId} onClose={onBookingListClose} />
                </motion.div>
            }
            {
                state.show == "directions" &&
                <motion.div
                    initial={{ x: -50, }}
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    animate={{
                        x: state.show == 'directions' ? 0 : -50

                    }}>
                    <Directions routeId={routeId} onClose={onDirectionClose} />
                </motion.div>
            }
        </>
    )
}

const StartLocation = ({ intl, routeId, getMyLocationSuccess, updateRoute, getMyLocationError, isShowMessage, showMessage, loading, hideMessage, myLocation }) => {
    const navSuccess = (position) => {

        const { latitude, longitude } = position.coords;
        const t = {
            latitude: 55.676098,
            longitude: 12.568337
        };
        getMyLocationSuccess({ latitude, longitude, address: "my location" });
        updateRoute(routeId, { latitude, longitude, address: "my location" })
    }
    const navError = (err) => {
        getMyLocationError(err.message);
        showMessage(err.message);
    }
    const onClick = () => {
        RouteCreatorService.getMyLocation(navSuccess, navError);
    }
    const onSearch = async (value) => {
        try {
            const res = await RouteCreatorService.geoCodeAddress(value);
            getMyLocationSuccess({ latitude: res.latitude, longitude: res.longitude, address: value });
            updateRoute(routeId, { latitude: res.latitude, longitude: res.longitude, address: value })

        } catch (err) {
            getMyLocationError(err.message);
            showMessage(err.message);
        }
    }
    useEffect(() => {
        if (isShowMessage)
            setTimeout(() => {
                hideMessage();
            }, 2000);
    }, [isShowMessage]);
    return <>
        <Row>
            <Col >
                <Tooltip title={intl.formatMessage({ id: 'text.getMyLocation' })} placement='rightTop'>
                    <Button loading={loading} onClick={onClick} size='small' type="text" shape="circle" icon={<AimOutlined />} />

                </Tooltip>
            </Col>
            <Col flex="auto">
                <Tooltip title="Search" placement='rightTop'>
                    <Search onSearch={onSearch} className="ml-1" size="small" placeholder={intl.formatMessage({ id: 'text.searchStartingLocation' })} />
                </Tooltip>
            </Col>
        </Row>
    </>
}
const AddDestination = injectIntl(({ intl, onNewDestination, onShowDirection, destinations }) => {

    const onClick = () => {
        onNewDestination()
    }
    const onClickDirections = () => {
        onShowDirection()
    }
    return <>
        <Row align='middle' justify="space-between" className='mt-2 mb-2'>
            <Col>
                <Row>
                    <Col >
                        <Tooltip title={intl.formatMessage({ id: 'text.addDestination' })} placement='rightTop'>
                            <Button onClick={onClick} size='small' shape="circle" type="text" icon={<PlusOutlined />} />
                        </Tooltip>

                    </Col>
                    <Col flex="auto">
                        <div onClick={onClick} className="font-weight-semibold ml-1 text-primary mt-2" style={{ cursor: "pointer" }}>{intl.formatMessage({ id: 'text.addDestination' })}</div>
                    </Col>
                </Row>
            </Col>
            <Col>  {
                destinations.length > 0 &&
                <Row justify="end">
                    <Col >
                        <Tooltip title={intl.formatMessage({ id: 'text.viewDirections' })} placement='rightTop'>
                            <Button onClick={onClickDirections} size='small' shape="circle" type="text" icon={<NodeExpandOutlined />} />
                        </Tooltip>

                    </Col>
                    <Col flex="auto">

                        <div onClick={onClickDirections} className="font-weight-semibold ml-1 text-primary mt-2" style={{ cursor: "pointer" }}>{intl.formatMessage({ id: 'text.directions' })}</div>


                    </Col>
                </Row>}
            </Col>
        </Row>
    </>
})




const mapStateToProps = ({ routeCreator }) => {
    const { myLocation, isShowMessage, success, message, loading, routeData, directions, destinations } = routeCreator;
    return { myLocation, isShowMessage, success, message, loading, routeData, directions, destinations };
}

const mapDispatchToProps = {
    getMyLocationError, getMyLocationSuccess, showMessage, hideMessage, getMyLocation, updateRoute
}
const ConnectedStartLocation = connect(mapStateToProps, mapDispatchToProps)(injectIntl(StartLocation));
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CreateDirection))
