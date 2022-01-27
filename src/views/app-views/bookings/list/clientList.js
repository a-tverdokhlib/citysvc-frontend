import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Row, Col, Tooltip, Tag, Menu, Card, Modal, Alert } from 'antd';
import { PlusOutlined, ClockCircleTwoTone, CalendarOutlined } from '@ant-design/icons';
import { STATUS_COLORS } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import BookingService from 'services/BookingService';
import { deleteBooking, hideBookingListMessage, getBookings } from "redux/actions/Booking";
import { motion } from 'framer-motion';
import { injectIntl } from 'react-intl';
const ItemAction = injectIntl(({ intl, id, onDeleteBooking }) => {
	return <EllipsisDropdown
		menu={
			<Menu>

				<Menu.Item key="0"><Link to={`./bookings-list/${id}`}>
					<span>{intl.formatMessage({ id: 'text.view' })}</span></Link>
				</Menu.Item>

				<Menu.Divider />
				<Menu.Item key="2" onClick={() => onDeleteBooking(id)}>
					<span>{intl.formatMessage({ id: 'text.delete' })}</span>
				</Menu.Item>
			</Menu>
		}
	/>
})

const ItemHeader = ({ name, address, ownerName }) => (
	<div>
		<h4 className="mb-0">{name}</h4>
		<span className="text-muted">{ownerName}</span><br />
		<span className="text-muted">{address}</span>
	</div>
)

const ItemInfo = injectIntl(({ intl, pickupDate, status, address, name, statusColor, selectedHour }) => (
	<>

		<Flex alignItems="center" justifyContent="between">

			<div className="mr-3 mt-3">
				<Tooltip title={intl.formatMessage({ id: 'text.pickupDate2' })}>
					<CalendarOutlined className="text-muted font-size-md text-primary" />
					<span className="ml-1 text-muted">{pickupDate}</span>
				</Tooltip>
				<br />
				<Tooltip title={intl.formatMessage({ id: 'text.pickupHours' })}>
					<ClockCircleTwoTone className="text-muted font-size-md text-primary" />
					<span className="ml-1 text-muted">{selectedHour.from} - {selectedHour.to}</span>
				</Tooltip>
			</div>
			<div className="mt-3">
				<Tag className={statusColor === "none" ? 'bg-gray-lightest' : statusColor} >

					<span className="ml-2 font-weight-semibold">{intl.formatMessage({ id: 'text.' + status })}</span>
				</Tag>
			</div>
		</Flex>
	</>
))

const GridItem = ({ data, removeId, onDeleteBooking }) => (
	<Card >
		<Flex alignItems="center" justifyContent="start">
			<img style={{ width: "80px", maxHeight: "80px", marginRight: "10px", borderRadius: "10px" }} src={data.images.length > 0 ? data.images[0] : ""} />
			<div style={{ flexGrow: 1, padding: "5px" }}><Flex alignItems="center" justifyContent="between">

				<ItemHeader name={data.pickup.title} ownerName={data.pickup.name} address={data.pickup.location} />
				<ItemAction id={data.id} removeId={removeId} onDeleteBooking={onDeleteBooking} />
			</Flex>
			</div>
		</Flex>
		<div className="mt-2">
			<ItemInfo
				pickupDate={data.pickup.pickupDate}
				selectedHour={data.pickup.selectedHour}
				status={data.status || "Recieved"}
				statusColor={STATUS_COLORS["COLOR_" + data.status]}

			/>
		</div>

	</Card>
)


const ClientBookingList = ({ intl, results: list, deleteBooking, showMessage, success, message, hideBookingListMessage, loading, getBookings, totalResults }) => {

	const [query, setQuery] = useState({ sortBy: "Submitted", sortType: "Desc" });
	const [state, setState] = useState({
		submitConfirmVisible: false
	});


	useEffect(async () => {
		getBookings(query);
	}, [query]);

	const onDeleteBooking = (id) => {
		const booking = list.find(item => item.id == id);
		setState({ ...state, selectedBooking: booking, submitConfirmVisible: true });
	}
	const onSubmitConfirm = (value) => {
		if (value == "ok") {
			deleteBooking({ id: state.selectedBooking.id });
		}
		setState({ ...state, submitConfirmVisible: false });
	}
	useEffect(async () => {
		if (showMessage)
			setTimeout(() => {
				hideBookingListMessage();
			}, 4000);
	}, [showMessage])

	return (
		<>

			<div className="container-fluid">
				<Flex justifyContent="between" alignItems="center" className="py-4">
					<h2>{intl.formatMessage({ id: 'text.bookings' })}</h2>
					<div>
						<Link to={"./bookings-create"}>
							<Button type="primary" className="ml-2">
								<PlusOutlined />
								<span>{intl.formatMessage({ id: 'text.new' })}</span>
							</Button>
						</Link>
					</div>
				</Flex>
			</div>

			<div className={`my-4 container-fluid`}>
				{showMessage ?
					<motion.div
						initial={{ opacity: 0, marginBottom: 0 }}
						animate={{
							opacity: showMessage ? 1 : 0,
							marginBottom: showMessage ? 20 : 0
						}}>
						<Alert type={success == true ? "success" : "error"} showIcon message={message}></Alert>
					</motion.div>
					: ""}
				{
					<Row gutter={16}>
						{list ?
							list.map(elm => (
								<Col xs={24} sm={24} lg={8} xl={8} xxl={6} key={elm.id}>
									<GridItem data={elm} onDeleteBooking={onDeleteBooking} />
								</Col>
							)) : ""}
					</Row>
				}
			</div>
			<Modal
				title="Booking"
				visible={state.submitConfirmVisible}
				onOk={() => { onSubmitConfirm("ok") }}
				onCancel={() => { onSubmitConfirm("cancel") }}
				okText="Delete"
				cancelText="Cancel"			>
				<p>{intl.formatMessage({ id: 'text.delete' })}?</p>
			</Modal>
		</>
	)
}

const mapStateToProps = ({ bookingList }) => {
	const { loading, success, message, showMessage, results, totalResults } = bookingList;
	return {
		loading, success, message, showMessage, results, totalResults
	}
}

const mapActionsToProps = {
	deleteBooking, hideBookingListMessage, getBookings
}
export default connect(mapStateToProps, mapActionsToProps)(injectIntl(ClientBookingList));
