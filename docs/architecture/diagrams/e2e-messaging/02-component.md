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
        Net[API / WebSocket client]
        UI --> Crypto
        UI --> Net
        Crypto --> Store
    end

    subgraph Backend["apps/backend (NestJS) — blind relay"]
        Auth[Key auth<br/>nonce challenge, signed by device key]
        Keys[Key directory<br/>public bundles, pre-keys]
        Relay[Sealed-sender relay<br/>store-and-forward queues]
        DS[MLS Delivery Service<br/>ordering + fan-out]
        DB[("PostgreSQL<br/>ciphertext only")]
        Keys --> DB
        Relay --> DB
        DS --> DB
    end

    Net -- "challenge / signed response" --> Auth
    Net -- "public key bundles (HTTPS, authenticated)" --> Keys
    Net -- "padded sealed envelopes (HTTPS send unauthenticated + delivery token)" --> Relay
    Relay -- "queued envelopes (WebSocket, authenticated recipient)" --> Net
    Net -- "MLS handshake / application messages (authenticated)" --> DS
    DS -- "fan-out (WebSocket)" --> Net
```

## Notes

- Private keys and plaintext never cross the Mobile boundary; `Net` only carries ciphertext.
- Every endpoint is authenticated by the key-auth session except the relay's send endpoint,
  which accepts a delivery token instead so the sender stays hidden.
- The Delivery Service knows circle membership (accepted leak, see `mvp-scope.md`).
- The relay stores recipient id, timestamp and padded ciphertext — not the sender (sealed sender).
- `packages/shared` holds only wire types (envelopes, DTOs), no crypto.
