# AGENT.md - Huis Clos AI Assistant Guidelines

> **Document de référence pour les agents IA (Cline)** travaillant sur le projet Huis Clos.
> Ce document définit les règles, conventions et workflows à respecter impérativement.
> 
> **Langue :** Ce document est en français pour faciliter la compréhension de l'agent.
> **Code & livrables techniques :** Anglais uniquement (voir section "Langue").

---

## 1. Principes Fondamentaux

### 1.1 Mission de Huis Clos
Huis Clos est une application de messagerie et réseau social français, respectueuse de la vie privée (RGPD native), construit comme alternative française aux géants américains.

### 1.2 Stack Technique
- **Mobile** : React Native (Expo)
- **Backend** : NestJS (Node.js + TypeScript)
- **Base de données** : PostgreSQL + Redis
- **Temps réel** : WebSocket (Socket.io)
- **Authentification** : JWT + refresh tokens

### 1.3 Structure du Monorepo
```
huis-clos/
├── apps/
│   ├── mobile/          # Expo React Native app
│   └── backend/         # NestJS API
├── packages/
│   └── shared/          # Types et utilitaires partagés
├── docs/                # Documentation
└── .github/             # GitHub configuration
```

---

## 2. Langue et Internationalisation

### 2.1 Règle Générale
| Type de contenu | Langue obligatoire |
|-----------------|-------------------|
| Code source | **Anglais uniquement** |
| Commit messages | **Anglais uniquement** (Conventional Commits) |
| PR titles & descriptions | **Anglais uniquement** |
| Documentation technique | **Anglais uniquement** |
| Issues | Français ou Anglais (au choix du rédacteur) |
| Commentaires de code | **Anglais uniquement** |
| Noms de variables/fonctions/classes | **Anglais uniquement** |
| Clés de traduction i18n | **Anglais uniquement** (ex: `auth.login.title`) |
| Valeurs de traduction FR | Français |
| Valeurs de traduction EN | Anglais |

### 2.2 Règle i18n Stricte
**INTERDIT** : Texte hardcodé dans les composants React Native.
**OBLIGATOIRE** : Utiliser les clés de traduction avec la bibliothèque i18n.

```typescript
// ✅ CORRECT
<Text>{t('auth.login.welcome')}</Text>

// ❌ INCORRECT
<Text>Bienvenue sur Huis Clos</Text>
```

---

## 3. Workflow Git Obligatoire

### 3.1 Règle d'Or : Issue First
**AUCUN développement ne peut commencer sans issue GitHub associée.**

Étapes obligatoires pour chaque tâche :
1. Créer ou récupérer l'issue GitHub (avec ID, ex: `#42`)
2. Créer une branche temporaire depuis `main`
3. Développer et committer (convention Angular)
4. Pousser et créer une Pull Request
5. Obtenir les validations (CI + Copilot Review)
6. Merger via Squash
7. Supprimer la branche temporaire

### 3.2 Format des Branches
```
type/issueId-kebab-description
```

**Types autorisés :**
- `feat/` - Nouvelle fonctionnalité
- `fix/` - Correction de bug
- `docs/` - Documentation uniquement
- `refactor/` - Refactorisation de code
- `test/` - Ajout/modification de tests
- `build/` - Configuration build/CI
- `chore/` - Tâches de maintenance
- `perf/` - Optimisation performance
- `style/` - Formatage de code sans changement logique
- `revert/` - Reversion de commit

**Exemples valides :**
```
feat/42-add-jwt-refresh-flow
fix/108-fix-login-crash-on-ios
docs/15-update-api-documentation
refactor/89-cleanup-auth-module
```

**Exemples invalides :**
```
my-branch                    # Pas de prefix type
feature-login                # Pas d'issue ID
feat/auth-refresh            # Pas d'issue ID
Feature/42-NewFeature        # Majuscule non autorisée
```

### 3.3 Format des Commits (Conventional Commits)
```
type(scope): subject
```

**Types autorisés :** `feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert`

**Scopes recommandés (extensibles) :**
- `auth` - Authentification
- `profile` - Profil utilisateur
- `chat` - Messagerie
- `contacts` - Contacts
- `notification` - Notifications
- `i18n` - Internationalisation
- `infra` - Infrastructure
- `docs` - Documentation
- `ci` - CI/CD
- `mobile` - App mobile
- `backend` - API backend
- `shared` - Package partagé
- `api` - API REST

**Exemples valides :**
```
feat(auth): add jwt refresh token mechanism
fix(profile): resolve avatar upload timeout error
docs(contributing): add branching policy documentation
refactor(chat): migrate to new message interface
test(auth): add unit tests for token validation
```

**Exemples invalides :**
```
feat: add login feature                           # Pas de scope
feat(auth): added login feature                   # "added" au lieu de "add"
feat(auth): Adding login feature                  # "Adding" (présent progressif)
feat(auth): LOGIN FEATURE                         # Majuscules
fix: fixed bugs                                   # Trop vague
```

