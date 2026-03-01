---
title: "SQL Injection (Lying to the Database)"
icon: "Syringe"
domain: "CYBERSECURITY & CRYPTOGRAPHY"
---

## The Invisible Architecture
Imagine a login form. Behind it, the server asks the database: 'Find user where name = [input] AND password = [input]'. A hacker types: username = ' OR '1'='1 — the query becomes 'Find user where name='' OR 1=1'. Since 1=1 is always true, it returns ALL users, and the hacker is logged in as the first user in the database — often the admin. This is SQL Injection — sneaking database commands into input fields. It's one of the oldest hacks and still one of the most common.

## The Consumer Trap
Many small Indian business websites and government portals were built in the 2000s without SQL injection protection. Attackers have used this to steal thousands of voter records, student data, and customer information from sites that still exist today.

## The Builder Hack
A builder defends against SQL injection by using 'parameterized queries' — they never directly insert user input into a SQL string. Instead, they send the SQL template and the values separately, and the database handles them safely. This one practice blocks 99% of SQL injection attacks.

## The Superpower
You can identify a vulnerable form field on a website, understand exactly how it would be exploited, and more importantly, know how to build forms that cannot be injected. Security is a design skill, not just a patch.

## The First Line Of Code
Google 'OWASP Top 10 vulnerabilities'. SQL Injection is almost always on the list. Read the OWASP explanation — it is the global standard reference for web security and written for developers to learn from.

## Linked Possibilities
- [[databases-the-filing-cabinet]]
- [[sql-queries]]
- [[cybersecurity-mindset]]
- [[zero-day-vulnerabilities]]
