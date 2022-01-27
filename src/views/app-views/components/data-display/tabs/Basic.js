import React, { Component } from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export class Basic extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Bookings" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Profile" key="2">
          Content of Tab Pane 2
        </TabPane>

      </Tabs>
    );
  }
}

export default Basic;
