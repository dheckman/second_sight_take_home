# Pharmacy Network

A small pharmacy network manager for moving pharmacies between available and contracted lists. The available list is loaded from an Express API; pharmacy transfers are managed in the browser.

## Quickstart

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the Vite URL printed in the terminal, usually <http://localhost:5173>. The development command starts both the frontend and the API. The API listens on port `3001`; Vite proxies `/api` requests to it.

To run only the API:

```bash
npm start
```

The server supports an optional `PORT` environment variable when run by itself (defaults to `3001`).

## Architecture & Tech Stack

- **Frontend:** React 18, Vite, and CSS.
- **Backend:** Node.js and Express.
- **Tests:** Vitest, jsdom, and React Testing Library.

`GET /api/pharmacies` returns `{ "pharmacies": [...] }`. The frontend fetches this endpoint on load.

## Assumptions & Ambiguities

- The contracted list starts empty. Reloading restores the initial available list and clears contracted pharmacies.
- A pharmacy is transferred using the selected row and the corresponding Add or Remove button; the server does not persist or validate transfers.

## Trade-Offs & Shortcuts

- The lists use pharmacy names as identifiers because the sample data is small and static. In a real service I would use stable IDs.
- The API is read-only, and contracted pharmacy state is not shared across users or browser sessions.
- Tests cover the main UI flows and API loading/error handling only.

## If I Had More Time

- Persist contracted-pharmacy changes through an API, with server-side validation and appropriate database constraints.
- Add search and eligibility filters, keeping business-rule validation authoritative on the server.
- Expand test coverage for malformed API responses, accessibility behavior, and API integration.

c

Run the frontend tests with:

```bash
npm test
```

The tests verify that the available pharmacies load from the API, the contracted list starts empty, pharmacies can be moved in either direction, and API errors are shown.

## Component Mockup

![Component mockup](/component_mockup.png?raw=true)

