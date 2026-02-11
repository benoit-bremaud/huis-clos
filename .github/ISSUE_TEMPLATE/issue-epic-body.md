# Epic: Clean Architecture Implementation

## Epic Overview

Implement Clean Architecture & SOLID principles across the Velia monorepo (backend + mobile) to improve code maintainability, testability, and long-term scalability.

## Motivation

Currently, the codebase has architectural issues:
- Business logic mixed with infrastructure (bcrypt/jwt in services)
- No clear separation of concerns
- Tight coupling between layers
- Difficult to test business logic in isolation

## Goals

- ✅ Establish clear layer boundaries (Domain → Application → Presentation → Infrastructure)
- ✅ Apply SOLID principles across all modules
- ✅ Make business logic testable in isolation
- ✅ Decouple frameworks from core logic

## Non-Goals

- This epic does NOT cover database implementation details
- This epic does NOT cover UI/UX improvements
- This epic does NOT require complete rewrite of existing features

## User Stories

- [x] As a developer, I need clear architectural boundaries so that I can navigate and understand the codebase
- [x] As a developer, I need testable business logic so that I can write meaningful unit tests
- [x] As a maintainer, I need consistent code organization so that technical debt is minimized

## Technical Background

Current issues identified:

### Backend
- `auth.service.ts` mixes use-case logic with bcrypt/jwt
- `users.service.ts` acts as both repository and application service
- No ports/interfaces for external dependencies
- Environment variables hardcoded in business logic

### Mobile
- `AuthContext` handles both state management AND business logic
- `profile.ts` duplicates token refresh logic
- Screens directly call API clients without use-case layer
- No clear separation between UI and business logic

### Shared
- Needs clear definition of what belongs in shared types

## Implementation Plan

### Phase 1: Foundation
- [x] Create `docs/architecture/clean-solid.md` (DONE)
- [x] Create architecture issue templates
- [x] Create GitHub labels (arch, debt, cleanup, blocked, mvp)

### Phase 2: Backend Refactoring (Auth Module)
- [ ] `arch(auth): apply clean architecture to auth module`
- [ ] `arch(auth): extract user repository port + adapter`
- [ ] `arch(auth): create JWT provider interface`
- [ ] `arch(auth): create password hasher interface`

### Phase 3: Backend Refactoring (Users & Profile)
- [ ] `arch(users): apply clean architecture to users module`
- [ ] `arch(profile): apply clean architecture to profile module`

### Phase 4: Mobile Refactoring (Auth & Profile)
- [ ] `arch(mobile): introduce feature layers auth/profile`
- [ ] `arch(mobile): create use-cases for login/register`
- [ ] `arch(mobile): centralize HTTP client + token refresh`

### Phase 5: CI Quality Gates
- [ ] `chore(ci): enforce dependency boundaries`
- [ ] `chore(ci): add import lint rules`

## Dependencies

- None - this can be done incrementally

## Risks

- **Risk**: Changes might break existing functionality
  - **Mitigation**: Test thoroughly, do incremental migration
- **Risk**: Learning curve for team
  - **Mitigation**: Documentation, examples, PR reviews

## Definition of Done

- [ ] All phases completed
- [ ] All code follows clean architecture rules
- [ ] No cross-layer imports
- [ ] Tests pass with >80% coverage
- [ ] Documentation updated
- [ ] PR checklist includes architecture compliance
