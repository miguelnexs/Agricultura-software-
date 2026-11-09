# 🌱 AgroConexión • Red Agro-Logística Rural Colombiana 🇨🇴

> **Plataforma Integral de Conexión Directa Campesino-Consumidor, Logística Colaborativa Rural ("El Uber del Campo") y Bolsa de Precios Agropecuarios.**

---

## 📖 Visión del Proyecto
En Colombia, la intermediación tradicional absorbe entre el 70% y el 80% del valor de los alimentos, mientras el campesino asume todos los riesgos climáticos y la merma poscosecha. 

**AgroConexión** elimina las capas especulativas y resuelve el cuello de botella del transporte veredal conectando directamente a:
1. **Campesinos Productores** (Veredas del Eje Cafetero y cordillera andina).
2. **Comercios, Restaurantes (B2B)** y **Familias / Grupos Comunitarios (B2C)**.
3. **Transportadores Locales** en Jeep Willys (Yipao), camionetas de estacas 4x4 y camiones.

---

## 🏛️ Los Pilares Estratégicos del Negocio

### 🤖 Pilar A: WhatsApp Bot + IA para el Productor Rural
- **Cero Curva de Aprendizaje:** En el campo no hay señal 4G estable para formularios complejos. El campesino envía una **nota de voz por WhatsApp**.
- **IA de Extracción de Entidades:** Transcribe el audio veredal, identifica producto, cantidad y vereda.
- **Venta Pre-Cosecha (a 3 - 7 días):** El campesino solo corta la cosecha cuando el pedido ya está pagado en custodia (Escrow), logrando **0% merma**.

### 🏢 Pilar B: Centralización de Demanda B2B
- **Restaurantes y Comercios:** Compran por bulto/canastilla con 15% a 25% de ahorro frente a mayoristas tradicionales.
- **Facturación Electrónica Unificada DIAN:** Un restaurante recibe **1 sola factura electrónica** consolidada con código CUFE y QR, aunque los productos provengan de 8 fincas diferentes.

### 🚙 Pilar C: AgroFlete Rural ("El Uber del Campo")
- **Consolidación Milk-Run:** Agrupación de carga de 3 a 4 fincas cercanas para pagar un flete compartido de solo **$35.000 COP** por comercio.
- **Fletes de Retorno (Backhauling):** Monetización de vehículos que regresan vacíos de la ciudad a la vereda con un **30% de descuento**.
- **Flota Veredal Adaptada:** Jeep Willys tradicionales, Toyota Hilux 4x4 y Motocarros de carga.

### 🛡️ Blindaje Antifraude Escrow en 4 Pasos
1. **Retención en Custodia:** El comprador paga por adelantado; el dinero queda congelado en escrow.
2. **Asignación de Conductor Veredal:** Un vehículo local acepta la ruta y sube a la finca.
3. **Inspección en Finca & Pago Inmediato:** Al verificar y cargar la cosecha, la plataforma desembolsa el dinero automáticamente a **Nequi o Daviplata** del campesino.
4. **Validación QR al Entregar:** El comprador escanea el código QR de entrega y se liquida el flete al transportador.

### 📈 Pizarra de Precios de Trading en Tiempo Real
- Cotizaciones oficiales basadas en **SIPSA / DANE / Corabastos**.
- Desglose transparente de la cadena de valor: **Precio en Finca vs. Central Mayorista vs. Supermercado**.
- Monitoreo en vivo de Papa Pastusa, Tomate Chonto, Aguacate Hass, Café Pergamino, Plátano Hartón, Cebolla Junca, etc.

---

## 📂 Arquitectura del Repositorio

El proyecto está estructurado como un monorepo que contiene tanto la versión de escritorio como la versión móvil:

```
Proyecto agricola/
├── agricola-frontend/      # 🖥️ Aplicación de Escritorio (Electron + Vite + React + Tailwind)
│   ├── src/main/          # Proceso Principal de Electron (Ventana maximizada, IPC)
│   ├── src/preload/       # Puente seguro IPC
│   └── src/renderer/      # Aplicación React 18:
│       ├── pages/         # MercadoCampesino, WhatsAppBot, PizarraPrecios, AgroFlete, UnitEconomics, etc.
│       ├── components/    # Sidebar colapsable, TitleBar nativo, UI components
│       └── layouts/       # MainLayout fluido y adaptado
│
├── Agricola-movil/        # 📱 Aplicación Móvil (React Native + Expo Router + Lucide)
│   ├── app/(tabs)/        # Pestañas móviles: Mercado, AgroFlete, Precios, Bot IA, Mi Finca
│   ├── app/details.tsx    # Pantalla de checkout con trazabilidad Escrow
│   ├── components/        # ZocaloBorder colombiano, botones y tarjetas nativas
│   └── constants/         # Paleta campirana: Amanecer en la Cordillera / Noche en el Cafetal
│
└── README.md              # Documentación del sistema
```

---

## 🚀 Puesta en Marcha

### Requisitos Previos
- **Node.js**: v18 o superior (v20+ recomendado)
- **npm** o **yarn**

---

### 1. Aplicación de Escritorio (`agricola-frontend`)
```bash
# Ingresar al directorio
cd agricola-frontend

# Instalar dependencias
npm install

# Iniciar en modo desarrollo (Electron + Hot Reload)
npm run dev

# Compilar instalador ejecutable
npm run build
```

---

### 2. Aplicación Móvil (`Agricola-movil`)
```bash
# Ingresar al directorio
cd Agricola-movil

# Instalar dependencias
npm install

# Iniciar servidor Expo (Web / Metro)
npx expo start --web

# Para probar en dispositivo físico:
# Escanea el código QR generado en la terminal con la app "Expo Go" (Android/iOS)
```

---

## 🎨 Identidad Visual y Cultural
Diseñado con los colores autóctonos del Paisaje Cultural Cafetero Colombiano:
- **Verde Cafetal / Esmeralda Andina:** `#15803d` / `#166534`
- **Terracota / Sol de los Venados:** `#b45309` / `#d97706`
- **Arena de Guadua y Bahareque:** `#faf7f2` / `#f5ede0`
- **Franja Zócalo Colombiano:** Guardapolvo artesanal en verde, mostaza, bermellón y azul montaña.

---

## 📄 Licencia
Este proyecto está desarrollado bajo la visión de dignificar el campo colombiano y asegurar precios justos para nuestros agricultores.
