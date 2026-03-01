---
title: "Feedback Loops (Telling the User What Happened)"
icon: "MessageSquare"
domain: "UX/UI & HCI"
---

## The Invisible Architecture
Every action in a well-designed interface gives feedback. Click a button — it changes color and shows a loading spinner (visual feedback). Payment succeeds — phone vibrates and plays a sound (haptic + audio feedback). Form error — a red border appears around the wrong field with an explanation (error feedback). Feedback loops close the communication between user and system. Without feedback, users don't know if their action worked, and they repeat it — leading to double orders, double payments, and confusion.

## The Consumer Trap
When people click a slow button multiple times because nothing happened, they're experiencing a missing feedback loop. A well-designed button would immediately show a spinner on first click and disable itself — preventing repeat submissions. Most government portal failures (double tax filings, double payment confirmations) are caused by missing feedback.

## The Builder Hack
A builder adds a 'disabled + loading' state to every button that triggers a network request. The moment the user clicks, the button shows a spinner and cannot be clicked again until the action completes. This eliminates double submissions and makes the app feel responsive even when the network is slow.

## The Superpower
You design systems that communicate with users in real time. Apps with good feedback feel responsive, trustworthy, and alive. Apps without it feel broken, unresponsive, and untrustworthy — even if the underlying code is identical.

## The First Line Of Code
Pay attention to the next 3 times you get feedback from an app — a vibration, a sound, a color change. For each one, ask: what action triggered this feedback, and what would happen if the feedback was missing? That's UX analysis.

## Linked Possibilities
- [[ux-ui-design-overview]]
- [[affordances-and-signifiers]]
- [[friction-in-design]]
