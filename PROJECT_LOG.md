# Project Log — Huis Clos

Chronological audit trail of decisions and milestones, complementing `git log`.

## 2026-10-24 — Transport security added to the MVP scope (#53)

- **PR #54 merged** (`a2c1b18`) — `docs(mvp): add a transport-security section to the MVP scope`,
  branch `docs/53-transport-security`. `docs/mvp-scope.md` now requires TLS 1.3 only on every
  client-server connection (REST and WebSocket), certificate pinning with a backup pin, fail-closed
  behaviour on a mismatch, and safety-number comparison at first contact. Accepted residual leaks:
  client IP, traffic timing and size. One Definition of Done line added.
- **Decision (MCDA, Android floor)**: the Codex review of PR #54 noted that Expo 51 apps stay
  installable on Android 6–9, whose platform TLS stack cannot negotiate TLS 1.3. Chosen: require
  Android 10 (API 29) or later (475/500), over embedding Conscrypt (395/500, native dependency and
  extra attack surface) and over allowing TLS 1.2 (385/500, weakens the network-attacker goal).
  `minSdkVersion` 29 is still to be set in `apps/mobile/app.config.ts` when the transport layer ships.
- **Review cycle**: two Codex rounds, both findings fixed and answered inline (Android floor; stale
  local-review report). Copilot never posted a review: the API did not register it as a reviewer,
  and the owner chose to go without it.
- **Gate exception (owner)**: merged with the pre-merge gate red on step 2 (backend coverage 65 %,
  mobile and shared 0 %, floor 80 %, tracked in #43–#48), documentation coverage not measured and
  the QA pass not run. Rationale: docs-only diff, no runtime impact. CI fully green, SonarQube
  passed, gitleaks clean. Same precedent as PR #38 and PR #52.

## 2026-10-16 — SonarQube analysis set up (#42)

- **PR #52 merged** (`5d517a0`) — `ci(sonar): add self-hosted SonarQube analysis`, branch
  `ci/42-sonarqube-quality-gate`.
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

## 2026-10-16 — Repository made public, Gitleaks CI merged

- **Incident**: every GitHub Actions job refused to start (account billing / spending limit).
  Owner cannot pay for now.
- **Decision (MCDA)**: switch the repo to public (445/500) over a self-hosted runner (380) or
  local-only checks (275). Consistent with the owner rule "public until first production
  deployment" — the repo had been private by mistake. Public release checklist green
  (full-history gitleaks clean, `.env.example` placeholders only, no dev secret to rotate).
- **Merged**: PR #51 `ci: add gitleaks secret scan workflow`, squash `8fa8063` (closes #50),
  the last missing checklist item. Merged with owner approval while the pre-merge gate
  coverage / SonarQube steps are still red (pre-existing, tracked in #41, #42).
- **Reviewers**: Codex quota exhausted and Copilot reviewer unavailable; substitute review by
  the local `pr-review-toolkit` agents on #38.
- **Gate exception (owner, MCDA 440/500)**: PR #38 merged although pre-merge gate steps 2–3
  (coverage, SonarQube) are red. Rationale: docs-only diff, no runtime impact, and the
  "one chat per brick" rule otherwise deadlocks #41/#42. CI fully green on the merged head.
  One-off exception for docs-only PRs; code PRs stay bound by the full gate.
