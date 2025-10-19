# Yuna - Agent Instructions

This file provides guidance for LLM agents working on the Yuna project.

## Project Overview

Yuna is a self-hosted work management platform built with React and PostgreSQL, designed for simplicity, extensibility, and full on-premise control.

## Technology Stack

### Frontend (Web App)
- **Framework**: React 19 with React Router 7
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI (dropdown-menu, slot)
- **Build Tool**: Vite 7
- **Theme Management**: next-themes for dark/light mode support
- **Icons**: lucide-react

### Backend (API)
- **Language**: TypeScript 5
- **Module System**: ES Modules
- **Runtime**: Node.js (>= 22)

### Database
- **ORM**: Prisma (managed in workspace)
- **Database**: PostgreSQL

### Development Tools
- **Package Manager**: pnpm 10
- **Linting**: ESLint 9 with TypeScript ESLint parser
- **Code Formatting**: Prettier (via eslint-plugin-prettier)
- **Type Checking**: TypeScript strict mode enabled

## Project Structure

```
yuna/
├── apps/
│   ├── api/          # Backend API (TypeScript)
│   │   └── src/
│   └── web/          # Frontend React app
│       ├── app/      # React Router app directory
│       │   ├── components/
│       │   ├── routes/
│       │   ├── lib/
│       │   └── constants/
│       └── public/
├── prisma/           # Database schema and migrations
└── [config files]    # Root configuration files
```

## Resources
- Repository: https://github.com/abianche/yuna
- License: See LICENSE file
- Security Policy: See SECURITY.md
- Code of Conduct: See CODE_OF_CONDUCT.md
