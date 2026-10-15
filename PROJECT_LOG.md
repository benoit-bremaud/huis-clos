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
