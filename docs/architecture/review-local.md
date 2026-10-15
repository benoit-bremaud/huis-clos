# Local review — huis-clos (chore/rename-huis-clos)

- Date: 2026-10-15
- Commit: ad93c6e
- Scope: branch diff main...HEAD (35 files, rename-only)
- Checks run: design · docs · tests · security · correctness (single inline pass — the diff is a mechanical rename with no logic change)
- Verdict: ship as-is  ·  Must 0 · Should 2 · Nice 1

## 🔴 Must Have
_None._

## 🟡 Should Have
- `README.md:24`, `CONTRIBUTING.md:29`, `.github/GITHUB_SETTINGS.md:153` `[docs]` · URLs now target `benoit-bremaud/huis-clos`, which does not exist until the GitHub repo is renamed · Rename the repo (`gh repo rename huis-clos`) immediately after merge; GitHub then redirects the old URL.
- `docs/mvp-scope.md:52`, `README.md:3` `[docs]` · New title says "E2E-encrypted social network" while the subtitle still says "messagerie" and MVP scope lists E2E as out of scope · Rewrite the MVP scope and the vision in the dedicated E2E brick (tracked in PROJECT_LOG).

## 🔵 Nice to Have
- `apps/mobile/src/features/auth/infrastructure/storage/token-storage.ts:4` `[correctness]` · Storage key change signs out existing sessions · Acceptable: no published app and no users yet.

## ⚪ Disagree / Intentional
- `apps/mobile/app.config.ts:18` `[design]` · Bundle id `app.huisclos.mobile` does not use the slug spelling · Android forbids `-`; owner decision 2026-10-15 (PROJECT_LOG).

## Per-dimension summary
- Design: no structural change · Docs: 2 coherence follow-ups · Tests: 9/9 pass, fixtures moved to reserved `.test` TLD · Security: no secrets, no new surface · Correctness: lint + typecheck + tests green, zero `velia` left in tracked files.
