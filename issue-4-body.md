## Description

Implement user profile management feature allowing users to view and edit their profile information.

## Features

### Backend (NestJS)
- Create new `profile` module with controller, service, and DTOs
- Endpoints:
  - `GET /api/profile` - Get current user's profile (JWT auth required)
  - `PUT /api/profile` - Update current user's profile (JWT auth required)

### Mobile (Expo/React Native)
- Create profile screen (`apps/mobile/src/app/profile/index.tsx`)
- Create edit profile screen (`apps/mobile/src/app/profile/edit.tsx`)
- Create profile service (`apps/mobile/src/services/api/profile.ts`)
- Create ProfileAvatar component
- Create LanguageSelector component

## User Stories

- As a user, I can view my profile information
- As a user, I can edit my display name
- As a user, I can change my preferred language
- As a user, I can upload/change my avatar

## Technical Details

### Backend
- **Module**: `apps/backend/src/modules/profile/profile.module.ts`
- **Controller**: `apps/backend/src/modules/profile/profile.controller.ts`
- **Service**: `apps/backend/src/modules/profile/profile.service.ts`
- **DTO**: `apps/backend/src/modules/profile/dto/update-profile.dto.ts`

### Mobile
- **Screen**: `apps/mobile/src/app/profile/index.tsx`
- **Edit Screen**: `apps/mobile/src/app/profile/edit.tsx`
- **Service**: `apps/mobile/src/services/api/profile.ts`
- **Component**: `apps/mobile/src/components/ProfileAvatar.tsx`
- **Component**: `apps/mobile/src/components/LanguageSelector.tsx`

## Definition of Done

- Backend implementation complete and tested
- Mobile screens implemented and functional
- All existing CI checks pass
- Code reviewed and approved
- Feature tested manually

---
**Type:** `feat`
**Priority:** `high`
**Story Points:** 5