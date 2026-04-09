# Step 09 — Contact Page

Build the Contact page (`/contact`) with direct contact channel cards, an availability block, and a consulting CTA banner. No form — contact happens via email and LinkedIn links.

**Prerequisite:** Steps 01–04 complete.

**Reference design:** `rework/stitch_projects_skills(1)/stitch_projects_skills/contact_testimonials_professional_olive/code.html`

---

## 9.1 Design Overview

The contact page uses a **no-form approach** — rather than a Formspree form, it presents direct channel cards (email, LinkedIn, GitHub, location). The right column contains an availability status card and a response time note.

A full-width `bg-primary` consulting CTA banner sits below the main grid.

---

## 9.2 `src/pages/contact.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import profile from '../content/data/profile.json';
---

<BaseLayout
  title="Contact — Ondřej Burda"
  activeNav="contact"
  description="Get in touch — project inquiries, job opportunities, or general questions."
>

  <header class="mb-20">
    <h1 class="text-6xl md:text-8xl font-headline font-extrabold text-primary tracking-tighter mb-4 leading-none">
      Let's Build <br/> Something <span class="text-secondary">Together.</span>
    </h1>
    <p class="max-w-xl text-lg text-on-surface-variant font-body leading-relaxed">
      Whether it's a project inquiry, a job opportunity, or just to say hi — reach out directly via any of the channels below.
    </p>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">

    <!-- Contact channels: 7 cols -->
    <section class="lg:col-span-7 bg-surface-container-low p-8 md:p-12 rounded-xl">
      <h2 class="text-2xl font-headline font-bold text-primary mb-8">Get In Touch</h2>

      <div class="space-y-6">

        <!-- Email -->
        <a
          href={`mailto:${profile.social.email}`}
          class="group flex items-start gap-4 p-6 bg-surface-container-lowest rounded-xl hover:shadow-editorial transition-all"
        >
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-primary">alternate_email</span>
          </div>
          <div>
            <p class="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">Email</p>
            <p class="font-semibold text-on-surface group-hover:text-primary transition-colors">{profile.social.email}</p>
          </div>
          <span class="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary ml-auto transition-colors self-center">arrow_forward</span>
        </a>

        <!-- LinkedIn -->
        <a
          href={profile.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-start gap-4 p-6 bg-surface-container-lowest rounded-xl hover:shadow-editorial transition-all"
        >
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-primary">share</span>
          </div>
          <div>
            <p class="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">LinkedIn</p>
            <p class="font-semibold text-on-surface group-hover:text-primary transition-colors">Connect on LinkedIn</p>
          </div>
          <span class="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary ml-auto transition-colors self-center">open_in_new</span>
        </a>

        <!-- GitHub -->
        <a
          href={profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-start gap-4 p-6 bg-surface-container-lowest rounded-xl hover:shadow-editorial transition-all"
        >
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-primary">code</span>
          </div>
          <div>
            <p class="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">GitHub</p>
            <p class="font-semibold text-on-surface group-hover:text-primary transition-colors">Burdis28</p>
          </div>
          <span class="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary ml-auto transition-colors self-center">open_in_new</span>
        </a>

        <!-- Location (static, no link) -->
        <div class="flex items-start gap-4 p-6 bg-surface-container-lowest rounded-xl">
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-primary">location_on</span>
          </div>
          <div>
            <p class="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">Location</p>
            <p class="font-semibold text-on-surface">{profile.location}</p>
            <p class="text-sm text-on-surface-variant mt-0.5">Open to remote worldwide</p>
          </div>
        </div>

      </div>
    </section>

    <!-- Right column: availability + response time — 5 cols -->
    <aside class="lg:col-span-5 flex flex-col gap-6">

      <!-- Availability card -->
      <div class="relative overflow-hidden rounded-xl group h-64 bg-primary-container">
        <div class="relative z-10 p-8 h-full flex flex-col justify-between">
          <div>
            <p class="text-on-primary-container/80 text-xs font-label uppercase tracking-widest mb-2">Status</p>
            <h3 class="text-2xl font-headline font-bold text-on-primary-container">Open to Opportunities</h3>
            <p class="text-on-primary-container/80 text-sm mt-2">Available for full-time positions or contract work.</p>
          </div>
          <a
            href={`mailto:${profile.social.email}`}
            class="inline-flex items-center gap-2 text-white font-label font-bold text-sm bg-primary px-6 py-2 rounded-lg hover:bg-primary-fixed hover:text-on-primary-fixed transition-all self-start"
          >
            Start a conversation
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        <div class="absolute -right-8 -bottom-8 opacity-20" aria-hidden="true">
          <span class="material-symbols-outlined text-[120px] text-white" style="font-variation-settings: 'FILL' 1">handshake</span>
        </div>
      </div>

      <!-- Response time -->
      <div class="flex items-center gap-4 p-6 bg-surface-container-low rounded-xl">
        <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-primary">schedule</span>
        </div>
        <p class="text-sm text-on-surface-variant">
          I typically respond within <strong class="text-on-surface">1–2 business days</strong>.
        </p>
      </div>

    </aside>
  </div>

  <!-- Consulting CTA banner -->
  <section class="bg-primary text-on-primary p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 mb-20 overflow-hidden relative">
    <div class="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-32 -mt-32 blur-3xl" aria-hidden="true"></div>
    <div class="relative z-10">
      <h3 class="text-3xl font-headline font-bold mb-2">Technical Consulting</h3>
      <p class="text-primary-fixed/80 max-w-md">Looking for a senior backend engineer? Let's discuss how I can help your team.</p>
    </div>
    <a
      href={`mailto:${profile.social.email}`}
      class="relative z-10 px-8 py-4 bg-tertiary text-on-tertiary font-bold font-headline rounded-lg hover:bg-tertiary-container transition-all shadow-xl"
    >
      Book a Session
    </a>
  </section>

</BaseLayout>
```

---

## 9.3 Key Design Decisions

| Element | Implementation |
|---|---|
| No form | Contact via direct `mailto:` and external links only |
| Channel cards | `hover:shadow-editorial` — light editorial glow on hover |
| Availability card | `bg-primary-container`, `h-64`, filled `handshake` icon watermark |
| CTA banner | `bg-primary` with `bg-tertiary` honey button (Professional Olive accent) |
| Consulting button | `bg-tertiary text-on-tertiary` — the honey CTA color (`#753d00`) |

---

## 9.4 Visual Verification Checklist

Open `http://localhost:4321/contact`:

- [ ] H1: "Let's Build Something Together." — large (`text-6xl md:text-8xl`), "Together." in `text-secondary`
- [ ] Channel cards: icon box with `bg-primary/10`, text label, hover arrow
- [ ] Email / LinkedIn / GitHub cards: `arrow_forward` / `open_in_new` icon on the right
- [ ] Location card: static (no hover effect), shows remote note
- [ ] Availability card: `bg-primary-container`, "Open to Opportunities", `handshake` watermark icon
- [ ] "Start a conversation" button inside availability card
- [ ] Response time: `schedule` icon + text
- [ ] CTA banner: `bg-primary` background, `bg-tertiary` "Book a Session" button
- [ ] Decorative blur blob visible behind CTA banner

---

## Commit Checkpoint

```bash
git add src/pages/contact.astro
git commit -m "feat: implement Contact page — channel cards, availability status, consulting CTA"
```
