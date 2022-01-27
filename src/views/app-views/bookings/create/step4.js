import {
    Form, Input, Alert, Row, Col
} from 'antd';
import { DEFAULT_LAT_LNG } from 'constants/ApiConstant';
import { motion } from "framer-motion"
import GoogleMapLocation from './googleMapLocation';

import { rulesDelivery } from './rules';
const Step4 = ({ intl, layout, deliveryDetails, form, showMessage, message, success, onMarkerDragEnd }) => {

    let details = deliveryDetails ? deliveryDetails : DEFAULT_LAT_LNG;
    return <Row>
        <Col> {showMessage ?
            <motion.div
                initial={{ opacity: 0, marginBottom: 0 }}
                animate={{
                    opacity: showMessage ? 1 : 0,
                    marginBottom: showMessage ? 20 : 0
                }}>
                <Alert type={success ? "success" : "error"} showIcon message={message}></Alert>
            </motion.div>
            : ""}
            <Form form={form} className="mt-4" name="delivery"  {...layout}>
                <Form.Item name="name" label={intl.formatMessage({ id: 'text.name' })} rules={rulesDelivery.name}>
                    <Input placeholder={intl.formatMessage({ id: 'text.name' })} className=" m-0" />
                </Form.Item>
                <Row>
                    <Col sm={16}>
                        <Form.Item name="location" label={intl.formatMessage({ id: 'text.location' })} rules={rulesDelivery.location} >
                            <Input placeholder={intl.formatMessage({ id: 'text.location' })} />
                        </Form.Item>
                    </Col>
                    <Col sm={8}><Form.Item name="zip" className="pl-1" label={intl.formatMessage({ id: 'text.zip' })} rules={rulesDelivery.zip} >
                        <Input placeholder={intl.formatMessage({ id: 'text.zip' })} />
                    </Form.Item></Col>
                </Row>
                <GoogleMapLocation longitude={details.longitude} latitude={details.latitude} onMarkerDragEnd={onMarkerDragEnd} />
                <Form.Item name="phone" label={intl.formatMessage({ id: 'text.phone' })} rules={rulesDelivery.phone}>
                    <Input placeholder={intl.formatMessage({ id: 'text.phone' })} />
                </Form.Item>

            </Form>
        </Col></Row>
}

export default Step4;
