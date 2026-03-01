---
title: "Functions (Reusable Magic Spells)"
icon: "FunctionSquare"
domain: "CODE MECHANICS"
---

## The Invisible Architecture
A function is a named, reusable block of instructions — like a named recipe. You write 'calculateDeliveryFee(distance, orderTotal)' once. Then you can call it a million times with different inputs. It's like having a recipe called 'Make Chai'. Anyone in the house can call 'Make Chai' and get chai. They don't need to know the recipe — just the name and what to give it (water, milk, sugar). Functions hide complexity and create reuse.

## The Consumer Trap
Every button on every app in the world — the 'Place Order' button on Flipkart, the 'Recharge' button on Paytm — triggers a function. The user thinks they 'pressed a button'. A developer thinks they 'called a function that validates the cart, calculates final price, initiates payment, and updates the database'.

## The Builder Hack
A builder's rule: if they write the same code more than twice, they turn it into a function. This keeps their codebase small and changes easy — if the delivery fee formula changes, they update it in ONE function, and it updates everywhere automatically.

## The Superpower
You think in abstractions. Instead of 'write the same code repeatedly', you think 'create a tool once, use it everywhere'. This is the foundation of professional software engineering.

## The First Line Of Code
In the browser console: function greet(name){ return 'Namaste, ' + name + '!' }. Then type: greet('Priya'). Then: greet('Rahul'). You built a reusable machine.

## Linked Possibilities
- [[loops]]
- [[conditionals]]
- [[variables]]
- [[apis-the-digital-waiter]]
- [[compilers]]
