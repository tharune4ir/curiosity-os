---
title: "Rate Limiting (The Bouncer for Your API)"
icon: "Gauge"
domain: "SYSTEM ARCHITECTURE"
---

## The Invisible Architecture
When you call an API too many times too fast, you get a 429 error — 'Too Many Requests'. This is rate limiting — the server tracks how many requests you've made in a time window and rejects excess ones. Like a bouncer who says 'You've entered the club 5 times tonight — come back tomorrow'. Rate limiting protects servers from being overwhelmed (DoS attacks), prevents abuse (someone scraping all your data), and ensures fair usage (one heavy user can't starve all others of server resources).

## The Consumer Trap
When Swiggy shows you 'Please wait before searching again', or a government portal says 'Too many login attempts — try after 10 minutes', you're hitting rate limits. These aren't bugs — they're features explicitly designed to protect the server and prevent automated abuse.

## The Builder Hack
A builder adding a contact form to their website immediately adds rate limiting — maximum 3 submissions per IP per hour. Without it, spammers will find the form and send thousands of fake submissions per minute, filling their inbox and potentially crashing their server. Rate limiting is mandatory, not optional.

## The Superpower
You design APIs that are resilient to abuse from day one. This prevents downtime, protects your costs (cloud compute isn't free), and ensures legitimate users always have a good experience even when bad actors try to overwhelm your system.

## The First Line Of Code
Call any public API in your browser repeatedly — try hitting it 20 times in 10 seconds. Many will return a 429 error after a few calls. Read the response — it usually tells you how long to wait. That's rate limiting protecting the server from you.

## Linked Possibilities
- [[apis-the-digital-waiter]]
- [[rest-api]]
- [[cybersecurity-mindset]]
- [[cloud-hosting]]
