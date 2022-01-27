import { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { motion } from 'framer-motion';
import { UserProfileRules } from 'constants/RulesContant';
import { Alert, Form, Input, Button, Row, Col, Select } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import UserService from "services/UserService";
import { hideAuthMessage } from "redux/actions/Auth";
import Item from "views/app-views/components/navigation/dropdown/Item";
import { injectIntl } from 'react-intl'

const UserSecurity = ({ message, userId = 0, onUpdate, intl }) => {

    const [form] = Form.useForm();
    const [state, setState] = useState({
        loading: false, message: "", showMessage: false, error: false
    });
    const onFormFinish = async (values) => {
        delete values.confirm;
        onUpdate(values);
    }
    const hideMessage = () => {
        setTimeout(() => {
            setState({ ...state, showMessage: false, error: false, message: "" });
        }, 2000);
    }
    const showMessage = (message) => {
        setState({ ...state, showMessage: true, error: true, message: message });
    }



    return (
        <div>
            <>
                <Row justify="space-around">

                    <Col sm={24} xs={24} md={12} lg={8}>
                        {
                            state.showMessage ? <motion.div
                                initial={{ opacity: 0, marginBottom: 0 }}
                                animate={{
                                    opacity: state.showMessage ? 1 : 0,
                                    marginBottom: state.showMessage ? 20 : 0
                                }}>
                                <Alert type={state.error ? "error" : "success"} showIcon message={state.message}></Alert>
                            </motion.div> : ""
                        }

                        <Form layout="vertical" name="register-form" onFinish={onFormFinish}>
                            <Form.Item
                                name="password"
                                label={intl.formatMessage({ id: 'text.password' })}
                                rules={UserProfileRules.password}
                                hasFeedback
                            >
                                <Input prefix={<LockOutlined className="text-primary" />} />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label={intl.formatMessage({ id: 'text.confirmPassword' })}
                                rules={UserProfileRules.confirm}
                                hasFeedback
                            >
                                <Input prefix={<LockOutlined className="text-primary" />} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block loading={state.loading}>
                                    {intl.formatMessage({ id: 'text.update' })}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>

                </Row>

            </>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserSecurity))
