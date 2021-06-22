import React from "react"
import { Tabs } from "antd"
import EditableGrid from "./EditableGrid"

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}
export default function TabGrid() {
  return (
    <div className="card-container">
      <Tabs onChange={callback} type="card">
        <TabPane tab="PPRO" key="1">
          {/* nested tabing */}
          <Tabs onChange={callback} type="card">
            <TabPane tab="Fumigation" key="1">
              <EditableGrid />
            </TabPane>
            <TabPane tab="Type Rate" key="2">
              Type Rate
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="Phyto" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="IP" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Other" key="4">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
}


