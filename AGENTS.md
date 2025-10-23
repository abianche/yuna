# Yuna - Agent Instructions

This file provides guidance for LLM agents working on the Yuna project.

## Project Overview

Yuna is a self-hosted work management platform built with React and PostgreSQL, designed for simplicity, extensibility, and full on-premise control.

## Technology Stack

### Frontend (Web App)
- **Framework**: React 19 with React Router 7
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4 with tailwind-merge and tw-animate-css
- **UI Components**: Shadcn and Radix UI
- **Build Tooling**: Vite 7
- **Theme Management**: next-themes for dark/light mode support
- **Icons**: lucide-react

### Backend (API)
- **Framework**: NestJS 11 on Express
- **Language**: TypeScript 5.9
- **Runtime**: Node.js (>= 22)
- **ORM**: Prisma 6 with Accelerate extension
- **Testing**: Jest 30 with Supertest 7

### Database
- **Database**: PostgreSQL
- **Schema & Migrations**: Prisma Migrate (workspace-managed)

### Development Tools
- **Package Manager**: pnpm 10.18.3 workspaces
- **Linting**: ESLint 9 with typescript-eslint 8 and eslint-plugin-prettier
- **Code Formatting**: Prettier (through eslint-plugin-prettier)
- **Type Checking**: `tsc`; frontend runs strict mode, API tsconfig tuned for NestJS decorators

## Project Structure

```
yuna/
├── apps/
│   ├── api/          # Backend API
│   │   ├── src/
│   │   └── prisma/   # Database schema and migrations
│   └── web/          # Frontend React app
│       ├── app/      # React Router app directory
│       │   ├── components/
│       │   ├── routes/
│       │   ├── lib/
│       │   └── constants/
│       └── public/
├── docs/             # Documentation files (Docusaurus)
└── [config files]    # Root configuration files
```

## Resources
- Repository: https://github.com/abianche/yuna
- License: See LICENSE file
- Security Policy: See SECURITY.md
- Code of Conduct: See CODE_OF_CONDUCT.md
