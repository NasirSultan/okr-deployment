export const predictSuggestionPrompt = (
  strategy: string,
  role: string,
  industry: string,
  objective: string,
  keyResult: string
) => `
Act as an OKR advisor for the OKR'Nav game. 
Analyze the following input for **Strategic Alignment**, **Objective Alignment**, and **Key Result Quality**.

**Strategy**: ${strategy}  
**Role**: ${role}  
**Industry**: ${industry}  
**Objective**: "${objective}"  
**Key Result**: "${keyResult}"  

### Suggestion Guidelines
- Provide a **title** for each part: Perfect, Good, or Needs Work
- Provide a **suggestion** text explaining how to improve or what is strong
- Do not include numeric scores or gamification. Suggestion should consist of one line.
- always give best resp with 100% accuracy and relevance

### Output Format
\`\`\`json
{
  "title": "Evaluation Complete",
  "feedback": "Overall suggestion text",
  "breakdown": {
    "strategyAlignment": {
      "title": "[Perfect, Good, Needs Work]",
      "suggestion": "[Text suggestion]"
    },
    "objectiveAlignment": {
      "title": "[Perfect, Good, Needs Work]",
      "suggestion": "[Text suggestion]"
    },
    "keyResultQuality": {
      "title": "[Perfect, Good, Needs Work]",
      "suggestion": "[Text suggestion]"
    }
  }
}
\`\`\`
`;
