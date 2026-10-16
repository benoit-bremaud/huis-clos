# Local review — huis-clos (branch diff main...HEAD, #42)

- Date: 2026-10-16
- Scope: branch diff main...HEAD (config only: sonar-project.properties, package.json scripts, .gitignore, PROJECT_LOG)
- Checks run: correctness · security · docs (pr-review-toolkit:code-reviewer, proportional to a config-only diff) + execution checks
- Verdict: ship (push) · Must 0 open (1 fixed) · Should 2 · Nice 2

## Pre-merge gate
| Step | Result |
|---|---|
| 1 Tests | ✅ backend 9/9 · mobile/shared: no tests (#41) |
| 2 Coverage | ❌ 17 % overall (floor 80) — tracked in #41 (#43–#48) |
| 3 SonarQube | ✅ PASSED (self-hosted, project `huis-clos`) |
| 4 Secrets | ✅ gitleaks clean (main..HEAD) · only `.env.example` tracked · diff read: nothing sensitive |
| 5 QA pass | n/a — tooling-only diff, no runtime change; scan executed end to end |
- Gate: **RED — step 2 (coverage)**, a known pre-existing gap; merging is the owner's call.

## 🔴 Must Have
- ~~`sonar-project.properties:9` [correctness] · specs indexed as both sources and tests~~ → fixed: test patterns added to `sonar.exclusions`.

## 🟡 Should Have
- `sonar-project.properties:16` [correctness] · mobile/shared lcov files are absent until tests exist → documented in the file header.
- `PROJECT_LOG.md` [docs] · figures re-checked after the fix (unchanged: gate OK, 17 %).

## 🔵 Nice to Have
- `sonar-project.properties:13` [correctness] · `**/index.ts` coverage exclusion too broad → narrowed to `packages/shared/src/index.ts` (applied).
- `apps/backend/jest.config.js` [tests] · no `collectCoverageFrom`; local Jest reports omit untested files → handle in #41.

## ⚪ Disagree / Intentional
- No CI scan job: owner decision (self-hosted, localhost unreachable from GitHub runners, no PR decoration in Community Build).
