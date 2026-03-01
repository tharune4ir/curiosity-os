---
title: "Hashing (Digital Fingerprints That Can't Be Reversed)"
icon: "Fingerprint"
domain: "CYBERSECURITY & CRYPTOGRAPHY"
---

## The Invisible Architecture
Hashing is like a one-way grinder. You put your password 'Ravi@123' in, and a hash function (like SHA-256) grinds it into a unique 64-character string like 'a3f2b9...'. Critically, this process is one-way — you cannot put the 64-character string back in to get 'Ravi@123' out. When you log in, the website hashes what you typed and compares it to the stored hash. If they match — you're in. Even if the database is stolen, the attacker gets only hashes, not actual passwords.

## The Consumer Trap
When a website says 'your password was leaked', they usually mean their database of password hashes was stolen. If they used strong hashing (bcrypt, SHA-256), the attacker must guess every possible password and see if it matches — taking centuries for strong passwords. This is why password length and randomness actually matter.

## The Builder Hack
A builder uses the 'bcrypt' library to hash passwords before storing them. Bcrypt adds a random 'salt' to each password before hashing, meaning even two users with the same password get completely different hashes. This defeats 'rainbow table' attacks — precomputed lists of hashes.

## The Superpower
You understand how password security actually works, and you can build authentication systems that protect your users even in the event of a database breach. This knowledge prevents you from building systems that leak real user passwords.

## The First Line Of Code
Go to 'sha256.online'. Type your name and click Hash. Copy the output. Type your name again. The hash is identical. Change one letter. The hash is completely different. This is hashing: deterministic, one-way, avalanche effect.

## Linked Possibilities
- [[encryption-locks-on-data]]
- [[ssl-https]]
- [[databases-the-filing-cabinet]]
- [[binary-the-language-of-machines]]
