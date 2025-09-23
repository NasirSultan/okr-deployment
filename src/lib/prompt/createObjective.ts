export const okrPrompt = (
  strategy: string,
  role: string,
  industry: string,
  language: string,
) => `
Act as an OKR expert. Generate exactly **8 Objectives** aligned to:
- Strategy: ${strategy}
- Role: ${role}
- Industry: ${industry}

Rules:
1. Each objective must have:
   - A short and clear "title" (max 10 words).
   - A one-sentence "description" that is actionable and measurable.
   - A "difficulty" rating between 1 and 5 (1 = easy, 5 = very hard).
2. Do not add time-based phrases like "by the end of Q3" unless explicitly requested.
3. Focus on objectives the ${role} can directly influence in the ${industry}.
4. Ensure strict alignment with the strategy: ${strategy}.
5. Write the response in **${language}**.

Output Format (JSON ONLY):
{
  "strategy": "${strategy}",
  "role": "${role}",
  "industry": "${industry}",
  "language": "${language}",
  "okrs": [
    {
      "title": "Objective title",
      "description": "Objective description",
      "difficulty": 1
    }
  ]
}
Please respond only in valid JSON, no extra text.
`
