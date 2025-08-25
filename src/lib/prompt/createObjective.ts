export const okrPrompt = (strategy: string, role: string, industry: string) => `
Act as an OKR expert. Generate **8 Objectives** aligned to:  
- **Strategy**: ${strategy}  
- **Role**: ${role}  
- **Industry**: ${industry}  

**Rules**:  
1. Each Objective must have a short, clear title followed by a colon and then the description.  
2. Each description must be **one sentence**, **actionable**, and **measurable**.  
3. Do not add time-based phrases like "by the end of Q3" unless explicitly requested.  
4. Prioritize objectives the ${role} would directly influence in the ${industry}.  
5. Ensure strict alignment with the ${strategy}.  

**Output Format** (JSON ONLY):  
{
  "strategy": "${strategy}",
  "role": "${role}",
  "industry": "${industry}",
  "okrs": [
    "Title1: Objective1",
    "Title2: Objective2",
    ...
    "Title8: Objective8"
  ]
}
Please respond **only in valid JSON**.
`;
