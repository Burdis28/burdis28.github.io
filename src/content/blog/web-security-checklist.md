---
title: "The Modern Web Security Checklist"
date: 2024-03-12
readTime: 10
category: "Security"
featured: false
excerpt: "Essential practices for OAuth2, JWT hardening, and preventing CSRF in modern single-page applications."
coverImage: "/images/blog/security.jpg"
coverImageAlt: "Glass prism reflecting rainbow light representing encryption"
---

## Authentication in 2024

Passwords alone are no longer sufficient. Modern applications require layered authentication strategies.

## OAuth2 and PKCE

For public clients (SPAs, mobile apps), always use Authorization Code Flow with PKCE:

```
1. Generate code_verifier (random 43-128 char string)
2. Hash it: code_challenge = BASE64URL(SHA256(code_verifier))
3. Send code_challenge in auth request
4. Exchange code + code_verifier for tokens
```

This prevents authorization code interception attacks even on unsecured channels.

## JWT Hardening

Common JWT mistakes to avoid:

- **Never use `alg: none`** — explicitly whitelist allowed algorithms
- **Validate `exp`, `iss`, `aud` claims** — don't just verify the signature
- **Keep tokens short-lived** — 15 minutes for access tokens, use refresh token rotation
- **Store in memory, not localStorage** — prevents XSS token theft

## CSRF Protection

For cookie-based sessions:
- Use `SameSite=Strict` or `SameSite=Lax` cookies
- Add CSRF tokens for state-changing requests
- Validate `Origin` and `Referer` headers on the server

## Content Security Policy

A strong CSP is your last line of defence against XSS:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{RANDOM}'; style-src 'self' 'unsafe-inline';
```

## Security Headers Checklist

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=()`

Security is never "done" — it's a continuous practice of threat modeling and incremental hardening.
