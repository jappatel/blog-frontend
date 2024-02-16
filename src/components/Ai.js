import React, { useState } from 'react';
import axios from 'axios';

function Ai() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Send the prompt to the server for processing
      const res = await axios.post("http://localhost:5000/chat", { prompt });
      setResponse(res.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.error || 'Internal server error');
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(error.message || 'Network error');
      }
    }

    setLoading(false);
  };

  return (
    <div className="mt-32">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything... :)"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>Ask</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {response && <p className="response-area">{response}</p>}
    </div>
  );
}

export default Ai;
