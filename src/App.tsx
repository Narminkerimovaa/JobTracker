import { Routes, Route } from 'react-router-dom'
import NewApplicationPage from './pages/NewApplicationPage'
import PanelPage from './pages/PanelPage'
import { Layout } from 'antd'
import Header from './components/Header'

function App() {

  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content style={{ padding: 24 }}>
        <Routes>
          <Route path="/" element={<NewApplicationPage />} />
          <Route path="/panel" element={<PanelPage />} />
          <Route path="*" element={<NewApplicationPage />} />
        </Routes>
      </Layout.Content>
    </Layout>

  )
}

export default App
