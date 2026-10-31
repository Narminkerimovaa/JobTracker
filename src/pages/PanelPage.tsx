import { Typography, Table } from "antd";
import { useApplicationStore } from "../store/useApplicationStore";
import type { Application } from "../types/application";
import type { TableProps } from "antd";

function PanelPage() {
  const applications =useApplicationStore((state) => state.applications)
  const columns:TableProps<Application>['columns']=[{title: 'Şirkət', dataIndex: 'company'},{title: 'Vəzifə', dataIndex: 'position'}]
  return (
    <div>
      <Typography.Title level={3}>Panel</Typography.Title>
      <Table<Application> dataSource={applications} columns={columns} rowKey="id"/>
    </div>
  )
}

export default PanelPage