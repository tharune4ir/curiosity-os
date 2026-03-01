---
title: "Frontend (What You See — The Stage Set)"
icon: "Layout"
domain: "SYSTEM ARCHITECTURE"
---

## The Invisible Architecture
The frontend is everything a user sees and touches — buttons, colors, animations, forms. It runs entirely in the user's browser or phone. HTML defines the structure (the skeleton), CSS defines the appearance (the clothes), and JavaScript adds behavior (the muscles). Modern frontends use frameworks like React or Next.js that organize these three into reusable 'components' — self-contained Lego blocks. A 'ProductCard' component is one block. Stack 20 ProductCards and you have a product grid.

## The Consumer Trap
When Swiggy redesigns their app and everyone says 'it looks so different', they only changed the frontend — the same backend, same database, same data. Frontend is pure presentation. Changing it doesn't affect how orders are processed, just how they're shown. The kitchen didn't change; only the dining room did.

## The Builder Hack
A builder creates a React component called <RestaurantCard /> that takes restaurant name, rating, and image as inputs. They then write one line to display 100 restaurant cards by mapping over an array of restaurant data. One component, used 100 times. The power of component-based thinking.

## The Superpower
You can build stunning interfaces that users interact with, understand how modern websites like Netflix and Zomato are actually built, and communicate with design teams in their language — components, props, states, and renders.

## The First Line Of Code
Right-click on any website and select 'Inspect'. Click on any element. Watch the HTML panel highlight the exact code responsible for what you clicked. You are seeing the skeleton of the internet.

## Linked Possibilities
- [[client-server-model]]
- [[backend-nodejs]]
- [[rest-api]]
- [[ux-ui-design-overview]]
- [[html-css-basics]]
