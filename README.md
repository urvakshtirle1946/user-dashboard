# User Dashboard App

A modern, responsive user dashboard application built with Next.js, Zustand, and Tailwind CSS.

## Features

- 🔐 **Authentication**: Login and registration with form validation
- 📊 **Dashboard**: Task management with statistics
- ✅ **Task Management**: Add, edit, delete, and complete tasks
- 👤 **User Profile**: Edit personal information
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works on mobile and desktop
- 💾 **Persistent Storage**: Data persists across browser sessions

## Tech Stack

- **Next.js** - React framework for production
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - For component state and effects

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
user-dashboard/
├── components/          # Reusable components
│   ├── FormInput.js    # Form input component
│   ├── Header.js       # Header with theme toggle
│   ├── Sidebar.js      # Navigation sidebar
│   └── TaskItem.js     # Individual task component
├── pages/              # Next.js pages
│   ├── _app.js         # App wrapper
│   ├── index.js        # Login page
│   ├── register.js     # Registration page
│   ├── dashboard.js    # Main dashboard
│   └── profile.js      # User profile page
├── store/              # Zustand store
│   └── useStore.js     # Global state management
├── styles/             # Global styles
│   └── globals.css     # Tailwind CSS imports
└── package.json        # Dependencies and scripts
```

## Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | Login page |
| `/register` | Registration page |
| `/dashboard` | Main dashboard with tasks |
| `/profile` | User profile settings |

## Components

### FormInput
Reusable input component with validation support and error handling.

### Header
Top navigation bar with username display and theme toggle.

### Sidebar
Navigation sidebar with links to Dashboard, Profile, and Logout.

### TaskItem
Individual task card with complete, edit, and delete actions.

## State Management

The app uses Zustand for global state management with the following features:

- **User Authentication**: Login/logout state
- **Task Management**: CRUD operations for tasks
- **Theme Management**: Dark/light mode toggle
- **Persistent Storage**: Data saved to localStorage

## Features in Detail

### Authentication
- Mock authentication system
- Form validation for login and registration
- Automatic redirect to dashboard after login
- Protected routes for authenticated users

### Task Management
- Create new tasks with title and description
- Mark tasks as complete/incomplete
- Edit existing tasks inline
- Delete tasks
- Separate views for pending and completed tasks

### User Profile
- Edit personal information (name, email, bio)
- Profile picture display (placeholder)
- Account information display
- Form validation and success feedback

### Dark Mode
- Toggle between light and dark themes
- Persistent theme preference
- Smooth transitions between themes

## Styling

The app uses Tailwind CSS for styling with:
- Responsive design for mobile and desktop
- Dark mode support
- Custom color scheme with primary colors
- Smooth transitions and hover effects
- Modern, clean UI design

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Structure

- Each component is kept under 200 lines as requested
- Modular architecture with reusable components
- Clean separation of concerns
- Consistent naming conventions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
