import {
    Form, Input,
    Image, Tabs, Col, Row,
} from 'antd';
import GoogleMapLocation from './googleMapLocation';

import { rulesPickup } from './rules';
const Step2 = ({ intl, details, form, layout, onMarkerDragEnd, images }) => {


    return <Row xs={24} >

        <Col xs={12}> <div className="p-4">
            <h4  >{intl.formatMessage({ id: 'text.details' })}</h4>
            <Form form={form} name="pickupDetails" {...layout} initialValues={details}>
                <Form.Item name="name" label={intl.formatMessage({ id: 'text.name' })} rules={rulesPickup.name}>
                    <Input placeholder={intl.formatMessage({ id: 'text.name' })} className=" m-0" />
                </Form.Item>
                <Row>
                    <Col sm={16}>
                        <Form.Item name="location" label={intl.formatMessage({ id: 'text.location' })} rules={rulesPickup.location} >
                            <Input placeholder="Address" />
                        </Form.Item>
                    </Col>
                    <Col sm={8}><Form.Item name="zip" className="pl-1" label={intl.formatMessage({ id: 'text.zip' })} rules={rulesPickup.zip} >
                        <Input placeholder={intl.formatMessage({ id: 'text.zip' })} />
                    </Form.Item></Col>
                </Row>


                <GoogleMapLocation longitude={details.longitude} latitude={details.latitude} onMarkerDragEnd={onMarkerDragEnd} />
                <Form.Item name="phone" label={intl.formatMessage({ id: 'text.phone' })} rules={rulesPickup.phone}>
                    <Input placeholder={intl.formatMessage({ id: 'text.phone' })} />
                </Form.Item>
                <Form.Item name="title" label={intl.formatMessage({ id: 'text.title' })} rules={rulesPickup.title}>
                    <Input placeholder={intl.formatMessage({ id: 'text.title' })} />
                </Form.Item>
                <Form.Item name="price" label={intl.formatMessage({ id: 'text.price' })}>
                    <Input placeholder={intl.formatMessage({ id: 'text.price' })} />
                </Form.Item>
            </Form>
        </div>
        </Col>
        <Col xs={12} >
            <div className="p-4">
                <h4 className="mb-4">{intl.formatMessage({ id: 'text.images' })}</h4>
                <Image.PreviewGroup>
                    {
                        images.map((item, index) => {
                            return <Image width={150} src={item} key={index} />
                        })
                    }
                </Image.PreviewGroup>
            </div>
        </Col>
    </Row>

}

export default Step2;
