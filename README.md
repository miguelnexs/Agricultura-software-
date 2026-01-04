# Assent Dashboard

A modern, cross-platform desktop application built with Electron, React, TypeScript, and Tailwind CSS.

## Features

- **Modern UI/UX**: Built with React and Tailwind CSS, utilizing shadcn/ui components.
- **Cross-Platform**: Runs on Windows, macOS, and Linux.
- **Frameless Design**: Custom title bar and window controls for a seamless look.
- **Theme Support**: Built-in dark/light mode toggle.
- **Performance**: Optimized build process using Vite.

## Tech Stack

- **Electron**: Desktop runtime
- **React**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **electron-builder**: Installer generation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/miguelnexs/Assent.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

### Build

To build the application for production:

```bash
npm run build
```

The executable will be located in the `dist` folder.

## Project Structure

- `src/main`: Electron main process
- `src/preload`: Electron preload scripts
- `src/renderer`: React frontend application
  - `components`: Reusable UI components
  - `assets`: Images and static resources
  - `utils`: Helper functions

## License

Copyright © 2024 Assent Dashboard. All rights reserved.
