import { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { motion } from 'framer-motion';
import { UserProfileRules } from 'constants/RulesContant';
import { Alert, Form, Input, Button, Row, Col, Select } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import UserService from "services/UserService";
import { hideAuthMessage } from "redux/actions/Auth";
import Item from "views/app-views/components/navigation/dropdown/Item";
import user from "redux/reducers/User";
import IntlMessage from "components/util-components/IntlMessage";
import { injectIntl } from 'react-intl'
const UserProfile = ({ loading, message, userId = 0, userData, onUpdate, intl }) => {

    const [form] = Form.useForm();
    const [state, setState] = useState({
        loading: false, message: "", showMessage: false, error: false
    });

    const hideMessage = () => {
        setTimeout(() => {
            setState({ ...state, showMessage: false, error: false, message: "" });
        }, 2000);
    }
    const showMessage = (message) => {
        setState({ ...state, showMessage: true, error: true, message: message });
    }


    const formFields = [];
    Object.keys(userData).forEach(item => {
        formFields.push({
            name: [item],
            value: userData[item]
        })
    })

    const onFormFinish = (values) => {
        onUpdate(values);
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

                        <Form layout="vertical" name="register-form" onFinish={onFormFinish} fields={formFields}>
                            <Form.Item
                                name="name"
                                label={intl.formatMessage({ id: 'text.name' })}
                                rules={UserProfileRules.name}
                                hasFeedback


                            >
                                <Input prefix={<MailOutlined className="text-primary" />} />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label={intl.formatMessage({ id: 'text.email' })}
                                rules={UserProfileRules.email}
                                hasFeedback
                            >
                                <Input prefix={<MailOutlined className="text-primary" />} />
                            </Form.Item>
                            <Form.Item
                                name="status"
                                label={intl.formatMessage({ id: 'text.status' })}

                                hasFeedback
                            >
                                <Select

                                    showArrow
                                    size="small"
                                    options={[
                                        { label: "Active", value: "Active" },
                                        { label: "Blocked", value: "Blocked" }
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                name="role"
                                label={intl.formatMessage({ id: 'text.role' })}

                                hasFeedback
                            >
                                <Select

                                    showArrow
                                    size="small"
                                    options={[
                                        { label: "Admin", value: "admin" },
                                        { label: "Client", value: "client" }
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                name="isEmailVerified"
                                label={intl.formatMessage({ id: 'text.emailVerified' })}

                                hasFeedback
                            >
                                <Select

                                    showArrow
                                    size="small"
                                    options={[
                                        { label: "Yes", value: true },
                                        { label: "No", value: false }
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block loading={loading}>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(injectIntl(UserProfile)))
