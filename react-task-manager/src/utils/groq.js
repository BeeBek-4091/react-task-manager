const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function getAISuggestion(tasks) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      'No Groq API key found. Add VITE_GROQ_API_KEY to your .env file.'
    );
  }

  const activeTasks = tasks.filter((task) => !task.completed);

  if (activeTasks.length === 0) {
    return "You don't have any active tasks right now. Nice work!";
  }

  const taskListText = activeTasks
    .map((task) => `- ${task.text} (${task.category})`)
    .join('\n');

  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful productivity assistant. Given a to-do list, write a short 2-3 sentence summary of it, then suggest which ONE task the user should do first and briefly say why. Keep it friendly and concise.',
        },
        {
          role: 'user',
          content: `Here is my to-do list:\n${taskListText}`,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error('Groq request failed. Check your API key and try again.');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}