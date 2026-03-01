---
title: "Cloud Storage (Your Files on Someone Else's Hard Drive)"
icon: "Cloud"
domain: "DATA & STORAGE"
---

## The Invisible Architecture
When you save a photo to Google Photos, it doesn't vanish into thin air. It travels over the internet and gets saved to an actual hard drive in one of Google's data centers — enormous warehouses packed with thousands of servers, with industrial cooling, redundant power, and security guards. 'The cloud' is just other people's computers. Google keeps 3 copies of your photo in different geographic locations so even if a data center burns down, your photo survives.

## The Consumer Trap
People trust 'the cloud' blindly. They delete photos from their phone after uploading to Google Photos, then are shocked years later when Google changes its storage policy and their 15GB free tier is exceeded. The cloud is not a gift — it's a service, with terms that can change.

## The Builder Hack
A builder storing user profile pictures for their app uses AWS S3 — Amazon's cloud file storage. Each image gets a unique URL. They store only this URL in their database. This separates the 'what the file is' (database) from 'where the file lives' (S3) — a fundamental architectural pattern.

## The Superpower
You understand the economics and risks of cloud storage. You make intentional choices about what to store where and why, instead of blindly depending on free services that can change their terms overnight.

## The First Line Of Code
Open Google Drive, right-click a file and select 'Get Link'. That URL is a direct path to Google's servers where your file lives. Share it with a friend — they will access Google's data center through that link.

## Linked Possibilities
- [[storage-hdd-ssd]]
- [[databases-the-filing-cabinet]]
- [[cloud-hosting]]
- [[apis-the-digital-waiter]]
