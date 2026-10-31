import { Typography, Card, message } from "antd"
import ApplicationForm from "../components/ApplicationForm"
import { useApplicationStore } from "../store/useApplicationStore"
import type { Application } from "../types/application"

function NewApplicationPage() {
  const addApplication = useApplicationStore((state) => state.addApplication)
  const [messageApi, contextHolder] = message.useMessage()
  
  function handleSubmit(app: Omit<Application, 'id'>) {
    addApplication(app)
    messageApi.success('Müraciət əlavə olundu')
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      {contextHolder}
      <Typography.Title level={3} style={{ margin: 0 }}>
        Yeni müraciət
      </Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>Göndərdiyin müraciəti qeyd et, sonra Paneldə izlə.</Typography.Text>
      <Card>
        <ApplicationForm onSubmit={handleSubmit} />
      </Card>
    </div>
  )
}

export default NewApplicationPage