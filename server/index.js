import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 3001;

const availablePharmacies = [
  'Walgreens',
  'Walmart',
  'Rite Aid',
  'Kroger Pharmacy',
  'Albertsons',
  'Publix',
  'Costco Pharmacy',
];

app.get('/api/pharmacies', (_request, response) => {
  response.json({ pharmacies: availablePharmacies });
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
