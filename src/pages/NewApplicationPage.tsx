import { Typography  } from "antd"
import Container from "../components/ApplicationForm"

function NewApplicationPage() {
  return (
      <div style={{maxWidth:680, margin: '0 auto'}}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Yeni müraciət
        </Typography.Title>
        <Typography.Text type="secondary" style={{display: 'block', marginBottom: 24}}>Göndərdiyin müraciəti qeyd et, sonra Paneldə izlə.</Typography.Text>
        <Container/>
      </div>
  )
}

export default NewApplicationPage