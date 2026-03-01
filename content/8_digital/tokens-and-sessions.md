---
title: "Sessions & JWT Tokens (Your Digital Access Pass)"
icon: "Ticket"
domain: "CYBERSECURITY & CRYPTOGRAPHY"
---

## The Invisible Architecture
After you log in, the server needs to remember who you are for every subsequent request — because HTTP is stateless (each request is independent, like amnesia). Two solutions: Sessions (the server stores 'user 4821 is logged in' and gives you a session ID cookie, like a wristband at an event) or JWT Tokens (the server gives you a cryptographically signed pass containing your identity — no server storage needed). Every website you've logged into uses one of these. Your session is what gets stolen in a 'session hijacking' attack.

## The Consumer Trap
When you're automatically logged out after 30 minutes of inactivity, it's not arbitrary annoyance — your session token has expired, and the server refuses to accept it anymore. Banks expire sessions quickly for security; streaming apps extend them for convenience. The timer is a deliberate security tradeoff.

## The Builder Hack
A builder implementing login uses JWT (JSON Web Tokens) — the server generates a signed token containing userID and role, sends it to the client, and the client includes it in every API request. The server verifies the signature without checking any database. This scales to millions of users because there's no server-side session storage.

## The Superpower
You understand how login systems actually work — enabling you to build secure authentication, debug 'why did I get logged out?', and identify session-based attacks. This is fundamental to every web application.

## The First Line Of Code
Go to 'jwt.io'. Paste any JWT token you find (open browser DevTools on any site you're logged into, check Application > Cookies or Local Storage for tokens starting with 'eyJ'). See it decoded into readable JSON. The content is visible — only the signature is secret.

## Linked Possibilities
- [[authentication-and-authorization]]
- [[hashing-digital-fingerprints]]
- [[http-requests]]
- [[client-server-model]]
