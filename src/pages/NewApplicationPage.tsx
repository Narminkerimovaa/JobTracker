import { Typography, Card } from "antd"
import ApplicationForm from "../components/ApplicationForm"
import { useApplicationStore } from "../store/useApplicationStore"

function NewApplicationPage() {
  const addApplication = useApplicationStore((state) => state.addApplication)

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Yeni müraciət
      </Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>Göndərdiyin müraciəti qeyd et, sonra Paneldə izlə.</Typography.Text>
      <Card>
        <ApplicationForm onSubmit={addApplication} />
      </Card>
    </div>
  )
}

export default NewApplicationPage