---
title: "Debugging (Being a Detective for Broken Code)"
icon: "Bug"
domain: "THE BUILDER'S WORKFLOW"
---

## The Invisible Architecture
A bug is unexpected behavior in a program. Debugging is the art of finding and fixing it. Professional debugging is not random — it's a systematic detective process: (1) Reproduce the bug reliably. (2) Isolate where it happens. (3) Form a hypothesis about the cause. (4) Test the hypothesis. (5) Fix it. (6) Confirm the fix didn't break anything else. The best debugging tool is not a software tool — it's a calm, methodical mind that can narrow down a problem from millions of lines of code to one misbehaving variable.

## The Consumer Trap
When an app crashes, users say 'there's a bug'. When developers say 'there's a bug', they mean a specific event, in a specific function, triggered by specific input, causing unexpected behavior on line 247 of auth.js. The precision of the diagnosis determines the speed of the fix.

## The Builder Hack
A builder's first debugging habit: console.log() everything. Before using complex debuggers, they print the value of every variable at every step. 'Is this value what I think it is?' — this question, methodically applied, solves 90% of bugs in beginner code.

## The Superpower
Debugging is the skill that makes you a professional. Anyone can follow a tutorial. Professionals fix things when they break in unexpected ways. Debugging skill grows with every bug you solve — and it compounds faster than any other skill in programming.

## The First Line Of Code
Next time code doesn't work, resist the urge to change random things hoping it fixes itself. Instead, add one console.log() before the broken line to check: 'What value does my variable actually have here?' The answer will usually point directly to the bug.

## Linked Possibilities
- [[the-cli-terminal]]
- [[git-version-control]]
- [[functions]]
- [[conditionals]]
