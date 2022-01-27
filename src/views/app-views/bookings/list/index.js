import { Component } from "react";
import ClientBookingList from "./clientList";
import AdminBookingList from "./adminList";
import { useSelector } from "react-redux";
import { Empty, Spin } from "antd";
export const BookingList = () => {
    const userData = useSelector(state => state.user.userData);
    let index = "empty";
    if (userData && userData.role == "client")
        return (<ClientBookingList />)

    else if (userData && userData.role == "admin")
        return (<AdminBookingList />)
    else return (<Spin></Spin>)
}

export default BookingList;