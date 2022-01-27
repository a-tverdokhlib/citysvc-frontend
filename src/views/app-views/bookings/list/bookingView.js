import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    Avatar, Drawer, Divider, Card, Tabs,
    Alert
} from 'antd'; import PageHeader from 'components/layout-components/PageHeader';
import { motion } from 'framer-motion';
import BookingService from 'services/BookingService';
import BookingPickup from './bookingPickup';
import BookingPickupDate from './bookingPickupDate';
import BookingShipping from './bookingShipping';
import { injectIntl } from 'react-intl';
const { TabPane } = Tabs;

export const BookingView = ({ intl, match }) => {
    const [bookingData, setBookingData] = useState({ pickup: {}, shipping: {} });
    const [state, setState] = useState({
        loading: false, message: "", showMessage: false, error: false
    });
    const bookingId = match.params.id;
    const hideMessage = () => {
        setTimeout(() => {
            setState({ ...state, showMessage: false, error: false, message: "" });
        }, 4000);
    }
    const showMessage = (message) => {
        setState({ ...state, showMessage: true, error: true, message: message });
    }
    useEffect(async () => {
        try {
            const data = await BookingService.getData(bookingId);
            setBookingData(data);
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
    const onUpdate = async (values, type) => {
        try {
            setState({
                ...state,
                loading: true,
            });
            if (type == "pickup") {
                const res = await BookingService.updatePickup(bookingId, values);
                setBookingData(res);
            }
            else if (type == "shipping") {
                const res = await BookingService.updateShipping(bookingId, values);
                setBookingData(res);
            }
            setState({
                ...state,
                error: false,
                message: "Success",
                loading: false,
                showMessage: true
            });


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
        <> <PageHeader title={bookingData.pickup.name} display={true} trans={false} />
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
                    <TabPane tab={intl.formatMessage({ id: 'text.pickupInformtion' })} key="1">
                        <BookingPickup bookingData={bookingData} loading={state.loading} onUpdate={onUpdate} />
                    </TabPane>
                    <TabPane tab={intl.formatMessage({ id: 'text.pickupDate' })} key="2">
                        <BookingPickupDate pickupData={bookingData.pickup} loading={state.loading} onUpdate={onUpdate} />
                    </TabPane>

                    <TabPane tab={intl.formatMessage({ id: 'text.shippingInformtion' })} key="3">
                        <BookingShipping bookingData={bookingData} loading={state.loading} onUpdate={onUpdate} />
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BookingView))
