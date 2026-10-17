# React app with a simple API

This app uses React and Vite for the frontend and Express for the backend.
The frontend loads the available pharmacy list from `GET /api/pharmacies`.

## Run locally

1. Install dependencies with `npm install`.
2. Start both the frontend and API with `npm run dev`.
3. Open the local URL printed by Vite (usually `http://localhost:5173`).

Run the automated frontend tests with `npm test`.

The API listens on port `3001`. `GET /api/pharmacies` returns an object with a
`pharmacies` array. During development, Vite proxies `/api` requests to the API
server. To run the API by itself, use `npm start`.
