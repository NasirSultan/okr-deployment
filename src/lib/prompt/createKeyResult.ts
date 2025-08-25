export const krPrompt = (strategy: string, objective: string, role: string) => `
Generate exactly 3 Key Results for this Objective. Follow these rules:
1. Each KR must be measurable (use %, $, or numbers)
2. Max 10 words per KR
3. Directly advance the Objective: "${objective}"
4. Align with Strategy: "${strategy}"
5. Consider the Role: "${role}"

Return ONLY a valid JSON object like this:

{
  "strategy": "${strategy}",
  "objective": "${objective}",
  "role": "${role}",
  "keyResults": [
    "Increase [metric] from X to Y",
    "Achieve [quantifiable outcome]",
    "Reduce [variable] by Z%"
  ]
}
`;
