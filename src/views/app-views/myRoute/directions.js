import { connect } from 'react-redux';
import { useState, useEffect } from "react";
import { myCalendarAddBooking } from 'redux/actions/MyCalendar';
import { getBookings, addDestination, addTagBookingItem } from 'redux/actions';
import moment from "moment";
import { CloseOutlined, ArrowUpOutlined, RightCircleTwoTone } from '@ant-design/icons';
import { Table, Tag, Tooltip, Card, Col, Row, Input, Image, Button, Select } from 'antd';
import { statusOptions, sortOptions } from "constants/Options";
import { STATUS_COLORS } from 'constants/ThemeConstant';
import parser from "html-react-parser";
import Item from 'antd/lib/list/Item';
import { injectIntl } from 'react-intl'

const Steps = ({ steps }) => {
    return (
        steps.map((item, i) => (

            <Row align="middle " justify="space-between" key={"ss" + i}>
                <Col flex={"30px"}>
                    <RightCircleTwoTone />
                </Col >
                <Col flex={"auto"}>
                    {parser(item.instructions)}
                </Col>
            </Row>

        ))


    );
}
const Directions = ({ intl, routeId, visible = true, onClose, title = intl.formatMessage({ id: 'text.selectDestination' }), directions }) => {
    const [state, setState] = useState({ visible });
    const { legs } = directions.routes[0];

    const closeMe = () => {
        setState({ ...state, visible: false });
        if (onClose)
            onClose();
    }
    return (<>

        {state.visible && <>
            <div >
                <Row align="middle " justify="space-between" className="pb-3">
                    <Col>
                        <span className="text-gray-light">{intl.formatMessage({ id: 'text.directions' })}</span>
                    </Col><Col><Button onClick={closeMe} shape='circle' size="small" type="text"><CloseOutlined /></Button></Col>
                </Row>
            </div>
            <div>
                {
                    legs.map((item, i) => (
                        <div key={"XXX" + i}>
                            <h4>{item.duration.text} ({item.distance.text})</h4>
                            <Row >
                                <Col><h5>{item.start_address}</h5>
                                    <Steps steps={item.steps} />
                                </Col>

                            </Row>
                            <Row >
                                <Col>
                                    <h5>{item.end_address}</h5>

                                </Col>

                            </Row>
                        </div>
                    ))
                }
            </div>
        </>
        }
    </>);
}





const mapStateToProps = ({ routeCreator }) => {
    const { directions } = routeCreator;

    return {
        directions
    }
}


export default connect(mapStateToProps, { getBookings })(injectIntl(Directions));
