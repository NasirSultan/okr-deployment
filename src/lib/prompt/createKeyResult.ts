export const krPrompt = (
  strategy: string,
  objective: string,
  role: string,
  language: string,
) => `
Generate exactly 3 Key Results for this Objective.

Rules:
1. Each KR must have:
   - "id": a number (1 to 12, sequential across all objectives)
   - "title": max 6 words, short and clear
   - "description": 1–2 sentences explaining the KR
2. Each KR must be measurable with %, $, or numbers
3. Each KR must directly support Objective: "${objective}"
4. Align with Strategy: "${strategy}"
5. Consider the Role: "${role}"
6. Write the response in **${language}**

Return ONLY valid JSON:

{
  "strategy": "${strategy}",
  "objective": "${objective}",
  "role": "${role}",
  "language": "${language}",
  "keyResults": [
    {
      "id": 1,
      "title": "Cut response time",
      "description": "Reduce average response time by 30% compared to 2024"
    },
    {
      "id": 2,
      "title": "Resolve on first reply",
      "description": "Achieve 90% of tickets resolved on first response"
    },
    {
      "id": 3,
      "title": "Boost team efficiency",
      "description": "Increase customer support team efficiency by 20%"
    }
  ]
}
`
