import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Tooltip, Menu, Tag } from 'antd';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { statusOptions, sortOptions } from "../../../../constants/Options";
import { STATUS_COLORS } from 'constants/ThemeConstant';
import { connect } from "react-redux";
import { getBookings } from "redux/actions/Booking";
import { Link } from "react-router-dom";
import {
  NewMembersData,
  RecentTransactionData
} from './DefaultDashboardData';
import {
  EyeOutlined,
  EllipsisOutlined,
  ReloadOutlined, RightOutlined
} from '@ant-design/icons';
import utils from 'utils';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from "services/UserService";
import { injectIntl } from 'react-intl';


export const DefaultDashboard = ({ intl, results, success, getBookings }) => {
  const bookingTableColumns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',

    },
    {
      title: 'Phone',
      dataIndex: 'phone',

    },
    {
      title: 'Item',
      dataIndex: 'title',

    },
    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Pickup Date',
      dataIndex: 'pickupDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => {
        return <Tag
          className={"w-100 " + STATUS_COLORS["COLOR_" + text]}

        >
          {intl.formatMessage({ id: 'text.' + text })}
        </Tag>
      }
    }
  ]
  const [newMembersData, setMembersData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  if (results.length > 0)
    results = results.map(item => {
      item = { ...item, ...item.pickup };
      return item;
    });
  useEffect(async () => {
    getBookings({});
    const users = await UserService.latest();
    setMembersData(users.results);
  }, [loaded]);
  bookingTableColumns.map(item => {
    item.title = intl.formatMessage({ id: 'text.' + item.dataIndex })
    return item;
  });
  return (
    <>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={7}>
          <Card title={intl.formatMessage({ id: 'text.latestRegistered' })} >
            <div className="mt-3">
              {
                newMembersData.map((elm, i) => (
                  <div key={i} className={`d-flex align-items-center justify-content-between mb-4`}>
                    <AvatarStatus id={i} src="/img/avatars/avatar.png" name={elm.name} subTitle={elm.email} />
                    <div>
                      <Tooltip placement="left" title={"View user profile"}><Link to={"/app/accounts/" + elm.id}>
                        <Button size="small" shape="circle" icon={<RightOutlined />} ></Button>
                      </Link>
                      </Tooltip>
                    </div>
                  </div>
                ))
              }
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17}>
          <Card title={intl.formatMessage({ id: 'text.latestBookings' })} >
            <Table
              className="no-border-last"
              columns={bookingTableColumns}
              dataSource={results}
              rowKey='id'
              pagination={false}
              size={"small"}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
const mapStateToProps = ({ bookingList }) => {
  const { results, loading, success } = bookingList;
  return {
    results, loading, success
  }
}

const mapActionsToProps = {
  getBookings
}
export default connect(mapStateToProps, mapActionsToProps)(injectIntl(DefaultDashboard));