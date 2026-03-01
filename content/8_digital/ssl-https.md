---
title: "SSL/HTTPS (The Secure Tunnel for Your Data)"
icon: "ShieldCheck"
domain: "CYBERSECURITY & CRYPTOGRAPHY"
---

## The Invisible Architecture
When you visit a website with 'https://' and a padlock icon, your browser and the server are communicating through a secure encrypted tunnel — SSL/TLS. Before any data is exchanged, your browser and the server do a 'handshake': they agree on an encryption method and exchange keys. Everything after that is scrambled. On HTTP (no S), anyone between you and the server — your WiFi router, your ISP, a hacker on the same café WiFi — can read your data in plain text.

## The Consumer Trap
People type bank passwords on public café WiFi without thinking twice. On an HTTP site (no padlock), that password travels in plain text over the entire café's network. The person sitting 2 tables away with basic hacking knowledge can read it with free software. The padlock is not decoration.

## The Builder Hack
A builder deploying their first website gets a free SSL certificate from Let's Encrypt (a nonprofit) and installs it on their server. Without this, Chrome will show users a 'Not Secure' warning, which kills trust instantly. SSL is now a basic requirement, not an optional upgrade.

## The Superpower
You can configure your own secure web server, understand what the padlock icon actually guarantees (and what it doesn't — it only means the connection is encrypted, not that the website is trustworthy), and build systems that protect user data in transit.

## The First Line Of Code
Visit any banking website. Click the padlock icon in your browser's address bar. Click 'Certificate'. You can see exactly which company issued the SSL certificate, when it expires, and what encryption algorithm it uses.

## Linked Possibilities
- [[encryption-locks-on-data]]
- [[http-requests]]
- [[dns-the-phonebook]]
- [[vpn-and-privacy]]
