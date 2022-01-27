import React from 'react'
import RegisterForm from '../../components/RegisterForm'
import { Card, Row, Col, } from "antd";
import { useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
const backgroundStyle = {
	backgroundImage: 'url(/img/others/img-17.jpg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const RegisterOne = props => {
	const { intl } = props;
	const theme = useSelector(state => state.theme.currentTheme)
	const registrationToken = useSelector(state => state.auth.registrationToken);

	return (
		<div className="h-100" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={7}>
						{!registrationToken ?
							<Card>
								<div className="my-2">
									<div className="text-center">
										<img className="img-fluid" src={`/img/${theme === 'light' ? 'logo.png' : 'logo-white.png'}`} alt="" />
										<p className="text-muted">{intl.formatMessage({ id: 'text.createAccount' })}:</p>
									</div>
									<Row justify="center">

										<Col xs={24} sm={24} md={20} lg={20}>
											<RegisterForm {...props} />
											<p>{intl.formatMessage({ id: 'text.haveAccount' })}? <a href="/auth/login">{intl.formatMessage({ id: 'text.signin' })}</a></p>

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
									<Row justify="center">
										<div>
											<h3>Confirmation Required</h3>
											<p>
												A confirmation mail with instructions has been sent to your email address. Follow those instructions to confirm your email address and activate your account.
											</p>
											<p>Return to  <a href="/auth/login">Sign In</a></p>
										</div>
									</Row>
								</div>
							</Card>
						}
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default injectIntl(RegisterOne);
