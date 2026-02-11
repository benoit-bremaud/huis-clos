# arch(mobile): Introduce Feature Layers for Auth/Profile

## Description

Refactor the mobile app to follow Clean Architecture with clear feature-based organization.

## Current State

Current issues in `apps/mobile/src/`:

- `AuthContext` handles state + business logic + API calls
- `services/api/profile.ts` duplicates token refresh logic
- No use-case layer - screens call API directly
- No clear separation between UI and business logic

## Target State

```
src/
├── features/
│   └── auth/
│       ├── domain/
│       │   ├── models/
│       │   │   └── user.model.ts
│       │   └── types/
│       │       └── auth.types.ts
│       ├── application/
│       │   ├── use-cases/
│       │   │   ├── login.use-case.ts
│       │   │   ├── register.use-case.ts
│       │   │   ├── logout.use-case.ts
│       │   │   └── refresh-token.use-case.ts
│       │   └── hooks/
│       │       └── use-auth.hook.ts
│       ├── infrastructure/
│       │   ├── api/
│       │   │   └── auth-api.client.ts
│       │   ├── storage/
│       │   │   └── token-storage.ts
│       │   └── mappers/
│       │       └── user.mapper.ts
│       └── presentation/
│           ├── screens/
│           │   ├── login/
│           │   │   └── index.tsx
│           │   └── register/
│           │       └── index.tsx
│           └── components/
│               └── auth-form/
├── services/
│   └── api/
│       └── profile.ts (update to use centralized client)
└── context/
    └── AuthContext.tsx (simplify to state only)
```

## Changes Required

- [ ] Create `features/auth/` directory structure
- [ ] Create `domain/models/` and `domain/types/`
- [ ] Create `application/use-cases/` for auth operations
- [ ] Create `infrastructure/api/auth-api.client.ts`
- [ ] Create `infrastructure/storage/token-storage.ts`
- [ ] Centralize HTTP client with interceptors
- [ ] Simplify `AuthContext` to state management only
- [ ] Update screens to use use-cases
- [ ] Update `profile.ts` to use centralized client

## Architecture Layers Affected

- [ ] Mobile - Domain
- [ ] Mobile - Application
- [ ] Mobile - Infrastructure
- [ ] Mobile - Presentation

## Definition of Done

- [ ] Auth feature follows clean architecture
- [ ] Profile feature uses centralized HTTP client
- [ ] AuthContext simplified (no business logic)
- [ ] Token refresh in one place only
- [ ] Screens call use-cases, not API directly
- [ ] Existing functionality preserved
