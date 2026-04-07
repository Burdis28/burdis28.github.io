# Step 09 — Contact Page

Build the Contact page (`/contact`) with a Formspree-powered form and social links.

**Prerequisite:** Steps 01–04 complete. A Formspree account and endpoint ID ready.

---

## 9.1 Getting the Formspree Endpoint ID

1. Register at [formspree.io](https://formspree.io) (free, up to 50 submissions/month)
2. Create a new form → name it "Portfolio Contact"
3. Copy the endpoint ID — it looks like `xyzabcde` (8 characters)
4. The full action URL will be: `https://formspree.io/f/xyzabcde`

The endpoint ID appears in two places in this step:
- `ContactForm.astro` — the `<form>` action
- `NewsletterCTA.astro` (Step 08) — if the same account is used

---

## 9.2 `src/components/contact/ContactForm.astro`

```astro
---
// Replace with your actual Formspree endpoint ID
const FORMSPREE_ID = 'XXXXXXXX';
---

<form
  id="contact-form"
  action={`https://formspree.io/f/${FORMSPREE_ID}`}
  method="POST"
  class="space-y-6"
>

  <!-- Name field -->
  <div>
    <label for="name" class="block text-sm font-label font-bold text-on-surface mb-2">
      Full Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      required
      placeholder="Jan Novák"
      class="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none transition-colors"
    />
  </div>

  <!-- Email field -->
  <div>
    <label for="email" class="block text-sm font-label font-bold text-on-surface mb-2">
      Email Address
    </label>
    <input
      type="email"
      id="email"
      name="email"
      required
      placeholder="jan@example.com"
      class="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none transition-colors"
    />
  </div>

  <!-- Subject field -->
  <div>
    <label for="subject" class="block text-sm font-label font-bold text-on-surface mb-2">
      Subject
    </label>
    <input
      type="text"
      id="subject"
      name="subject"
      placeholder="Project inquiry / Job opportunity / General question"
      class="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none transition-colors"
    />
  </div>

  <!-- Message field -->
  <div>
    <label for="message" class="block text-sm font-label font-bold text-on-surface mb-2">
      Message
    </label>
    <textarea
      id="message"
      name="message"
      required
      rows="6"
      placeholder="Tell me about your project or what you'd like to discuss..."
      class="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none transition-colors resize-none"
    ></textarea>
  </div>

  <!-- Formspree honeypot (spam prevention) -->
  <input type="text" name="_gotcha" class="hidden" aria-hidden="true" />

  <!-- Submit button -->
  <button
    type="submit"
    class="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-sm tracking-wide hover:bg-primary-container transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95"
  >
    <span class="material-symbols-outlined text-lg">send</span>
    Send Message
  </button>

  <!-- Success / error messages (shown via JS after submit) -->
  <div id="form-success" class="hidden p-4 bg-secondary-container text-on-secondary-container rounded-xl text-sm font-medium">
    Message sent! I'll get back to you within 1–2 business days.
  </div>
  <div id="form-error" class="hidden p-4 bg-error-container text-on-error-container rounded-xl text-sm font-medium">
    Something went wrong. Please try again or email me directly.
  </div>

</form>

<!-- Progressive enhancement: handle Formspree AJAX response -->
<script>
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const successMsg = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        successMsg?.classList.remove('hidden');
        errorMsg?.classList.add('hidden');
      } else {
        successMsg?.classList.add('hidden');
        errorMsg?.classList.remove('hidden');
      }
    } catch {
      successMsg?.classList.add('hidden');
      errorMsg?.classList.remove('hidden');
    }
  });
</script>
```

Notes on form fields:
- `border-b-2 border-outline-variant/30` — bottom-only highlight (design system input style)
- `focus:border-primary` — highlight transitions to primary on focus
- `_gotcha` — Formspree's honeypot field for spam prevention (must be hidden)
- The JS handler submits via AJAX for a better UX (no page reload, no Formspree redirect page)

---

## 9.3 `src/pages/contact.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ContactForm from '@components/contact/ContactForm.astro';
import profile from '../content/data/profile.json';
---

