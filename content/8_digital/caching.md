---
title: "Caching (Keeping Things Handy)"
icon: "Zap"
domain: "DATA & STORAGE"
---

## The Invisible Architecture
Imagine every time you wanted to read a book, the librarian walked to a warehouse 2km away to fetch it. Terrible. Now imagine the librarian keeps the 50 most popular books right on the desk. That's caching. When you visit a website, many resources (images, scripts, styles) are saved directly in your browser. Next visit, they load from your local cache — not from the server. This is why the second time you visit a site it loads much faster.

## The Consumer Trap
When a website shows outdated information after an update, people blame the website. 90% of the time it's their own browser cache serving them old, saved data. The fix is Ctrl + Shift + R (hard refresh). Knowing this saves minutes of frustration every week.

## The Builder Hack
A builder adds a Redis cache server between their app and database. Frequently accessed data (like a homepage's top products) is stored in Redis RAM instead of querying the database every time. Database goes from 1000 queries/second to 50. The site handles 20x more users on the same hardware.

## The Superpower
Caching is one of the highest-leverage optimizations in software. A few hours of work adding Redis can make an app handle 10x more load. Understanding it puts you ahead of most developers.

## The First Line Of Code
Press Ctrl + Shift + R on any website you use daily. That's a hard refresh — bypassing the cache and fetching everything fresh. Notice if anything on the page looks slightly different. That was cached old content.

## Linked Possibilities
- [[databases-the-filing-cabinet]]
- [[cdn-content-delivery]]
- [[ram-the-countertop]]
- [[storage-hdd-ssd]]
