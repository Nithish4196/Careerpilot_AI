export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Example of a helper function you can use later to call your backend
export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching from API:', error);
    throw error;
  }
}
