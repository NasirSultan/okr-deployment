export const evaluateInitiativesPrompt = (
  strategy: string,
  objective: string,
  keyResult: string,
  userText: string
) => `
You're an expert OKR evaluation assistant.

Here are the elements provided by the user:
- Chosen strategy: ${strategy}
- Initial objective: ${objective}
- Initial key result: ${keyResult}
- Proposed initiatives: ${userText}

Analyze the proposed initiatives according to these criteria:
1. Alignment with the initial strategy
2. Consistency with the initial objective
3. Consistency with the initial key result
4. Ability to create measurable impact

### Instructions
- Assign a relevance score from 0 to 100%.
- If initiatives are duplicates or very similar, reduce the score heavily.
- If the score is greater than or equal to 90%, the decision must be "Accepted".
- If the score is less than 90%, the decision must be "Rejected".
- Explain the decision in one clear, short, and actionable sentence.

### Response Format
Return only valid JSON:
{
  "score": number,
  "decision": "Accepted" | "Rejected",
  "explanation": "string"
}
`
