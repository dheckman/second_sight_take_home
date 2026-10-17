import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;

    async function loadMessage() {
      try {
        const response = await fetch('/api/hello');
        if (!response.ok) {
          throw new Error(`The API returned HTTP ${response.status}.`);
        }

        const data = await response.json();
        if (typeof data.message !== 'string') {
          throw new Error('The API response did not include a message.');
        }

        if (isCurrent) setMessage(data.message);
      } catch (requestError) {
        if (isCurrent) {
          setError(requestError.message || 'Could not connect to the API.');
        }
      }
    }

    loadMessage();
    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <main className="page">
      <section className="card" aria-labelledby="welcome-heading">
        <div className="icon" aria-hidden="true">✳</div>
        <p className="eyebrow">YOUR NEW CREATIVE SPACE</p>
        <h1 id="welcome-heading">Hello, React.</h1>
        <p className="intro">
          Your app is ready. This message came from your backend API.
        </p>

        <div className="api-message" aria-live="polite">
          {error ? (
            <p className="error">API error: {error}</p>
          ) : message ? (
            <p>{message}</p>
          ) : (
            <p className="loading">Connecting to the API…</p>
          )}
        </div>
        <p className="hint">React + Vite + Express</p>
      </section>
    </main>
  );
}

export default App;
