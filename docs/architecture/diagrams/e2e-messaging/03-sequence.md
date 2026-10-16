# Sequence diagram — e2e-messaging — 1-1 message and circle post

> **Feature**: issue #37 — [MVP scope](../../../mvp-scope.md)

## Context

Happy paths for *Send an encrypted message* (Signal, sealed sender) and *Publish an encrypted
post* (MLS). Error paths (exhausted pre-keys, MLS epoch conflicts) are left to later diagrams.

## Diagram — 1-1 message

```mermaid
sequenceDiagram
    actor Alice
    participant AD as Alice's device
    participant K as Key directory
    participant R as Sealed-sender relay
    participant BD as Bob's device
    actor Bob

    Alice->>AD: Write message to Bob
    alt no session yet
        AD->>K: GET Bob's pre-key bundle
        K-->>AD: identity key, signed pre-key, one-time pre-key
        AD->>AD: PQXDH → session
    end
    AD->>AD: Double Ratchet encrypt + pad to bucket
    AD->>AD: Seal sender identity inside envelope
    AD->>R: POST envelope (recipient = Bob, delivery token)
    R-->>AD: 202 Accepted
    BD->>R: Fetch queued envelopes
    R-->>BD: envelope
    BD->>BD: Unseal sender, decrypt, unpad
    BD->>R: ACK (relay deletes envelope)
    Bob->>BD: Read conversation
```

## Diagram — circle post

```mermaid
sequenceDiagram
    actor Alice
    participant AD as Alice's device
    participant DS as MLS Delivery Service
    participant MD as Members' devices

    Alice->>AD: Publish post to circle
    AD->>AD: MLS encrypt (current epoch) + pad
    AD->>DS: POST application message (group id, epoch)
    DS->>DS: Check epoch ordering
    DS->>MD: Fan-out to current members
    MD->>MD: MLS decrypt with epoch secret
```

## Notes

- The delivery token authorises the send without revealing the sender (Signal-style
  unidentified delivery).
- Removing a member creates a new MLS epoch: removed members cannot decrypt later posts.
