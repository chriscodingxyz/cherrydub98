# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website themed around the classic Windows 98 aesthetic. Built with React and Vite, it features draggable windows, retro UI elements, and various interactive components including crypto tracking, PDF viewing, and Twitter embeds.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint with JS/JSX files
- `npm run preview` - Preview production build

### Testing
No test framework is currently configured in this project.

## Architecture

### Core Application Structure
- **App.jsx** - Main application component managing global state including active windows, background themes, and loading states
- **MainDesktop.jsx** - Central window manager that renders and positions all draggable windows using react-draggable
- **BottomDesktopBar.jsx** - Windows 98 style taskbar
- **LeftDesktopNav.jsx** - Side navigation panel

### Window System
The application uses a window-based interface where each feature is a separate draggable window component:
- All windows are located in `src/windows/` directory
- Windows are managed through `activeComponents` state array
- Each window has corresponding content components
- Windows use react-draggable for movement functionality

### Key Technologies
- **React 18** with functional components and hooks
- **Vite** for build tooling and development server
- **Tailwind CSS** for utility-first styling
- **98.css** for authentic Windows 98 UI components
- **react-draggable** for window dragging functionality
- **react-pdf** for PDF viewing in CV component
- **@uidotdev/usehooks** for utility hooks like useLocalStorage and useWindowSize

### State Management
- Uses React's built-in state management (useState, useLocalStorage)
- Global state passed down through props
- Local storage integration for persisting user preferences (background, flicker effect)

### Styling Approach
- Combination of Tailwind CSS and 98.css for retro theming
- Custom CSS in `flicker.css` for CRT screen effects
- Background images stored in `public/backgrounds/`
- Windows 98 icons from win98icons library

### Data Structure
- `src/lib/data.ts` contains site configuration object with external project URLs
- Component props follow consistent patterns for window management
- Window positioning handled through Tailwind classes and absolute positioning

## File Organization

- `src/components/` - Reusable components (forms, crypto widgets, etc.)
- `src/windows/` - Main window components
- `src/assets/` - Static assets
- `public/` - Static files including PDFs, images, and icons
- `public/icons/` - Windows 98 style icons organized by size