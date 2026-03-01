---
title: "Conditionals (Teaching Machines to Make Decisions)"
icon: "GitFork"
domain: "CODE MECHANICS"
---

## The Invisible Architecture
A conditional says: 'IF this is true, do THIS. ELSE, do THAT.' Like a traffic signal: IF light is green, go. ELSE, stop. Every decision-making system in software is built from conditionals. Your UPI transaction: IF balance >= payment amount AND PIN is correct, transfer money. ELSE, decline. Your Zomato delivery fee: IF distance > 5km, add 30 delivery fee. ELSE, free delivery. Simple IF/ELSE blocks, stacked together, make software that appears intelligent.

## The Consumer Trap
When Swiggy says 'Free delivery for orders above 149!', people feel like they've discovered a loophole. In reality, a developer wrote one line of conditional logic 3 years ago: if (order_total >= 149) { delivery_fee = 0; }. The 'loophole' is the feature.

## The Builder Hack
A builder writing a login system writes: IF email exists AND password matches stored hash, grant access. ELSE, reject. They also add: IF failed_attempts >= 5, lock account for 30 minutes. These nested conditionals are the entire security system of the login page.

## The Superpower
You can deconstruct any business rule into code. 'Free delivery above 199', 'loyalty points for premium users', 'age verification for 18+ content' — all of these are just conditionals. You can build any business logic.

## The First Line Of Code
In the browser console, type: let score = 85; if(score >= 90){ console.log('A') } else if(score >= 80){ console.log('B') } else { console.log('C') }. You just wrote a grading system.

## Linked Possibilities
- [[variables]]
- [[loops]]
- [[functions]]
- [[electricity-and-logic-gates]]
