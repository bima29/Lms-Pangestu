# Pangestu LMS - School Learning Management System

A comprehensive Learning Management System (LMS) built with React, TypeScript, and Tailwind CSS for managing school operations, classes, students, and online assessments.

## Features

### Multi-Role Access System
- **Super Admin**: Platform-wide management, tenant oversight, billing
- **School Admin**: School-wide user management, classes, schedules, reports
- **Teacher**: Class management, materials upload, CBT creation, attendance
- **Student**: Dashboard, online exams (CBT), grade viewing
- **Parent**: Children monitoring, grade tracking, notifications

### Key Functionalities
- Role-based authentication and protected routing
- Computer-Based Testing (CBT) system with timer and navigation
- User management with pagination and search
- Grade tracking and academic progress monitoring
- Material upload and document management
- Attendance tracking system
- Website builder for school landing pages
- Comprehensive reporting and analytics

## Demo Accounts

Use these credentials to test different user roles:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | super@lms.com | 123456 |
| School Admin | admin@school.com | 123456 |
| Teacher | guru@school.com | 123456 |
| Student | siswa@school.com | 123456 |
| Parent | ortu@school.com | 123456 |

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd Pangestu LMS-lms
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # Base UI components (Button, Card, Modal, etc.)
├── contexts/           # React Context providers (Auth)
├── data/              # Mock data and constants
├── hooks/             # Custom React hooks
├── layouts/           # Layout components for different user roles
├── pages/             # Page components organized by user role
│   ├── admin/         # Super admin pages
│   ├── school/        # School admin pages
│   ├── teacher/       # Teacher pages
│   ├── student/       # Student pages
│   └── parent/        # Parent pages
└── types/             # TypeScript type definitions
```

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context API
- **Authentication**: Mock authentication with localStorage persistence

## Design System

The application uses a comprehensive design system with:

- **Primary Colors**: Blue shades for main UI elements
- **Secondary Colors**: Gray tones for text and borders  
- **Accent Colors**: Gold/orange for highlights and CTAs
- **Semantic Colors**: Success (green), Warning (yellow), Error (red)
- **Typography**: Inter font family with consistent sizing
- **Spacing**: 8px grid system for consistent layouts
- **Components**: Reusable UI components with consistent styling

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features by Role

### Super Admin Dashboard
- Platform statistics and tenant overview
- Tenant management with CRUD operations
- Website template management
- Billing and revenue tracking
- System logs monitoring
- Platform user management

### School Admin Dashboard
- School statistics and student overview
- User management (teachers, students, parents)
- Class organization and management
- Schedule creation and management
- CBT oversight and monitoring
- Document management system
- School website builder
- Academic reports and analytics

### Teacher Dashboard
- Class management and student lists
- Learning material upload and organization
- CBT creation and management
- Daily attendance tracking
- Grade submission and management

### Student Dashboard
- Personal academic dashboard
- Online exam (CBT) interface with timer
- Grade viewing and progress tracking
- Assignment and announcement viewing

### Parent Dashboard
- Children's academic progress monitoring
- Grade and performance tracking
- School notifications and announcements
- Communication with teachers

## CBT (Computer-Based Testing) System

The CBT system includes:
- Timed examinations with countdown timer
- Question navigation with flagging system
- Multiple choice question support
- Progress tracking during exam
- Automatic submission when time expires
- Results display with scoring

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@Pangestu LMS.com or create an issue in the repository.