---
title: "APIs (The Digital Waiter)"
icon: "Waypoints"
domain: "SYSTEM ARCHITECTURE"
---

## The Invisible Architecture
An API (Application Programming Interface) is like a waiter in a restaurant. You (the app) sit at a table. The kitchen (server/database) has all the food (data). You don't walk into the kitchen directly — that would be chaos. The waiter takes your order (request), goes to the kitchen, and brings back exactly what you asked for (response). Every time your Paytm app checks your UPI balance, it sends a request to the bank's API. The API is the agreed-upon menu of what you can ask for and how to ask for it.

## The Consumer Trap
When you use 'Sign in with Google' on any website, that website doesn't store your Google password. It calls Google's OAuth API — Google checks your identity and tells the website 'yes, this is a verified Google user'. You're using Google's API as a trusted security service without knowing it.

## The Builder Hack
A builder creates a weather app without collecting any weather data. They call the OpenWeatherMap API for free, which gives them live weather for any city. Their app is essentially a beautiful interface on top of someone else's API. Most great apps are combinations of APIs built by others.

## The Superpower
You can build powerful apps on top of existing infrastructure. You don't need to build payment systems (use Razorpay API), maps (use Google Maps API), or AI (use Anthropic/OpenAI API). You assemble, not build from scratch. This is how solo developers build products that compete with large teams.

## The First Line Of Code
Open your browser and go to: https://wttr.in/Mumbai?format=j1 — This is a free weather API. You just called an API with your browser and got real data for Mumbai.

## Linked Possibilities
- [[http-requests]]
- [[json-data-packaging]]
- [[rest-api]]
- [[client-server-model]]
- [[databases-the-filing-cabinet]]
