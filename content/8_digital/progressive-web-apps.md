---
title: "Progressive Web Apps (Websites That Feel Like Apps)"
icon: "AppWindow"
domain: "SYSTEM ARCHITECTURE"
---

## The Invisible Architecture
A Progressive Web App (PWA) is a website that uses modern browser features to behave like a native mobile app — it can be installed on your home screen, work offline (using cached data), send push notifications, and access the camera and GPS. The Twitter app on iOS is actually a PWA. Starbucks India's app is a PWA. They're built with the same HTML/CSS/JS as websites, but with a 'Service Worker' — a background JavaScript file that intercepts network requests and serves cached content when offline.

## The Consumer Trap
When someone 'downloads' a PWA from the browser, they think they got a 'real app'. It's actually just a website with a bookmark on the home screen and some extra capabilities. Google's Play Store has started accepting PWAs. The line between 'website' and 'app' is becoming meaningless.

## The Builder Hack
A builder converts their web app into a PWA by adding a manifest file (app name, icon, colors) and a service worker (offline caching). Their users can 'install' it from the browser, use it offline, and receive push notifications — all without going through the Play Store or App Store. No 30% store fee.

## The Superpower
You can ship to every platform — Android, iOS, desktop — with one codebase, bypassing app store gatekeeping and fees. For many use cases (e-commerce, news, utilities), PWAs are indistinguishable from native apps and significantly cheaper to build and maintain.

## The First Line Of Code
Open Chrome on Android. Go to 'web.whatsapp.com'. You will see a banner at the bottom: 'Add WhatsApp to Home Screen'. Tap it. That's installing a PWA. The icon on your home screen is a website pretending to be an app.

## Linked Possibilities
- [[frontend-react]]
- [[html-css-basics]]
- [[caching]]
- [[mobile-app-architecture]]
