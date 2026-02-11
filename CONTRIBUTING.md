# Contributing to Velia

> Welcome to Velia! This document provides guidelines for contributing to the project.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Coding Standards](#coding-standards)
4. [Git Conventions](#git-conventions)
5. [Testing](#testing)
6. [Documentation](#documentation)
7. [Security](#security)

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- Git

### Setting Up Development Environment

```bash
# Clone the repository
git clone https://github.com/benoit-bremaud/velia.git
cd velia

# Install dependencies
pnpm install

# Install Husky hooks
pnpm prepare
```

### Running the Project

```bash
# Development (mobile + backend)
pnpm dev

# Mobile only
pnpm dev:mobile

# Backend only
pnpm dev:backend

# Run tests
pnpm test

# Lint
pnpm lint

# Build
pnpm build
```

---

## Development Workflow

### 1. Issue First Approach

**NO development can start without an associated GitHub issue.**

1. Browse or create a GitHub issue
2. Get the issue ID (e.g., `#42`)
3. Create a feature branch following naming conventions
4. Develop and commit following conventions
5. Push and create a Pull Request
6. Pass all validations (CI + Copilot Review)
7. Merge via Squash
8. Delete the temporary branch

### 2. Creating an Issue

Use the GitHub issue templates provided in `.github/ISSUE_TEMPLATE/`.

Required information:
- Clear description of the problem or feature
- Type (Bug, Feature, Improvement, Task)
- Priority level
- Scope affected
- Definition of Done checklist

### 3. Submitting a Pull Request

Use the PR template in `.github/PULL_REQUEST_TEMPLATE.md`.

Required information:
- Related issue (Closes #XX)
- Type of change
- Description of changes
- Files changed
- Checklist completion

---

## Coding Standards

### Language

| Content Type | Language |
|--------------|----------|
| Source code | **English only** |
| Commit messages | **English only** (Conventional Commits) |
| PR titles & descriptions | **English only** |
| Technical documentation | **English only** |
| Code comments | **English only** |
| Variable/function/class names | **English only** |
| i18n translation keys | **English only** (e.g., `auth.login.title`) |
| i18n FR values | French |
| i18n EN values | English |

### i18n Rule (Critical)

**FORBIDDEN**: Hardcoded text in React Native components.
**REQUIRED**: Use translation keys with the i18n library.

```typescript
// ✅ CORRECT
<Text>{t('auth.login.welcome')}</Text>

// ❌ INCORRECT
<Text>Bienvenue sur Velia</Text>
```

### TypeScript

```typescript
// Strict mode enabled
// Named exports only
// Order of imports: React → Libraries → Relative → Absolute

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { externalLib } from 'external-lib';
import { User } from '@velia/shared/types';
import { authActions } from './auth.actions';

// Interfaces for extensible shapes
interface UserProfile {
  id: string;
  name: string;
  // ...
}

// Types for unions/primitives
type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';
```

### React Native

- Use hooks for everything (no class components)
- Use StyleSheet for styling
- Functional components with TypeScript
- React Navigation for routing

### NestJS

- Feature modules with clean architecture
- Services for business logic
- Controllers for HTTP handlers
- DTOs with class-validator
- TypeORM/Prisma for database models

---

## Git Conventions

### Branch Naming

```
type/issueId-kebab-description
```

**Allowed types:**
- `feat/` - New feature
- `fix/` - Bug fix
- `docs/` - Documentation only
- `refactor/` - Code refactoring
- `test/` - Test additions/modifications
- `build/` - Build configuration
- `chore/` - Maintenance tasks
- `perf/` - Performance optimization
- `style/` - Code formatting
- `revert/` - Commit reversion

**Examples:**
```
feat/42-add-jwt-refresh-flow
fix/108-fix-login-crash-on-ios
docs/15-update-api-documentation
```

### Commit Messages (Conventional Commits)

```
type(scope): subject
```

**Allowed types:** `feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert`

**Recommended scopes:** `auth`, `profile`, `chat`, `contacts`, `notification`, `i18n`, `infra`, `docs`, `ci`, `mobile`, `backend`, `shared`, `api`

**Examples:**
```
feat(auth): add jwt refresh token mechanism
fix(profile): resolve avatar upload timeout error
docs(contributing): add branching policy documentation
```

**Message length:**
- Subject: Max 72 characters
- Body: Max 100 characters per line

### Pull Request Title

Same format as commits: `type(scope): subject`

### Merge Strategy

**Squash only** is mandatory.

After squash merge:
- Delete the source branch automatically
- Keep the conventional commit message

---

## Testing

### Requirements Before Merge

| Test Type | Status | Blocking |
|-----------|--------|----------|
| Unit Tests | Required | **BLOCKING** |
| Lint (ESLint) | Required | **BLOCKING** |
| TypeScript Build | Required | **BLOCKING** |
| Coverage | Minimum 80% | **BLOCKING** |

### Running Tests

```bash
# All tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

### Writing Tests

- Write unit tests for all new functions/components
- Use Jest for unit tests
- Aim for meaningful tests, not just coverage

---

## Documentation

### Required Documentation

- `README.md`: Installation, startup, architecture
- `docs/`: Detailed technical documentation
- `API.md`: REST API documentation
- JSDoc comments for public functions
- README for complex modules/components

### Documentation Structure

```
docs/
├── architecture/
│   ├── overview.md
│   ├── frontend.md
│   └── backend.md
├── api/
│   ├── authentication.md
│   └── endpoints.md
├── i18n/
│   └── translation-guide.md
└── contributing.md
```

---

## Security

### Non-Negotiable Rules

- **NO** API keys, passwords, or secrets in code
- **NO** sensitive information in logs
- **ALL** sensitive variables in `.env` (not tracked by Git)
- **ALL** API keys in `.env.example` with example values
- **JWT**: Reasonable expiration (15min access, 7 days refresh)
- **HTTPS**: Required in production
- **CORS**: Restrictive configuration

### Input Validation

- **Backend**: Systematic DTO validation
- **Mobile**: Form validation on client + server
- **Sanitization**: XSS and SQL injection protection

---

## Resources

- [AGENT.md](./AGENT.md) - AI Assistant Guidelines
- [README.md](./README.md) - Project overview
- [docs/mvp-scope.md](./docs/mvp-scope.md) - MVP scope
- [Conventional Commits](https://www.conventionalcommits.org/)
- [React Native Docs](https://reactnative.dev/)
- [NestJS Docs](https://docs.nestjs.com/)

---

## Questions?

If you have questions, please open an issue for discussion.

---

**Document maintainer:** Benoit Bremaud
**Last updated:** 2025-02-11
**Version:** 1.0.0
