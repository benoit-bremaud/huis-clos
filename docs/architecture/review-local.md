# Local review — huis-clos (docs/37-e2e-mvp-scope)

- Date: 2026-10-16
- Commit: ad94a52 (reviewed; all `file:line` refs below are @ad94a52) → fixes in d649abf
- Scope: branch diff main...HEAD (docs only: mvp-scope, README, PROJECT_LOG, 3 UML diagrams)
- Checks run: design · docs · tests · security · correctness
- Verdict: ship after fixes  ·  Must 4 (fixed) · Should 7 (6 fixed, 1 deferred) · Nice 4

## 🔴 Must Have
- `docs/architecture/diagrams/e2e-messaging/02-component.md:22` `[design|security]` · No auth component; unclear which endpoints are authenticated vs sealed · Fixed: Key auth component, every link labelled, relay send = delivery token only.
- `docs/mvp-scope.md:12` `[security]` · Threat model overclaimed: MLS Delivery Service sees circle membership and posters · Fixed: "Known metadata leaks (accepted for the MVP)".
- `docs/mvp-scope.md:28` `[security]` · Key-auth challenge had no anti-replay spec · Fixed: single-use nonce, short expiry, context string, connection binding.
- `docs/architecture/diagrams/e2e-messaging/03-sequence.md:24` `[security|correctness]` · PQXDH bundle lacked the Kyber pre-key and signature check · Fixed.

## 🟡 Should Have
- `README.md:20` `[docs]` · JWT listed as current auth · Fixed: marked legacy.
- `docs/mvp-scope.md:26` `[security]` · Pre-key exhaustion · Fixed: last-resort key, refill, rate limit.
- `docs/mvp-scope.md:35` `[security]` · Delivery token origin / relay retention · Fixed: profile-key derived token, 30-day cap, hour-rounded timestamps.
- `docs/mvp-scope.md:23` `[security]` · Local key storage and TOFU warning unspecified · Fixed: Keychain/Keystore, identity-change block.
- `02-component.md:32` `[design]` · Crypto module doing networking · Fixed: separate API/WebSocket client.
- `02-component.md:24` `[design]` · Relay and Delivery Service duplicate queueing · Deferred to #49 (Phase 3).
- `02-component.md` `[docs]` · Fan-out return path missing · Fixed.

## 🔵 Nice to Have
- `PROJECT_LOG.md:27` `[correctness]` · AGPL switch not tracked by an issue · Backlog issue to file.
- `03-sequence.md` `[security]` · Envelope / pre-key replay out of scope · Backlog issue to file.
- `docs/mvp-scope.md:76` `[docs]` · libsignal has no React Native binding; binding approach to refine · Covered by Phase 1 spike.
- `PROJECT_LOG.md:23` `[correctness]` · #36 vs #37 confusion · Disagree: verified on GitHub — #36 is the repo rename (closed), #37 this brick; the log is correct.

## ⚪ Disagree / Intentional
_None._

## Per-dimension summary
- Design: sound dependency direction; auth + transport seams added · Docs: ~95 % accurate, links valid · Tests: no code changed, no test needed · Security: metadata leaks now stated, auth/PQXDH specified · Correctness: no contradictions left.

## Pre-merge gate (head SHA)

| Step | Result |
|------|--------|
| 1 Tests | ✅ backend 9/9 · ⚠️ mobile and shared have no tests (`jest` exits 1, pre-existing) |
| 2 Coverage | ❌ tests: backend 62.9 % lines (< 80 % floor), mobile/shared 0 — pre-existing, untouched by this diff · docs: ~95 % (≥ 90 %) |
| 3 SonarQube | ❌ not run — no Sonar project exists for velia / huis-clos |
| 4 Secrets + diff read | ✅ gitleaks `main..HEAD` no leaks · diff read manually |
| 5 QA (smoke, docs-only) | ✅ lint + typecheck green · all Mermaid diagrams render: `docs/architecture/qa/2026-10-16-*.png` |
