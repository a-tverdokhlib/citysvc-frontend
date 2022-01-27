import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Tag, Card, Col, Row, Input, Image, Button, Select } from 'antd';
import moment from 'moment';
import { injectIntl } from 'react-intl'

export const BookingDetails = ({ intl, booking }) => {
    const { pickup, shipping, images } = booking;
    return (
        <Row justify="start" align="top">
            <Col xs={24} md={14} className="p-2"> <PickupDetails intl={intl} details={pickup} images={images} /></Col>
            <Col xs={24} md={10} className="p-2"> <ShippingDetails intl={intl} details={shipping} /></Col>
        </Row>
    )
}
const PickupDetails = ({ intl, details, images }) => {
    const [visible, setVisible] = useState(false);
    return <Card className="p-1 " >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <h6>
                    {intl.formatMessage({ id: 'text.pickupInformtion' })}
                </h6>

                <article >

                    <div >
                        <h5>{details.name}</h5>
                        <h5>{intl.formatMessage({ id: 'text.item' })} : {details.title}</h5>
                        <h5>{intl.formatMessage({ id: 'text.phone' })}: {details.phone}</h5>
                        <h5>{intl.formatMessage({ id: 'text.price' })} : {details.price}</h5>
                        <h5>{intl.formatMessage({ id: 'text.pickupDate' })} : {details.pickupDate} {moment(details.selectedHour, ["HH"]).format("h:mm A")}</h5>
                        <p>
                            {details.location}
                        </p>
                    </div>
                </article>
            </div>
            <Image
                preview={{ visible: false }}
                width={200}
                src={images[0]}
                onClick={() => setVisible(true)}
            />
            <div style={{ display: 'none' }}>
                <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>

                    {
                        images.map((item, index) => {
                            return <Image width={150} src={item} key={index} />
                        })
                    }
                </Image.PreviewGroup>
            </div>
        </div>
    </Card>
}

const ShippingDetails = ({ intl, details }) => {
    return <Card className="p-1 " >
        <div >
            <h6>
                {intl.formatMessage({ id: 'text.shippingInformtion' })}
            </h6>
        </div>

        <article >
            <div >
                <h5>{details.name}</h5>
                <h5>{intl.formatMessage({ id: 'text.phone' })}: {details.phone}</h5>
                <p>
                    {details.location}
                </p>
            </div>
        </article>
    </Card>
}
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BookingDetails))
