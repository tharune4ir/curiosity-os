---
title: "Event-Driven Architecture (React to Things That Happen)"
icon: "Bell"
domain: "SYSTEM ARCHITECTURE"
---

## The Invisible Architecture
Traditional programming is sequential — do step 1, then step 2, then step 3. Event-driven programming says: 'When THIS happens, do THAT.' Your browser is entirely event-driven: when the user clicks (click event), run this code. When a key is pressed (keydown event), run that code. When data arrives from the server (message event), update the UI. This model allows programs to respond to unpredictable user actions and external events without constantly checking 'did anything happen?'

## The Consumer Trap
Every tap on a touchscreen, every notification that pops up, every auto-suggest that appears as you type — these are events that your phone's OS or the app is listening for and responding to. The phone is not constantly 'looking' for your touch — it's waiting, asleep, until an event fires.

## The Builder Hack
A builder building a notification system uses a message queue (like RabbitMQ or AWS SQS) — when an order is placed (event fires), a message is sent to the queue. The email service listens to the queue and sends a confirmation email. The SMS service listens and sends an SMS. The analytics service listens and logs it. Each service reacts independently — decoupled, resilient, scalable.

## The Superpower
You can design reactive systems where components communicate through events without being tightly coupled. This is the architecture behind Zomato's order notifications, bank transaction alerts, and any real-time update system.

## The First Line Of Code
Open the browser console. Type: document.addEventListener('click', (e) => console.log('You clicked at', e.clientX, e.clientY)). Now click anywhere on the page. Watch coordinates print in real time. You are listening to browser events.

## Linked Possibilities
- [[functions]]
- [[websockets-real-time]]
- [[backend-nodejs]]
- [[microservices]]
