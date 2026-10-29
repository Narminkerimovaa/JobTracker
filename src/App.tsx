import {Routes,Route} from 'react-router-dom'
import NewApplicationPage from './pages/NewApplicationPage'
import PanelPage from './pages/PanelPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<NewApplicationPage />} />
      <Route path="/panel" element={<PanelPage />} />
      <Route path="*" element={<NewApplicationPage />} />
    </Routes>
  )
}

export default App
