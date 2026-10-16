# MVP Scope — Huis Clos

## MVP goal

Ship an **end-to-end encrypted social network**: people identified by keys (not phone numbers),
private 1-1 conversations, and *circles* (small groups) sharing encrypted text posts.
The server is a **blind relay**: it stores and forwards ciphertext and must learn as little
metadata as possible.

## Threat model (summary)

- **Trusted**: the user's own devices.
- **Untrusted**: the server operator, the network, hosting providers. A full server
  compromise must not reveal message or post content, and should reveal as little as
  possible about who talks to whom.
- **Out of scope for the MVP**: compromised devices, traffic-analysis resistance at the
  network level (Tor-style mixing), coercion, lost-device recovery (losing the only device
  loses the account until encrypted backup ships).
- **Known metadata leaks (accepted for the MVP)**: the server sees each circle's membership
  (needed by the MLS Delivery Service to fan out), group ids and epochs, who posts to a circle
  (posts are sent over an authenticated connection, no sealed sender for circles), recipient
  ids, coarse timestamps and client IPs. Hidden group membership is a post-MVP study.

## Phases (in order)

### Phase 1 — Key-based identity (Must)

- On-device generation of a long-term identity key pair; no phone number or email required.
- Account = public identity key + random handle; the private key never leaves the device.
- Contact verification by QR code / safety number (fingerprint comparison).
- Upload of the Signal key bundle: signed EC pre-key, signed post-quantum (Kyber) pre-key,
  one-time pre-keys and a last-resort pre-key. Clients refill below a threshold; bundle
  fetches are rate-limited so an attacker cannot drain one-time pre-keys.
- Trust on first use: a contact's identity key change blocks sending until the user
  acknowledges a warning (protects against key substitution by the directory).
- Private keys and the local store key live in iOS Keychain / Android Keystore; uninstalling
  the app destroys them.
- The existing email/password + JWT auth (`apps/backend` auth module) becomes legacy and is
  replaced by key-based authentication: the server issues a single-use random nonce with a
  short expiry, the device signs `huis-clos-auth-v1 || nonce || connection id`, and the
  server consumes the nonce on verification (no replay). The matching
  `User.email` / `AuthTokens` types in `packages/shared` are legacy too.

### Phase 2 — 1-1 E2E chat (Must)

- Signal protocol via **libsignal**: PQXDH session setup + Double Ratchet
  (forward secrecy and post-compromise security).
- **Sealed sender**: the server delivers to a recipient without learning the sender. Sends to
  the relay are unauthenticated and carry a delivery token derived from the recipient's
  profile key, shared only with contacts and revoked by rotating that key.
- Relay retention: envelopes deleted on acknowledgement, at most 30 days otherwise;
  timestamps rounded to the hour.
- **Size padding**: ciphertexts are padded to fixed buckets to hide message length.
- Text messages only, offline delivery (store-and-forward).

### Phase 3 — Circles (Must)

- A circle is an **MLS group** (RFC 9420) via **OpenMLS**: add/remove members,
  forward secrecy and post-compromise security at group scale.
- Encrypted **text posts** published to a circle, readable by current members only.
- The server orders and fans out MLS handshake/application messages (Delivery Service role)
  without access to group secrets.

### After the MVP (Should, in order)

1. Encrypted media (client-side encrypted blobs, key carried in the message).
2. Encrypted backup / multi-device restore (key derived from a user recovery secret).
3. Push notifications without content (wake-up only).

## Out of scope

- Audio/video calls, stories, public feed, discovery by phone number or contacts upload.
- Federation (FUTO Circles relies on Matrix as of 2026-10; we deliberately stay single-provider for the MVP).

## Protocol and library choices (MCDA, 2026-10-16)

| Need | Option chosen | Score | Runner-up |
|------|---------------|-------|-----------|
| 1-1 messaging | libsignal (Signal protocol) | 385/500 | vodozemac / Olm — 340 |
| Circles | OpenMLS (RFC 9420) | 430/500 | mls-rs — 390 |

Weights: security/audits 35, sealed-sender fit 20, React Native integration 20, license 15,
maturity 10 (1-1); RFC/PCS 35, maturity 25, RN integration 20, docs 20 (circles).

**Consequences**:

- libsignal is **AGPL-3.0**: the clients (and any server code linking it) must be distributed
  under AGPL-3.0. The repository is currently MIT — a license change is required before
  shipping libsignal code (update `package.json` and add a `LICENSE` file).
- Both libraries are Rust: React Native needs a native binding (Rust → JSI/Turbo Module via
  `uniffi`/Expo module). This is the main technical risk and is tackled first in Phase 1.

## Architecture

UML diagrams: [`docs/architecture/diagrams/e2e-messaging/`](architecture/diagrams/e2e-messaging/)
(use cases, components, sequences).

## Definition of Done

- UML diagrams updated before implementation of each phase.
- Code review passed, unit tests ≥ 80% coverage.
- No plaintext content or private key ever reaches the server (asserted by tests).
- Documentation updated; test deployment validated.
