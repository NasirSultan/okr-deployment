import jwt from 'jsonwebtoken';

const SECRET = 'TEAM_SECRET_KEY';

export function signTeamToken(teamId: number) {
  return jwt.sign({ teamId }, SECRET, { expiresIn: '1d' });
}

export function verifyTeamToken(token: string) {
  return jwt.verify(token, SECRET) as { teamId: number };
}
