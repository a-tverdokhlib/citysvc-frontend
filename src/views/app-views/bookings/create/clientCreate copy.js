import React, { useState, useEffect } from 'react';
import {
    Steps, Row, Col, Form,
    Button, Modal,
} from 'antd';
import { connect } from 'react-redux';
import { LinkOutlined } from '@ant-design/icons';
import Step6 from './step6';
import Step5 from './step5';
import Step4 from './step4';
import Step3 from './step3';
import Step2 from './step2';
import Step1 from './step1';
import {
    showBookingMessage, saveNewBooking, hideBookingMessage,
    getDBAListingData, getDBAListingDataSuccess, savePickUpDetails, saveDeliveryDetails
} from 'redux/actions';
import { DEFAULT_LAT_LNG } from 'constants/ApiConstant';
const { Step } = Steps;
const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

const Wizard = (props) => {
    const { showMessage, hideBookingMessage, message, getDBAListingData, loading,
        success, details, images, savePickUpDetails, saveDeliveryDetails, saveNewBooking, url } = props;
    let { deliveryDetails } = props;
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const [state, setState] = useState({
        dbaLink: "",
        current: 0,
        loading: false,
        submitConfirmVisible: false,
        submitted: false,
        pickupDate: "",
        selectedHour: -1,
        longitude: 0,
        latitude: 0
    });

    deliveryDetails = deliveryDetails === undefined ? DEFAULT_LAT_LNG : deliveryDetails;


    const onChangeSteps = (current) => {
        setState({ ...state, current })
    }

    const onNext = async () => {
        if (state.current == 0) {
            let data = await form1.validateFields(["dbaLink"]);
            if (data) {
                setState({ ...state, dbaLink: data.dbaLink });
                getDBAListingData(data.dbaLink);
            }
        }
        else if (state.current == 1) {
            let data = await form2.validateFields(['name', 'title', 'phone', 'location', 'price', "zip"]);
            if (data) {
                setState({ ...state, current: state.current + 1 });
                savePickUpDetails({ ...details, ...data });

            }
        }
        else if (state.current == 2) {
            if (state.selectedHour > 0 && state.pickupDate != "") {
                setState({ ...state, current: state.current + 1 });
                savePickUpDetails({ ...details, selectedHour: state.selectedHour, pickupDate: state.pickupDate })
            }
        }
        else if (state.current == 3) {
            let data = await form3.validateFields(['name', 'phone', 'location', "zip"]);
            if (data) {
                setState({ ...state, current: state.current + 1 });
                saveDeliveryDetails({ ...deliveryDetails, ...data });

            }
        }
        else if (state.current == 4) {
            setState({ ...state, submitConfirmVisible: true });
        }
        else {
            setState({ ...state, current: state.current + 1 });
        }
    }
    const onPrev = () => {
        setState({ ...state, current: state.current - 1 })
    }

    const onClickEdit = (type) => {
        if (type == "shipping")
            setState({ ...state, current: 2 })
        else if (type == "pickup")
            setState({ ...state, current: 1 })

    }

    const onSubmitConfirm = (type) => {
        if (type == "ok") {
            saveNewBooking({
                details,
                deliveryDetails,
                images,
                url
            })
            setState({ ...state, submitted: true, submitConfirmVisible: false });
        }
        else
            setState({ ...state, submitted: false, submitConfirmVisible: false });
    }

    useEffect(() => {
        if (showMessage)
            setTimeout(() => {
                hideBookingMessage();
            }, 2000);
    }, [showMessage]);

    useEffect(() => {
        if (success && (state.current == 0 || state.current == 4)) {
            setTimeout(() => {
                hideBookingMessage();
                setState({ current: state.current + 1 })
            }, 1000);

        }

    }, [success]);
    const onDateSelect = (value) => {
        setState({ ...state, pickupDate: value.format('YYYY-MM-DD') })
    }

    const onHourSelect = (hour) => {
        setState({ ...state, selectedHour: hour });
    }

    const onRequestAgain = () => {
        setState({ ...state, current: 0 });
    }
    const onMarkerDragEnd = (location) => {
        savePickUpDetails({ ...details, latitude: location.lat(), longitude: location.lng() })
    }
    const onMarkerDragEnd2 = (location) => {
        saveDeliveryDetails({ ...deliveryDetails, latitude: location.lat(), longitude: location.lng() })
    }


    const steps = [
        {
            title: "Add Listing Url",
            icon: LinkOutlined,
            image: "/img/wizards/1.svg",
            formTitle: "1. Please input listing url from DBA",
            description: "Input listing url from dba.dk",
            form: (
                <Step1 success={success} message={message} layout={layout} showMessage={showMessage} form={form1} />)
        },
        {
            title: "Pickup information",
            icon: LinkOutlined,
            image: "/img/wizards/2.svg",
            formTitle: "2. Review pickup information",
            form:
                <>{
                    details ?
                        <Step2 details={details} images={images} layout={layout} form={form2} onMarkerDragEnd={onMarkerDragEnd} />
                        : ""
                }
                </>
        },
        {
            title: "Pickup information",
            icon: LinkOutlined,
            image: "/img/wizards/2.svg",
            formTitle: "3. Set Pickup Date",
            form:
                <Step3 onHourSelect={onHourSelect} onDateSelect={onDateSelect} state={state} />
        },
        {
            title: "Shipping Information",
            icon: LinkOutlined,
            image: "/img/wizards/1-1.svg",
            formTitle: "4. Shipping Information",
            form: (


                <Step4 form={form3} deliveryDetails={deliveryDetails} layout={layout} onMarkerDragEnd={onMarkerDragEnd2} showMessage={showMessage} success={success} message={message} />

            )
        },
        {
            title: "Review Booking",
            icon: LinkOutlined,
            image: "/img/wizards/3.svg",
            formTitle: "5. Review and confirm Order",
            form: (

                <Step5 showMessage={showMessage} message={message} success={success} details={details} deliveryDetails={deliveryDetails} onClickEdit={onClickEdit} />
            )
        },
        {
            title: "Booking Succesfull",
            icon: LinkOutlined,
            image: "/img/wizards/4.svg",
            form: <Step6 onRequestAgain={onRequestAgain} />
        }
    ];

    return (
        <>
            <Row>
                <Col xs={24} md={10}>
                    <div className="mr-5">
                        <div className=" m-2 mt-5" >
                            <Steps onChange={onChangeSteps} current={state.current}>
                                <Step />
                                <Step disabled={!details} />
                                <Step disabled={!details} />
                                <Step disabled={!details} />
                                <Step disabled={!details} />
                                <Step disabled={!state.submitted} />
                            </Steps>
                        </div>
                        <div className=" m-4 mt-5" >
                            <h2>{steps[state.current].title}</h2>
                            <div className=" pl-md-4 pr-md-4 pr-sm-2 pl-sm-2">
                                <img className="w-100 p-lg-5 p-md-2 p-sm-4 " src={steps[state.current].image} alt="" />
                            </div>

                        </div>
                    </div>

                </Col>

                <Col xs={24} md={14} style={{ borderLeft: "1px solid #eee" }}>

                    <div className=" m-4 m-sm-2 mt-lg-5 pl-lg-5 pl-sm-2" >
                        <h3>{steps[state.current].formTitle}</h3>
                        {steps[state.current].form}
                    </div>
                    <div className="m-4 m-sm-2   pl-lg-5 pl-sm-2" >
                        <Row justify="space-between">
                            <Col>
                                {
                                    state.current > 0 ?
                                        <Button type="light" loading={loading} onClick={onPrev}  >
                                            Prev
                                        </Button> : ""
                                }

                            </Col>
                            <Col >{
                                state.current < 5 ?
                                    <Button type="primary" className="primary" loading={loading} onClick={onNext} >
                                        Next
                                    </Button> : ""
                            }

                            </Col>
                        </Row>

                    </div>
                </Col>
            </Row>
            <Modal
                title="Booking"
                visible={state.submitConfirmVisible}
                onOk={() => { onSubmitConfirm("ok") }}
                onCancel={() => { onSubmitConfirm("cancel") }}
                okText="Submit"
                cancelText="Cancel"
            >
                <p>Submit new booking?</p>
            </Modal>
        </>
    )
}

const mapStateToProps = ({ booking }) => {
    const { details, images, showMessage, message, loading, success, deliveryDetails, url } = booking;
    return {
        details, images, showMessage, message, loading, success, deliveryDetails, url
    }
}
const mapDispatchToProps = {

    showBookingMessage, hideBookingMessage, getDBAListingData, getDBAListingDataSuccess, savePickUpDetails, saveDeliveryDetails, saveNewBooking

}
export default connect(mapStateToProps, mapDispatchToProps)(Wizard);