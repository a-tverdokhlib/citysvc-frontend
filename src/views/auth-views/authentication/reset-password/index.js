
import { Spin, Form, Alert, Card, Input, Button, Col, Row } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Component } from "react";
import JwtAuthService from "services/JwtAuthService"
import { connect } from "react-redux";
const backgroundStyle = {
    backgroundImage: 'url(/img/others/img-17.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}
const rules = {

    password: [
        {
            required: true,
            message: 'Please input your password',

        },
        {
            min: 5,
            message: 'minimum allowed length (5)',

        },
        {
            max: 20,
            message: 'maximum allowed length (20)',

        }
    ],

    confirm: [
        {
            required: true,
            message: 'Please confirm your password!'
        },
        ({ getFieldValue }) => ({
            validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject('Passwords do not match!');
            },
        })
    ]
}
class ResetPassword extends Component {

    constructor(props) {
        super(props);
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        this.state = {
            token: params.get("token"),
            loading: true,
            success: false,
            message: "",
            action: ""
        }
    }

    async componentDidMount() {
        try {
            this.setState({
                loading: true,
            });
            await JwtAuthService.resetPasswordToken(this.state.token);
            this.setState({
                success: true,
                message: "Success",
                loading: false,
                action: "getToken"
            });

        } catch (err) {
            this.setState({
                success: false,
                message: err.message,
                loading: false
            });
        }
    }
    async onSend(values) {
        try {
            this.setState({
                loading: true,
            });
            delete values.confirm;
            values.token = this.state.token;
            await JwtAuthService.resetPassword(values);
            this.setState({
                success: true,
                message: "Success",
                loading: false,
                action: "resetPassword"
            });

        } catch (err) {
            this.setState({
                success: false,
                message: err.message,
                loading: false
            });
        }
    }
    render() {

        const element = this.state.loading === true ?
            <Spin></Spin>
            : (
                this.state.success ?
                    <div>
                        {this.state.action === "getToken" ?
                            <Form layout="vertical" name="forget-password" onFinish={(values) =>
                                this.onSend(values)}>
                                <Form.Item
                                    name="password"
                                    label="New Password"
                                    rules={rules.password}
                                    hasFeedback
                                >
                                    <Input.Password prefix={<LockOutlined className="text-primary" />} />
                                </Form.Item>
                                <Form.Item
                                    name="confirm"
                                    label="Confirm New Password"
                                    rules={rules.confirm}
                                    hasFeedback
                                >
                                    <Input.Password prefix={<LockOutlined className="text-primary" />} />
                                </Form.Item>
                                <Form.Item>
                                    <Button loading={this.state.loading} type="primary" htmlType="submit" block>{this.state.loading ? 'Sending' : 'Send'}</Button>
                                </Form.Item>
                            </Form>
                            : <div>
                                <Alert
                                    message="Success"
                                    description={"Your password has changed."}
                                    type="success"
                                />
                            </div>
                        }


                    </div> :
                    <div>
                        <div className="container-fluid">

                            <Alert
                                message="ERROR"
                                description={this.state.message}
                                type="error"
                            />
                        </div>
                    </div>
            )
        const container = <div className="h-100" style={backgroundStyle}>
            <div className="container d-flex flex-column justify-content-center h-100">
                <Row justify="center">
                    <Col xs={20} sm={20} md={20} lg={7}>
                        <Card>
                            <div className="text-center">
                                <img className="img-fluid" src={`/img/${this.props.currentTheme === 'light' ? 'logo.png' : 'logo-white.png'}`} alt="" />
                                <p>Reset Password</p>
                            </div>

                            {element}
                            <div className="text-left m-2 mt-4">
                                <p>Return to  <a href="/auth/login">Sign In</a></p>
                            </div>
                        </Card>
                    </Col>
                </Row></div>
        </div>
        return (
            container
        );
    }
}
const mapStateToProps = ({ theme }) => {
    return {
        currentTheme: theme.currentTheme
    }
}
export default connect(mapStateToProps)(ResetPassword);