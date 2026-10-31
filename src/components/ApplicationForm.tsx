import { Form, Col, Row, Input, Flex, Button, Select, theme, DatePicker } from "antd"
import { statusOptions } from "../constants/status";
const { TextArea } = Input;
import type { Dayjs } from "dayjs";
import type { Application, Status } from "../types/application";
import dayjs from "dayjs";

interface FormValues {
    company: string,
    position: string,
    date: Dayjs,
    status: Status,
    link?: string,
    note?: string
}

interface Props{
    onSubmit: (app: Omit<Application, 'id'>)=>void, 
}

function ApplicationForm({ onSubmit }: Props) {
    const { token } = theme.useToken()

    function handleFinish(values:FormValues){
        onSubmit({ ...values, date: values.date.format('YYYY-MM-DD')})
    }
    return (
        <Form<FormValues> onFinish={handleFinish} initialValues={{ status: 'sent', date: dayjs() }} requiredMark={(label, { required }) => (
            <>
                {label}
                {required && <span style={{ color: token.colorError, marginLeft: 5 }}>*</span>}
            </>
        )} layout="vertical">
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item label="Şirkət adı" name="company" rules={[{ required: true, message: 'Şirkət adını yaz' }]}>
                        <Input placeholder="məs. Kapital Bank" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item label="Vəzifə" name="position" rules={[{ required: true, message: 'Vəzifəni yaz' }]}>
                        <Input placeholder="məs. Frontend Developer" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item label="Müraciət tarixi" name="date">
                        <DatePicker allowClear={false} format={"DD.MM.YYYY"} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item label="Status" name="status">
                        <Select
                            style={{ width: '100%' }}
                            options={statusOptions}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="Link" name="link">
                <Input placeholder="https://" />
            </Form.Item>
            <Form.Item label="Qeyd" name='note'>
                <TextArea placeholder="Əlaqə şəxsi, maaş gözləntisi vəs." rows={4} />
            </Form.Item>
            <Flex gap="small" align="center" justify="flex-end">
                <Button type="default">
                    Təmizlə
                </Button>
                <Button type="primary" htmlType="submit">
                    Əlavə et
                </Button>
            </Flex>
        </Form>
    )
}

export default ApplicationForm


