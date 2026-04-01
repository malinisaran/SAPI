const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Fetch all assessment questions grouped by dimension
 * GET /api/questions
 */
export async function fetchQuestions() {
  const response = await fetch(`${API_BASE_URL}/api/questions`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch questions: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data;
}
