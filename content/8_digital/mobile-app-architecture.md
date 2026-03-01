---
title: "Mobile App Architecture (Native vs Cross-Platform)"
icon: "Smartphone"
domain: "SYSTEM ARCHITECTURE"
---

## The Invisible Architecture
Mobile apps can be built in 3 ways. Native apps are built specifically for one OS — Android apps in Kotlin/Java, iOS apps in Swift. They're fastest and have full hardware access. Cross-platform apps (React Native, Flutter) are written once and run on both Android and iOS — saving time at some performance cost. Web apps disguised as apps (PWAs) are essentially websites packaged as apps — the simplest approach. BGMI is native. WhatsApp is React Native. Starbucks India's app is a PWA.

## The Consumer Trap
When people say 'make an app', they don't realize they're choosing between 3 different architectures, 4 different programming languages, and 2 different app stores with different rules and revenue cuts. The app on your phone is the result of specific architectural decisions made years before you downloaded it.

## The Builder Hack
A solo builder chooses Flutter or React Native for their first app — they write one codebase and release on both Android and iOS simultaneously. Trying to build two native apps alone is how most solo developers fail to ship. Cross-platform is the pragmatic choice for resource-constrained builders.

## The Superpower
You can intelligently discuss and choose app architecture based on the problem — performance requirements, team size, budget, timeline. This decision, made early, determines the entire trajectory of a product.

## The First Line Of Code
Look up the app you use most on LinkedIn. Find the developers. Check their job titles — 'iOS Engineer' (native Swift), 'Android Engineer' (native Kotlin), 'React Native Developer' (cross-platform). The job titles reveal the architectural choice.

## Linked Possibilities
- [[operating-system]]
- [[frontend-react]]
- [[client-server-model]]
- [[apis-the-digital-waiter]]
