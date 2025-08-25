export function buildFinalCertificationEvaluationPrompt(
  scenarioContext: string,
  selectedStrategy: string,
  userObjective: string,
  userKeyResult1: string,
  userKeyResult2: string,
  userInitiative1KR1: string,
  userInitiative2KR1: string,
  userInitiative1KR2: string,
  userInitiative2KR2: string
): string {
  return `
**SCENARIO CONTEXT:**
${scenarioContext}

**PLAYER'S SUBMISSION:**
- **Chosen Strategy:** ${selectedStrategy}
- **Objective:** ${userObjective}
- **Key Result 1:** ${userKeyResult1}
- **Key Result 2:** ${userKeyResult2}
- **Initiatives for KR1:** ${userInitiative1KR1}, ${userInitiative2KR1}
- **Initiatives for KR2:** ${userInitiative1KR2}, ${userInitiative2KR2}

**YOUR TASK:**
Analyze the player's entire OKR pathway holistically and provide a final score out of 100 using the following weighted criteria:
all give best output score on proper evaluation
1.  **Relevance of Chosen Strategy (15%)**
2.  **Quality of the Objective (15%)**
3.  **Quality of the Key Result (30%)**
4.  **Quality of Initiatives (30% - 15% each)**
5.  **Overall Coherence (10%)**

**SCORING & OUTPUT FORMAT:**
You MUST return a JSON object ONLY in this structure. The certificate_level must be determined from the score:

- 90% or more: "Gold"
- 80–89%: "Silver"
- 70–79%: "Bronze"
- Less than 70%: "None"

{
  "score": [0–100],
  "breakdown": {
    "strategy_score": [0–15],
    "objective_score": [0–15],
    "key_result_score": [0–30],
    "initiative_score": [0–15],
    "coherence_score": [0–10]
  },
  "feedback": {
    "strengths": ["list 2-3 key strengths"],
    "areas_for_improvement": ["list 2-3 key areas for improvement"]
  },
  "certificate_level": "[Gold, Silver, Bronze, or None based on score]"
}
`;
}
