import { Typography, Table, Select, Popconfirm, Button, Tag, Space, Modal, Descriptions, Row, Col, Statistic, Card, Input } from "antd";
import { useApplicationStore } from "../store/useApplicationStore";
import type { Application, Status } from "../types/application";
import type { TableProps } from "antd";
import dayjs from "dayjs";
import { statusColors, statusOptions, statusLabels } from "../constants/status";
import { useState } from "react";
import ApplicationForm from "../components/ApplicationForm";


function PanelPage() {
  const applications = useApplicationStore((state) => state.applications)
  const removeApplication = useApplicationStore((state) => state.removeApplication)
  const updateStatus = useApplicationStore((state) => state.updateStatus)
  const updateApplication = useApplicationStore((state) => state.updateApplication)
  const tableStatusOptions = statusOptions.map((option) => ({ value: option.value, label: <Tag style={{ margin: 0 }} color={statusColors[option.value]}>{option.label}</Tag> }))
  const columns: TableProps<Application>['columns'] = [{ title: 'Şirkət', dataIndex: 'company' },
  { title: 'Vəzifə', dataIndex: 'position' },
  { title: 'Tarix', dataIndex: 'date', render: (date: string) => dayjs(date).format('DD.MM.YYYY') },
  { title: 'Status', dataIndex: 'status', render: (status: Status, record: Application) => <Select style={{ width: 140 }} variant="borderless" options={tableStatusOptions} value={status} onChange={(newStatus: Status) => updateStatus(record.id, newStatus)}></Select> },
  { title: 'Əməliyyat', key: 'actions', render: (_, record: Application) => (<Space> <Button type="link" onClick={() => setViewing(record)}>Bax</Button><Button type="link" onClick={() => setEditing(record)}>Redaktə</Button><Popconfirm title='Silmək istədiyinizə əminsiniz?' onConfirm={() => removeApplication(record.id)} okText='Bəli' cancelText='Xeyr'><Button type="link" danger>Sil</Button></Popconfirm></Space>) }]
  const [viewing, setViewing] = useState<Application | null>(null)
  const [editing, setEditing] = useState<Application | null>(null)
  const modalItems = viewing ? [
    { key: 'company', label: 'Şirkət', children: viewing.company },
    { key: 'position', label: 'Vəzifə', children: viewing.position },
    { key: 'date', label: 'Tarix', children: dayjs(viewing.date).format('DD.MM.YYYY') },
    { key: 'status', label: 'Status', children: <Tag color={statusColors[viewing.status]}>{statusLabels[viewing.status]}</Tag> },
    { key: 'note', label: 'Qeyd', children: viewing.note || '-' },
    { key: 'link', label: 'Link', children: viewing.link ? <Typography.Link href={viewing?.link} target="_blank">{viewing.link}</Typography.Link> : '-' },
  ] : []
  function handleEdit(app:Omit<Application, 'id'>){
    if(editing===null) return
    updateApplication(editing.id, app) 
     setEditing(null)
  }
  const sortOptions=[
    {value:'newest', label:"Yeni → Köhnə"},
    {value:'oldest',label:"Köhnə → Yeni"}
  ]

  return (
    <>
      <Row gutter={[16,16]} style={{ marginBottom: 16 }}>
        <Col flex="1 1 160px"><Card><Statistic title="Cəmi" value={applications.length}/></Card></Col>
        {statusOptions.map((option)=>(<Col flex="1 1 160px" key={option.value}><Card><Statistic title={option.label} value={applications.filter((item) => item.status === option.value).length}/></Card></Col>))}
      </Row>
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          <Col md={12} xs={24}><Input placeholder="Şirkət və ya vəzifə üzrə axtar" allowClear/></Col>
          <Col md={6} xs={24}><Select style={{ width: '100%' }} defaultValue={'all'} options={[{ value: 'all', label: 'Bütün statuslar' }, ...statusOptions]}></Select></Col>
          <Col md={6} xs={24}><Select style={{ width: '100%' }} defaultValue={'newest'} options={sortOptions}></Select></Col>
        </Row>
      </Card>
      <Table<Application> dataSource={applications} columns={columns} rowKey="id" />
      <Modal open={viewing !== null} onCancel={() => setViewing(null)} title='Müraciətin təfərrüatı' footer={null}><Descriptions column={1} bordered items={modalItems} /></Modal>
      <Modal open={editing !== null} onCancel={() => setEditing(null)} title='Müraciəti redaktə et' footer={null}>{editing===null ? null : <ApplicationForm onSubmit={handleEdit} initialData={editing} submitText="Yadda saxla" onCancel={() => setEditing(null)}/>}</Modal>
    </>
  )
}

export default PanelPage