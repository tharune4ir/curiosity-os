---
title: "Data Types (Not All Boxes Are the Same Shape)"
icon: "Layers"
domain: "CODE MECHANICS"
---

## The Invisible Architecture
Different kinds of information need different kinds of dabba. A number (like a score: 150) is stored as an Integer or Float. Text (like a name: 'Ravi') is stored as a String. True or False (like 'is the user logged in?') is stored as a Boolean. A list of things (like all your contacts) is stored as an Array. A structured description (like a user profile with name, age, and city) is stored as an Object. Using the wrong type of dabba causes bugs that are infuriatingly hard to find.

## The Consumer Trap
When an IRCTC booking fails and shows a cryptic error, 40% of the time it's because someone passed a number where the system expected text, or a word where it expected a date. Data type mismatches cause billions of dollars in software bugs globally every year.

## The Builder Hack
A builder receiving user input from a web form always knows it arrives as a String — even if the user typed a number. They must explicitly convert '25' (text) to 25 (number) before doing math with it. Missing this step is one of the most common beginner bugs.

## The Superpower
You can read error messages in any language and identify data type bugs instantly. This makes debugging fast and precise instead of panicked and random.

## The First Line Of Code
In the browser console, type: typeof 'Ravi' — it says 'string'. Then type: typeof 25 — it says 'number'. Then type: typeof true — it says 'boolean'. You are inspecting the types of your dabbas.

## Linked Possibilities
- [[variables]]
- [[json-data-packaging]]
- [[functions]]
- [[databases-the-filing-cabinet]]
