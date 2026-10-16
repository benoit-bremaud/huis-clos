# Project Log — Huis Clos

Chronological audit trail of decisions and milestones, complementing `git log`.

## 2026-10-16 — SonarQube analysis set up (#42)

- **Decision**: self-hosted SonarQube (`localhost:9000`, project key `huis-clos`), the machine-wide
  standard. No CI scan job: GitHub-hosted runners cannot reach localhost, and the Community Build has
  no PR decoration, so the quality gate is read locally (dashboard / REST), not on the PR.
- **Added**: `sonar-project.properties` (backend, mobile, shared sources + Jest lcov) and `pnpm sonar`
  (coverage, then `sonar-scanner` with the global analysis token). `test:coverage` now passes with no tests.
- **First scan**: gate OK (Sonar way, new-code conditions only), overall coverage 17 %, 0 bugs,
  0 vulnerabilities, 12 code smells. Coverage work continues in #41 (#43–#48).

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
