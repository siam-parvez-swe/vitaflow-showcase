# VitaFlow — Blood & Donation Management Showcase

A responsive Next.js showcase website for a blood donation and community funding platform.

## What works in this showcase

- Public landing page with impact stats, urgent requests and calls to action
- Blood request directory with text, blood-group, district and status filters
- Donor directory with blood-group and location filters
- Donor sign-up, sign-in and sign-out
- Three demo roles: Admin, Donor and Volunteer
- Role-based dashboard navigation
- Donor request creation, editing, deletion and status tracking
- Volunteer/Admin request status management
- Admin user search, role changes and block/unblock controls
- Profile editing
- Funding form with preset/custom amounts and a simulated checkout confirmation
- Local browser persistence using `localStorage`
- Responsive mobile, tablet and desktop layouts

## Run locally

Requirements: Node.js 18.17+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Demo accounts

All demo accounts use the password `demo1234`.

| Role | Email |
|---|---|
| Admin | admin@vitaflow.demo |
| Donor | donor@vitaflow.demo |
| Volunteer | volunteer@vitaflow.demo |

You can also create a new Donor account from the sign-up form.

## Demo mode and data

This showcase is designed to be demonstrable without a running API server. It stores demo users, blood requests, and funding records in the browser's `localStorage`.

The funding flow is simulated. It does **not** charge a card or create a real Stripe PaymentIntent. Demo credentials and passwords are not secure authentication and must not be used for production.

To reset the demo data, clear the browser's local storage for `localhost:3000` (keys beginning with `vitaflow_`).

## Connecting the real backend

The README supplied with the project describes an Express API on port `5000` and these endpoint groups:

- Authentication: `/api/auth/*`
- Users: `/api/all-users`, `/api/profile`
- Blood requests: `/api/public-donation-requests`, `/api/my-donation-requests`, `/api/all-blood-donation-request`, `/api/create-donation-request/*`
- Funding: `/api/fundings`, `/api/create-payment-intent`, `/api/stats`
- Donor search: `/api/search-donors`

Set `NEXT_PUBLIC_BASE_URL` to the backend URL when integrating the API. The current showcase intentionally uses local demo data because the supplied README does not define the exact request/response payloads for every endpoint, and the backend source code was not included.

## Environment variables and security

Use `.env.example` as a template. Keep MongoDB credentials, Better Auth secrets, Stripe secret keys, JWT secrets and internal API secrets on the server only. Never expose them through `NEXT_PUBLIC_*` variables or commit a real `.env` file.

The credentials pasted into the chat should be rotated before any real deployment.

## Production build

```bash
npm run build
npm start
```

## Project structure

```text
vitaflow-showcase/
├── app/
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── lib/
├── public/
├── .env.example
├── .gitignore
├── next.config.mjs
└── package.json
```
