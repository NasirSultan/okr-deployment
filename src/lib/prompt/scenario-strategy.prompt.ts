export function generateScenarioPrompt(sector: string, role: string): string {
  return `
You are a business strategy simulation engine. Your task is to generate a certification challenge for a serious game about OKRs.

Player Context:
- Sector: ${sector}
- Role: ${role}

Instructions:
1. Generate a concise, realistic business scenario for a company in the ${sector} sector, presenting a core strategic challenge that the ${role} would be responsible for addressing.
2. Generate four strategic options for this scenario. Only one strategy should be the most relevant, direct, and effective response to the challenge. The other three should be plausible but flawed in some way (e.g., misaligned, a short-term fix, addressing a symptom rather than the cause, or too vague).

IMPORTANT: Only return valid JSON. Do not include explanations or extra text.

Output Format (strict JSON only):
{
  "scenario": "...",
  "strategies": [
    { "id": 1, "text": "..." },
    { "id": 2, "text": "..." },
    { "id": 3, "text": "..." },
    { "id": 4, "text": "..." }
  ],
  "correct_strategy_id": 1
}`;
}