### 3.4 Longueur des Messages
- **Sujet du commit** : Max 72 caractères
- **Corps du message** : Max 100 caractères par ligne, illimité en nombre de lignes
- **Footer** : Pour références issues, breaking changes

### 3.5 Corps et Footer du Commit (Optionnel mais Recommandé)
```
type(scope): short description

Longer description of the change, explaining the WHY
and HOW if necessary.

- Point 1
- Point 2

Closes #42
Refs #15, #20
BREAKING CHANGE: API endpoint /users is now /api/v1/users
```

---

## 4. GitHub Issues

### 4.1 Template Obligatoire
Toutes les issues doivent suivre le template `.github/ISSUE_TEMPLATE/`.

### 4.2 Structure Requise
```markdown
## Description
[Description claire du problème ou de la fonctionnalité]

## Type
- [ ] Bug
- [ ] Feature
- [ ] Improvement
- [ ] Task

## Priorité
- [ ] Critical (must have for next release)
- [ ] High (should have)
- [ ] Medium (could have)
- [ ] Low (won't have this release)

## Scope
[Scope concerné : auth, profile, chat, etc.]

## Definition of Done
- [ ] Critère 1
- [ ] Critère 2
- [ ] Tests unitaires passent
- [ ] Build réussi
- [ ] Documentation mise à jour

## Notes additionnelles
[Contexte, captures d'écran, etc.]
```

### 4.3 Labels Obligatoires
Chaque issue doit avoir au minimum :
- Un label `type:*` (bug, feature, improvement, task)
- Un label `priority:*` (critical, high, medium, low)
- Un label `scope:*` (auth, profile, chat, etc.)

---

## 5. GitHub Pull Requests

### 5.1 Template Obligatoire
Toutes les PR doivent suivre le template `.github/PULL_REQUEST_TEMPLATE.md`.

### 5.2 Structure Requise
```markdown
## Related Issue
Closes #42

## Type
- [ ] Feature
- [ ] Bug Fix
- [ ] Refactor
- [ ] Documentation
- [ ] Other: [description]

## Description
[Description des changements apportés]

## Changes Made
- [ ] Fichier 1 : Description du changement
- [ ] Fichier 2 : Description du changement

## Screenshots (if applicable)
[Captures d'écran pour les changements UI]

## Checklist
- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Tests passent (`npm run test`)
- [ ] Build réussi (`npm run build`)
- [ ] Lint passent (`npm run lint`)
- [ ] Documentation mise à jour
- [ ] Pas de texte hardcodé (i18n respecté)
- [ ] Commit messages respectent la convention
- [ ] Branche à jour avec `main`

## Additional Notes
[Notes pour le reviewer]
```

### 5.3 Titre de PR
**Format obligatoire :** `type(scope): subject`

**Exemples :**
```
feat(auth): implement jwt refresh token flow
fix(profile): resolve avatar upload timeout
docs(contributing): add branching policy
```

### 5.4 Règles de Merge
- **Merge strategy** : Squash only obligatoire
- **Commit squash** : Le message final doit respecter Conventional Commits
- **Suppression de branche** : Automatique après merge

---

## 6. Validation et Qualité

### 6.1 Tests Obligatoires Avant Merge
| Type | Statut | Blocking |
|------|--------|----------|
| Unit Tests | Obligatoire | **BLOCKING** |
| Lint (ESLint) | Obligatoire | **BLOCKING** |
| TypeScript Build | Obligatoire | **BLOCKING** |
| Integration Tests | Recommandé | Non-blocant |
| E2E Tests | Future | Non-blocant |

### 6.2 Commandes de Validation
```bash
# Lint
npm run lint

# TypeScript
npm run typecheck

# Tests
npm run test
npm run test:coverage

# Build
npm run build

# Tout ensemble
npm run quality
```

### 6.3 Couverture de Tests
- **Minimum requis** : 80% de coverage
- **Cible recommandée** : 90%+

---

## 7. Revue de Code

### 7.1 Processus de Revue
1. **Copilot Review** : Analyse automatique obligatoire
2. **Checks CI** : Tous les checks doivent être verts
3. **Review humaine** : Optionnelle (selon les paramètres GitHub)

### 7.2 Auto-Review par l'Agent
Avant de soumettre une PR, l'agent doit vérifier :
- [ ] Code compilable et fonctionnel
- [ ] Tests écrits et passant
- [ ] Lint sans erreurs
- [ ] Pas de console.log/debugger abandonné
- [ ] Pas de credentials/API keys dans le code
- [ ] Variables d'environnement documentées dans `.env.example`
- [ ] Documentation technique mise à jour

---

## 8. Gestion des Exceptions

### 8.1 Hotfix Urgent (Production Bloquée)
En cas d'urgence critique, une exception est autorisée :

1. Créer l'issue (si pas déjà faite)
2. Créer la branche `hotfix/issueId-description`
3. Faire les modifications minimales
4. Merger directement (commit conventionnel)
5. **OBLIGATOIRE** : Créer une PR de régularisation après coup

