import { useState } from 'react';
import { getAISuggestion } from '../utils/groq';

function AISummary({ tasks }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleClick() {
    setLoading(true);
    setError('');
    setSummary('');

    try {
      const result = await getAISuggestion(tasks);
      setSummary(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-summary">
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Thinking...' : 'Get AI Suggestion'}
      </button>

      {error && <p className="ai-error">{error}</p>}
      {summary && <p className="ai-text">{summary}</p>}
    </div>
  );
}

export default AISummary;