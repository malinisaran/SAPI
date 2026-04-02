const API_BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Submit assessment answers and get scores
 * POST /api/assessment/submit
 * @param {Object} userProfile - User profile details { country, respondent_name, title, ministry_or_department, contact_email, development_stage }
 * @param {Array} answers - Array of { question_id, selected_option }
 */
export async function submitAssessment(userProfile, answers) {
  const response = await fetch(`${API_BASE_URL}/api/assessment/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userProfile, answers }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to submit assessment: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data;
}

/**
 * Get assessment results by ID
 * GET /api/assessment/:id/results
 * @param {string} assessmentId - UUID of the assessment
 */
export async function getAssessmentResults(assessmentId) {
  const response = await fetch(`${API_BASE_URL}/api/assessment/${assessmentId}/results`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch results: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data;
}
