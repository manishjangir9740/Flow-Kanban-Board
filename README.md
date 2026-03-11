# Flow Kanban Board

A simplified, fully functional Kanban-style task management board designed to help users organize and track tasks efficiently. The application features an intuitive and aesthetically pleasing user interface, smooth drag-and-drop interactions for task management, and reliable local data persistence to ensure tasks remain saved across sessions.

## Features

- **Intuitive Column Layout**: Fixed default columns (To Do, In Progress, Done).
- **Smooth Drag-and-Drop**: Easily move tasks between columns with fluid animations, powered by `@dnd-kit`.
- **Dual Views**: Seamlessly switch between a traditional "Board" view and a meticulously designed "Table" view.
- **Task Priorities**: Categorize tasks by priority levels (`High`, `Medium`, `Low`) directly accessible while creating tasks, featuring fully styled badges.
- **Data Persistence**: All your board state is automatically saved to the browser's `localStorage` ensuring your tasks remain precisely where you left them, even after a page refresh.
- **Responsive & Dark Mode Supported**: Professionally optimized for various screens with a premium default dark mode providing maximum accessibility and a high-end feel.
- **Performance Optimized State Management**: Implemented using `Zustand` leveraging an `O(1)` object map mapping internally, ensuring operations remain instantly responsive.

## Tech Stack

- **Framework**: [React 18+](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Drag & Drop**: [@dnd-kit](https://docs.dndkit.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## How to Run the Project Locally

### 1. Prerequisites
Ensure you have Node.js installed on your machine. You can download it from [the official Node.js website](https://nodejs.org/).

### 2. Installation
Clone the repository, navigate into the project directory, and install the necessary dependencies:

```bash
# Clone the repository
git clone https://github.com/manishjangir9740/Flow-Kanban-Board.git

# Navigate to the project directory
cd Flow-Kanban-Board

# Install the dependencies
npm install
```

### 3. Start the Development Server
Once dependencies are successfully installed, boot up the local Vite development server:

```bash
npm run dev
```

The application will typically be accessible at `http://localhost:5173/` in your browser.

### 4. Build for Production
To create a minimized, production-ready build, run:

```bash
npm run build
```
This will compile the TypeScript, bundle the site, and place the output into a `/dist` directory.
