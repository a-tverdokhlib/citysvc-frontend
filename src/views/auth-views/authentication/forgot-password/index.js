import React, { useState } from 'react'
import { Card, Row, Col, Form, Input, Button, Alert } from "antd";
import { MailOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import JwtAuthService from 'services/JwtAuthService';
const backgroundStyle = {
	backgroundImage: 'url(/img/others/img-17.jpg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const ForgotPassword = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const theme = useSelector(state => state.theme.currentTheme)
	const onSend = async (values) => {
		setLoading(true)
		try {
			await JwtAuthService.forgotPassword(values);
			setLoading(false);
			setSubmitted(true);
			setSuccess(true);
		} catch (err) {
			setSubmitted(true);
			setLoading(false);
			setSuccess(false);
			setErrorMessage(err.message);

		}


	}

	return (
		<div className="h-100" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={9}>
						{
							submitted === false ?
								<Card>
									<div className="my-2">
										<div className="text-center">
											<img className="img-fluid" src="/img/logo.png" alt="" />
											<h3 className="mt-3 font-weight-bold">Forgot Password?</h3>
											<p className="mb-4">Enter your Email to reset password</p>
										</div>
										<Row justify="center">
											<Col xs={24} sm={24} md={20} lg={20}>
												<Form form={form} layout="vertical" name="forget-password" onFinish={onSend}>
													<Form.Item
														name="email"
														rules={
															[
																{
																	required: true,
																	message: 'Please input your email address'
																},
																{
																	type: 'email',
																	message: 'Please enter a validate email!'
																}
															]
														}>
														<Input placeholder="Email Address" prefix={<MailOutlined className="text-primary" />} />
													</Form.Item>
													<Form.Item>
														<Button loading={loading} type="primary" htmlType="submit" block>{loading ? 'Sending' : 'Send'}</Button>
													</Form.Item>
												</Form>
											</Col>
										</Row>
									</div>
								</Card>
								:
								<Card>
									<div className="my-2">
										<div className="text-center">
											<img className="img-fluid" src={`/img/${theme === 'light' ? 'logo.png' : 'logo-white.png'}`} alt="" />

										</div>
										{
											success ?
												<Row justify="center">
													<div>
														<h3>Reset Password Link Sent</h3>
														<p>
															A reset password  mail with instructions has been sent to your email address. Follow those instructions to reset your password.
														</p>
														<p>Return to  <a href="/auth/login">Sign In</a></p>
													</div>
												</Row> :
												<Row justify="center">
													<div>
														<Alert
															message="ERROR"
															description={errorMessage}
															type="error"
														/>
														<p className="mt-4">Return to  <a href="/auth/login">Sign In</a></p>
													</div>
												</Row>

										}

									</div>
								</Card>





						}

					</Col>
				</Row>
			</div>
		</div>
	)
}

export default ForgotPassword

