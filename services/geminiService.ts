import type { GeneratedIconSet } from '../types';

export const generateIcons = async (prompt: string, style: string): Promise<GeneratedIconSet> => {
  try {
    // Call the serverless API route instead of using API key directly
    const apiUrl = '/api/generate-icons';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, style }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data: GeneratedIconSet = await response.json();
    return data;

  } catch (error) {
    console.error("Error generating icons:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate icons: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating icons.");
  }
};
