import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ClientBookingCreate from "./clientCreate";
import { getCalendarDates } from "redux/actions/Calendar";

const BookingCreate = ({ getCalendarDates, dates, ...rest }) => {
    const [state, setState] = useState({
        dates: dates
    });
    const [link, setLink] = useState('');
    useEffect(() => {
        getCalendarDates();
    }, [state.dates]);

    useEffect(() => {
        const query = rest.location.search;
        const name = new URLSearchParams(query).get('name');
        const id = new URLSearchParams(query).get('id');
        if (name && id) {
            setLink(`https://www.dba.dk/${name}/id-${id}`);
        }
    }, [])

    return (<ClientBookingCreate link={link} />);

}

export default connect(null, { getCalendarDates })(BookingCreate);