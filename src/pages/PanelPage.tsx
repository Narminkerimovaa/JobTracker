import { Typography, Table, Tag, Popconfirm, Button } from "antd";
import { useApplicationStore } from "../store/useApplicationStore";
import type { Application, Status } from "../types/application";
import type { TableProps } from "antd";
import dayjs from "dayjs";
import { statusColors, statusLabels } from "../constants/status";


function PanelPage() {
  const applications = useApplicationStore((state) => state.applications)
  const removeApplication = useApplicationStore((state) => state.removeApplication)
  const columns: TableProps<Application>['columns'] = [{ title: 'Şirkət', dataIndex: 'company' }, { title: 'Vəzifə', dataIndex: 'position' }, { title: 'Tarix', dataIndex: 'date', render: (date: string) => dayjs(date).format('DD.MM.YYYY') }, { title: 'Status', dataIndex: 'status', render: (status: Status) => <Tag color={statusColors[status]}>{statusLabels[status]}</Tag> }, { title: 'Əməliyyat', key: 'actions', render: (_, record: Application) => (<Popconfirm title='Silmək istədiyinizə əminsiniz?' onConfirm={()=>removeApplication(record.id)} okText='Bəli' cancelText='Xeyr'><Button type="link" danger>Sil</Button></Popconfirm>) }]

  return (
    <div>
      <Typography.Title level={3}>Panel</Typography.Title>
      <Table<Application> dataSource={applications} columns={columns} rowKey="id" />
    </div>
  )
}

export default PanelPage