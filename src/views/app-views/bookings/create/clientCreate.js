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
    showBookingMessage, saveNewBooking, hideBookingMessage, bookingError,
    getDBAListingData, getDBAListingDataSuccess, savePickUpDetails, saveDeliveryDetails, resetBookingData
} from 'redux/actions';
import { DEFAULT_LAT_LNG } from 'constants/ApiConstant';
import moment from 'moment';
import { injectIntl } from 'react-intl';
const { Step } = Steps;
const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

const Wizard = (props) => {
    const { showMessage, hideBookingMessage, message, getDBAListingData, loading, showBookingMessage, bookingError,
        success, details, images, savePickUpDetails, saveDeliveryDetails, saveNewBooking, resetBookingData, url, dates, intl } = props;
    let { deliveryDetails } = props;
    const [form1] = Form.useForm();
    form1.setFieldsValue({dbaLink: props.link});
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const [state, setState] = useState({
        dbaLink: "",
        current: 0,
        loading: false,
        submitConfirmVisible: false,
        submitted: false,
        pickupDate: moment().format('YYYY-MM-DD'),
        selectedHour: undefined,
        longitude: 0,
        latitude: 0
    });

    deliveryDetails = deliveryDetails === undefined ? DEFAULT_LAT_LNG : deliveryDetails;


    const onChangeSteps = (current) => {
        setState({ ...state, ...{ current } })
    }

    const onNext = async () => {
        if (state.current == 0) {
            let data = await form1.validateFields(["dbaLink"]);
            if (data) {
                setState({ ...state, ...{ dbaLink: data.dbaLink } });
                getDBAListingData(data.dbaLink);
            }
        }
        else if (state.current == 1) {
            let data = await form2.validateFields(['name', 'title', 'phone', 'location', 'price', "zip"]);
            if (data) {
                setState({ ...state, ...{ current: state.current + 1 } });
                savePickUpDetails({ ...details, ...data });

            }
        }
        else if (state.current == 2) {
            if (state.selectedHour && state.pickupDate != "") {
                setState({ ...state, ...{ current: state.current + 1 } });
                savePickUpDetails({ ...details, selectedHour: state.selectedHour, pickupDate: state.pickupDate })
            }
            else {
                bookingError('error');
            }
        }
        else if (state.current == 3) {
            let data = await form3.validateFields(['name', 'phone', 'location', "zip"]);
            if (data) {
                setState({ ...state, ...{ current: state.current + 1 } });
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
                setState({ ...state, ...{ current: state.current + 1 } })
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
        setState({
            dbaLink: "",
            current: 0,
            loading: false,
            submitConfirmVisible: false,
            submitted: false,
            pickupDate: moment().format('YYYY-MM-DD'),
            selectedHour: undefined,
            longitude: 0,
            latitude: 0
        });
        resetBookingData();
        form1.resetFields();
        form2.resetFields();
        form3.resetFields();

    }
    const onMarkerDragEnd = (location) => {
        savePickUpDetails({ ...details, latitude: location.lat(), longitude: location.lng() })
    }
    const onMarkerDragEnd2 = (location) => {
        saveDeliveryDetails({ ...deliveryDetails, latitude: location.lat(), longitude: location.lng() })
    }


    const steps = [
        {
            title: intl.formatMessage({ id: 'text.addListingUrl' }),
            icon: LinkOutlined,
            image: "/img/wizards/1.svg",
            formTitle: "1. " + intl.formatMessage({ id: 'text.inputListing' }),
            description: "Input listing url from dba.dk",
            form: (
                <Step1 intl={intl} success={success} message={message} layout={layout} showMessage={showMessage} form={form1} />)
        },
        {
            title: intl.formatMessage({ id: 'text.pickupInformtion' }),
            icon: LinkOutlined,
            image: "/img/wizards/2.svg",
            formTitle: "2. " + intl.formatMessage({ id: 'text.reviewPickupInfo' }),
            form:
                <>{
                    details ?
                        <Step2 intl={intl} details={details} images={images} layout={layout} form={form2} onMarkerDragEnd={onMarkerDragEnd} />
                        : ""
                }
                </>
        },
        {
            title: intl.formatMessage({ id: 'text.pickupInformtion' }),
            icon: LinkOutlined,
            image: "/img/wizards/2.svg",
            formTitle: "3. " + intl.formatMessage({ id: 'text.setPickupDate' }),
            form:
                <Step3 intl={intl} onHourSelect={onHourSelect} onDateSelect={onDateSelect} state={state} dates={dates} showMessage={showMessage} success={success} message={message} />
        },
        {
            title: intl.formatMessage({ id: 'text.shippingInformtion' }),
            icon: LinkOutlined,
            image: "/img/wizards/1-1.svg",
            formTitle: "4. " + intl.formatMessage({ id: 'text.shippingInformtion' }),
            form: (


                <Step4 intl={intl} form={form3} deliveryDetails={deliveryDetails} layout={layout} onMarkerDragEnd={onMarkerDragEnd2} showMessage={showMessage} success={success} message={message} />

            )
        },
        {
            title: "Review Booking",
            icon: LinkOutlined,
            image: "/img/wizards/3.svg",
            formTitle: "5. " + intl.formatMessage({ id: 'text.reviewOrder' }),
            form: (

                <Step5 intl={intl} showMessage={showMessage} message={message} success={success} details={details} deliveryDetails={deliveryDetails} onClickEdit={onClickEdit} />
            )
        },
        {
            title: intl.formatMessage({ id: 'text.bookingSuccess' }),
            icon: LinkOutlined,
            image: "/img/wizards/4.svg",
            form: <Step6 intl={intl} onRequestAgain={onRequestAgain} />
        }
    ];

    return (
        <>
            <h2 className="ml-4">{intl.formatMessage({ id: 'text.createBooking' })}</h2>
            <Row>
                <Col xs={24} >
                    <div className="m-4">
                        <div  >
                            <Steps onChange={onChangeSteps} current={state.current}>
                                <Step />
                                <Step disabled={!details} />
                                <Step disabled={!details} />
                                <Step disabled={!details} />
                                <Step disabled={!details} />
                                <Step disabled={!state.submitted} />
                            </Steps>
                        </div>

                    </div>

                </Col>
            </Row>
            <Row>
                <Col xs={24} >
                    <div className="pl-5 pr-5 w-100" >
                        <h3>{steps[state.current].formTitle}</h3>
                        {steps[state.current].form}
                    </div>
                    <div className="pl-4 pr-4" >
                        <Row justify="space-between">
                            <Col>
                                {
                                    state.current > 0 ?
                                        <Button type="light" loading={loading} onClick={onPrev}  >
                                            {intl.formatMessage({ id: 'text.prev' })}
                                        </Button> : ""
                                }

                            </Col>
                            <Col >{
                                state.current < 5 ?
                                    <Button type="primary" className="primary" loading={loading} onClick={onNext} >
                                        {intl.formatMessage({ id: 'text.next' })}
                                    </Button> : ""
                            }

                            </Col>
                        </Row>

                    </div>
                </Col>
            </Row>
            <Modal
                title={intl.formatMessage({ id: 'text.booking' })}
                visible={state.submitConfirmVisible}
                onOk={() => { onSubmitConfirm("ok") }}
                onCancel={() => { onSubmitConfirm("cancel") }}
                okText="Submit"
                cancelText="Cancel"
            >
                <p> {intl.formatMessage({ id: 'text.submit' })}?</p>
            </Modal>
        </>
    )
}

const mapStateToProps = ({ booking, calendar }) => {
    const { details, images, showMessage, message, loading, success, deliveryDetails, url } = booking;
    const { dates } = calendar;
    return {
        details, images, showMessage, message, loading, success, deliveryDetails, url, dates
    }
}
const mapDispatchToProps = {

    showBookingMessage, bookingError, hideBookingMessage, getDBAListingData, getDBAListingDataSuccess, savePickUpDetails, saveDeliveryDetails, saveNewBooking, resetBookingData

}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Wizard));