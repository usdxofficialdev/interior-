# Velora Website: Project Guide

**Single editable source of truth for this project.** Update this file when project requirements, rules, or durable project context change. Agent-specific instruction files point here.

## 1. Product Requirements Document

**Status:** Draft baseline derived from the current website. Business details and the visual reference have not been user-approved.

### Product summary

A responsive, photo-led landing page presenting a luxury interior-design studio. The page introduces the studio, communicates services and selected work, and gives visitors a path to make contact. It is a static site built with HTML, CSS, and vanilla JavaScript.

### Goals

- Create a polished first impression appropriate for a premium interior-design brand.
- Make hero and portfolio imagery central to the experience.
- Let visitors scan services and example work, then reach the contact action.
- Keep the page readable and usable on desktop and mobile.
- Keep the codebase simple to edit without a framework or build step.

### Audience and primary journey

**Working audience assumption:** people exploring interior-design services. Confirm the actual audience, market, and customer type before adding claims or tailoring the page to a specific market.

Primary journey: arrive, understand the studio's positioning, review services and work, then use a navigation anchor or contact link.

### Current page scope

- Header with the Eli Ambience Studio label, Gallery and Services anchors, and a WhatsApp consultation link.
- Editorial gallery heading followed by eight supplied local interior photos: hero living room, Turkish-style restaurant, cafe, restaurant, dining room, dark interior, office, and collaborative workspace.
- Design philosophy section and three service descriptions: interior styling, spatial planning, and luxury renovation.
- Contact footer with email/phone links and a consultation form that prepares an enquiry for WhatsApp.
- Black-and-gold visual identity, responsive image mosaic, and restrained pointer tilt on the lead image.

Keep navigation destinations aligned with their matching page IDs. Do not add/remove sections or change contact destinations without an explicit request.

### Functional requirements

- Navigation and in-page calls to action lead to their intended sections.
- The enquiry form validates required fields and encodes entered details into the WhatsApp message. Use a user-confirmed WhatsApp destination before production use.
- Images have a meaningful subject and valid source. Do not replace requested interior photography with CSS illustrations or decorative gradients.
- Pointer tilt is not required to access information and does not interfere with touch use.
- Reveal effects do not leave content hidden when JavaScript or the observer API is unavailable.

### Design and quality requirements

- Preserve the luxury interior direction: editorial, refined, photo-led, warm material accents, atmospheric dark surroundings, and restrained 3D depth.
- Keep responsive layouts without horizontal overflow or overlapping text/controls.
- Use semantic HTML, visible focus states, keyboard-operable links and controls, and sufficient text contrast.
- Respect reduced-motion preferences for nonessential animation.
- Avoid unnecessary libraries and large dependencies; keep interaction and loading performance reasonable.

### Content integrity

The user confirmed the company name Eli Ambience Studio, contact email `eliambiencestudio@gmail.com`, and WhatsApp number `+91 7237861272`. Service claims and other business details still need verification before public launch.

### Out of scope unless explicitly approved

- React, other frameworks, package managers, bundlers, or a backend.
- CMS, authentication, checkout, booking system, or server-submitted forms.
- New pages, analytics, tracking, external APIs, or third-party integrations.
- Real-time 3D/WebGL or complex animation systems.
- Unrequested copy, branding, or layout redesigns.

### Acceptance criteria

- Stay within the existing static stack unless the user explicitly approves a change.
- Keep the page usable on mobile and desktop without newly introduced overflow or overlapping content.
- Preserve user content and unrelated behavior.
- Verify links and interactions touched by a change.
- Run relevant checks and report them accurately; browser-inspect visual changes when tooling is available.
- Do not turn unconfirmed content into invented factual claims.

### Open decisions

- Confirm brand identity, audience, market, language, and approved brand assets.
- Confirm real client logos, project descriptions, metrics, budget display, and contact details.
- Confirm if an About section is needed and where its navigation should lead.
- Confirm visual details from the supplied reference if an exact match is required.
- Confirm production hosting, privacy/legal copy, and accessibility target.

## 2. AI Agent Rules

These rules apply to every AI agent working in this repository.

### Authority and scope

- Follow the user's latest explicit request, subject to applicable safety requirements. Use this guide for product intent and the current implementation for established behavior.
- This specification is a draft based on the current website. Items described as unconfirmed or sample are not approved business facts.
- Do only the work requested. Do not add an unsolicited redesign, feature, cleanup, framework, dependency, build system, or backend.
- If a missing detail could materially change the outcome, ask the user. Otherwise make the smallest reversible change consistent with the project.
- Preserve existing user changes and unrelated content. Never overwrite, delete, or revert unrelated work.

### Project constraints

- Keep the existing static stack: `index.html`, `styles.css`, and `script.js`, using plain HTML, CSS, and vanilla JavaScript.
- Preserve the Eli Ambience Studio identity and the refined, photo-led, black-and-gold design direction with restrained 3D depth.
- Use genuine interior photography; reuse verified or user-provided assets. Never invent assets, clients, testimonials, project details, metrics, prices, contact information, or performance claims.
- Preserve responsive desktop/mobile layouts, semantic HTML, keyboard usability, readable contrast, and reduced-motion considerations when touching interactions.
- Keep navigation and interactive behavior functional; do not silently change destinations or remove content.
- Follow existing formatting and naming conventions; default to ASCII.
- Do not add tracking, external services, APIs, or dependencies without explicit approval.

### Required workflow

1. Read this guide and relevant source files before editing.
2. Make the smallest change that satisfies the request. Update this guide when product requirements or durable project decisions change.
3. Run the narrowest meaningful validation available. For visual changes, inspect desktop and mobile when browser tooling is available; otherwise state that visual inspection was not done.
4. Report files changed, actual checks, and unresolved assumptions. Never claim a test, browser inspection, or asset check that was not performed.

## 3. Project Memory

### Identity and implementation

- User-confirmed company name: Eli Ambience Studio.
- `index.html`: page structure and visible copy.
- `styles.css`: layout, responsive rules, colors, photography URLs, and visual effects.
- `script.js`: pointer tilt and scroll-reveal behavior.
- No build tool, package manager, framework, backend, or test suite is established.
- Current visible copy is English. Do not translate or rewrite it unless asked.

### Cautions and history

- The user confirmed `eliambiencestudio@gmail.com` and WhatsApp number `+91 7237861272` as contact details.
- A reference URL was shared earlier. Do not claim an exact visual match unless it can be opened and inspected.
- Preserve user edits and report verification honestly.

## 4. Editing this guide

This is the one file to edit when changing project rules, product requirements, or durable project notes. Keep agent entry-point files short and pointing to this file. The website source remains separately editable in `index.html`, `styles.css`, and `script.js`.
