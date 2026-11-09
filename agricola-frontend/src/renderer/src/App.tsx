import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import MainLayout from '@/layouts/MainLayout'
import { MercadoCampesinoPage, ProductoCampesino } from '@/pages/MercadoCampesinoPage'
import { WhatsAppBotPage } from '@/pages/WhatsAppBotPage'
import { PizarraPreciosPage } from '@/pages/PizarraPreciosPage'
import { AgroFletePage } from '@/pages/AgroFletePage'
import { PedidosRastreoPage } from '@/pages/PedidosRastreoPage'
import { UnitEconomicsPage } from '@/pages/UnitEconomicsPage'
import { ProveedoresAgroPage } from '@/pages/ProveedoresAgroPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { LotesPage } from '@/pages/LotesPage'
import { LiquidacionPage } from '@/pages/LiquidacionPage'
import { SettingsPage } from '@/pages/SettingsPage'
import './i18n/config'

function MercadoWrapper(): JSX.Element {
  const navigate = useNavigate()
  const handleIrAFlete = (producto: ProductoCampesino) => {
    navigate('/flete')
  }

  return <MercadoCampesinoPage onIrAFlete={handleIrAFlete} />
}

function App(): JSX.Element {
  return (
    <HashRouter>
      <ThemeProvider defaultTheme="light" storageKey="finca-colombiana-theme">
        <MainLayout>
          <Routes>
            {/* 1. Mercado Campesino: Persona a Campesino */}
            <Route path="/" element={<MercadoWrapper />} />

            {/* 1.1 WhatsApp Bot + IA para el Campesino (Pilar A del Plan) */}
            <Route path="/whatsapp-bot" element={<WhatsAppBotPage />} />

            {/* 1.2 Pizarra de Precios / Bolsa Agropecuaria Tipo Trading */}
            <Route path="/precios" element={<PizarraPreciosPage />} />

            {/* 2. AgroFlete: El Uber Campesino / Transporte Rural Colaborativo */}
            <Route path="/flete" element={<AgroFletePage />} />
            <Route path="/rastreo" element={<PedidosRastreoPage />} />

            {/* 2.1 Modelo de Negocio & Unit Economics (Plan de Negocio PDF) */}
            <Route path="/unit-economics" element={<UnitEconomicsPage />} />

            {/* 3. Proveedores a Campesinos: Insumos directos de fábrica */}
            <Route path="/proveedores" element={<ProveedoresAgroPage />} />

            {/* 4. Panel de Finca, Lotes y Cultivos */}
            <Route path="/mi-finca" element={<DashboardPage />} />
            <Route path="/lotes" element={<LotesPage />} />

            {/* 5. Liquidación & Pesajes */}
            <Route path="/pesaje" element={<LiquidacionPage />} />

            {/* 6. Configuración */}
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </MainLayout>
      </ThemeProvider>
    </HashRouter>
  )
}

export default App
