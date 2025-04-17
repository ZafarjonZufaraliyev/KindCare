const API_URL = import.meta.env.VITE_API_URL;

export async function getAIAdvice(data) {
  try {
    const response = await fetch(`${API_URL}/ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: data }) 
    });

    if (!response.ok) {
      throw new Error(`API xatolik: ${response.statusText}`);
    }

    const result = await response.json();
    return result.content;
  } catch (err) {
    console.error('AI xatosi:', err);
    throw err;
  }
}