### 8.2 Format Hotfix
```
fix(hotfix): critical production fix
```

---

## 9. Convention de Code

### 9.1 TypeScript
- **Strict mode** : Activé
- **Interfaces vs Types** : Interface pour les shapes extensibles, Type pour les unions/primitives
- **Export** : Named exports uniquement
- **Imports** : Ordre : React → Bibliothèque → Relative → Absolute

```typescript
// ✅ CORRECT
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { someExternalLib } from 'external-lib';
import { User } from '@huis-clos/shared/types';
import { authActions } from './auth.actions';

// Interface pour les shapes extensibles
interface UserProfile {
  id: string;
  name: string;
  // ...
}

// Type pour les unions
type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';
```

### 9.2 React Native
- **Hooks** : use hooks pour tout (pas de class components)
- **Style** : StyleSheet pour le styling
- **Composants** : Functional components avec TypeScript
- **Navigation** : React Navigation

### 9.3 NestJS
- **Modules** : Feature modules avec clean architecture
- **Services** : Business logic
- **Controllers** : HTTP handlers
- **DTOs** : Validation avec class-validator
- **Entities** : TypeORM/Prisma models

### 9.4 Git
- **Commit atomique** : Un commit = une fonctionnalité/fix
- **Messages informatifs** : Expliquer le pourquoi, pas juste le quoi
- **Rebase** : Rebaser sur `main` avant PR si nécessaire

---

## 10. Sécurité

### 10.1 Règles Non Négociables
- **AUCUNE** clé API, mot de passe ou secret dans le code
- **AUCUNE** information sensible dans les logs
- **TOUTES** les variables sensibles dans `.env` (non tracké par Git)
- **TOUTES** les clés d'API dans `.env.example` avec example values
- **JWT** : Tokens avec expiration raisonnable (15min access, 7 jours refresh)
- **HTTPS** : Obligatoire en production
- **CORS** : Configuration restrictive

### 10.2 Validation des Entrées
- **Backend** : Validation systématique des DTOs
- **Mobile** : Validation des formulaires côté client + serveur
- **Sanitization** : Protection XSS et SQL injection

---

## 11. Documentation

### 11.1 Documentation Obligatoire
- `README.md` : Installation, démarrage, architecture
- `docs/` : Documentation technique détaillée
- `API.md` : Documentation de l'API REST
- Commentaires JSDoc pour les fonctions publiques
- README par module/composant complexe

### 11.2 Structure docs/
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

## 12. Checklist Avant Commit

### 12.1 Pré-commit
- [ ] Code terminé et fonctionnel
- [ ] Tests écrits et passant
- [ ] Lint sans erreurs
- [ ] TypeScript sans erreurs
- [ ] Commit message formaté (Conventional Commits)
- [ ] Pas de code temporaire (console.log, debugger)

### 12.2 Pré-push
- [ ] Branche à jour avec `main`
- [ ] Tests unitaires passent
- [ ] Build réussi
- [ ] Nom de branche conforme

---

## 13. Gestion des Branches

### 13.1 Branches Permanentes
- `main` : Branche stable, uniquement via PR, protégée
- `develop` : Future (optionnel si on garde simple)

### 13.2 Branches Temporaires
Toutes les autres branches sont temporaires et doivent être supprimées après merge.

### 13.3 Nettoyage
```bash
# Supprimer les branches locales mergées
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d

# Supprimer les branches distantes trackées supprimées
git fetch --prune
```

---

## 14. Commands Utiles

### 14.1 Installation
```bash
# Installer les dépendances
pnpm install

# Installer les hooks Husky
pnpm prepare
```

### 14.2 Développement
```bash
# Tout développer
pnpm dev

# Mobile uniquement
pnpm dev:mobile

# Backend uniquement
pnpm dev:backend

# Lancer les tests
pnpm test
pnpm test:watch
pnpm test:coverage

# Lancer le lint
pnpm lint
pnpm lint:fix

# Vérifier les types
pnpm typecheck

# Build complet
pnpm build
```

---

## 15. Resources

### 15.1 Documentation de Référence
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)
- [React Native Docs](https://reactnative.dev/)
- [NestJS Docs](https://docs.nestjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### 15.2 Outils
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
- [Commitlint](https://commitlint.js.org/)

---

## 16. Résumé Rapide

| Élément | Format | Exemple |
|---------|--------|---------|
| Branche | `type/issueId-description` | `feat/42-add-auth` |
| Commit | `type(scope): subject` | `feat(auth): add login` |
| PR Title | `type(scope): subject` | `feat(auth): implement login` |
| Issue | Template `.github/ISSUE_TEMPLATE/` | - |
| PR | Template `.github/PULL_REQUEST_TEMPLATE.md` | - |
| Code | Anglais uniquement | `const userId: string` |
| i18n | Clés anglaises | `auth.login.title` |
| Tests | 80% coverage minimum | - |
| Merge | Squash only | - |

---

**Document maintenu par :** Benoit Bremaud
**Dernière mise à jour :** 2025-02-11
**Version :** 1.0.0
