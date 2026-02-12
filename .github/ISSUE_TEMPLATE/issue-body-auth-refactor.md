# arch(auth): Apply Clean Architecture to Auth Module

## Description

Refactor the auth module to follow Clean Architecture principles with clear separation of concerns.

## Current State

Current issues in `apps/backend/src/modules/auth/`:

- `auth.service.ts` contains both business logic AND infrastructure (bcrypt, JWT)
- No ports/interfaces for external dependencies
- Environment variables hardcoded in service methods
- Controller directly calls service methods without use-case layer

## Target State

```
modules/auth/
├── domain/
│   ├── entities/
│   │   └── user.entity.ts (already exists)
│   ├── ports/
│   │   ├── user.repository.interface.ts
│   │   └── token.provider.interface.ts
│   └── events/
│       └── user.registered.event.ts
├── application/
│   ├── use-cases/
│   │   ├── login.use-case.ts
│   │   ├── register.use-case.ts
│   │   └── refresh-tokens.use-case.ts
│   └── dto/
│       └── auth-result.dto.ts
├── infrastructure/
│   ├── persistence/
│   │   └── user.repository.ts
│   ├── security/
│   │   ├── bcrypt.hasher.ts
│   │   └── jwt.provider.ts
│   └── mappers/
│       └── user.mapper.ts
└── presentation/
    └── controllers/
        └── auth.controller.ts (update to call use-cases)
```

## Changes Required

- [ ] Create `domain/ports/user.repository.interface.ts`
- [ ] Create `domain/ports/token.provider.interface.ts`
- [ ] Create `application/use-cases/login.use-case.ts`
- [ ] Create `application/use-cases/register.use-case.ts`
- [ ] Create `application/use-cases/refresh-tokens.use-case.ts`
- [ ] Create `infrastructure/persistence/user.repository.ts`
- [ ] Create `infrastructure/security/bcrypt.hasher.ts`
- [ ] Create `infrastructure/security/jwt.provider.ts`
- [ ] Refactor `auth.service.ts` to be application service only
- [ ] Refactor `auth.controller.ts` to call use-cases
- [ ] Update `auth.module.ts` to wire dependencies

## Architecture Layers Affected

- [ ] Backend - Domain
- [ ] Backend - Application
- [ ] Backend - Infrastructure
- [ ] Backend - Presentation

## Definition of Done

- [ ] Auth module follows clean architecture
- [ ] No bcrypt/JWT imports in service/controller
- [ ] All dependencies injected via constructor
- [ ] Use cases are testable in isolation
- [ ] Interfaces defined in domain, implementations in infrastructure
- [ ] Existing tests pass
