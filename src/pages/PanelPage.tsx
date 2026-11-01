import { Typography, Table, Select, Popconfirm, Button, Tag, Space, Modal, Descriptions } from "antd";
import { useApplicationStore } from "../store/useApplicationStore";
import type { Application, Status } from "../types/application";
import type { TableProps } from "antd";
import dayjs from "dayjs";
import { statusColors, statusOptions, statusLabels } from "../constants/status";
import { useState } from "react";


function PanelPage() {
  const applications = useApplicationStore((state) => state.applications)
  const removeApplication = useApplicationStore((state) => state.removeApplication)
  const updateStatus = useApplicationStore((state) => state.updateStatus)
  const tableStatusOptions = statusOptions.map((option) => ({ value: option.value, label: <Tag style={{ margin: 0 }} color={statusColors[option.value]}>{option.label}</Tag> }))
  const columns: TableProps<Application>['columns'] = [{ title: 'Şirkət', dataIndex: 'company' },
  { title: 'Vəzifə', dataIndex: 'position' },
  { title: 'Tarix', dataIndex: 'date', render: (date: string) => dayjs(date).format('DD.MM.YYYY') },
  { title: 'Status', dataIndex: 'status', render: (status: Status, record: Application) => <Select style={{ width: 140 }} variant="borderless" options={tableStatusOptions} value={status} onChange={(newStatus: Status) => updateStatus(record.id, newStatus)}></Select> },
  { title: 'Əməliyyat', key: 'actions', render: (_, record: Application) => (<Space> <Button type="link" onClick={() => setViewing(record)}>Bax</Button><Popconfirm title='Silmək istədiyinizə əminsiniz?' onConfirm={() => removeApplication(record.id)} okText='Bəli' cancelText='Xeyr'><Button type="link" danger>Sil</Button></Popconfirm></Space>) }]
  const [viewing, setViewing] = useState<Application | null>(null)
  const modalItems= viewing ?[
    {key:'company', label:'Şirkət', children:viewing.company},
    {key:'position', label:'Vəzifə', children:viewing.position},
    {key:'date', label:'Tarix', children:dayjs(viewing.date).format('DD.MM.YYYY')},
    {key:'status', label:'Status', children:<Tag color={statusColors[viewing.status]}>{statusLabels[viewing.status]}</Tag>},
    {key:'note', label:'Qeyd', children:viewing.note || '-'},
    {key:'link', label:'Link', children: viewing.link ? <Typography.Link href={viewing?.link} target="_blank">{viewing.link}</Typography.Link> : '-'},
  ] : []

  return (
    <div>
      <Typography.Title level={3}>Panel</Typography.Title>
      <Table<Application> dataSource={applications} columns={columns} rowKey="id" />
      <Modal open={viewing !== null} onCancel={() => setViewing(null)} title='Müraciətin təfərrüatı' footer={null}><Descriptions column={1}  bordered items={modalItems} /></Modal>
    </div>
  )
}

export default PanelPage