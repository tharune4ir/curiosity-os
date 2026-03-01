---
title: "REST API (The Standard Menu for the Internet)"
icon: "Network"
domain: "SYSTEM ARCHITECTURE"
---

## The Invisible Architecture
REST (Representational State Transfer) is the most popular style of designing APIs — like agreeing on a standard restaurant menu format. In REST, every 'thing' (user, product, order) has its own URL, and you use HTTP methods to act on it: GET /users — get all users. POST /users — create a new user. PUT /users/5 — update user 5. DELETE /users/5 — delete user 5. This standard format means any developer anywhere in the world can understand and use a REST API immediately.

## The Consumer Trap
When an influencer's Instagram goes 'viral', their app sends thousands of GET /posts/{id}/likes requests to Instagram's REST API every second. The API handles this load (or doesn't — and the 'API rate limit' kicks in, temporarily blocking further requests). Viral moments are a server stress test.

## The Builder Hack
A builder building the backend of a food ordering app designs their REST API: GET /menu, POST /orders, GET /orders/{id}/status. They write this contract first — before writing any frontend code. This way, the frontend team can start working immediately using mock data, while the backend team builds the real implementation.

## The Superpower
You can design the 'contract' between any two software systems. API design is an architectural skill that makes you invaluable on any team — you become the person who defines how systems talk to each other.

## The First Line Of Code
Download the app 'Postman' (free). Import any public API collection. Click 'Send' on a pre-built GET request. You just tested a production API like a professional developer.

## Linked Possibilities
- [[apis-the-digital-waiter]]
- [[http-requests]]
- [[json-data-packaging]]
- [[client-server-model]]
- [[backend-nodejs]]
