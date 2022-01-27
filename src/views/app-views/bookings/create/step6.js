import {
    Button, Result
} from 'antd';
import { Link } from 'react-router-dom';

const Step6 = ({ intl, onRequestAgain }) => {
    return <Result
        status="success"
        title="Booking request successfully added!"
        extra={[
            <Button type="primary" key="requestAgain" onClick={onRequestAgain}>

                {intl.formatMessage({ id: 'text.requestNew' })}
            </Button>,
            <Link key="GoToMyBookings" to={"../app/bookings-list"}>
                <Button key="bookingList">Go To My Bookings</Button></Link>,
        ]}
    />
}

export default Step6;
