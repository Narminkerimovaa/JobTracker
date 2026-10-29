import { Routes, Route } from 'react-router-dom'
import NewApplicationPage from './pages/NewApplicationPage'
import PanelPage from './pages/PanelPage'
import Header from './components/Header'
import { useThemeStore } from './store/useThemeStore'
import { Layout, ConfigProvider, theme } from 'antd'

function App() {
  const { isDark } = useThemeStore()

  return (
    <ConfigProvider theme={{algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm}}>
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
    </ConfigProvider>


  )
}

export default App
