import React, { useEffect, useState } from 'react';
import { getSavedMessage, postNewMessage } from './api/api.ts'; // adjust path as needed

const AnswerPage: React.FC = () => {
  const [message, setMessage] = useState<string>('Loading...');
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMessage = async () => {
    try {
      const latest = await getSavedMessage();
      setMessage(latest);
    } catch (err) {
      setMessage('Error fetching message.');
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      await postNewMessage(input);
      setInput('');
      fetchMessage(); // refresh message after submit
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Latest Submitted Text:</h1>
      <p>
        <span id="answer">{message}</span>
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter new message"
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: 'auto',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    marginTop: '1rem',
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AnswerPage;
