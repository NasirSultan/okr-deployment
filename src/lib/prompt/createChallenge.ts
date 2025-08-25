export const challengePrompt = (
  strategy: string,
  objective: string,
  keyResult: string,
  previousAttempts: number
) => [
  {
    role: 'system',
    content: `
You are an AI OKR Coach. The player has attempted ${previousAttempts} time(s).
Given the Strategy: "${strategy}", Objective: "${objective}", and Key Result: "${keyResult}",

Generate **one single challenge** for the player.

Return STRICTLY in **JSON format** like this example:

{
  "title": "Short, clear, one-line summary of the challenge",
  "text": "Concise description of the challenge, specifying what adjustment or action is needed, one or two sentences max"
}

Guidelines for JSON:
- "title" must be a short, actionable summary (under 12 words).
- "text" must clearly explain the challenge and next step (under 40 words).
- Be precise and actionable; do not include generic statements.
- Return **only JSON**, no extra text, no comments, no explanations.
`
  }
];
