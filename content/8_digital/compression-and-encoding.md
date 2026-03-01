---
title: "Compression (Squeezing Data Smaller)"
icon: "Minimize2"
domain: "DATA & STORAGE"
---

## The Invisible Architecture
Compression reduces data size by finding and eliminating redundancy. Text like 'AAAAAAA' can be stored as '7A' (run-length encoding) — 7 times smaller. ZIP files use this principle. Images use more complex compression: JPEG removes detail your eye can't distinguish (lossy compression — some data is permanently lost). PNG uses lossless compression — the original can be perfectly reconstructed. Videos are frames — MPEG compression stores only what changes between frames (motion), not the entire image 30 times per second.

## The Consumer Trap
When someone sends you a 'compressed' WhatsApp photo and it looks worse than the original, JPEG lossy compression is the culprit. WhatsApp re-compresses images to reduce server costs. When you share files through Google Drive links instead of WhatsApp, they arrive in original quality — because Drive stores the original, not a compressed version.

## The Builder Hack
A builder serves images on their website in WebP format (a modern Google-developed format that's 30% smaller than JPEG at the same quality). They also enable Gzip compression on their server (2-10x text compression for HTML/CSS/JS). Both take minutes to implement and dramatically improve load time.

## The Superpower
You optimize every byte of data your product sends and receives. Smaller data means faster load times, lower hosting bills, and better experience for users on slow connections — which is most of India's mobile users.

## The First Line Of Code
Right-click any image on a website > Open image in new tab. Look at the URL — does it end in .jpg, .png, or .webp? Now use browser DevTools Network tab to see the image's file size. Then Google the original image quality vs WebP comparison for that file type.

## Linked Possibilities
- [[storage-hdd-ssd]]
- [[cdn-content-delivery]]
- [[http-requests]]
- [[bandwidth-vs-latency]]
