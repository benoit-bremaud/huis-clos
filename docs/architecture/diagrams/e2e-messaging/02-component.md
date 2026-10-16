# Component diagram — e2e-messaging — blind-relay architecture

> **Feature**: issue #37 — [MVP scope](../../../mvp-scope.md)

## Context

Where encryption happens (device only) and what the server can see (ciphertext plus minimal
routing data). Does not cover media or backup (post-MVP).

## Diagram

```mermaid
flowchart TB
    subgraph Mobile["apps/mobile (Expo)"]
        UI[Feature UI: identity / chat / circles]
        Crypto["Crypto module (native, Rust)<br/>libsignal + OpenMLS"]
        Store[("Encrypted local store<br/>keys, sessions, group state")]
        UI --> Crypto
        Crypto --> Store
    end

    subgraph Backend["apps/backend (NestJS) — blind relay"]
        Keys[Key directory<br/>public bundles, pre-keys]
        Relay[Sealed-sender relay<br/>store-and-forward queues]
        DS[MLS Delivery Service<br/>ordering + fan-out]
        DB[("PostgreSQL<br/>ciphertext only")]
        Keys --> DB
        Relay --> DB
        DS --> DB
    end

    Crypto -- "public key bundles (HTTPS)" --> Keys
    Crypto -- "padded sealed envelopes (HTTPS send, WebSocket receive)" --> Relay
    Crypto -- "MLS handshake / application messages" --> DS
```

## Notes

- Private keys and plaintext never cross the Mobile boundary.
- The relay stores recipient id, timestamp and padded ciphertext — not the sender (sealed sender).
- `packages/shared` holds only wire types (envelopes, DTOs), no crypto.
