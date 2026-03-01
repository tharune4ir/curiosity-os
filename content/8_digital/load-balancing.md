---
title: "Load Balancing (Distributing the Crowd Fairly)"
icon: "Scale"
domain: "SYSTEM ARCHITECTURE"
---

## The Invisible Architecture
One server can handle a limited number of requests at once. When your app has 100,000 simultaneous users, no single server can cope. A load balancer sits in front of multiple servers and distributes incoming requests across all of them — like multiple cashier counters at McDonald's, with a manager directing each customer to the shortest queue. If one server crashes, the load balancer automatically routes traffic to the remaining ones. Google runs millions of servers behind load balancers for its search alone.

## The Consumer Trap
When IRCTC crashes on the day tatkal booking opens, it's a load balancing failure — demand spiked beyond the capacity of available servers. Ironically, the solution is simple in concept: add more servers and balance load across them. The challenge is doing this cheaply and automatically — which is exactly what AWS Auto Scaling does.

## The Builder Hack
A builder on Vercel or AWS gets automatic load balancing for free. Their app is automatically replicated across multiple servers and the platform handles routing. They get enterprise-grade infrastructure without configuring a single load balancer. This is why modern cloud platforms are so powerful for solo builders.

## The Superpower
You understand why major websites survive millions of simultaneous users without crashing — and you know the infrastructure patterns that enable it. Scalability is not magic; it's deliberate architectural choices made with these tools.

## The First Line Of Code
Next time a major government service or ticket booking site crashes (it will happen), instead of frustration, diagnose it: Was it a traffic spike? A single-server architecture? A load balancing failure? Read the news coverage and identify the technical cause. That's engineering analysis.

## Linked Possibilities
- [[cloud-hosting]]
- [[microservices]]
- [[system-architecture-overview]]
- [[client-server-model]]
