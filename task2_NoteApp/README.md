# Note App

A modern, responsive note-taking application built with React, TypeScript, and Vite. Create, edit, archive, and search your notes with an intuitive interface that works seamlessly on both desktop and mobile devices.

## Features

- ✏️ **Create & Edit Notes** - Write and modify your notes with a clean, distraction-free editor
- 🏷️ **Tag System** - Organize your notes with custom tags
- 📦 **Archive Notes** - Keep your workspace clean by archiving notes you don't need right now
- 🔍 **Search Functionality** - Quickly find notes by title, content, or tags
- 📱 **Responsive Design** - Optimized layouts for both desktop and mobile devices
- 🎨 **Modern UI** - Built with Tailwind CSS for a beautiful, modern interface
- ⚙️ **Settings** - Customize your experience with app settings
- 🔔 **Notifications** - Get feedback on your actions with toast notifications

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task2_NoteApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── buttons/      # Button components
│   ├── modals/       # Modal dialogs
│   ├── notes/        # Note-related components
│   ├── tags/         # Tag components
│   └── ui/           # General UI components
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── layout/           # Layout components
├── pages/            # Page components
├── router/           # Routing configuration
├── services/         # Business logic and API services
├── types/            # TypeScript type definitions
└── lib/              # Utility functions
```

## Features in Detail

### Note Management
- Create new notes with title, content, and tags
- Edit existing notes
- Delete notes with confirmation
- Archive/unarchive notes

### Search & Filter
- Search notes by title, content, or tags
- Filter notes by archive status
- Real-time search results

### Mobile Experience
- Dedicated mobile layout
- Touch-optimized interface
- Mobile-specific navigation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and for training purposes.

