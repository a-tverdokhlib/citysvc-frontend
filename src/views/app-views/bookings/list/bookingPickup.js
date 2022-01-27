import React, { useState } from 'react'
import {
    Form, Input,
    Image, Tabs, Col, Row, Button
} from 'antd';
import GoogleMapLocation from '../create/googleMapLocation';
import { rulesPickup } from '../create/rules';
import { injectIntl } from 'react-intl'

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
const BookingPickup = ({ intl, loading, bookingData, onUpdate }) => {
    const [details, setDetails] = useState({});

    const formFields = [];
    Object.keys(bookingData.pickup).forEach(item => {
        formFields.push({
            name: [item],
            value: bookingData.pickup[item]
        })
    });

    const onFormFinish = (values) => {
        onUpdate({ ...details, ...values }, 'pickup');

    }
    const onMarkerDragEnd = (location) => {
        setDetails({ latitude: location.lat(), longitude: location.lng() });
    }


    return (
        <> <Row justify="space-around">

            <Col sm={24} xs={24} md={12} lg={8}>
                <Form layout="horizontal" onFinish={onFormFinish} name="pickupDetails" fields={formFields}>
                    <Form.Item name="name" label={intl.formatMessage({ id: 'text.name' })} rules={rulesPickup.name}>
                        <Input placeholder={intl.formatMessage({ id: 'text.name' })} className=" m-0" />
                    </Form.Item>
                    <Row>
                        <Col sm={16}>
                            <Form.Item name="location" label={intl.formatMessage({ id: 'text.location' })} rules={rulesPickup.location} >
                                <Input placeholder={intl.formatMessage({ id: 'text.address' })} />
                            </Form.Item>
                        </Col>
                        <Col sm={8}><Form.Item name="zip" className="pl-1" label={intl.formatMessage({ id: 'text.zip' })} rules={rulesPickup.zip} >
                            <Input placeholder={intl.formatMessage({ id: 'text.zip' })} />
                        </Form.Item></Col>
                    </Row>


                    {
                        bookingData.pickup ?
                            <GoogleMapLocation longitude={bookingData.pickup.longitude} latitude={bookingData.pickup.latitude} onMarkerDragEnd={onMarkerDragEnd} />
                            : ""
                    }
                    <Form.Item name="phone" label={intl.formatMessage({ id: 'text.phone' })} rules={rulesPickup.phone}>
                        <Input placeholder={intl.formatMessage({ id: 'text.phone' })} />
                    </Form.Item>
                    <Form.Item name="title" label={intl.formatMessage({ id: 'text.title' })} rules={rulesPickup.title}>
                        <Input placeholder={intl.formatMessage({ id: 'text.title' })} />
                    </Form.Item>
                    <Form.Item name="price" label={intl.formatMessage({ id: 'text.price' })}>
                        <Input placeholder={intl.formatMessage({ id: 'text.price' })} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            {intl.formatMessage({ id: 'text.update' })}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        </>
    )
}

export default injectIntl(BookingPickup);