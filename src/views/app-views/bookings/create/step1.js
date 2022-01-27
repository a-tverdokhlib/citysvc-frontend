import {
    Form, Input, Alert,
    Row, Col
} from 'antd';
import { motion } from "framer-motion"

import { rulesPickup } from './rules';
const Step1 = ({ intl, layout, showMessage, success, message, form }) => {
    return <Row>
        <Col>
            {showMessage ?
                <motion.div
                    initial={{ opacity: 0, marginBottom: 0 }}
                    animate={{
                        opacity: showMessage ? 1 : 0,
                        marginBottom: showMessage ? 20 : 0
                    }}>
                    <Alert type={success ? "success" : "error"} showIcon message={message}></Alert>
                </motion.div>
                : ""}

            <Form className="mt-4" form={form} name="account"  {...layout} >
                <Form.Item name="dbaLink" label={intl.formatMessage({ id: 'text.dbaUrl' })} rules={rulesPickup.dbaLink} hasFeedback>
                    <Input placeholder="http://dba.dk" style={{ minWidth: "400px" }} />
                </Form.Item>
            </Form>
        </Col>
    </Row>
}

export default Step1;
