const BASE_API_URL = 'http://localhost:3001/api';

export const getSavedMessage = async (): Promise<string> => {
  try {
    const res = await fetch(`${BASE_API_URL}/saved-message`);
    const result = await res.json();
    return result.text;
  } catch (err) {
    console.error('Failed to fetch saved message:', err);
    throw err;
  }
};

export const postNewMessage = async (message: string): Promise<string> => {
  try {
    const res = await fetch(`${BASE_API_URL}/create-answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: message }),
    });
    const result = await res.json();
    return result.text;
  } catch (err) {
    console.error('Error posting new message:', err);
    throw err;
  }
};
