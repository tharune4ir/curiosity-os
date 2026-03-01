---
title: "TCP vs UDP (Guaranteed Delivery vs Speed)"
icon: "Shuffle"
domain: "THE GRID"
---

## The Invisible Architecture
TCP (Transmission Control Protocol) is like registered post — every packet is numbered, delivery is confirmed, and if anything is lost, it's re-sent. Your order is always complete and in sequence. UDP (User Datagram Protocol) is like spraying flyers from a helicopter — you send packets as fast as possible but don't check if they arrived. TCP is used for anything where accuracy matters (web pages, file downloads, WhatsApp messages). UDP is used where speed matters more than perfection (live video calls, BGMI, DNS lookups). A dropped frame in a video call is better than freezing the call to resend it.

## The Consumer Trap
When your video call has bad audio or pixelated video, packets are being dropped (UDP doesn't re-send them). When your file download corrupts, it's often because TCP failed to re-send a packet before the connection timed out. Knowing this, you know that bad video call quality is a network problem, not an app problem.

## The Builder Hack
A builder building a real-time game uses UDP for position updates (lose a frame? No problem, the next one comes immediately) and TCP for critical game events (player died, level completed, payment) where accuracy is non-negotiable. Most games use both protocols simultaneously for different types of data.

## The Superpower
You make informed protocol choices in your applications. This is a systems-level decision that affects performance, reliability, and architecture. Most developers use only TCP because it's the default — you know when to break convention.

## The First Line Of Code
Open BGMI or any online game. Go to Settings > Graphics and lower the network settings. Notice game updates become less frequent — you're seeing the effect of packet loss in a UDP stream. Put it back up and feel the difference.

## Linked Possibilities
- [[packets-the-data-couriers]]
- [[bandwidth-vs-latency]]
- [[websockets-real-time]]
- [[http-requests]]
