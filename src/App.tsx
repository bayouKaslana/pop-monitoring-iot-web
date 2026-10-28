import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import PopsProvider from './context/PopsProvider'
import Overview from './pages/Overview'
import Placeholder from './pages/Placeholder'
import PopDetail from './pages/PopDetail'

export default function App() {
  return (
    <PopsProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="pop/:id" element={<PopDetail />} />
            <Route path="realtime" element={<Placeholder title="Data Real-time" />} />
            <Route path="riwayat" element={<Placeholder title="Riwayat Data" />} />
            <Route path="notifikasi" element={<Placeholder title="Notifikasi" />} />
            <Route path="pengaturan" element={<Placeholder title="Pengaturan" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PopsProvider>
  )
}