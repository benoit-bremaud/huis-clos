# Project Log — Huis Clos

Chronological audit trail of decisions and milestones, complementing `git log`.

## 2026-10-15 — Project renamed Velia → Huis Clos, pivot to E2E-encrypted social network

- **Decision**: rename the project from *Velia* to *Huis Clos* (slug `huis-clos`, npm scope `@huis-clos/*`).
  Owner choice over the MCDA top pick *Scellia* (425 vs 355): stronger French evocation preferred,
  despite the name being generic (trademark registration risk) and `huisclos.fr` / `huisclos.com`
  / `huis-clos.fr` being held by unrelated third parties.
- **Decision**: mobile bundle id / Android package `app.huisclos.mobile` (reverse DNS of `huisclos.app`,
  apparently unregistered). Changeable freely until the first store publication; `huisclos.app`
  must be registered before then.
- **Pivot**: the product becomes an end-to-end encrypted social network (blind-relay server, Signal
  protocol for 1-1, MLS for circles). `docs/mvp-scope.md` still lists E2E as out of MVP — to be
  rewritten in a dedicated brick.
- **Pending (owner)**: INPI / EUIPO trademark search (classes 9, 38, 42), register `huisclos.app`,
  rename the GitHub repository after merge.

## 2026-10-16 — PR #33 merged (rename) and E2E MVP scope rewritten

- **Merged**: PR #33 `chore: rename project Velia to Huis Clos`, squash commit `70efe87`.
  Follow-ups: #34, #35, #36 (rename GitHub repo), #37.
- **Decision (#37)**: MVP = key-based identity → 1-1 Signal chat → MLS circles with encrypted text
  posts; media and encrypted backup after. Server is a blind relay (sealed sender, size padding).
- **Decision (#37, MCDA)**: libsignal for 1-1 (385/500 vs vodozemac 340), OpenMLS for circles
  (430/500 vs mls-rs 390). Owner accepted the consequence: libsignal is AGPL-3.0, so the repo
  license (currently MIT) must move to AGPL-3.0 before libsignal code ships.
- **Docs**: UML use-case, component and sequence diagrams under
  `docs/architecture/diagrams/e2e-messaging/`.
