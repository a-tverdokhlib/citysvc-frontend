import React from "react";
import { Component } from "react";
import PageHeaderAlt from '../../../../components/layout-components/PageHeaderAlt';
import { Input, Row, Col, Card, Collapse } from 'antd';
import { connect } from "react-redux";
import IntlMessage from "components/util-components/IntlMessage";
import { Link } from "react-router-dom";
import { injectIntl } from 'react-intl';
class ClientHome extends Component {
	onClick(event) {
		console.log(event)
	}
	render() {
		const userData = this.props.userData || {};
		const { intl } = this.props;
		return (
			<>
				<PageHeaderAlt className="bg-primary" overlap>
					<div className="container text-center">
						<div className="py-lg-4">
							<h1 className="text-white ">{intl.formatMessage({ id: 'text.welcome' })} {userData.name}</h1>
							<Row type="flex" justify="center">
								<Col xs={24} sm={24} md={12}>
									<p className="text-white w-75 text-center mt-2 mb-4 mx-auto">
										{intl.formatMessage({ id: 'text.enjoy' })}
									</p>
								</Col>
							</Row>
							<Row type="flex" justify="center" className="mb-5">
								<Col xs={24} sm={24} md={12}>

								</Col>
							</Row>
						</div>
					</div>
				</PageHeaderAlt>
				<div className="container my-4">
					<Row gutter={16}>

						<Col xs={24} sm={24} md={12} >
							<Link to={"../bookings-create"}>
								<Card hoverable >

									<div className="text-center">
										<img className="img-fluid" src="/img/others/pricing_img.png" alt="" />
										<h3 className="mt-4">{<IntlMessage id="button.createBooking" />}</h3>
									</div>
								</Card>
							</Link>
						</Col>
						<Col xs={24} sm={24} md={12} >
							<Link to={"../bookings-list"}>
								<Card hoverable>

									<div className="text-center">
										<img className="img-fluid" src="/img/others/pricing_img_3.png" alt="" />
										<h3 className="mt-4">{<IntlMessage id="button.showBookings" />}</h3>
									</div>
								</Card>
							</Link>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		userData: state.user.userData
	}
}
export default connect(mapStateToProps)(injectIntl(ClientHome))