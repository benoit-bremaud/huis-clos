# 🇫🇷 Huis Clos - Réseau social chiffré de bout en bout

> Réseau social français chiffré de bout en bout : identité par clés, conversations privées et cercles, sur un serveur qui ne voit rien.

## Vision

- **Chiffrement de bout en bout** : protocole Signal (libsignal) pour le 1-1, MLS (RFC 9420, OpenMLS) pour les cercles
- **Serveur aveugle** : relais de messages chiffrés, *sealed sender*, padding des tailles — aucun contenu en clair côté serveur
- **Identité par clés** : ni numéro de téléphone ni email requis
- **Made in France** : hébergement FR/EU, RGPD natif

Périmètre et phases : [docs/mvp-scope.md](docs/mvp-scope.md) · Diagrammes : [docs/architecture/diagrams/e2e-messaging/](docs/architecture/diagrams/e2e-messaging/)

## Stack Technique

- **Mobile** : React Native (Expo)
- **Backend** : NestJS (Node.js + TypeScript)
- **Base de données** : PostgreSQL + Redis
- **Temps réel** : WebSocket (Socket.io)
- **Authentification** : JWT + refresh tokens

## Démarrage Rapide

```bash
# Cloner le repository
git clone https://github.com/benoit-bremaud/huis-clos.git
cd huis-clos

# Installer les dépendances
pnpm install

# Installer les hooks Husky
pnpm prepare

# Lancer le développement
pnpm dev
```

## Documentation

| Document | Description |
|----------|-------------|
| [AGENT.md](AGENT.md) | Guidelines pour les agents IA (Cline) |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Guide de contribution pour humains |
| [docs/mvp-scope.md](docs/mvp-scope.md) | Périmètre MVP |
| [.github/GITHUB_SETTINGS.md](.github/GITHUB_SETTINGS.md) | Configuration GitHub manuelle |

## Conventions de Développement

### Workflow Git

1. **Créer une issue** GitHub avant tout développement
2. **Créer une branche** : `type/issueId-description` (ex: `feat/42-add-auth`)
3. **Commit** : `type(scope): subject` (ex: `feat(auth): add login`)
4. **Pull Request** avec template obligatoire
5. **Merge** via Squash uniquement

### Langue

| Contenu | Langue |
|---------|--------|
| Code source | Anglais uniquement |
| Commit messages | Anglais uniquement |
| Clés i18n | Anglais uniquement (`auth.login.title`) |
| Valeurs FR/EN | Respectivement français/anglais |

### Qualité Requise Avant Merge

- ✅ Lint (ESLint)
- ✅ Tests unitaires (80% coverage minimum)
- ✅ Build TypeScript réussi
- ✅ Validation Copilot Review

## Commandes Utiles

```bash
# Développement
pnpm dev           # Mobile + Backend
pnpm dev:mobile   # Mobile uniquement
pnpm dev:backend  # Backend uniquement

# Qualité
pnpm lint         # Linting
pnpm typecheck    # Vérification TypeScript
pnpm test         # Tests unitaires
pnpm test:watch   # Tests en watch mode
pnpm test:coverage # Couverture de tests
pnpm quality      # Tout ensemble (lint + test + build)

# Build
pnpm build        # Build complet
```

## Licence

MIT
