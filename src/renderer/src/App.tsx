import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import MainLayout from '@/layouts/MainLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { AnalyticsPage } from '@/pages/AnalyticsPage'
import { CustomersPage } from '@/pages/CustomersPage'
import { SettingsPage } from '@/pages/SettingsPage'
import './i18n/config' // Import i18n configuration

function App(): JSX.Element {
  return (
    <HashRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <MainLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<div className="p-4">About Page</div>} />
          </Routes>
        </MainLayout>
      </ThemeProvider>
    </HashRouter>
  )
}

export default App
