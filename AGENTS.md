# Yuna - Agent Instructions

This file provides guidance for LLM agents working on the Yuna project.

## Project Overview

Yuna is a self-hosted work management platform built with React and PostgreSQL, designed for simplicity, extensibility, and full on-premise control.

## Technology Stack

### Frontend (Web App)
- **Framework**: React 19.2.0 with React Router 7.9.4
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.14
- **UI Components**: Radix UI (dropdown-menu, slot)
- **Build Tool**: Vite 7.1.10
- **Theme Management**: next-themes for dark/light mode support
- **Icons**: lucide-react

### Backend (API)
- **Language**: TypeScript 5.9.3
- **Module System**: ES Modules
- **Runtime**: Node.js (>= 22)

### Database
- **ORM**: Prisma (managed in workspace)
- **Database**: PostgreSQL

### Development Tools
- **Package Manager**: pnpm 10.18.3
- **Linting**: ESLint 9.38.0 with TypeScript ESLint parser
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

## Key Commands

### Development
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development servers (use in specific app directories)
- `pnpm lint` - Run ESLint across all workspaces
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm build` - Build the project

### API-specific (in apps/api/)
- `pnpm build` - Compile TypeScript to JavaScript
- `pnpm dev` - Watch mode compilation
- `pnpm typecheck` - Type check without emitting

### Web-specific (in apps/web/)
- `pnpm dev` - Start development server with React Router
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm clean` - Clean build artifacts
- `pnpm typecheck` - Generate types and run type checking

## Development Guidelines

### Code Style
- **Single quotes** for strings (enforced by Prettier)
- **Semicolons** are required (enforced by Prettier)
- **Strict TypeScript** mode is enabled
- Follow existing code patterns in the repository

### Module Resolution
- Uses `bundler` module resolution
- ES2022 target and modules
- Path aliases configured via TypeScript and build tools
- Web app uses `~/` alias for app directory imports

### Component Patterns (Web)
- UI components in `apps/web/app/components/ui/`
- Uses Radix UI primitives with custom styling
- Tailwind CSS for styling with custom theme support
- Theme-aware components using next-themes

### Git Workflow
- Use descriptive commit messages
- Follow existing PR template structure
- Adhere to security and code of conduct policies (see SECURITY.md and CODE_OF_CONDUCT.md)

## Important Notes

1. **Node Version**: Project requires Node.js >= 22 (current environment may have older version)
2. **Monorepo**: Uses pnpm workspaces for managing multiple packages
3. **Existing Lint Issues**: There may be existing lint errors in the codebase; focus on not introducing new ones
4. **Database**: Prisma is used for database management; schema files are in the prisma/ directory
5. **Containerization**: Web app includes Dockerfile for containerized deployment

## Testing
Currently, there is no dedicated test infrastructure visible in the repository. When adding tests, ensure they are consistent with future testing patterns.

## CI/CD
- GitHub Actions workflows for CodeQL scanning
- Dependabot for dependency updates
- SonarCloud integration for code quality

## Resources
- Repository: https://github.com/abianche/yuna
- License: See LICENSE file
- Security Policy: See SECURITY.md
- Code of Conduct: See CODE_OF_CONDUCT.md
