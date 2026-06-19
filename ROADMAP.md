# MPCOM Product Roadmap

## Phase 1 - Astro Marketing Portfolio

Goal: launch a polished, public-facing portfolio and service system.

Included:

- public marketing routes,
- process knowledge base,
- service packages,
- pricing models,
- AI-based UI kit positioning,
- clients and testimonials,
- project portfolio,
- contact flow,
- light and dark themes,
- Meno-compatible Astro structure,
- content separated from layout components.

Not included:

- authentication,
- client data,
- database,
- invoices and contracts,
- private project timelines,
- admin dashboard.

## Phase 2 - React Client Workspace

Goal: create a secure application on a dedicated subdomain.

Planned:

- authentication,
- database and access control,
- client overview,
- project timeline and table,
- resources and strategic markdown files,
- contracts and invoices,
- operator/admin workspace,
- future AI-assisted project generation.

Suggested architecture:

- public portfolio: `www.maciejpostek.com` or root domain, Astro,
- client workspace: `app.maciejpostek.com`, React,
- shared visual tokens and content contracts where useful,
- no private client data stored in the public Astro project.
