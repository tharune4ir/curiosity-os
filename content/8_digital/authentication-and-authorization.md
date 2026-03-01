---
title: "Authentication vs Authorization (Who Are You? What Can You Do?)"
icon: "KeyRound"
domain: "CYBERSECURITY & CRYPTOGRAPHY"
---

## The Invisible Architecture
Authentication asks 'Who are you?' — verifying your identity with a username and password, OTP, or biometric. Authorization asks 'What are you allowed to do?' — checking your permissions after identity is confirmed. A junior employee at a bank may be authenticated (they have a valid login) but not authorized to access the CEO's account statements. In software: every logged-in user is authenticated. Only admin users are authorized to delete other accounts. Confusing these two causes catastrophic security bugs.

## The Consumer Trap
When a data breach happens and a user says 'but I was logged in, how did they access my data?', the attacker was authenticated as someone else — or the system failed to check authorization. Authentication without authorization is like a building that checks ID at the entrance but lets everyone into every room.

## The Builder Hack
A builder builds Role-Based Access Control (RBAC): 'admin' role can delete users, 'editor' role can create posts, 'viewer' role can only read. They check authorization on every API route on the server — never trusting the client to enforce permissions. 'The client says I'm an admin' is always a security failure.

## The Superpower
You build secure multi-user systems where each user can only access what they're supposed to. This skill is required for almost every real-world application — from school management systems to hospital records.

## The First Line Of Code
Log into any app that has different user roles — maybe a school system or a company portal. Note the difference between what you can see vs. what an admin can see. That visual difference is authorization at work.

## Linked Possibilities
- [[hashing-digital-fingerprints]]
- [[encryption-locks-on-data]]
- [[databases-the-filing-cabinet]]
- [[cybersecurity-mindset]]
