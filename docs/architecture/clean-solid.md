# Clean Architecture & SOLID Principles

This document defines the architectural standards for Velia.

## Core Principles

### 1. Clean Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│         Controllers, Screens, UI Components                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                       │
│         Use Cases, Business Orchestration, DTOs            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     Domain Layer                            │
│         Entities, Value Objects, Domain Events, Ports      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 Infrastructure Layer                       │
│  Repositories, External Services, Frameworks, Adapters    │
└─────────────────────────────────────────────────────────────┘
```

### 2. Dependency Rule

Dependencies must point **inward**. Inner layers don't know about outer layers.

- **Presentation** → **Application** → **Domain** → **Infrastructure**
- `presentation` imports from `application` and `domain`
- `application` imports from `domain` only
- `domain` has NO imports from other layers
- `infrastructure` implements interfaces defined in `domain/application`

### 3. SOLID Principles

#### S - Single Responsibility
Each class has one reason to change.

#### O - Open/Closed
Open for extension, closed for modification.

#### L - Liskov Substitution
Subtypes must be substitutable for their base types.

#### I - Interface Segregation
Many specific interfaces are better than one general interface.

#### D - Dependency Inversion
Depend on abstractions, not concretions.

---

## Backend Architecture (NestJS)

### Structure per Module

```
modules/
└── auth/
    ├── domain/
    │   ├── entities/
    │   │   └── user.entity.ts
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
    │       ├── login.dto.ts
    │       └── register.dto.ts
    ├── infrastructure/
    │   ├── persistence/
    │   │   └── user.repository.ts
    │   ├── security/
    │   │   ├── bcrypt.hasher.ts
    │   │   └── jwt.provider.ts
    │   └── mappers/
    │       └── user.mapper.ts
    └── presentation/
        ├── controllers/
        │   └── auth.controller.ts
        ├── dto/
        │   ├── login-request.dto.ts
        │   └── login-response.dto.ts
        └── guards/
            └── jwt-auth.guard.ts
```

### Rules

1. **Controllers** only:
   - Validate request format
   - Call application use cases
   - Map responses
   - Handle HTTP errors

2. **Use Cases** only:
   - Orchestrate domain logic
   - Call domain services
   - Validate business rules
   - Return result or throw domain exception

3. **Domain Services** only:
   - Pure business logic
   - No framework dependencies
   - No HTTP/Database calls

4. **Repositories** only:
   - Implement persistence contract
   - Hide DB implementation details
   - Return domain entities

---

## Mobile Architecture (React Native + Expo)

### Structure per Feature

```
features/
└── auth/
    ├── domain/
    │   ├── models/
    │   │   └── user.model.ts
    │   └── types/
    │       └── auth.types.ts
    ├── application/
    │   ├── use-cases/
    │   │   ├── login.use-case.ts
    │   │   └── logout.use-case.ts
    │   └── hooks/
    │       └── use-auth.hook.ts
    ├── infrastructure/
    │   ├── api/
    │   │   └── auth-api.client.ts
    │   ├── storage/
    │   │   └── token-storage.ts
    │   └── mappers/
    │       └── user.mapper.ts
    └── presentation/
        ├── screens/
        │   ├── login/
        │   │   ├── login.screen.tsx
        │   │   └── login.styles.ts
        │   └── register/
        │       ├── register.screen.tsx
        │       └── register.styles.ts
        ├── components/
        │   ├── login-form/
        │   └── social-login-button/
        └── index.ts
```

### Rules

1. **Screens** only:
   - UI rendering
   - Handle user input events
   - Call use cases
   - Display loading/error states

2. **Use Cases** only:
   - Orchestrate API calls
   - Handle business flow
   - Transform data

3. **API Clients** only:
   - HTTP communication
   - Token management
   - Error mapping

4. **Context** only:
   - Global state management
   - Provider wrapping
   - NOT business logic

---

## Shared Package Rules

### Allowed in `@velia/shared`

✅ **Allowed:**
- TypeScript interfaces/types
- API response DTOs
- Error codes/enums
- Event interfaces
- Constants (non-sensitive)
- i18n keys

❌ **Forbidden:**
- Implementation code
- Business logic
- Framework-specific code
- Environment variables

### Example

```typescript
// ✅ Correct
export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export enum AuthErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
}

// ❌ Wrong
export class JwtService {
  sign(payload: any) { /* ... */ }
}
```

---

## PR Checklist

Before submitting a PR, verify:

### Architecture Compliance
- [ ] No cross-layer imports (except through interfaces)
- [ ] Business logic is in domain/application layer
- [ ] Controllers/UI only handle presentation
- [ ] Repositories hide persistence details
- [ ] No framework code in domain layer

### SOLID Compliance
- [ ] Single Responsibility (one reason to change)
- [ ] Interfaces are small and focused
- [ ] Dependencies are injected (not hardcoded)
- [ ] No god classes

### Code Quality
- [ ] Meaningful names (classes, methods, variables)
- [ ] Functions are small (< 20 lines)
- [ ] No magic strings/numbers
- [ ] Comments explain WHY, not WHAT

---

## Migration Strategy

For existing code, apply these rules:

1. **New code**: Must follow clean architecture
2. **Refactoring**: When touching existing code, improve it
3. **No big bang**: Incrementally migrate module by module

**Rule of thumb**: If you're working in a file, leave it cleaner than you found it.

---

## References

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [NestJS Architecture](https://docs.nestjs.com/architecture/providers)
