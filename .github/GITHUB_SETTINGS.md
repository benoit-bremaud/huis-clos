# GitHub Settings Guide

> This document describes the GitHub settings that must be configured manually, as they cannot be version-controlled.

## Branch Protection Rules (main)

Navigate to: **Settings → Branches → Add rule**

### Required Settings

- [ ] **Branch name pattern**: `main`
- [ ] **Require pull request reviews before merging**: Enabled
  - [ ] **Required reviewers**: 0 (optional for solo development)
  - [ ] **Dismiss stale pull request approvals when new commits pushed**: Enabled
  - [ ] **Require review from Code Owners**: Disabled

- [ ] **Require status checks to pass before merging**
  - [ ] **Require branches to be up to date before merging**: Enabled
  - [ ] Add required status checks:
    - [ ] `Validate Branch Name`
    - [ ] `Validate Commit Messages`
    - [ ] `Validate PR Title`

- [ ] **Require signed commits**: Optional (recommended for security)
- [ ] **Allow force pushes**: Disabled
- [ ] **Allow deletions**: Disabled

### Rule Set (Alternative to Branch Protection Rules)

If using Rule Sets (recommended for organization):

1. Navigate to **Settings → Rules → Rule sets**
2. Create a new rule set for `main`
3. Configure:
   - **Target**: Include `main` only
   - **Bypass permissions**: Disable for administrators
   - **Require pull request**: Enabled
   - **Required reviewers**: 0 (optional)
   - **Check required status**: Enabled
     - Add workflows from `.github/workflows/`

## Pull Request Settings

Navigate to: **Settings → Pull Requests**

### Recommended Settings

- [ ] **Allow squash merging**: Enabled
- [ ] **Default to pull request title for squash merge**: Enabled
- [ ] **Allow merge commits**: Disabled
- [ ] **Allow rebasing**: Disabled
- [ ] **Automatically delete head branches**: Enabled

## Security Settings

### Dependabot (Optional but Recommended)

Navigate to: **Settings → Security → Dependabot**

- [ ] **Enable Dependabot security updates**: Enabled
- [ ] **Enable Dependabot version updates**: Optional

### Secret Scanning (Recommended)

Navigate to: **Settings → Security → Secret scanning**

- [ ] **Enable secret scanning**: Enabled
- [ ] **Enable push protection**: Enabled

## Copilot Settings (for Code Review)

Navigate to: **Settings → Code security and analysis**

### GitHub Copilot

- [ ] **Enable GitHub Copilot**: Enabled
- [ ] **Enable Copilot for code review**: Enabled
  - [ ] **Set review assignment rules**: `benoit-bremaud` as reviewer

## Issue Settings

Navigate to: **Settings → Issues**

- [ ] **Projects**: Enable as needed
- [ ] **Allow users to delete issues**: Disabled
- [ ] **Allow close and reopen issues**: Enabled

## Automation Settings

### Auto-assign

Install and configure **Probot Auto Assign** app or use GitHub Actions:

Recommended action: `actions/stale` for issue/PR management

## Labels Management

Create the following labels in **Issues → Labels**:

### Type Labels
| Label | Color | Description |
|-------|-------|-------------|
| `type::bug` | 🔴 Red | Bug reports |
| `type::feature` | 🟢 Green | Feature requests |
| `type::improvement` | 🔵 Blue | Improvements |
| `type::task` | 🟡 Yellow | Technical tasks |
| `type::documentation` | ⚪ White | Documentation |

### Priority Labels
| Label | Color | Description |
|-------|-------|-------------|
| `priority::critical` | 🔴 Red | Critical priority |
| `priority::high` | 🟠 Orange | High priority |
| `priority::medium` | 🟡 Yellow | Medium priority |
| `priority::low` | ⚪ White | Low priority |

### Scope Labels
| Label | Color | Description |
|-------|-------|-------------|
| `scope::auth` | 🔵 Blue | Authentication |
| `scope::profile` | 🟣 Purple | User profile |
| `scope::chat` | 🟢 Green | Chat/messaging |
| `scope::contacts` | 🟡 Yellow | Contacts |
| `scope::notification` | 🔴 Red | Notifications |
| `scope::i18n` | 🟠 Orange | Internationalization |
| `scope::infra` | ⚪ White | Infrastructure |
| `scope::docs` | 🔵 Blue | Documentation |

### Status Labels
| Label | Color | Description |
|-------|-------|-------------|
| `status::wontfix` | ⚫ Black | Won't be fixed |
| `status::duplicate` | ⚫ Black | Duplicate issue |
| `status::invalid` | ⚫ Black | Invalid issue |
| `status::good first issue` | 🟢 Green | Good for newcomers |

## Repository Settings Summary

| Setting | Value |
|---------|-------|
| Default branch | `main` |
| Squash merging | ✅ Enabled |
| Merge commits | ❌ Disabled |
| Rebase merging | ❌ Disabled |
| Auto-delete branches | ✅ Enabled |
| Branch protection (main) | ✅ Enabled |
| Status checks | ✅ Required |
| Copilot review | ✅ Required |
| Secret scanning | ✅ Enabled |

## Quick Links

- Repository Settings: `https://github.com/benoit-bremaud/velia/settings`
- Branch Protection: `https://github.com/benoit-bremaud/velia/settings/branches`
- Rules: `https://github.com/benoit-bremaud/velia/settings/rules`
- Actions: `https://github.com/benoit-bremaud/velia/actions`
- Issues: `https://github.com/benoit-bremaud/velia/issues`

---

**Document maintainer:** Benoit Bremaud
**Last updated:** 2025-02-11
**Version:** 1.0.0
