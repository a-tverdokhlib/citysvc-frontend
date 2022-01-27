import React, { Component } from 'react'
import { Table, Tag, Tooltip, Button, Input, Modal, Alert, Row, Col, Select } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import IntlMessage from "components/util-components/IntlMessage";
import { injectIntl } from 'react-intl'
import UserService from 'services/UserService';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { UserFilterOptions, UserSortOptions } from "../../../../constants/Options";
import { STATUS_COLORS } from 'constants/ThemeConstant';

const { Search } = Input;


export class UserList extends Component {

    state = {
        users: [],
        userProfileVisible: false,
        submitConfirmVisible: false,
        selectedUser: null,
        loading: false,
        showMessage: false,
        message: "",
        pagination: {
            current: 1,
            pageSize: 10,
        },
        query: {
            sortBy: "name",
            sortType: "asc",

        }
    }

    deleteUser = userId => {
        const user = this.state.users.find(item => item.id == userId)
        this.setState({ submitConfirmVisible: true, selectedUser: user, error: false, message: "" });

    }

    showUserProfile = userInfo => {
        this.setState({
            userProfileVisible: true,
            selectedUser: userInfo
        });
    };

    closeUserProfile = () => {
        this.setState({
            userProfileVisible: false,
            selectedUser: null
        });
    }

    async componentDidMount() {
        const data = await UserService.list(this.state.query);
        this.setState({
            users: data.results
        })
    }

