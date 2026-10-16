# Use-case diagram — e2e-messaging — MVP goals

> **Feature**: issue #37 — [MVP scope](../../../mvp-scope.md)

## Context

Actor goals for the MVP (identity, 1-1 chat, circles), grouped by domain.
Does not show which component implements them (see `02-component.md`).

## Diagram

```mermaid
flowchart LR
    user(["👤 Member"])
    admin(["👤 Circle owner"])

    subgraph Identity
        UC1([Create key-based identity])
        UC2([Verify a contact's safety number])
        UC3([Add a contact by QR code])
    end

    subgraph Conversation
        UC4([Send an encrypted message])
        UC5([Read a conversation])
    end

    subgraph Circles
        UC6([Create a circle])
        UC7([Invite a member to a circle])
        UC8([Remove a member from a circle])
        UC9([Publish an encrypted post])
        UC10([Read circle posts])
    end

    user --> UC1 & UC2 & UC3 & UC4 & UC5 & UC9 & UC10
    admin --> UC6 & UC7 & UC8
    admin -. specialises .-> user
    UC3 -. include .-> UC2
```

## Notes

- Mermaid has no native use-case notation; ellipses (`([ ])`) stand for use cases.
- Receiving a message is a trigger, not a goal: it is covered by *Read a conversation*.
- The server is not an actor: it is a system component.
