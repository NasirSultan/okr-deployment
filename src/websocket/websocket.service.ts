import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class WebsocketService {
  private invitations: Set<string> = new Set();
  private clients: Map<number, Socket> = new Map(); 


  registerClient(userId: number, client: Socket) {
    this.clients.set(userId, client);
  }

  getClientByUserId(userId: number): Socket | undefined {
    return this.clients.get(userId);
  }

  inviteTeam(teamToken: string) {
    this.invitations.add(teamToken);
    return `Team invitation sent with token: ${teamToken}`;
  }

  isTokenValid(teamToken: string) {
    return this.invitations.has(teamToken);
  }

  removeToken(teamToken: string) {
    this.invitations.delete(teamToken);
  }
}