    async onSubmitConfirm(type) {
        if (type == "ok") {
            this.setState({ submitConfirmVisible: false, loading: true });
            try {
                const result = await UserService.delete(this.state.selectedUser.id);
                this.setState({
                    users: this.state.users.filter(item => item.id !== this.state.selectedUser.id),
                });
                this.setState({ error: false, message: "Deleted", showMessage: true });
            } catch (err) {
                this.setState({ error: true, message: err.message, showMessage: true });
            }
            this.setState({ loading: false });
            if (this.state.showMessage)
                setTimeout(() => {
                    this.setState({ showMessage: false });
                }, 4000);
        }
        else
            this.setState({ submitConfirmVisible: false });
    }
    tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                className={STATUS_COLORS["COLOR_" + value]}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginRight: 3 }}
            >
                {label}
            </Tag>
        );
    }
    onChangeSort = async (value) => {
        const data = await UserService.list({ ...this.state.query, sortBy: value });
        this.setState({
            users: data.results,
            query: { sortBy: value }
        })
    }
    onChangeSearch = async (value) => {
        const data = await UserService.list({ ...this.state.query, keyword: value });
        this.setState({
            users: data.results,
            query: { keyword: value }
        })

    }
    onChangeFilter = async (value) => {
        const data = await UserService.list({ ...this.state.query, filterByStatus: value });
        this.setState({
            users: data.results,
            query: { filterByStatus: value }
        })

    }
    onChangeSortType = async (value) => {
        const data = await UserService.list({ ...this.state.query, sortType: value });
        this.setState({
            users: data.results,
            query: { sortType: value }
        })

    }
    UserFilterOptions = UserFilterOptions.map(item => {
        item.label = this.props.intl.formatMessage({ id: 'text.' + item.value })
        return item;
    })
    UserSortOptions = UserSortOptions.map(item => {
        item.label = this.props.intl.formatMessage({ id: 'text.' + item.value })
        return item;
    })
    render() {
        const { loading, users, userProfileVisible, selectedUser, pagination, submitConfirmVisible, error, message, showMessage } = this.state;
        const tableColumns = [
            {
                title: this.props.intl.formatMessage({ id: 'text.user' }),
                dataIndex: 'name',


            },
            {
                title: this.props.intl.formatMessage({ id: 'text.email' }),
                dataIndex: 'email',


            },
            {
                title: this.props.intl.formatMessage({ id: 'text.role' }),
                dataIndex: 'role',

            },
            {
                title: this.props.intl.formatMessage({ id: 'text.lastLogin' }),
                dataIndex: 'lastLogin',
                render: date => (
                    <span>{moment(date).format("MM/DD/YYYY")} </span>
                ),

            },
            {
                title: this.props.intl.formatMessage({ id: 'text.status' }),
                dataIndex: 'status',
                render: status => (
                    <Tag className="text-capitalize" color={status === 'Active' ? 'cyan' : 'red'}>{status}</Tag>
                ),

            },
            {
                title: '',
                dataIndex: 'actions',
                render: (_, elm) => (
                    <div className="text-right d-flex justify-content-end">
                        <Tooltip title={this.props.intl.formatMessage({ id: 'text.view' })}>
                            <Link to={`./accounts/${elm.id}`}>
                                <Button type="link" className="mr-2" icon={<EyeOutlined />} size="small" />
                            </Link>
                        </Tooltip>
                        <Tooltip title={this.props.intl.formatMessage({ id: 'text.delete' })}>
                            <Button type="link" danger icon={<DeleteOutlined />} onClick={() => { this.deleteUser(elm.id) }} size="small" />
                        </Tooltip>
                    </div>
                )
            }
        ];

        return (
            <>
                {showMessage ?
                    <motion.div
                        initial={{ opacity: 0, marginBottom: 0 }}
                        animate={{
                            opacity: showMessage ? 1 : 0,
                            marginBottom: showMessage ? 20 : 0
                        }}>
                        <Alert type={error == false ? "success" : "error"} showIcon message={message}></Alert>
                    </motion.div>
                    : ""}
                <Row justify="space-between">
                    <Col>
                        <div className="p-2">
                            <Row align="middle ">
                                <Col>
                                    <span><IntlMessage id="text.filterBy" /></span>
                                </Col>
                                <Col>
                                    <Select className="ml-2"
                                        mode="multiple"
                                        showArrow
                                        size="small"
                                        tagRender={this.tagRender}
                                        onChange={this.onChangeFilter}
                                        placeholder={this.props.intl.formatMessage({ id: 'text.selectRoleOrStatus' })}
                                        style={{ width: '100%', minWidth: '150px' }}
                                        options={UserFilterOptions}
                                    />
                                </Col>
                                <Col>
                                    <span className="pl-4 pr-3">- <IntlMessage id="text.and" /> -</span>
                                </Col>
                                <Col>
                                    <Search size="small" loading={loading} onSearch={this.onChangeSearch} size="small" placeholder={this.props.intl.formatMessage({ id: 'text.inputName' })} style={{ width: "170px" }} />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col>
                        <div className="p-2">
                            <Row align="middle ">
                                <Col>
                                    <span><IntlMessage id="text.sortBy" /></span>
                                </Col>
                                <Col>
                                    <Select className="ml-2"
                                        size="small"
                                        showArrow
                                        onChange={this.onChangeSort}
                                        defaultValue="name"
                                        style={{ width: '100%', minWidth: '150px' }}
                                        options={UserSortOptions}
                                    />
                                </Col>
                                <Col>
                                    <Select className="ml-3"
                                        showArrow
                                        size="small"
                                        onChange={this.onChangeSortType}
                                        defaultValue="desc"
                                        style={{ width: '80px' }}
                                        options={[{ label: "Desc", value: "desc" }, { label: "Asc", value: "asc" }]}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Table columns={tableColumns} dataSource={users} rowKey='id'
                    pagination={pagination} size="small"

                />



                <Modal
                    title="User"
                    visible={submitConfirmVisible}
                    onOk={() => { this.onSubmitConfirm("ok") }}
                    onCancel={() => { this.onSubmitConfirm("cancel") }}
                    okText="Delete"
                    cancelText="Cancel"
                >
                    <p><IntlMessage id="text.delete" />?</p>
                </Modal>
            </>
        )
    }
}

export default injectIntl(UserList)
