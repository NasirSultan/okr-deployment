export function assignTeamRewards(
  teamScores: { memberId: string; score: number }[],
  allTeamsScores: number[],
) {

  const totalScore = teamScores.reduce((sum, member) => sum + member.score, 0);
  const teamAverage = totalScore / teamScores.length;


  let teamTitle = "";
  let teamBadge = "";
  let teamTrophy = "";

  if (teamAverage === 100) {
    teamTitle = "Perfect Team";
    teamBadge = "Platinum Star";
    teamTrophy = "Gold Trophy";
  } else if (teamAverage >= 90) {
    teamTitle = "High Achiever Team";
    teamBadge = "Gold Star";
    teamTrophy = "Silver Trophy";
  } else if (teamAverage >= 80) {
    teamTitle = "Rising Team";
    teamBadge = "Silver Star";
    teamTrophy = ""; 
  } else {
    teamTitle = "Participant Team";
    teamBadge = "Bronze Star";
    teamTrophy = "";
  }


  const memberRewards = teamScores.map((member) => {
    let title = "";
    let badge = "";
    let trophy = "";

    if (member.score === 100) {
      title = "Perfect Performer";
      badge = "Platinum Star";
      trophy = "Gold Trophy";
    } else if (member.score >= 90) {
      title = "Top Performer";
      badge = "Gold Star";
      trophy = "Silver Trophy";
    } else if (member.score >= 80) {
      title = "High Achiever";
      badge = "Silver Star";
      trophy = ""; 
    } else if (member.score >= 70) {
      title = "Rising Star";
      badge = "Bronze Star";
      trophy = ""; 
    } else {
      title = "Participant";
      badge = "";
      trophy = ""; 
    }

    return { memberId: member.memberId, title, badge, trophy };
  });

   
  return { teamAverage, teamTitle, teamBadge, teamTrophy, memberRewards };
}
