
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
	Avatar, Drawer, Divider, Card, Tabs,
	Alert
} from 'antd';
import UserProfile from './userProfile';
import UserBooking from './userBooking';
import UserSecurity from './userSecurity';
import UserService from 'services/UserService';
import PageHeader from 'components/layout-components/PageHeader';
import { motion } from 'framer-motion';
import IntlMessage from "components/util-components/IntlMessage";
import { injectIntl } from 'react-intl'
const { TabPane } = Tabs;




export const UserView = ({ match, intl }) => {
	const [userData, setUserData] = useState({});
	const userId = match.params.id;
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
	useEffect(async () => {
		try {
			const data = await UserService.getData(userId);
			setUserData(data);
		} catch (err) {
			showMessage(err.message);
			hideMessage();
		}

	}, []);

	useEffect(async () => {
		if (state.showMessage)
			setTimeout(() => {
				setState({ showMessage: false, message: "", error: false });
			}, 4000);
	})

	const onUpdate = async (values) => {
		try {
			setState({
				...state,
				loading: true,
			});

			const res = await UserService.update(userId, values);
			setState({
				...state,
				error: false,
				message: "Success",
				loading: false,
				showMessage: true
			});
			setUserData(res);

		} catch (err) {
			setState({
				...state,
				error: true,
				message: err.message,
				loading: false,
				showMessage: true
			});
		}
	}
	return (
		<> <PageHeader title={userData.name} display={true} trans={false} />
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
			<Card>
				<Tabs defaultActiveKey="1">
					<TabPane tab={intl.formatMessage({ id: 'text.bookings' })} key="1">
						<UserBooking userId={userId}></UserBooking>
					</TabPane>
					<TabPane tab={intl.formatMessage({ id: 'text.profile' })} key="2"><UserProfile userId={userId} onUpdate={onUpdate} userData={userData}></UserProfile>

					</TabPane>
					<TabPane tab={intl.formatMessage({ id: 'text.security' })} key="3">
						<UserSecurity userId={userId} onUpdate={onUpdate}></UserSecurity>
					</TabPane>
				</Tabs>
			</Card>
		</>
	)
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserView))

