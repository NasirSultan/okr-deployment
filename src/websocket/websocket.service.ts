import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'

@Injectable()
export class WebsocketService {
  private invitations: Set<string> = new Set()
  private clients: Map<string, Socket> = new Map() // use string as userId

  registerClient(userId: string, client: Socket) {
    this.clients.set(userId, client)
  }

  getClientByUserId(userId: string): Socket | undefined {
    return this.clients.get(userId)
  }

  inviteTeam(teamToken: string) {
    this.invitations.add(teamToken)
    return `Team invitation sent with token: ${teamToken}`
  }

  isTokenValid(teamToken: string) {
    return this.invitations.has(teamToken)
  }

  removeToken(teamToken: string) {
    this.invitations.delete(teamToken)
  }
}
