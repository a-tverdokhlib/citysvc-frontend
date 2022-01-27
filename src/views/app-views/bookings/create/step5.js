import {
    Steps, Row, Col, Form, Input, Calendar,
    Button, Divider, Alert, Image, Card, Tabs, Empty, Modal, Badge, Result
} from 'antd';
import FeatherIcon from 'feather-icons-react';
import { motion } from 'framer-motion';
import moment from 'moment';
const Step5 = ({ intl, details, deliveryDetails, onClickEdit, message, showMessage, success }) => {
    return <Row>
        <Col sm={24} lg={12}>{showMessage ?
            <motion.div
                initial={{ opacity: 0, marginBottom: 0 }}
                animate={{
                    opacity: showMessage ? 1 : 0,
                    marginBottom: showMessage ? 20 : 0
                }}>
                <Alert type={success ? "success" : "error"} showIcon message={message}></Alert>
            </motion.div>
            : ""}
            <Card className="p-1 m-3" >
                <div >
                    <h5 style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>{intl.formatMessage({ id: 'text.pickupInformtion' })}</span>
                        <Button type="link" onClick={() => { onClickEdit("pickup") }} >
                            <FeatherIcon icon="edit" />
                            {intl.formatMessage({ id: 'text.edit' })}
                        </Button>
                    </h5>
                </div>
                <article >
                    {details && details.selectedHour ?
                        <div >
                            <h5>{details.name}</h5>
                            <h5>{intl.formatMessage({ id: 'text.item' })} : {details.title}</h5>
                            <h5>{intl.formatMessage({ id: 'text.phone' })}: {details.phone}</h5>
                            <h5>{intl.formatMessage({ id: 'text.price' })} : {details.price}</h5>
                            {//<h5>Pickup Date : {details.pickupDate} {moment(details.selectedHour, ["HH"]).format("h:mm A")}</h5>
                            }
                            <h5>{intl.formatMessage({ id: 'text.pickupDate' })} : {details.pickupDate} {details.selectedHour.from} - {details.selectedHour.to}</h5>
                            <p>
                                {details.location}
                            </p>
                        </div>
                        : <Empty />
                    }
                </article>
            </Card>
        </Col>
        <Col sm={24} lg={12}>
            <Card className="p-1  m-3" >
                <div >
                    <h5 style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>{intl.formatMessage({ id: 'text.shippingInformtion' })}</span>
                        <Button type="link" onClick={() => { onClickEdit("shipping") }} style={{ cursor: "pointer" }}>
                            <FeatherIcon icon="edit" className="primary" />
                            {intl.formatMessage({ id: 'text.edit' })}
                        </Button>
                    </h5>
                </div>

                <article >
                    {deliveryDetails && deliveryDetails.location ?
                        <div >
                            <h5>{deliveryDetails.name}</h5>
                            <h5>{intl.formatMessage({ id: 'text.phone' })}: {deliveryDetails.phone}</h5>
                            <p>
                                {deliveryDetails.location}
                            </p>
                        </div>
                        : <Empty />
                    }                    </article>
            </Card>
        </Col></Row>
}

export default Step5;