<BaseLayout
  title="Contact — Ondřej Burda"
  activeNav="contact"
  description="Get in touch — project inquiries, job opportunities, or general questions."
>
  <div class="space-y-8">

    <!-- Page header -->
    <header>
      <h1 class="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
        Get In Touch
      </h1>
      <p class="text-on-surface-variant max-w-2xl">
        Whether it's a project inquiry, a job opportunity, or just to say hi — I'm happy to connect.
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

      <!-- Contact form — takes 2/3 of the space -->
      <div class="md:col-span-2">
        <div class="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 editorial-shadow">
          <h2 class="text-xl font-headline font-bold text-on-surface mb-6">Send a Message</h2>
          <ContactForm />
        </div>
      </div>

      <!-- Info sidebar — 1/3 -->
      <div class="space-y-6">

        <!-- Direct contact links -->
        <div class="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 editorial-shadow">
          <h3 class="font-headline font-bold text-on-surface mb-4">Direct Contact</h3>
          <div class="space-y-3">

            <a
              href={`mailto:${profile.social.email}`}
              class="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-colors group"
            >
              <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-all">
                <span class="material-symbols-outlined text-xl">mail</span>
              </div>
              <div>
                <p class="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">Email</p>
                <p class="text-sm font-medium text-on-surface">{profile.social.email}</p>
              </div>
            </a>

            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-colors group"
            >
              <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-all">
                <span class="material-symbols-outlined text-xl">share</span>
              </div>
              <div>
                <p class="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">LinkedIn</p>
                <p class="text-sm font-medium text-on-surface">Connect on LinkedIn</p>
              </div>
            </a>

            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-colors group"
            >
              <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-all">
                <span class="material-symbols-outlined text-xl">code</span>
              </div>
              <div>
                <p class="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">GitHub</p>
                <p class="text-sm font-medium text-on-surface">Burdis28</p>
              </div>
            </a>

          </div>
        </div>

        <!-- Location -->
        <div class="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 editorial-shadow">
          <h3 class="font-headline font-bold text-on-surface mb-3">Location</h3>
          <div class="flex items-center gap-2 text-on-surface-variant">
            <span class="material-symbols-outlined text-primary">location_on</span>
            <span>{profile.location}</span>
          </div>
          <p class="text-sm text-on-surface-variant mt-2">
            Open to remote work worldwide. Available for on-site in Prague.
          </p>
        </div>

        <!-- Response time -->
        <div class="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-primary text-xl">schedule</span>
            <h3 class="font-headline font-bold text-on-surface">Response Time</h3>
          </div>
          <p class="text-sm text-on-surface-variant">
            I typically respond within <strong class="text-on-surface">1–2 business days</strong>.
          </p>
        </div>

      </div>
    </div>
  </div>
</BaseLayout>
```

---

## 9.4 Visual Verification Checklist

Open `http://localhost:4321/contact`:

- [ ] Page H1: "Get In Touch" in `font-headline font-extrabold`
- [ ] Form takes 2/3 width on desktop (md:col-span-2)
- [ ] Input fields: `bg-surface-container-low`, bottom-border only (`border-b-2`)
- [ ] Input focus: bottom border transitions to `border-primary` (dark blue)
- [ ] Submit button: full-width, `bg-primary`, `rounded-xl`, with `send` icon
- [ ] Info sidebar: email, LinkedIn, GitHub links with icon boxes
- [ ] Icon boxes: hover turns `bg-primary text-on-primary`
- [ ] Location card and Response Time card visible

**Test form submission:**
1. Fill in form fields
2. Submit
3. Expected: success message appears below the button (no page redirect)
4. If Formspree ID is `XXXXXXXX` (placeholder), the form will fail — replace with real ID first

---

## Commit Checkpoint

```bash
git add src/components/contact/ src/pages/contact.astro
git commit -m "feat: implement Contact page with Formspree form and social links"
```
