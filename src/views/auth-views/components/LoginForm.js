import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { GoogleSVG, FacebookSVG } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon';
import { injectIntl } from 'react-intl';
import {
	signIn,
	showLoading,
	showAuthMessage,
	hideAuthMessage,
	signInWithGoogle,
	signInWithFacebook
} from 'redux/actions/Auth';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"

export const LoginForm = props => {
	let history = useHistory();
	let { intl } = props;
	const {
		otherSignIn,
		showForgetPassword,
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		signInWithGoogle,
		signInWithFacebook,
		extra,
		signIn,
		token,
		loading,
		redirect,
		showMessage,
		message,
		allowRedirect
	} = props

	const initialCredential = {
		email: '',
		password: ''
	}

	const onLogin = values => {
		showLoading()
		signIn(values);
	};

	const onGoogleLogin = () => {
		showLoading()
		signInWithGoogle()
	}

	const onFacebookLogin = () => {
		showLoading()
		signInWithFacebook()
	}

	useEffect(() => {
		if (token !== null && allowRedirect) {
			history.push(redirect)
		}
		if (showMessage) {
			setTimeout(() => {
				hideAuthMessage();
			}, 3000);
		}
	});

	const renderOtherSignIn = (
		<div>
			<Divider>
				<span className="text-muted font-size-base font-weight-normal">or connect with</span>
			</Divider>
			<div className="d-flex justify-content-center">
				<Button
					onClick={() => onGoogleLogin()}
					className="mr-2"
					disabled={loading}
					icon={<CustomIcon svg={GoogleSVG} />}
				>
					Google
				</Button>
				<Button
					onClick={() => onFacebookLogin()}
					icon={<CustomIcon svg={FacebookSVG} />}
					disabled={loading}
				>
					Facebook
				</Button>
			</div>
		</div>
	)

	return (
		<>
			<motion.div
				initial={{ opacity: 0, marginBottom: 0 }}
				animate={{
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0
				}}>
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form
				layout="vertical"
				name="login-form"
				initialValues={initialCredential}
				onFinish={onLogin}
			>
				<Form.Item
					name="email"
					label={intl.formatMessage({ id: 'text.email' })}
					rules={[
						{
							required: true,
							message: intl.formatMessage({ id: 'text.ruleemail' }),
						},
						{
							type: 'email',
							message: intl.formatMessage({ id: 'text.rulevalidemail' })
						}
					]}>
					<Input prefix={<MailOutlined className="text-primary" />} />
				</Form.Item>
				<Form.Item
					name="password"
					label={
						<div className={`${showForgetPassword ? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<div>{intl.formatMessage({ id: 'text.password' })}</div>
							{
								showForgetPassword &&
								<div
									onClick={() => { onForgetPasswordClick() }}
									className=" align-self-end cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									{intl.formatMessage({ id: 'text.forgetPassword' })}?
								</div>
							}
						</div>
					}
					rules={[
						{
							required: true,
							message: intl.formatMessage({ id: 'text.rulepassword' }),
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						{intl.formatMessage({ id: 'text.signin' })}
					</Button>
				</Form.Item>
				{
					otherSignIn ? renderOtherSignIn : null
				}
				{extra}
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({ auth }) => {
	const { loading, message, showMessage, token, redirect } = auth;
	return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	signIn,
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	signInWithGoogle,
	signInWithFacebook
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoginForm))
