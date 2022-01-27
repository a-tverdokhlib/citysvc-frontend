import React from 'react'
import { connect } from 'react-redux'
import Calendars from './Calendar';
export const MyCalendar = ({ }) => {
    return (
        <Calendars />
    )
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCalendar)
