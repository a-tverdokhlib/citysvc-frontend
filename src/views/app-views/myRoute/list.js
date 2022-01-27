import React, { Component } from 'react'
import { Table, Tag, Tooltip, Button, Input, Modal, Alert, Row, Col, Select, Form } from 'antd';
import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import PageHeader from 'components/layout-components/PageHeader';
import DataService from 'services/RouteCreator';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { MyRouteFilterOptions, MyRouteSortOptions } from "constants/Options";
import { STATUS_COLORS } from 'constants/ThemeConstant';
import { injectIntl } from 'react-intl'

const { Search } = Input;
const { TextArea } = Input;
export class MyRouteList extends Component {
    form = React.createRef();
    state = {
        records: [],
        submitConfirmVisible: false,
        newRecordVisible: false,
        selectedRecord: null,
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

    deleteRecord = id => {
        const rec = this.state.records.find(item => item.id == id)
        this.setState({ submitConfirmVisible: true, selectedRecord: rec, error: false, message: "" });

    }


    async componentDidMount() {
        const data = await DataService.list(this.state.query);

        this.setState({
            records: data.results
        })
    }

    async onSubmitConfirm(type) {
        if (type == "ok") {
            this.setState({ submitConfirmVisible: false, loading: true });
            try {
                const result = await DataService.delete(this.state.selectedRecord.id);
                this.setState({
                    records: this.state.records.filter(item => item.id !== this.state.selectedRecord.id),
                });
                this.setState({ error: false, message: this.props.intl.formatMessage({ id: 'text.deleted' }), showMessage: true });
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
    async newRecordConfirm(type) {
        if (type == "ok") {
            try {

                const values = await this.form.current.validateFields();
                this.setState({ loading: true });
                await DataService.add(values);
                this.setState({ newRecordVisible: false });
                const data = await DataService.list(this.state.query);
                this.setState({
                    records: data.results, loading: false
                })
            } catch (err) {
                this.setState({ error: true, message: err.message, showMessage: true, loading: false });
            }
        }
        else
            this.setState({ newRecordVisible: false });
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
        const data = await DataService.list({ ...this.state.query, sortBy: value });
        this.setState({
            records: data.results,
            query: { sortBy: value }
        })
    }
    onChangeSearch = async (value) => {
        const data = await DataService.list({ ...this.state.query, keyword: value });
        this.setState({
            records: data.results,
            query: { keyword: value }
        })

    }
    onChangeFilter = async (value) => {
        const data = await DataService.list({ ...this.state.query, filterByStatus: value });
        this.setState({
            records: data.results,
            query: { filterByStatus: value }
        })

    }
    onChangeSortType = async (value) => {
        const data = await DataService.list({ ...this.state.query, sortType: value });
        this.setState({
            records: data.results,
            query: { sortType: value }
        })

    }
    createNew = () => {
        this.setState({ newRecordVisible: true });
    }
    MyRouteSortOptions = MyRouteSortOptions.map(item => {
        item.label = this.props.intl.formatMessage({ id: 'text.' + item.value })
        return item;
    })
    render() {


        const { loading, records, selectedRecord, newRecordVisible, pagination, submitConfirmVisible, error, message, showMessage } = this.state;
        const tableColumns = [
            {
                title: this.props.intl.formatMessage({ id: 'text.name' }),
                dataIndex: 'name',


            },
            {
                title: this.props.intl.formatMessage({ id: 'text.comments' }),
                dataIndex: 'comments',


            },

            {
                title: this.props.intl.formatMessage({ id: 'text.status' }),
                dataIndex: 'status',
                render: status => (
                    <Tag className="text-capitalize" color={status === 'Ready' ? 'cyan' : 'red'}>{status}</Tag>
                ),

            },
            {
                title: '',
                dataIndex: 'actions',
                render: (_, elm) => (
                    <div className="text-right d-flex justify-content-end">
                        <Tooltip title={this.props.intl.formatMessage({ id: 'text.view' })}>
                            <Link to={`./my-routes/${elm.id}`}>
                                <Button type="link" className="mr-2" icon={<EyeOutlined />} size="small" />
                            </Link>
                        </Tooltip>
                        <Tooltip title={this.props.intl.formatMessage({ id: 'text.delete' })}>
                            <Button type="link" danger icon={<DeleteOutlined />} onClick={() => { this.deleteRecord(elm.id) }} size="small" />
                        </Tooltip>
                    </div>
                )
            }
        ];

        return (
            <>
                <Row className='mb-3'>
                    <Col flex="auto"><PageHeader title={this.props.intl.formatMessage({ id: 'text.myRoutes' })} display={true} trans={false} /></Col>
                    <Col>
                        <Button type="primary" className="ml-2" onClick={() => { this.createNew() }}>
                            <PlusOutlined />
                            <span>{this.props.intl.formatMessage({ id: 'text.new' })}</span>
                        </Button>
                    </Col>
                </Row>

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
                                    <span>{this.props.intl.formatMessage({ id: 'text.filterBy' })}:</span>
                                </Col>
                                <Col>
                                    <Select className="ml-2"
                                        mode="multiple"
                                        showArrow
                                        size="small"
                                        tagRender={this.tagRender}
                                        onChange={this.onChangeFilter}
                                        placeholder={this.props.intl.formatMessage({ id: 'text.selectStatus' })}
                                        style={{ width: '100%', minWidth: '150px' }}
                                        options={MyRouteFilterOptions}
                                    />
                                </Col>
                                <Col>
                                    <span className="pl-4 pr-3">- {this.props.intl.formatMessage({ id: 'text.and' })} -</span>
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
                                    <span>{this.props.intl.formatMessage({ id: 'text.sortBy' })}:</span>
                                </Col>
                                <Col>
                                    <Select className="ml-2"
                                        size="small"
                                        showArrow
                                        onChange={this.onChangeSort}
                                        defaultValue={this.props.intl.formatMessage({ id: 'text.name' })}
                                        style={{ width: '100%', minWidth: '150px' }}
                                        options={MyRouteSortOptions}
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

                <Table columns={tableColumns} dataSource={records} rowKey='id'
                    pagination={pagination} size="small"

                />



                <Modal
                    title={this.props.intl.formatMessage({ id: 'text.record' })}
                    visible={submitConfirmVisible}
                    onOk={() => { this.onSubmitConfirm("ok") }}
                    onCancel={() => { this.onSubmitConfirm("cancel") }}
                    okText="Delete"
                    cancelText="Cancel"
                >
                    <p>{this.props.intl.formatMessage({ id: 'text.delete' })}?</p>
                </Modal>
                <Modal
                    title={this.props.intl.formatMessage({ id: 'text.newRecord' })}
                    visible={newRecordVisible}
                    onOk={() => { this.newRecordConfirm("ok") }}
                    onCancel={() => { this.newRecordConfirm("cancel") }}
                    okText="Submit"
                    cancelText="Cancel"
                    confirmLoading={this.state.loading}
                >
                    <Form ref={this.form} layout="vertical" name="register-form" >
                        <Form.Item
                            name="name"
                            label={this.props.intl.formatMessage({ id: 'text.name' })}
                            hasFeedback
                            rules={[{
                                required: true,
                                message: 'Please input name'
                            }, {
                                min: 5,
                                message: 'minimum characters is 5'
                            }, {
                                max: 200,
                                message: 'maximum characters is 200'
                            }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="comments"
                            label={this.props.intl.formatMessage({ id: 'text.comments' })}

                            hasFeedback
                        >
                            <TextArea ></TextArea>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}

export default injectIntl(MyRouteList)
