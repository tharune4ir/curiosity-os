---
title: "Software Testing (Proving Your Code Works)"
icon: "CheckSquare"
domain: "THE BUILDER'S WORKFLOW"
---

## The Invisible Architecture
Testing is writing code that tests your code. A unit test checks one small function: 'If I call calculateGST(100), does it return 18?' An integration test checks that multiple pieces work together: 'If I create an order and pay for it, does the database update and the confirmation email send?' End-to-end tests simulate a real user: 'Open the browser, go to the homepage, add to cart, checkout, verify order confirmation appears.' Tests run automatically (in CI/CD) every time code changes — catching regressions before they reach users.

## The Consumer Trap
When an app update 'breaks' something that was working before (a regression), it's because new code accidentally broke old code, and there were no automated tests to catch it before it reached users. Every app crash notification you send is evidence of untested code reaching production.

## The Builder Hack
A builder writes tests for every critical function — payment processing, authentication, data validation. When they later change code, the tests run automatically and immediately tell them if they broke anything. They can refactor fearlessly because the tests are their safety net. Testing is Git for correctness.

## The Superpower
Tests are proof your code works — not just 'I think it works'. For any serious project or job, untested code is unprofessional code. Testing confidence comes from knowing your code is verified, not just believed.

## The First Line Of Code
Go to 'vitest.dev' or 'jestjs.io'. Read the 5-minute quickstart. Write your first test: expect(2+2).toBe(4). Run it. The test passes. Congratulations — you just wrote and ran automated code verification.

## Linked Possibilities
- [[debugging-mindset]]
- [[devops-and-cicd]]
- [[functions]]
- [[git-version-control]]
