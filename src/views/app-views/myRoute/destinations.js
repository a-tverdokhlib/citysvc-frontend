import { Row, Col, Button, Tooltip, Badge } from 'antd'
import { connect } from 'react-redux';
import { showMessage, hideMessage } from "redux/actions/RouteCreator";
import {
    DeleteOutlined
} from '@ant-design/icons';
import { injectIntl } from 'react-intl'

import { removeDestination } from 'redux/actions';
const letters = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",")
export const Destinations = ({ intl, routeId, destinations, removeDestination }) => {

    const deleteDestination = (destinationId) => {
        removeDestination({ routeId, destinationId })
    }

    return (
        <>



            {
                destinations.map((item, i) => (
                    <Row align="middle" style={{ borderTop: "1px solid #eee", }} key={`${item.id}-${i}`}

                    >
                        <Col><Badge.Ribbon text={letters[i + 1]} placement="start" color="red">
                            <div style={{ width: "12px", margin: "11px", marginRight: "15px", marginTop: "-5px" }}>.</div>
                        </Badge.Ribbon>
                        </Col>
                        <Col flex="auto" >
                            <Row align="middle" >
                                <Col flex="auto">
                                    <div>
                                        {item.pickup.name}
                                    </div>
                                </Col>
                                <Col>
                                    <div >
                                        <Tooltip placement="left" title={intl.formatMessage({ id: 'text.removeFromRoute' })}>
                                            <Button onClick={() => {
                                                deleteDestination(item.id)
                                            }} size={"small"} type="text" shape="circle"  ><DeleteOutlined></DeleteOutlined></Button>
                                        </Tooltip>
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                ))
            }


        </>
    )
}




const mapStateToProps = ({ routeCreator }) => {
    const { isShowMessage, success, message, loading, routeData, destinations } = routeCreator;
    return { isShowMessage, success, message, loading, routeData, destinations };
}

const mapDispatchToProps = {
    showMessage, hideMessage, removeDestination
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Destinations))
